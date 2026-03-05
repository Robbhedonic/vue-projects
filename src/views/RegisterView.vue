<template>
  <v-container class="py-16">
    <v-row justify="center">
      <v-col cols="12" sm="8" md="5">
        <h2 class="text-h4 text-center font-weight-bold mb-4">{{ t('auth.register') }}</h2>
        <v-form ref="formRef" v-model="valid" @submit.prevent="submit">
          <v-text-field
            v-model="name"
            :label="t('auth.name')"
            :rules="[rules.required]"
            prepend-inner-icon="mdi-account"
            autocomplete="name"
          />
          <v-text-field
            v-model="email"
            :label="t('auth.email')"
            type="email"
            :rules="[rules.required, rules.email]"
            prepend-inner-icon="mdi-email"
            autocomplete="email"
            class="mt-2"
          />
          <v-text-field
            v-model="password"
            :label="t('auth.password')"
            :type="showPassword ? 'text' : 'password'"
            :rules="[rules.required, rules.passwordMin]"
            prepend-inner-icon="mdi-lock"
            :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
            @click:append-inner="showPassword = !showPassword"
            autocomplete="new-password"
            class="mt-2"
          />
          <v-alert v-if="error" type="error" density="compact" class="mt-2" closable>
            {{ error }}
          </v-alert>
          <v-btn type="submit" color="primary" block class="mt-4" :loading="loading">
            {{ t('auth.register') }}
          </v-btn>
        </v-form>
        <p class="text-center mt-4">
          <router-link to="/login">{{ t('auth.hasAccount') }}</router-link>
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useAuth } from '@/composables/useAuth';

const { t } = useI18n();
const router = useRouter();
const { register } = useAuth();

const formRef = ref();
const valid = ref(false);
const name = ref('');
const email = ref('');
const password = ref('');
const showPassword = ref(false);
const loading = ref(false);
const error = ref('');

const rules = {
  required: (v: string) => !!String(v ?? '').trim() || t('auth.fieldRequired'),
  email: (v: string) => /.+@.+\..+/.test(String(v ?? '')) || t('auth.emailInvalid'),
  passwordMin: (v: string) =>
    (v && v.length >= 6) || t('auth.passwordMin'),
};

async function submit() {
  error.value = '';
  const result = await formRef.value?.validate();
  if (!result?.valid) return;
  loading.value = true;
  try {
    await register(email.value.trim(), password.value, name.value.trim());
    router.replace('/dashboard');
  } catch (e) {
    error.value = e instanceof Error ? e.message : t('auth.registerFailed');
  } finally {
    loading.value = false;
  }
}
</script>
