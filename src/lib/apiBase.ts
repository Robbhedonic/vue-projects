/** Render backend URL - used when frontend is on Vercel or in production */
const RENDER_API_URL = 'https://vue-projects-a2nt.onrender.com';

/**
 * Returns the API base URL. In dev, uses same origin (Vite proxy). In production
 * on vercel.app, always uses Render. Otherwise uses VITE_API_URL or Render fallback.
 */
export function getApiBase(): string {
  if (import.meta.env.DEV) return '';

  if (typeof window !== 'undefined' && /vercel\.app$/i.test(window.location.hostname)) {
    return RENDER_API_URL;
  }

  const fromEnv = import.meta.env.VITE_API_URL || '';
  const raw = fromEnv || RENDER_API_URL;
  return raw && !/^https?:\/\//i.test(raw) ? `https://${raw.replace(/^\/+/, '')}` : raw;
}
