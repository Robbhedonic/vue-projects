import { ref, computed } from 'vue';

const TOKEN_KEY = 'auth-token';
const stored = ref<string | null>(localStorage.getItem(TOKEN_KEY));

export interface AuthUser {
  id: string;
  email: string;
  name: string;
}

const user = ref<AuthUser | null>(null);

export function useAuth() {
  const token = computed(() => stored.value);
  const isLoggedIn = computed(() => !!stored.value);
  // In dev, use same origin so Vite proxy forwards /api; in prod use VITE_API_URL or Render fallback
  const apiBase =
    import.meta.env.VITE_API_URL ||
    (import.meta.env.DEV ? '' : 'https://vue-projects-a2nt.onrender.com');

  function setToken(t: string | null) {
    stored.value = t;
    if (t) localStorage.setItem(TOKEN_KEY, t);
    else localStorage.removeItem(TOKEN_KEY);
    user.value = null;
  }

  async function fetchUser() {
    if (!stored.value) return null;
    try {
      const res = await fetch(`${apiBase}/api/me`, {
        headers: { Authorization: `Bearer ${stored.value}` },
      });
      if (!res.ok) {
        if (res.status === 401) setToken(null);
        return null;
      }
      const data = await res.json();
      user.value = data.user ?? null;
      return user.value;
    } catch {
      return null;
    }
  }

  async function login(email: string, password: string) {
    const url = `${apiBase || ''}/api/auth/login`.replace(/\/+/, '/');
    let res: Response;
    try {
      res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
    } catch (err) {
      throw new Error('No se pudo conectar al servidor. ¿Está corriendo "npm run server"?');
    }
    const text = await res.text();
    let data: { error?: string; token?: string; user?: AuthUser } = {};
    try {
      data = text ? JSON.parse(text) : {};
    } catch {
      console.error('Login response (not JSON):', res.status, text?.slice(0, 200));
    }
    if (!res.ok) {
      if (res.status === 405 || res.status === 404) {
        throw new Error('LOGIN_NOT_AVAILABLE');
      }
      const msg = data.error || (text?.slice(0, 100) || `Error ${res.status}`);
      throw new Error(msg);
    }
    if (data.token) setToken(data.token);
    user.value = data.user ?? null;
    return data.user;
  }

  async function register(email: string, password: string, name: string) {
    const res = await fetch(`${apiBase}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || 'Registration failed');
    setToken(data.token);
    user.value = data.user ?? null;
    return data.user;
  }

  function logout() {
    setToken(null);
  }

  return {
    token,
    user,
    isLoggedIn,
    setToken,
    fetchUser,
    login,
    register,
    logout,
  };
}
