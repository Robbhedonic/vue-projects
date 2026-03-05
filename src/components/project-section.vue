<template>
  <v-container id="project" fluid class="py-16 project-bg text-white">
    <v-row class="d-flex align-center justify-center">
      <v-col cols="12" md="6" class="text-center">
        <h2 class="text-h4 font-weight-bold mb-2">{{ t('projectSection.title') }}</h2>
        <p class="text-subtitle-1 mb-6">
          {{ t('projectSection.subtitle') }}
        </p>

        <v-btn color="white" variant="outlined" href="#contact">
          {{ t('projectSection.contactMe') }}
          <v-icon end>mdi-message</v-icon>
        </v-btn>
      </v-col>

      <v-col cols="12" md="6" class="text-center">
        <v-img
          :src="projectImg"
          alt="Project Image"
          max-width="300"
          class="mx-auto"
          cover
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const projectImg = new URL('../assets/img/hidden.png', import.meta.url).href;
</script>

<style scoped>
.project-bg {
  background: linear-gradient(135deg, #3f51b5, #1e88e5);
  border-radius: 12px;
}
</style>