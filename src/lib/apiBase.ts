/** Render backend URL - used when frontend is in production (Vercel, etc.) */
const RENDER_API_URL = 'https://vue-projects-a2nt.onrender.com';

/**
 * Returns the API base URL. On localhost, uses same origin (Vite proxy).
 * Otherwise uses Render - always with full https:// URL to avoid relative paths.
 */
export function getApiBase(): string {
  if (typeof window !== 'undefined' && /^localhost$|^127\.\d+\.\d+\.\d+$/i.test(window.location.hostname)) {
    return '';
  }
  const raw = (import.meta.env.VITE_API_URL || RENDER_API_URL).toString().trim();
  if (!raw) return RENDER_API_URL;
  return /^https?:\/\//i.test(raw) ? raw : `https://${raw.replace(/^\/+/, '')}`;
}
