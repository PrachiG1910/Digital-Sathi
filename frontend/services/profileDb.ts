import { UserProfile } from '../types';
import { apiUrl } from './api';

const DB_NAME = 'digital-sathi-db';
const STORE_NAME = 'profiles';
const DB_VERSION = 1;

const hasIndexedDB = typeof window !== 'undefined' && 'indexedDB' in window;

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (!hasIndexedDB) return reject(new Error('IndexedDB is not available'));
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'phone' });
        store.createIndex('name', 'name', { unique: false });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error || new Error('Could not open local database'));
  });
}

// Save profile to local cache for active session and offline caching
export async function saveLocal(profile: UserProfile): Promise<void> {
  try {
    const db = await openDb();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      tx.objectStore(STORE_NAME).put(profile);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error || new Error('Could not save profile locally'));
    });
    db.close();
  } catch {
    // fallback to localStorage
  }
  localStorage.setItem(`ds_profile_${profile.phone}`, JSON.stringify(profile));
}

// Get profile from local cache
export async function getLocal(phone: string): Promise<UserProfile | null> {
  const cleanPhone = phone.trim().replace(/\D/g, '').slice(-10);
  try {
    const db = await openDb();
    const result = await new Promise<UserProfile | undefined>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const request = tx.objectStore(STORE_NAME).get(cleanPhone);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
    db.close();
    if (result) return result;
  } catch {
    // fallback to localStorage
  }
  const saved = localStorage.getItem(`ds_profile_${cleanPhone}`);
  return saved ? JSON.parse(saved) : null;
}

export interface AuthResult {
  success: boolean;
  message?: string;
  error?: string;
  profile?: UserProfile;
}

// Public API: registerUser (Authoritative MongoDB Registration)
export async function registerUser(params: {
  name: string;
  phone: string;
  language?: 'hi' | 'mr' | 'en';
  voiceRate?: number;
  fontSize?: 'normal' | 'large' | 'xlarge';
}): Promise<AuthResult> {
  const cleanPhone = params.phone.trim().replace(/\D/g, '').slice(-10);
  const cleanName = params.name.trim().replace(/\s+/g, ' ');

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000);

    const res = await fetch(apiUrl('/api/auth/register'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        name: cleanName,
        phone: cleanPhone,
        language: params.language || 'hi',
        voiceRate: params.voiceRate ?? 0.85,
        fontSize: params.fontSize ?? 'large',
      }),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    const contentType = res.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      const data = await res.json();
      if (res.ok && data.success && data.profile) {
        // Cache verified profile locally
        await saveLocal(data.profile);
        return { success: true, message: data.message, profile: data.profile };
      } else {
        return { success: false, error: data.error || `Server error (${res.status}): Registration could not be completed.` };
      }
    } else {
      return {
        success: false,
        error: `Server responded with status ${res.status}. Please ensure MONGODB_URI is configured on the backend.`,
      };
    }
  } catch (err: any) {
    console.error('Registration network error:', err?.message || err);
    return {
      success: false,
      error: 'Unable to connect to the Digital Sathi server. Please check your network connection.',
    };
  }
}

// Public API: loginUser (Authoritative MongoDB Login)
export async function loginUser(phone: string): Promise<AuthResult> {
  const cleanPhone = phone.trim().replace(/\D/g, '').slice(-10);

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000);

    const res = await fetch(apiUrl('/api/auth/login'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ phone: cleanPhone }),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    const contentType = res.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      const data = await res.json();
      if (res.ok && data.success && data.profile) {
        await saveLocal(data.profile);
        return { success: true, message: data.message, profile: data.profile };
      } else {
        return {
          success: false,
          error: data.error || (res.status === 404 ? 'No profile found for this mobile number. Please create a profile first.' : 'Login failed on server.'),
        };
      }
    } else {
      return {
        success: false,
        error: `Server responded with status ${res.status}. Could not verify user in database.`,
      };
    }
  } catch (err: any) {
    console.error('Login network error:', err?.message || err);
    return {
      success: false,
      error: 'Unable to connect to the authentication server. Please check your internet connection.',
    };
  }
}

// Public API: saveProfile (Sync to MongoDB backend + update local cache)
export async function saveProfile(profile: UserProfile): Promise<void> {
  const cleanPhone = profile.phone.trim().replace(/\D/g, '').slice(-10);
  const normalizedProfile: UserProfile = { ...profile, phone: cleanPhone };

  // Update local session cache
  await saveLocal(normalizedProfile);

  // Sync to MongoDB backend server
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const res = await fetch(apiUrl(`/api/users/${encodeURIComponent(cleanPhone)}`), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(normalizedProfile),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const contentType = res.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        const data = await res.json();
        if (data.success && data.profile) {
          await saveLocal(data.profile);
        }
      }
    }
  } catch {
    // Background sync failed; will retry on next action
  }
}

// Public API: getProfile (Checks Backend MongoDB, falls back to local cache)
export async function getProfile(phone: string): Promise<UserProfile | null> {
  const cleanPhone = phone.trim().replace(/\D/g, '').slice(-10);

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const res = await fetch(apiUrl(`/api/users/${encodeURIComponent(cleanPhone)}`), {
      headers: { 'Accept': 'application/json' },
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const contentType = res.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        const data = await res.json();
        if (data.success && data.profile) {
          await saveLocal(data.profile);
          return data.profile as UserProfile;
        }
      }
    }
  } catch {
    // Network offline; fall back to local cache
  }

  return getLocal(cleanPhone);
}

// Public API: deleteProfile (Local + Cloud deletion)
export async function deleteProfile(phone: string): Promise<void> {
  const cleanPhone = phone.trim().replace(/\D/g, '').slice(-10);

  try {
    const db = await openDb();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      tx.objectStore(STORE_NAME).delete(cleanPhone);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
    db.close();
  } catch {
    // ignored
  }
  localStorage.removeItem(`ds_profile_${cleanPhone}`);

  try {
    fetch(apiUrl(`/api/users/${encodeURIComponent(cleanPhone)}`), {
      method: 'DELETE',
    }).catch(() => {});
  } catch {
    // ignored
  }
}
