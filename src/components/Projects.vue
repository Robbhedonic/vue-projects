<template>
  <v-container id="proyects" class="py-16">
    <h2 class="text-h4 text-center font-weight-bold mb-2">{{ t('projectsPage.title') }}</h2>
    <p class="text-center text-subtitle-1 mb-10">
      {{ t('projectsPage.subtitle') }}
    </p>

    <v-row dense>
      <v-col
        v-for="(project, i) in projects"
        :key="i"
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
            <v-card-title class="text-white">{{ t(project.titleKey) }}</v-card-title>
          </v-img>

          <v-card-text class="pt-4">
            {{ t(project.descriptionKey) }}
          </v-card-text>

          <v-card-actions>
            <v-btn
              :href="project.link"
              target="_blank"
              rel="noopener"
              color="primary"
              variant="text"
            >
              {{ t('projectsPage.viewProject') }}
              <v-icon end>mdi-open-in-new</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const quizImg = new URL('../assets/img/quiz.jpeg', import.meta.url).href;
const pokemonImg = new URL('../assets/img/pokemon.jpeg', import.meta.url).href;
const firstWebsiteImg = new URL('../assets/img/f-w.jpeg', import.meta.url).href;

const projects = [
  {
    titleKey: 'portfolio.quiz.title',
    descriptionKey: 'portfolio.quiz.description',
    image: quizImg,
    link: 'https://robbhedonic.github.io/JavascriptQuiz1/',
  },
  {
    titleKey: 'portfolio.pokemon.title',
    descriptionKey: 'portfolio.pokemon.description',
    image: pokemonImg,
    link: 'https://robbhedonic.github.io/Pokemon-Application/',
  },
  {
    titleKey: 'portfolio.firstWebsite.title',
    descriptionKey: 'portfolio.firstWebsite.description',
    image: firstWebsiteImg,
    link: 'https://robbhedonic.github.io/index.html',
  },
];
</script>
