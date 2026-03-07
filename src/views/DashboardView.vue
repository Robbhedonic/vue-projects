<template>
  <v-container class="py-16">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <h2 class="text-h4 font-weight-bold mb-4">{{ t('auth.dashboard') }}</h2>
        <v-card variant="tonal" class="pa-4 mb-6">
          <p class="text-body-1">
            {{ t('auth.welcome') }}, <strong>{{ user?.name || user?.email }}</strong>.
          </p>
          <p class="text-body-2 text-medium-emphasis mt-2">
            {{ t('auth.dashboardHint') }}
          </p>
        </v-card>

        <v-card variant="tonal" class="pa-4">
          <h3 class="text-h6 font-weight-bold mb-4">{{ t('auth.appearance') }}</h3>
          <v-form ref="formRef" @submit.prevent="save">
            <v-row>
              <v-col cols="12" md="6">
                <label class="text-caption text-medium-emphasis d-block mb-1">{{ t('auth.navbarColor') }}</label>
                <div class="d-flex align-center gap-2">
                  <input
                    v-model="form.navbarColor"
                    type="color"
                    class="profile-color-input"
                  />
                  <v-text-field
                    v-model="form.navbarColor"
                    density="compact"
                    hide-details
                    placeholder="#3f51b5"
                  />
                  <v-btn size="small" variant="text" @click="form.navbarColor = ''">{{ t('auth.useDefault') }}</v-btn>
                </div>
              </v-col>
              <v-col cols="12" md="6">
                <label class="text-caption text-medium-emphasis d-block mb-1">{{ t('auth.footerColor') }}</label>
                <div class="d-flex align-center gap-2">
                  <input
                    v-model="form.footerColor"
                    type="color"
                    class="profile-color-input"
                  />
                  <v-text-field
                    v-model="form.footerColor"
                    density="compact"
                    hide-details
                    placeholder="#3f51b5"
                  />
                  <v-btn size="small" variant="text" @click="form.footerColor = ''">{{ t('auth.useDefault') }}</v-btn>
                </div>
              </v-col>
              <v-col cols="12" md="6">
                <label class="text-caption text-medium-emphasis d-block mb-1">{{ t('auth.backgroundColor') }}</label>
                <div class="d-flex align-center gap-2">
                  <input
                    v-model="form.backgroundColor"
                    type="color"
                    class="profile-color-input"
                  />
                  <v-text-field
                    v-model="form.backgroundColor"
                    density="compact"
                    hide-details
                    placeholder="#ffffff"
                  />
                  <v-btn size="small" variant="text" @click="form.backgroundColor = ''">{{ t('auth.useDefault') }}</v-btn>
                </div>
              </v-col>
              <v-col cols="12">
                <label class="text-caption text-medium-emphasis d-block mb-1">{{ t('auth.homeImageUrl') }}</label>
                <p class="text-caption text-medium-emphasis mb-1">{{ t('auth.pasteUrlOrUpload') }}</p>
                <v-text-field
                  v-model="form.homeImageUrl"
                  density="compact"
                  :placeholder="t('auth.pasteUrlOrUpload')"
                  hide-details
                  clearable
                  class="mb-2"
                />
                <input
                  ref="homeFileInput"
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  class="d-none"
                  @change="onHomeFileChange"
                />
                <v-btn
                  variant="outlined"
                  size="small"
                  :loading="uploadingHome"
                  @click="homeFileInput?.click()"
                >
                  {{ t('auth.uploadFromComputer') }}
                </v-btn>
              </v-col>
              <v-col cols="12">
                <label class="text-caption text-medium-emphasis d-block mb-1">{{ t('auth.aboutImageUrl') }}</label>
                <p class="text-caption text-medium-emphasis mb-1">{{ t('auth.pasteUrlOrUpload') }}</p>
                <v-text-field
                  v-model="form.aboutImageUrl"
                  density="compact"
                  :placeholder="t('auth.pasteUrlOrUpload')"
                  hide-details
                  clearable
                  class="mb-2"
                />
                <input
                  ref="aboutFileInput"
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  class="d-none"
                  @change="onAboutFileChange"
                />
                <v-btn
                  variant="outlined"
                  size="small"
                  :loading="uploadingAbout"
                  @click="aboutFileInput?.click()"
                >
                  {{ t('auth.uploadFromComputer') }}
                </v-btn>
              </v-col>
              <v-col cols="12">
                <v-alert v-if="uploadError" type="error" density="compact" class="mb-2" closable @click:close="uploadError = ''">
                  {{ uploadError }}
                </v-alert>
                <v-btn type="submit" color="primary" :loading="saving">
                  {{ t('auth.saveSettings') }}
                </v-btn>
                <span v-if="savedMessage" class="ml-3 text-success">{{ t('auth.settingsSaved') }}</span>
              </v-col>
            </v-row>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useAuth } from '@/composables/useAuth';
