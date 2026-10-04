import { UserProfile } from '../types';

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

// Save profile to local IndexedDB and localStorage
async function saveLocal(profile: UserProfile): Promise<void> {
  try {
    const db = await openDb();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      tx.objectStore(STORE_NAME).put(profile);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error || new Error('Could not save profile'));
    });
    db.close();
  } catch {
    // fallback below
  }
  localStorage.setItem(`ds_profile_${profile.phone}`, JSON.stringify(profile));
}

// Get profile from local IndexedDB or localStorage
async function getLocal(phone: string): Promise<UserProfile | null> {
  try {
    const db = await openDb();
    const result = await new Promise<UserProfile | undefined>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const request = tx.objectStore(STORE_NAME).get(phone);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
    db.close();
    if (result) return result;
  } catch {
    // fallback below
  }
  const saved = localStorage.getItem(`ds_profile_${phone}`);
  return saved ? JSON.parse(saved) : null;
}

import { apiUrl } from './api';

// Public API: saveProfile (Offline-first + Cloud synchronization)
export async function saveProfile(profile: UserProfile): Promise<void> {
  // 1. Immediately save locally for instantaneous response and offline safety
  await saveLocal(profile);

  // 2. Sync to backend server
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    const res = await fetch(apiUrl(`/api/users/${encodeURIComponent(profile.phone)}`), {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profile),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (data.success && data.profile) {
        await saveLocal(data.profile);
      }
    }
  } catch {
    // Backend temporarily unreachable; offline local data remains safe
  }
}

// Public API: getProfile (Checks Backend, falls back to Local)
export async function getProfile(phone: string): Promise<UserProfile | null> {
  const cleanPhone = phone.trim();

  // Try fetching from backend first if online
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1200);

    const res = await fetch(apiUrl(`/api/users/${encodeURIComponent(cleanPhone)}`), {
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (data.success && data.profile) {
        // Cache freshly retrieved cloud profile locally
        await saveLocal(data.profile);
        return data.profile as UserProfile;
      }
    }
  } catch {
    // Network failure or backend offline - continue to local fallback
  }

  // Fallback to local IndexedDB and localStorage
  return getLocal(cleanPhone);
}

// Public API: deleteProfile (Local + Cloud deletion)
export async function deleteProfile(phone: string): Promise<void> {
  const cleanPhone = phone.trim();

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

  // Also notify backend
  try {
    fetch(apiUrl(`/api/users/${encodeURIComponent(cleanPhone)}`), {
      method: 'DELETE',
    }).catch(() => {});
  } catch {
    // ignored
  }
}
