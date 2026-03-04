<template>
  <v-container id="home" class="py-16">
    <v-row class="text-center" align="center" justify="center">
      <v-col cols="12" md="6">
        <div class="d-flex flex-column align-center">
          <h1 class="text-h2 font-weight-bold mb-2">
            Hi, I am Roberto Carcamo
          </h1>
          <h3 class="text-h2 font-weight-bold mb-4 text-grey-darken-1">
            Fullstack Developer
          </h3>
          <p class="mb-6">
            I’m a motivated worker currently seeking an opportunity to apply my
            skills and continue learning in a dynamic environment.
          </p>

          <v-btn href="#contact" color="primary" variant="flat">
            Contact Me
            <v-icon end>mdi-email</v-icon>
          </v-btn>
        </div>
      </v-col>

      <v-col cols="12" md="6" class="d-flex justify-center">
        <!--Imagen corregida para Vite -->
        <v-img
          :src="profileImg"
          alt="Profile"
          max-height="420"
          max-width="400"
          class="rounded-circle"
          cover
        />
      </v-col>
    </v-row>

    <v-row justify="center" class="mt-10">
      <v-btn
        v-for="link in socialLinks"
        :key="link.icon"
        :href="link.url"
        target="_blank"
        icon
        variant="text"
        size="large"
      >
        <v-icon>{{ link.icon }}</v-icon>
      </v-btn>
    </v-row>

    <!-- City Illustration -->
    <v-row justify="center" class="mt-16">
      <v-col cols="12" class="d-flex justify-center">
        <div class="illustration-box">
          <h3 class="text-h6 mb-3 text-center">
            City Illustration — Dreams State
          </h3>
          <iframe
            :src="cityIllustrationUrl"
            title="City Illustration - Empire State"
            class="illustration-iframe"
          />
          <v-btn
            :href="cityIllustrationUrl"
            target="_blank"
            rel="noopener"
            color="primary"
            variant="text"
            size="small"
            class="mt-2"
          >
            Abrir en nueva pestaña
            <v-icon end>mdi-open-in-new</v-icon>
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
const profileImg = new URL(
  '../assets/img/Roberto-portrait.jpg',
  import.meta.url,
).href;

const cityIllustrationUrl = 'https://robbhedonic.github.io/city-Illustration/';

const socialLinks = [
  {
    icon: 'mdi-linkedin',
    url: 'https://www.linkedin.com/in/roberto-carcamo-colivoro-0344b118a/',
  },
  {
    icon: 'mdi-instagram',
    url: 'https://www.instagram.com/',
  },
  {
    icon: 'mdi-github',
    url: 'https://github.com/Robbhedonic',
  },
];
</script>

<style scoped>
.rounded-circle {
  border-radius: 50%;
}

.illustration-box {
  border: none;
  border-radius: 16px;
  overflow: hidden;
  padding: 1rem;
  max-width: 1200px;
  width: 100%;
  background: rgb(var(--v-theme-surface));
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow:
    0 20px 40px rgba(0, 0, 0, 0.12),
    0 8px 16px rgba(0, 0, 0, 0.08),
    0 2px 4px rgba(0, 0, 0, 0.04);
}

.illustration-iframe {
  width: 100%;
  min-height: 500px;
  height: 70vh;
  border: none;
  border-radius: 12px;
}
</style>
