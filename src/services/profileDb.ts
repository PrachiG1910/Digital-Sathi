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

export async function saveProfile(profile: UserProfile): Promise<void> {
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
    localStorage.setItem(`ds_profile_${profile.phone}`, JSON.stringify(profile));
  }
}

export async function getProfile(phone: string): Promise<UserProfile | null> {
  try {
    const db = await openDb();
    const result = await new Promise<UserProfile | undefined>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const request = tx.objectStore(STORE_NAME).get(phone);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
    db.close();
    return result || null;
  } catch {
    const saved = localStorage.getItem(`ds_profile_${phone}`);
    return saved ? JSON.parse(saved) : null;
  }
}

export async function deleteProfile(phone: string): Promise<void> {
  try {
    const db = await openDb();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      tx.objectStore(STORE_NAME).delete(phone);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
    db.close();
  } catch {
    // localStorage fallback is intentionally retained if IndexedDB is unavailable.
  }
  localStorage.removeItem(`ds_profile_${phone}`);
}
