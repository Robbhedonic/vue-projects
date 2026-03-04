<template>
  <v-app-bar flat dark class="nav-bar" color="primary">
    <v-container>
      <v-row align="center" justify="space-between" no-gutters>
        <!-- Logo -->
        <v-col cols="auto">
          <v-img
            :src="logoImg"
            alt="Logo"
            height="50"
            width="50"
            class="logo"
          />
        </v-col>

        <!-- Desktop Nav -->
        <v-col cols="auto" class="d-none d-md-flex">
          <v-btn
            v-for="link in navLinks"
            :key="link.id"
            variant="text"
            class="text-white"
            :to="link.to"
            :href="link.href"
            :target="link.external ? '_blank' : undefined"
            rel="noopener"
          >
            <v-icon start>{{ link.icon }}</v-icon>
            {{ link.label }}
          </v-btn>
        </v-col>

        <!-- Theme + Burger icon -->
        <v-col cols="auto" class="d-flex align-center">
          <v-btn icon @click="toggleTheme" class="me-2">
            <v-icon>{{
              isDark ? 'mdi-white-balance-sunny' : 'mdi-moon-waning-crescent'
            }}</v-icon>
          </v-btn>

          <!-- Burger icon visible only on small screens -->
          <v-btn icon class="d-md-none" @click="drawer = true">
            <v-icon>mdi-menu</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>

  <!-- Mobile Menu -->
  <v-navigation-drawer
    v-model="drawer"
    temporary
    location="right"
    class="d-md-none"
  >
    <v-list nav dense>
      <v-list-item
        v-for="link in navLinks"
        :key="link.id"
        :to="link.to"
        :href="link.href"
        @click="drawer = false"
        :target="link.external ? '_blank' : undefined"
        rel="noopener"
      >
        <v-icon start class="me-2">{{ link.icon }}</v-icon>
        <v-list-item-title>{{ link.label }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useTheme } from 'vuetify';

const logoImg = new URL('../assets/img/logo.jpeg', import.meta.url).href;
const cvPdfUrl = new URL(
  '../assets/pdf/Roberto-Carcamo-CV.pdf',
  import.meta.url,
).href;

const drawer = ref(false);
const { global: theme } = useTheme();
const isDark = ref(theme.name.value === 'dark');

const toggleTheme = () => {
  theme.name.value = isDark.value ? 'light' : 'dark';
  isDark.value = !isDark.value;
};

const navLinks = [
  { id: 1, label: 'Home', to: '/', icon: 'mdi-home' },
  { id: 2, label: 'About', to: { path: '/', hash: '#about' }, icon: 'mdi-account' },
  { id: 3, label: 'Skills', to: { path: '/', hash: '#skills' }, icon: 'mdi-code-tags' },
  { id: 4, label: 'Services', to: { path: '/', hash: '#services' }, icon: 'mdi-briefcase' },
  { id: 5, label: 'Portfolio', to: { path: '/', hash: '#portfolio' }, icon: 'mdi-image' },
  { id: 6, label: 'Projects', to: '/projects', icon: 'mdi-laptop' },
  { id: 7, label: 'Contact', to: { path: '/', hash: '#contact' }, icon: 'mdi-email' },
  {
    id: 8,
    label: 'CV',
    href: cvPdfUrl,
    icon: 'mdi-file-pdf',
    external: true,
  },
];
</script>

<style scoped>
.nav-bar {
  background: linear-gradient(135deg, #3f51b5, #1e88e5);
  border-radius: 0 0 12px 12px;
  color: white;
}
.logo {
  border-radius: 12px;
}
</style>
