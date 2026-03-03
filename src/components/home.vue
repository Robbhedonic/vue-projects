<template>
  <v-container id="home" class="py-16">
    <v-row class="text-center" align="center" justify="center">
      <v-col cols="12" md="6">
        <div class="d-flex flex-column align-center">
          <h1 class="text-h3 font-weight-bold mb-2">Hi, I'm Roberto</h1>
          <h3 class="text-h5 mb-4">A passionate Frontend Developer</h3>
          <p class="mb-6">
            I’m a motivated student currently seeking an internship opportunity
            to apply my skills and continue learning in a dynamic environment.
          </p>
          <v-btn href="#contact" color="primary" variant="flat">
            Contact Me
            <v-icon end>mdi-email</v-icon>
          </v-btn>
        </div>
      </v-col>
      <v-col cols="12" md="6" class="d-flex justify-center">
        <v-img
          src="/src/assets/img/profile1.png"
          alt="Profile"
          max-width="300"
          class="rounded-circle"
        ></v-img>
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
  </v-container>
</template>

<script lang="ts" setup>
const socialLinks = [
  {
    icon: 'mdi-linkedin',
    url: 'https://www.linkedin.com/in/roberto-carcamo-colivoro-0344b118a/',
  },
  { icon: 'mdi-instagram', url: 'https://www.instagram.com/' },
  { icon: 'mdi-github', url: 'https://github.com/Robbhedonic' },
];
</script>

<style scoped>
.rounded-circle {
  border-radius: 50%;
}
</style>
