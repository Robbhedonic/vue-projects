<template>
  <v-app :style="appStyle">
    <NavBar />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import { onMounted, computed } from 'vue';
import NavBar from './components/NavBar.vue';
import { useUserSettings } from '@/composables/useUserSettings';

const { loadSettings, settings } = useUserSettings();

const appStyle = computed(() => {
  const c = settings.value.backgroundColor;
  if (!c) return {};
  return { backgroundColor: c };
});

onMounted(() => {
  if (localStorage.getItem('auth-token')) {
    loadSettings();
  }
});
</script>
