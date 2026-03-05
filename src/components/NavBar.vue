<template>
  <v-app-bar flat dark class="nav-bar" color="primary">
    <v-container>
      <v-row align="center" justify="space-between" no-gutters>
        <!-- Logo: never shrink -->
        <v-col cols="auto" class="nav-logo-col">
          <v-img
            :src="logoImg"
            alt="Logo"
            height="50"
            width="50"
            class="logo"
          />
        </v-col>

        <!-- Desktop Nav: from lg (1280px) to avoid overflow at 960–1279px -->
        <v-col cols="auto" class="d-none d-lg-flex flex-nowrap nav-links-col">
          <v-btn
            v-for="link in navLinks"
            :key="link.id"
            variant="text"
            :class="['nav-link', { 'nav-link--active': isActive(link) }]"
            :to="link.to"
            :href="link.href"
            :target="link.external ? '_blank' : undefined"
            rel="noopener"
          >
            <v-icon start>{{ link.icon }}</v-icon>
            {{ t(link.labelKey) }}
          </v-btn>
          <template v-if="!isLoggedIn">
            <v-btn variant="text" class="nav-link" to="/login">
              <v-icon start>mdi-login</v-icon>
              {{ t('nav.login') }}
            </v-btn>
          </template>
          <template v-else>
            <v-btn variant="text" class="nav-link" :class="{ 'nav-link--active': isDashboard }" to="/dashboard">
              <v-icon start>mdi-view-dashboard</v-icon>
              {{ t('nav.dashboard') }}
            </v-btn>
            <v-btn variant="text" class="nav-link" @click="doLogout">
              <v-icon start>mdi-logout</v-icon>
              {{ t('nav.logout') }}
            </v-btn>
          </template>
        </v-col>

        <!-- Language + Theme + Burger: never shrink so they stay inside the bar -->
        <v-col cols="auto" class="d-flex align-center nav-actions-col">
          <v-menu location="bottom">
            <template #activator="{ props }">
              <v-btn icon v-bind="props" class="me-1" :title="t('nav.language')">
                <v-icon>mdi-translate</v-icon>
              </v-btn>
            </template>
            <v-list density="compact">
              <v-list-item
                v-for="lang in languages"
                :key="lang.code"
                :active="locale === lang.code"
                @click="locale = lang.code"
              >
                <v-list-item-title>{{ lang.name }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          <v-btn icon @click="toggleTheme" class="me-2">
            <v-icon>{{
              isDark ? 'mdi-white-balance-sunny' : 'mdi-moon-waning-crescent'
            }}</v-icon>
          </v-btn>

          <!-- Burger: visible when nav doesn't fit (below lg) -->
          <v-btn icon class="d-lg-none" @click="drawer = true">
            <v-icon>mdi-menu</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>

  <!-- Mobile Menu: same blue as navbar, white icons -->
  <v-navigation-drawer
    v-model="drawer"
    temporary
    location="right"
    class="d-lg-none nav-drawer"
  >
    <v-list nav dense>
      <v-list-item
        v-for="link in navLinks"
        :key="link.id"
        :to="link.to"
        :href="link.href"
        :class="{ 'nav-link-drawer--active': isActive(link) }"
        @click="drawer = false"
        :target="link.external ? '_blank' : undefined"
        rel="noopener"
      >
        <v-icon start class="me-2">{{ link.icon }}</v-icon>
        <v-list-item-title>{{ t(link.labelKey) }}</v-list-item-title>
      </v-list-item>
      <template v-if="!isLoggedIn">
        <v-list-item to="/login" @click="drawer = false">
          <v-icon start class="me-2">mdi-login</v-icon>
          <v-list-item-title>{{ t('nav.login') }}</v-list-item-title>
        </v-list-item>
      </template>
      <template v-else>
        <v-list-item to="/dashboard" @click="drawer = false">
          <v-icon start class="me-2">mdi-view-dashboard</v-icon>
          <v-list-item-title>{{ t('nav.dashboard') }}</v-list-item-title>
        </v-list-item>
        <v-list-item @click="doLogout(); drawer = false">
          <v-icon start class="me-2">mdi-logout</v-icon>
          <v-list-item-title>{{ t('nav.logout') }}</v-list-item-title>
        </v-list-item>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, watch, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useTheme } from 'vuetify';
