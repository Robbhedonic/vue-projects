<template>
  <v-container id="project" fluid class="py-16 project-bg text-white">
    <v-row class="d-flex align-center justify-center">
      <v-col cols="12" md="6" class="text-center">
        <h2 class="text-h4 font-weight-bold mb-2">You have a new project</h2>
        <p class="text-subtitle-1 mb-6">
          Contact me now and get a free consult.
        </p>
        <v-btn color="white" variant="outlined" href="#contact">
          Contact Me
          <v-icon end>mdi-message</v-icon>
        </v-btn>
      </v-col>
      <v-col cols="12" md="6" class="text-center">
        <v-img
          src="/src/assets/img/hidden.png"
          alt="Project Image"
          max-width="300"
          class="mx-auto"
        ></v-img>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.project-bg {
  background: linear-gradient(135deg, #3f51b5, #1e88e5);
  border-radius: 12px;
}
</style>
