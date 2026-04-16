<template>
  <v-container id="proyects" class="py-16">
    <h2 class="text-h4 text-center font-weight-bold mb-2">
      {{ t('projectsPage.title') }}
    </h2>
    <p class="text-center text-subtitle-1 mb-10">
      {{ t('projectsPage.subtitle') }}
    </p>

    <v-row dense>
      <v-col v-for="(project, i) in projects" :key="i" cols="12" sm="6" md="4">
        <v-card class="h-100" elevation="2">
          <v-img
            :src="project.image"
            height="200"
            cover
            class="align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
          >
            <v-card-title class="text-white">{{
              t(project.titleKey)
            }}</v-card-title>
          </v-img>

          <v-card-text class="pt-4">
            <p class="mb-3">{{ t(project.descriptionKey) }}</p>
            <p class="text-caption text-medium-emphasis mb-2">
              {{ t('projectsPage.technologies') }}
            </p>
            <div class="d-flex flex-wrap gap-1">
              <v-chip
                v-for="tech in project.tech"
                :key="tech"
                size="small"
                color="primary"
                variant="tonal"
                >{{ tech }}</v-chip
              >
            </div>
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
const filmsHouseImg = new URL('../assets/img/films-house.jpeg', import.meta.url)
  .href;
const calorieImg = new URL(
  '../assets/img/calorie-calculator.jpeg',
  import.meta.url,
).href;
const employeeImg = new URL(
  '../assets/img/employee-scheduling.jpeg',
  import.meta.url,
).href;

const weatherImg = new URL('../assets/img/weather-app.jpeg', import.meta.url)
  .href;
const projects = [
  {
    titleKey: 'portfolio.quiz.title',
    descriptionKey: 'portfolio.quiz.description',
    image: quizImg,

    link: 'https://robbhedonic.github.io/JavascriptQuiz/',
    tech: ['JavaScript', 'HTML', 'CSS'],
  },
  {
    titleKey: 'portfolio.pokemon.title',
    descriptionKey: 'portfolio.pokemon.description',
    image: pokemonImg,
    link: 'https://robbhedonic.github.io/Pokemon-Application-Game-JS/',
    tech: ['JavaScript', 'REST API', 'HTML', 'CSS'],
  },
  {
    titleKey: 'portfolio.firstWebsite.title',
    descriptionKey: 'portfolio.firstWebsite.description',
    image: firstWebsiteImg,
    link: 'https://robbhedonic.github.io/index.html',
    tech: ['HTML', 'CSS', 'JavaScript'],
  },
  {
    titleKey: 'portfolio.films.title',
    descriptionKey: 'portfolio.films.description',
    image: filmsHouseImg,
    link: 'https://movie-star-react.vercel.app/',
    tech: ['React', 'TypeScript', 'REST API'],
  },
  {
    titleKey: 'portfolio.calorie.title',
    descriptionKey: 'portfolio.calorie.description',
    image: calorieImg,
    link: 'https://calorie-calculator-indol.vercel.app/',
    tech: ['React Native', 'TypeScript'],
  },
  {
    titleKey: 'portfolio.employeeScheduling.title',
    descriptionKey: 'portfolio.employeeScheduling.description',
    image: employeeImg,
    link: 'https://employee-scheduling-delta.vercel.app/login',
    tech: ['Angular', 'TypeScript', 'SQL'],
  },
  {
    titleKey: 'portfolio.weatherApp.title',
    descriptionKey: 'portfolio.weatherApp.description',
    image: weatherImg,
    link: 'https://robbhedonic.github.io/Weather-App.Vue.js/',
    tech: ['Vue', 'TypeScript', 'Javascript'],
  },
];
</script>