import { useI18n } from 'vue-i18n';
import { useAuth } from '@/composables/useAuth';

const { t, locale } = useI18n();
const route = useRoute();
const router = useRouter();
const { isLoggedIn, logout } = useAuth();

function doLogout() {
  logout();
  router.push('/');
}
const isDashboard = computed(() => route.path === '/dashboard');

// Persist locale in localStorage
const LOCALE_KEY = 'app-locale';
const VALID_LOCALES = ['en', 'es', 'sv', 'zh', 'ar', 'de', 'hi', 'pt', 'no', 'da', 'fi', 'fr', 'ti', 'sw', 'ja', 'ko', 'id', 'arn', 'ru', 'ur', 'uk', 'bn'];
const savedLocale = localStorage.getItem(LOCALE_KEY);
if (savedLocale && VALID_LOCALES.includes(savedLocale)) {
  locale.value = savedLocale;
}
watch(locale, (newLocale) => {
  localStorage.setItem(LOCALE_KEY, newLocale);
});

const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'sv', name: 'Svenska' },
  { code: 'zh', name: '中文' },
  { code: 'ar', name: 'العربية' },
  { code: 'de', name: 'Deutsch' },
  { code: 'hi', name: 'हिन्दी' },
  { code: 'pt', name: 'Português' },
  { code: 'no', name: 'Norsk' },
  { code: 'da', name: 'Dansk' },
  { code: 'fi', name: 'Suomi' },
  { code: 'fr', name: 'Français' },
  { code: 'ti', name: 'ትግርኛ' },
  { code: 'sw', name: 'Kiswahili' },
  { code: 'ja', name: '日本語' },
  { code: 'ko', name: '한국어' },
  { code: 'id', name: 'Bahasa Indonesia' },
  { code: 'arn', name: 'Mapudungun' },
  { code: 'ru', name: 'Русский' },
  { code: 'ur', name: 'اردو' },
  { code: 'uk', name: 'Українська' },
  { code: 'bn', name: 'বাংলা' },
];
const logoImg = new URL('../assets/img/logo.jpeg', import.meta.url).href;
const cvPdfUrl = new URL(
  '../assets/pdf/Roberto-Carcamo-CV.pdf',
  import.meta.url,
).href;

const drawer = ref(false);
const { global: theme } = useTheme();
const isDark = ref(theme.name.value === 'dark');

/** Id of the section currently visible on screen (without #). Only on / route. */
const visibleSectionId = ref<string | null>(null);
const SECTION_IDS = ['home', 'about', 'skills', 'services', 'portfolio', 'contact'];
let observer: IntersectionObserver | null = null;

function startSectionObserver() {
  const ratios = new Map<string, number>();
  const updateActive = () => {
    let maxId: string | null = null;
    let maxRatio = 0;
    ratios.forEach((ratio, id) => {
      if (ratio > maxRatio) {
        maxRatio = ratio;
        maxId = id;
      }
    });
    visibleSectionId.value = maxRatio >= 0.1 ? maxId : (ratios.size ? SECTION_IDS[0] : null);
  };

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const id = (entry.target as HTMLElement).id;
        if (id) ratios.set(id, entry.intersectionRatio);
      }
      updateActive();
    },
    { root: null, rootMargin: '-10% 0px -50% 0px', threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] }
  );

  for (const id of SECTION_IDS) {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  }
}

function stopSectionObserver() {
  if (observer) {
    observer.disconnect();
    observer = null;
  }
  visibleSectionId.value = null;
}

onMounted(() => {
  if (route.path === '/') {
    setTimeout(startSectionObserver, 100);
  }
});

onUnmounted(stopSectionObserver);

watch(
  () => route.path,
  () => {
    stopSectionObserver();
    if (route.path === '/') setTimeout(startSectionObserver, 100);
  }
);

const toggleTheme = () => {
  theme.name.value = isDark.value ? 'light' : 'dark';
  isDark.value = !isDark.value;
};

