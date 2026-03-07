/** Render backend URL - used when frontend is in production (Vercel, etc.) */
const RENDER_API_URL = 'https://vue-projects-a2nt.onrender.com';

/**
 * Returns the API base URL. On localhost, uses same origin (Vite proxy).
 * Otherwise uses VITE_API_URL or Render.
 */
export function getApiBase(): string {
  if (typeof window !== 'undefined' && /^localhost$|^127\.\d+\.\d+\.\d+$/i.test(window.location.hostname)) {
    return '';
  }
  const raw = import.meta.env.VITE_API_URL || RENDER_API_URL;
  return raw && !/^https?:\/\//i.test(raw) ? `https://${raw.replace(/^\/+/, '')}` : raw;
}
