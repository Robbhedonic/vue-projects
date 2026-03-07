/** Backend API URL - full URL so the browser never treats it as a relative path */
const RENDER_API_URL = 'https://vue-projects-a2nt.onrender.com';

/**
 * Returns the API base URL. On localhost only, uses '' (Vite proxy). Everywhere else
 * returns the full Render URL - no env var, so the deployed build always has the correct URL.
 */
export function getApiBase(): string {
  if (typeof window !== 'undefined' && /^localhost$|^127\.\d+\.\d+\.\d+$/i.test(window.location.hostname)) {
    return '';
  }
  return RENDER_API_URL;
}
