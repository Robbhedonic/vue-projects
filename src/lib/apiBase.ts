/** Render backend URL - used when frontend is in production (Vercel, etc.) */
const RENDER_API_URL = 'https://vue-projects-a2nt.onrender.com';

/**
 * Returns the API base URL. On localhost, uses same origin (Vite proxy).
 * Otherwise returns Render URL - ALWAYS with https:// to avoid relative path bugs.
 * VITE_API_URL is used only if it already has http(s):// protocol.
 */
export function getApiBase(): string {
  if (typeof window !== 'undefined' && /^localhost$|^127\.\d+\.\d+\.\d+$/i.test(window.location.hostname)) {
    return '';
  }
  const env = (import.meta.env.VITE_API_URL || '').toString().trim();
  if (env && /^https?:\/\//i.test(env)) return env;
  return RENDER_API_URL;
}
