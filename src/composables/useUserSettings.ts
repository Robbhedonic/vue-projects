import { ref, watch } from 'vue';
import { getApiBase } from '@/lib/apiBase';

export interface UserSettings {
  navbarColor: string | null;
  footerColor: string | null;
  backgroundColor: string | null;
  homeImageUrl: string | null;
  aboutImageUrl: string | null;
}

const DEFAULT_SETTINGS: UserSettings = {
  navbarColor: null,
  footerColor: null,
  backgroundColor: null,
  homeImageUrl: null,
  aboutImageUrl: null,
};

const settings = ref<UserSettings>({ ...DEFAULT_SETTINGS });

function getToken() {
  return localStorage.getItem('auth-token');
}

export function useUserSettings() {
  async function loadSettings() {
    const token = getToken();
    if (!token) {
      settings.value = { ...DEFAULT_SETTINGS };
      return;
    }
    const apiBase = getApiBase();
    try {
      const res = await fetch(`${apiBase || ''}/api/me/settings`.replace(/\/+/, '/'), {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) return;
      const data = await res.json();
      if (data.settings) {
        settings.value = { ...DEFAULT_SETTINGS, ...data.settings };
      }
    } catch {
      settings.value = { ...DEFAULT_SETTINGS };
    }
  }

  async function saveSettings(payload: Partial<UserSettings>) {
    const token = getToken();
    if (!token) return;
    const apiBase = getApiBase();
    const res = await fetch(`${apiBase || ''}/api/me/settings`.replace(/\/+/, '/'), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Failed to save settings');
    const data = await res.json();
    if (data.settings) settings.value = { ...DEFAULT_SETTINGS, ...data.settings };
  }

  function resetSettings() {
    settings.value = { ...DEFAULT_SETTINGS };
  }

  return {
    settings,
    loadSettings,
    saveSettings,
    resetSettings,
  };
}
