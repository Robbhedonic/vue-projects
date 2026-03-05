<template>
  <v-container id="contact" class="py-16">
    <h2 class="text-h4 text-center font-weight-bold mb-4">{{ t('contact.title') }}</h2>
    <p class="text-center text-subtitle-1 mb-10">{{ t('contact.subtitle') }}</p>

    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-form ref="formRef" v-model="valid">
          <v-text-field
            :label="t('contact.name')"
            v-model="form.name"
            :rules="[rules.required]"
            prepend-inner-icon="mdi-account"
            required
          />
          <v-text-field
            :label="t('contact.email')"
            v-model="form.email"
            :rules="[rules.required, rules.email]"
            prepend-inner-icon="mdi-email"
            required
          />
          <v-text-field
            :label="t('contact.subject')"
            v-model="form.subject"
            :rules="[rules.required]"
            prepend-inner-icon="mdi-format-title"
            required
          />
          <v-textarea
            :label="t('contact.message')"
            v-model="form.message"
            :rules="[rules.required]"
            prepend-inner-icon="mdi-message-text"
            rows="4"
            required
          />

          <v-btn color="primary" block class="mt-4" @click="submitForm">
            {{ t('contact.sendMessage') }}
            <v-icon end>mdi-send</v-icon>
          </v-btn>
        </v-form>

        <div v-if="submitted" class="text-center mt-6">
          <v-alert type="success" border="start" elevation="2" variant="tonal">
            {{ t('contact.thankYou') }}
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

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: '',
});

const rules = {
  required: (v: string) => !!v || t('contact.fieldRequired'),
  email: (v: string) => /.+@.+\..+/.test(v) || t('contact.emailInvalid'),
};

const submitForm = async () => {
  const result = await formRef.value?.validate();
  if (result?.valid) {
    console.log('Submitted form:', form.value);
    submitted.value = true;
    setTimeout(() => {
      submitted.value = false;
      form.value = { name: '', email: '', subject: '', message: '' };
      formRef.value?.reset();
    }, 4000);
  }
};
</script>
