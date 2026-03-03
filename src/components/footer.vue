<template>
  <v-footer color="primary" padless>
    <v-container class="text-center py-6 text-white">
      <v-row justify="center" class="mb-4">
        <v-col cols="12">
          <v-avatar size="80" class="mb-2">
            <v-img :src="logoImg" alt="logo" />
          </v-avatar>
          <div class="font-weight-bold text-h6">New Thinking Technology</div>
          <div class="text-subtitle-2">Roberto C.C. — Frontend Developer</div>
        </v-col>
      </v-row>

      <v-row justify="center" class="mb-4">
        <v-btn
          v-for="social in socialLinks"
          :key="social.icon"
          :href="social.url"
          target="_blank"
          icon
          class="mx-2"
          variant="text"
          color="white"
        >
          <v-icon>{{ social.icon }}</v-icon>
        </v-btn>
      </v-row>

      <div class="text-caption">
        &copy; {{ new Date().getFullYear() }} R.C.C. — All rights reserved
      </div>
    </v-container>
  </v-footer>
</template>

<script lang="ts" setup>
const logoImg = new URL('../assets/img/logo.jpeg', import.meta.url).href;

const socialLinks = [
  {
    icon: 'mdi-linkedin',
    url: 'https://www.linkedin.com/in/roberto-carcamo-colivoro-0344b118a/',
  },
  { icon: 'mdi-github', url: 'https://github.com/Robbhedonic' },
  { icon: 'mdi-instagram', url: 'https://www.instagram.com/' },
];
</script>
