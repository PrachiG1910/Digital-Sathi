/**
 * Digital Sathi Centralized API Configuration
 *
 * For Production (Vercel):
 * Set VITE_API_URL to your Render backend URL (e.g. https://digital-sathi-backend.onrender.com).
 *
 * For Local Development:
 * Leave VITE_API_URL empty/unset. Vite dev proxy will automatically proxy '/api' to localhost:5001.
 */

const rawApiUrl = (import.meta.env.VITE_API_URL || '').trim();
export const API_BASE_URL = rawApiUrl.replace(/\/+$/, '');

export function apiUrl(endpoint: string): string {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return API_BASE_URL ? `${API_BASE_URL}${cleanEndpoint}` : cleanEndpoint;
}
