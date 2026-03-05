<template>
  <v-container id="contact" class="py-16">
    <h2 class="text-h4 text-center font-weight-bold mb-4">{{ t('contact.title') }}</h2>
    <p class="text-center text-subtitle-1 mb-10">{{ t('contact.subtitle') }}</p>

    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-form ref="formRef" v-model="valid">
          <!-- Honeypot: hidden from users, bots often fill it -->
          <v-text-field
            v-model="form.website"
            label="Website"
            class="contact-hp"
            tabindex="-1"
            autocomplete="off"
            aria-hidden="true"
          />
          <v-text-field
            :label="t('contact.name')"
            v-model="form.name"
            :rules="[rules.required, rules.maxLength(100)]"
            prepend-inner-icon="mdi-account"
            maxlength="100"
            counter="100"
            required
          />
          <v-text-field
            :label="t('contact.email')"
            v-model="form.email"
            :rules="[rules.required, rules.email, rules.maxLength(254)]"
            prepend-inner-icon="mdi-email"
            maxlength="254"
            type="email"
            required
          />
          <v-text-field
            :label="t('contact.subject')"
            v-model="form.subject"
            :rules="[rules.required, rules.maxLength(200)]"
            prepend-inner-icon="mdi-format-title"
            maxlength="200"
            counter="200"
            required
          />
          <v-textarea
            :label="t('contact.message')"
            v-model="form.message"
            :rules="[rules.required, rules.maxLength(5000)]"
            prepend-inner-icon="mdi-message-text"
            rows="4"
            maxlength="5000"
            counter="5000"
            required
          />

          <v-btn color="primary" block class="mt-4" :loading="sending" :disabled="sending" @click="submitForm">
            {{ t('contact.sendMessage') }}
            <v-icon end>mdi-send</v-icon>
          </v-btn>
        </v-form>

        <div v-if="submitted" class="text-center mt-6">
          <v-alert type="success" border="start" elevation="2" variant="tonal">
            {{ t('contact.thankYou') }}
          </v-alert>
        </div>
        <div v-if="submitError" class="text-center mt-6">
          <v-alert type="error" border="start" elevation="2" variant="tonal" closable>
            {{ t('contact.sendError') }}
          </v-alert>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const formRef = ref();
const valid = ref(false);
const submitted = ref(false);
const sending = ref(false);
const submitError = ref(false);

const form = ref({
  website: '',
  name: '',
  email: '',
  subject: '',
  message: '',
});

const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID as string | undefined;

// RFC 5322–style email (simplified)
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const rules = {
  required: (v: string) => !!String(v ?? '').trim() || t('contact.fieldRequired'),
  email: (v: string) => (v ? EMAIL_REGEX.test(String(v).trim()) : false) || t('contact.emailInvalid'),
  maxLength: (max: number) => (v: string) =>
    (v == null || String(v).length <= max) || t('contact.fieldTooLong', { max }),
};

function sanitize(str: string, maxLen: number): string {
  return String(str ?? '')
    .trim()
    .slice(0, maxLen);
}

const submitForm = async () => {
  submitError.value = false;
  const result = await formRef.value?.validate();
  if (!result?.valid) return;

  // Reject if honeypot was filled (likely bot)
  if (String(form.value.website ?? '').trim()) {
    submitted.value = true;
    setTimeout(() => {
      submitted.value = false;
      resetForm();
    }, 2000);
    return;
  }

  const payload = {
    name: sanitize(form.value.name, 100),
    email: sanitize(form.value.email, 254),
    subject: sanitize(form.value.subject, 200),
    message: sanitize(form.value.message, 5000),
  };

  if (FORMSPREE_ID) {
    sending.value = true;
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Formspree error');
      submitted.value = true;
      setTimeout(() => {
        submitted.value = false;
        resetForm();
      }, 4000);
    } catch {
      submitError.value = true;
    } finally {
      sending.value = false;
    }
  } else {
    submitted.value = true;
    setTimeout(() => {
      submitted.value = false;
      resetForm();
    }, 4000);
  }
};

function resetForm() {
  form.value = { website: '', name: '', email: '', subject: '', message: '' };
  formRef.value?.reset();
}
</script>

<style scoped>
.contact-hp {
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  overflow: hidden;
  opacity: 0;
  pointer-events: none;
}
</style>
