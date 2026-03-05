<template>
  <v-container class="py-16">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <h2 class="text-h4 font-weight-bold mb-4">{{ t('auth.dashboard') }}</h2>
        <v-card variant="tonal" class="pa-4">
          <p class="text-body-1">
            {{ t('auth.welcome') }}, <strong>{{ user?.name || user?.email }}</strong>.
          </p>
          <p class="text-body-2 text-medium-emphasis mt-2">
            {{ t('auth.dashboardHint') }}
          </p>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { onMounted, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useAuth } from '@/composables/useAuth';

const { t } = useI18n();
const { user, fetchUser } = useAuth();

onMounted(() => fetchUser());
</script>