function isActive(link: {
  to?: string | { path: string; hash?: string };
  href?: string;
}) {
  if (link.href) return false;
  const to = link.to;
  if (typeof to === 'string') {
    if (to === '/projects') return route.path === '/projects';
    if (to === '/') return route.path === '/' && (visibleSectionId.value === 'home' || visibleSectionId.value === null);
    return route.path === to;
  }
  if (to && typeof to === 'object' && 'path' in to) {
    if (to.path !== route.path) return false;
    if (to.hash) {
      const hashId = to.hash.slice(1);
      return visibleSectionId.value === hashId;
    }
    return false;
  }
  return false;
}

const navLinks = [
  { id: 1, labelKey: 'nav.home', to: '/', icon: 'mdi-home' },
  { id: 2, labelKey: 'nav.about', to: { path: '/', hash: '#about' }, icon: 'mdi-account' },
  { id: 3, labelKey: 'nav.skills', to: { path: '/', hash: '#skills' }, icon: 'mdi-code-tags' },
  { id: 4, labelKey: 'nav.services', to: { path: '/', hash: '#services' }, icon: 'mdi-briefcase' },
  { id: 5, labelKey: 'nav.portfolio', to: { path: '/', hash: '#portfolio' }, icon: 'mdi-image' },
  { id: 6, labelKey: 'nav.projects', to: '/projects', icon: 'mdi-laptop' },
  { id: 7, labelKey: 'nav.contact', to: { path: '/', hash: '#contact' }, icon: 'mdi-email' },
  { id: 8, labelKey: 'nav.cv', href: cvPdfUrl, icon: 'mdi-file-pdf', external: true },
];
</script>

<style scoped>
.nav-bar {
  background: linear-gradient(135deg, #3f51b5, #1e88e5) !important;
  border-radius: 0 0 12px 12px;
  color: white;
  overflow: hidden;
}
.nav-bar :deep(.v-icon),
.nav-bar :deep(.v-btn .v-icon) {
  color: #fff !important;
}
.nav-bar :deep(.v-btn) {
  color: #fff !important;
}
.nav-links-col {
  min-width: 0;
  flex-shrink: 1;
}
.nav-logo-col {
  flex-shrink: 0;
}
.nav-actions-col {
  flex-shrink: 0;
}
.nav-bar :deep(.v-toolbar__content),
.nav-bar :deep(.v-container) {
  flex-wrap: nowrap;
  min-width: 0;
}
.nav-bar :deep(.v-row) {
  min-width: 0;
  flex-wrap: nowrap;
}
.logo {
  border-radius: 12px;
}

/* Links with no background: text only on the bar */
.nav-bar .v-btn.nav-link {
  color: rgba(255, 255, 255, 0.95) !important;
  background: none !important;
  background-color: transparent !important;
  box-shadow: none !important;
}
.nav-bar .v-btn.nav-link :deep(.v-btn__overlay) {
  background: transparent !important;
}
.nav-bar .v-btn.nav-link :deep(.v-btn__content),
.nav-bar .v-btn.nav-link :deep(.v-icon) {
  color: inherit !important;
}
/* Active: color/font change only, no background */
.nav-bar .v-btn.nav-link.nav-link--active {
  color: #fff !important;
  font-weight: 600;
  background: none !important;
  box-shadow: none !important;
}
.nav-bar .v-btn.nav-link.nav-link--active :deep(.v-btn__content),
.nav-bar .v-btn.nav-link.nav-link--active :deep(.v-icon) {
  color: #fff !important;
}
/* Hover: color only, no background */
.nav-bar .v-btn.nav-link:hover {
  background: none !important;
  box-shadow: none !important;
}
.nav-bar .v-btn.nav-link:hover,
.nav-bar .v-btn.nav-link:hover :deep(.v-btn__content),
.nav-bar .v-btn.nav-link:hover :deep(.v-icon) {
  color: #fff !important;
}

/* Mobile drawer: same blue as navbar, white icons and text */
.nav-drawer :deep(.v-overlay__content),
.nav-drawer :deep(.v-navigation-drawer__content),
.nav-drawer :deep(.v-list) {
  background: #1976d2 !important;
}
.nav-drawer :deep(.v-list-item),
.nav-drawer :deep(.v-list-item-title),
.nav-drawer :deep(.v-icon) {
  color: #fff !important;
}
.nav-drawer .nav-link-drawer--active {
  background: rgba(255, 255, 255, 0.15) !important;
  font-weight: 600;
}
</style>