import { useUserSettings } from '@/composables/useUserSettings';

const { t } = useI18n();
const { user, fetchUser } = useAuth();
const { settings, loadSettings, saveSettings } = useUserSettings();

const formRef = ref();
const saving = ref(false);
const savedMessage = ref(false);
const homeFileInput = ref<HTMLInputElement | null>(null);
const aboutFileInput = ref<HTMLInputElement | null>(null);
const uploadingHome = ref(false);
const uploadingAbout = ref(false);
const uploadError = ref('');

const raw =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.PROD ? 'https://vue-projects-a2nt.onrender.com' : '');
const apiBase = (
  raw && !/^https?:\/\//i.test(raw) ? `https://${raw.replace(/^\/+/, '')}` : raw
).replace(/\/$/, '');

async function uploadFile(file: File): Promise<string> {
  const token = localStorage.getItem('auth-token');
  if (!token) throw new Error('Not logged in');
  const formData = new FormData();
  formData.append('file', file);
  const url = `${apiBase || ''}/api/me/upload`.replace(/\/+/, '/');
  const res = await fetch(url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || 'Upload failed');
  }
  const data = await res.json();
  const path = data.path || '';
  return path.startsWith('http') ? path : (apiBase ? apiBase + path : path);
}

async function onHomeFileChange(e: Event) {
  const input = e.target as HTMLInputElement;
  const file = input.files?.[0];
  if (!file) return;
  uploadError.value = '';
  uploadingHome.value = true;
  try {
    form.value.homeImageUrl = await uploadFile(file);
  } catch (err) {
    uploadError.value = err instanceof Error ? err.message : t('auth.uploadError');
  } finally {
    uploadingHome.value = false;
    input.value = '';
  }
}

async function onAboutFileChange(e: Event) {
  const input = e.target as HTMLInputElement;
  const file = input.files?.[0];
  if (!file) return;
  uploadError.value = '';
  uploadingAbout.value = true;
  try {
    form.value.aboutImageUrl = await uploadFile(file);
  } catch (err) {
    uploadError.value = err instanceof Error ? err.message : t('auth.uploadError');
  } finally {
    uploadingAbout.value = false;
    input.value = '';
  }
}

const form = ref({
  navbarColor: '',
  footerColor: '',
  backgroundColor: '',
  homeImageUrl: '',
  aboutImageUrl: '',
});

watch(settings, (s) => {
  form.value.navbarColor = s.navbarColor || '';
  form.value.footerColor = s.footerColor || '';
  form.value.backgroundColor = s.backgroundColor || '';
  form.value.homeImageUrl = s.homeImageUrl || '';
  form.value.aboutImageUrl = s.aboutImageUrl || '';
}, { immediate: true });

onMounted(async () => {
  await fetchUser();
  await loadSettings();
});

async function save() {
  saving.value = true;
  savedMessage.value = false;
  try {
    await saveSettings({
      navbarColor: form.value.navbarColor || null,
      footerColor: form.value.footerColor || null,
      backgroundColor: form.value.backgroundColor || null,
      homeImageUrl: form.value.homeImageUrl || null,
      aboutImageUrl: form.value.aboutImageUrl || null,
    });
    savedMessage.value = true;
    setTimeout(() => { savedMessage.value = false; }, 3000);
  } catch {
    // show error if needed
  } finally {
    saving.value = false;
  }
}
</script>

<style scoped>
.profile-color-input {
  width: 40px;
  height: 40px;
  padding: 2px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  cursor: pointer;
}
.gap-2 { gap: 8px; }
</style>
