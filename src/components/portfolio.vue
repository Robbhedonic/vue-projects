<template>
  <v-container id="portfolio" class="py-16">
    <h2 class="text-h4 text-center font-weight-bold mb-4">Portfolio</h2>
    <p class="text-center text-subtitle-1 mb-10">Most recent work</p>

    <v-row dense>
      <v-col
        cols="12"
        sm="6"
        md="4"
        v-for="project in projects"
        :key="project.title"
      >
        <v-card>
          <v-img :src="project.image" height="200px" cover></v-img>

          <v-card-title class="font-weight-bold">{{
            project.title
          }}</v-card-title>
          <v-card-text>{{ project.description }}</v-card-text>

          <v-card-actions>
            <v-btn
              :href="project.link"
              target="_blank"
              color="primary"
              variant="text"
            >
              Demo
              <v-icon end>mdi-arrow-right</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
const projects = [
  {
    title: 'Quiz App',
    description:
      'Responsive quiz app with UI components and animated interactions.',
    image: '/src/assets/img/quiz.jpeg',
    link: 'https://robbhedonic.github.io/JavascriptQuiz1/',
  },
  {
    title: 'Pokémon App',
    description: 'Interactive app with Pokémon info and API integration.',
    image: '/src/assets/img/pokemon.jpeg',
    link: 'https://robbhedonic.github.io/Pokemon-Application/',
  },
  {
    title: 'First Website',
    description:
      'My first responsive website with animations and layout skills.',
    image: '/src/assets/img/f-w.jpeg',
    link: 'https://robbhedonic.github.io/index.html',
  },
];
</script>
