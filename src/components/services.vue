<template>
  <v-container id="services" class="py-16">
    <h2 class="text-h4 text-center font-weight-bold mb-2">{{ t('services.title') }}</h2>
    <p class="text-center text-subtitle-1 mb-10">{{ t('services.subtitle') }}</p>

    <v-row justify="center">
      <v-col
        v-for="(service, key) in services"
        :key="key"
        cols="12"
        sm="6"
        md="4"
      >
        <v-card
          class="service-card pa-6 text-center h-100"
          elevation="2"
          @click="openModal(service)"
        >
          <div class="service-icon-wrap mb-4">
            <v-icon :icon="service.icon" size="40" color="primary" />
          </div>
          <h3 class="text-h6 font-weight-bold mb-3">{{ t(service.titleKey) }}</h3>
          <p class="text-body-2 text-medium-emphasis mb-4">
            {{ t(service.summaryKey) }}
          </p>
          <v-btn
            variant="text"
            color="primary"
            append-icon="mdi-arrow-right"
            @click.stop="openModal(service)"
          >
            {{ t('services.seeMore') }}
          </v-btn>
        </v-card>
      </v-col>
    </v-row>

    <!-- Modal -->
    <v-dialog v-model="dialog" max-width="500" persistent>
      <v-card rounded="lg">
        <v-card-title class="font-weight-bold text-h6 pa-4">
          {{ selected ? t(selected.titleKey) : '' }}
        </v-card-title>
        <v-divider />
        <v-card-text class="pa-4">
          <v-list density="compact" class="py-0">
            <v-list-item
              v-for="(item, index) in selected?.detailKeys"
              :key="index"
              class="px-0"
            >
              <template v-slot:prepend>
                <v-icon color="primary" size="small" class="me-2"
                  >mdi-check-circle</v-icon
                >
              </template>
              <span class="text-body-2">{{ t(item) }}</span>
            </v-list-item>
          </v-list>
        </v-card-text>
        <v-card-actions class="pa-4 pt-0">
          <v-spacer />
          <v-btn variant="text" color="primary" @click="dialog = false">
            {{ t('services.close') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const dialog = ref(false);
const selected = ref<null | {
  titleKey: string;
  detailKeys: string[];
}>(null);

const openModal = (service: typeof selected.value) => {
  selected.value = service;
  dialog.value = true;
};

const services = computed(() => [
  {
    icon: 'mdi-code-tags',
    titleKey: 'services.fullstack.title',
    summaryKey: 'services.fullstack.summary',
    detailKeys: [
      'services.fullstack.details.0',
      'services.fullstack.details.1',
      'services.fullstack.details.2',
    ],
  },
  {
    icon: 'mdi-briefcase',
    titleKey: 'services.business.title',
    summaryKey: 'services.business.summary',
    detailKeys: [
      'services.business.details.0',
      'services.business.details.1',
      'services.business.details.2',
    ],
  },
  {
    icon: 'mdi-palette',
    titleKey: 'services.design.title',
    summaryKey: 'services.design.summary',
    detailKeys: [
      'services.design.details.0',
      'services.design.details.1',
      'services.design.details.2',
    ],
  },
]);
</script>

<style scoped>
.service-card {
  border-radius: 12px;
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
}
.service-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12) !important;
}
.service-icon-wrap {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 72px;
  height: 72px;
  margin: 0 auto;
  border-radius: 50%;
  background: rgba(var(--v-theme-primary), 0.1);
}
</style>
