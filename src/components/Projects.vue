<template>
  <v-container id="proyects" class="py-16">
    <h2 class="text-h4 text-center font-weight-bold mb-2">Projects</h2>
    <p class="text-center text-subtitle-1 mb-10">
      Proyectos destacados y trabajos recientes
    </p>

    <v-row dense>
      <v-col
        v-for="project in projects"
        :key="project.title"
        cols="12"
        sm="6"
        md="4"
      >
        <v-card class="h-100" elevation="2">
          <v-img
            :src="project.image"
            height="200"
            cover
            class="align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
          >
            <v-card-title class="text-white">{{ project.title }}</v-card-title>
          </v-img>

          <v-card-text class="pt-4">
            {{ project.description }}
          </v-card-text>

          <v-card-actions>
            <v-btn
              :href="project.link"
              target="_blank"
              rel="noopener"
              color="primary"
              variant="text"
            >
              Ver proyecto
              <v-icon end>mdi-open-in-new</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
const quizImg = new URL('../assets/img/quiz.jpeg', import.meta.url).href;
const pokemonImg = new URL('../assets/img/pokemon.jpeg', import.meta.url).href;
const firstWebsiteImg = new URL('../assets/img/f-w.jpeg', import.meta.url).href;

const projects = [
  {
    title: 'Quiz App',
    description:
      'Aplicación de quiz responsive con componentes de UI e interacciones animadas.',
    image: quizImg,
    link: 'https://robbhedonic.github.io/JavascriptQuiz1/',
  },
  {
    title: 'Pokémon App',
    description:
      'App interactiva con información de Pokémon e integración de API.',
    image: pokemonImg,
    link: 'https://robbhedonic.github.io/Pokemon-Application/',
  },
  {
    title: 'First Website',
    description:
      'Mi primer sitio web responsive con animaciones y maquetación.',
    image: firstWebsiteImg,
    link: 'https://robbhedonic.github.io/index.html',
  },
];
</script>
