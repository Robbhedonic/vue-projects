<template>
  <v-container class="py-16">
    <v-row justify="center">
      <v-col cols="12" sm="8" md="5">
        <h2 class="text-h4 text-center font-weight-bold mb-4">{{ t('auth.login') }}</h2>
        <v-form ref="formRef" v-model="valid" @submit.prevent="submit">
          <v-text-field
            v-model="email"
            :label="t('auth.email')"
            type="email"
            :rules="[rules.required, rules.email]"
            prepend-inner-icon="mdi-email"
            autocomplete="email"
          />
          <v-text-field
            v-model="password"
            :label="t('auth.password')"
            :type="showPassword ? 'text' : 'password'"
            :rules="[rules.required]"
            prepend-inner-icon="mdi-lock"
            :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
            @click:append-inner="showPassword = !showPassword"
            autocomplete="current-password"
            class="mt-2"
          />
          <v-alert v-if="setupHint" type="info" density="compact" class="mt-2">
            {{ setupHint }}
          </v-alert>
          <v-alert v-if="error" type="error" density="compact" class="mt-2" closable>
            {{ error }}
          </v-alert>
          <v-btn type="submit" color="primary" block class="mt-4" :loading="loading">
            {{ t('auth.login') }}
          </v-btn>
        </v-form>
        <p class="text-center mt-4 text-body-2 text-medium-emphasis">
          {{ t('auth.ownerOnly') }}
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useAuth } from '@/composables/useAuth';

const { t } = useI18n();
const router = useRouter();
const { login } = useAuth();

const formRef = ref();
const valid = ref(false);
const email = ref('');
const password = ref('');
const showPassword = ref(false);
const loading = ref(false);
const error = ref('');
const setupHint = ref('');

const apiBase =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV ? '' : 'https://vue-projects-a2nt.onrender.com');

onMounted(async () => {
  try {
    const res = await fetch(`${apiBase || ''}/api/setup-status`.replace(/\/+/, '/'));
    if (!res.ok) return;
    const data = await res.json();
    if (data.usersCount === 0 && data.ownerConfigured) {
      setupHint.value = t('auth.setupHintRestart');
    } else if (data.usersCount === 0 && !data.ownerConfigured) {
      setupHint.value = t('auth.setupHintEnv');
    }
  } catch {
    setupHint.value = t('auth.setupHintServer');
  }
});

const rules = {
  required: (v: string) => !!String(v ?? '').trim() || t('auth.fieldRequired'),
  email: (v: string) => /.+@.+\..+/.test(String(v ?? '')) || t('auth.emailInvalid'),
};

async function submit() {
  error.value = '';
  const result = await formRef.value?.validate();
  if (!result?.valid) return;
  loading.value = true;
  try {
    await login(email.value.trim(), password.value);
    router.replace('/dashboard');
  } catch (e) {
    const msg = e instanceof Error ? e.message : t('auth.loginFailed');
    error.value = msg === 'LOGIN_NOT_AVAILABLE' ? t('auth.loginNotAvailable') : msg;
    console.error('Login error:', e);
  } finally {
    loading.value = false;
  }
}
</script>
