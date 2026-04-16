<template>
  <v-container id="portfolio" class="py-16">
    <h2 class="text-h4 text-center font-weight-bold mb-2">
      {{ t('portfolio.title') }}
    </h2>
    <p class="text-center text-subtitle-1 mb-10">
      {{ t('portfolio.subtitle') }}
    </p>

    <div class="portfolio-marquee">
      <div class="marquee-track">
        <article
          v-for="(project, index) in loopedProjects"
          :key="`${project.titleKey}-${index}`"
          class="project-card"
          :style="{ backgroundImage: `url(${project.image})` }"
        >
          <div class="overlay" />
          <div class="card-content">
            <h3 class="card-title">{{ t(project.titleKey) }}</h3>
            <p class="card-description">{{ t(project.descriptionKey) }}</p>
            <v-btn
              :href="project.link"
              target="_blank"
              rel="noopener"
              color="primary"
              variant="flat"
              class="mt-4"
            >
              {{ t('portfolio.viewProject') }}
              <v-icon end>mdi-open-in-new</v-icon>
            </v-btn>
          </div>
        </article>
      </div>
    </div>
  </v-container>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
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
  },
  {
    titleKey: 'portfolio.pokemon.title',
    descriptionKey: 'portfolio.pokemon.description',
    image: pokemonImg,
    link: 'https://robbhedonic.github.io/Pokemon-Application-Game-JS/',
  },
  {
    titleKey: 'portfolio.firstWebsite.title',
    descriptionKey: 'portfolio.firstWebsite.description',
    image: firstWebsiteImg,
    link: 'https://robbhedonic.github.io/First-Website-JS/',
  },
  {
    titleKey: 'portfolio.films.title',
    descriptionKey: 'portfolio.films.description',
    image: filmsHouseImg,
    link: 'https://movie-star-react.vercel.app/',
  },
  {
    titleKey: 'portfolio.calorie.title',
    descriptionKey: 'portfolio.calorie.description',
    image: calorieImg,
    link: 'https://calorie-calculator-indol.vercel.app/',
  },
  {
    titleKey: 'portfolio.employeeScheduling.title',
    descriptionKey: 'portfolio.employeeScheduling.description',
    image: employeeImg,
    link: 'https://employee-scheduling-delta.vercel.app/login',
  },
  {
    titleKey: 'portfolio.weatherApp.title',
    descriptionKey: 'portfolio.weatherApp.description',
    image: weatherImg,
    link: 'https://robbhedonic.github.io/Weather-App.Vue.js/',
  },
];

const loopedProjects = computed(() => [...projects, ...projects]);
</script>

<style scoped>
.portfolio-marquee {
  position: relative;
  width: 100%;
  overflow: hidden;
  padding: 10px 2px;
  background: rgb(var(--v-theme-background));
}

.marquee-track {
  display: flex;
  gap: 20px;
  width: max-content;
  animation: scroll-right 36s linear infinite;
}

.portfolio-marquee:hover .marquee-track {
  animation-play-state: paused;
}

.project-card {
  position: relative;
  width: min(88vw, 500px);
  height: 350px;
  border-radius: 10px;
  overflow: hidden;
  background-size: cover;
  background-position: center;
  flex: 0 0 auto;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.28);
}

.overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.98) 0%,
    rgba(0, 0, 0, 0.9) 5%,
    rgba(0, 0, 0, 0.8) 10%,
    rgba(0, 0, 0, 0.7) 15%,
    rgba(0, 0, 0, 0.6) 20%,
    rgba(0, 0, 0, 0.5) 40%,
    rgba(0, 0, 0, 0.4) 60%,
    rgba(0, 0, 0, 0.3) 80%,
    rgba(0, 0, 0, 0.15) 90%,
    rgba(0, 0, 0, 0) 100%
  );
}

.card-content {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  padding: 24px;
  color: white;
}

.card-title {
  font-size: 1.45rem;
  font-weight: 700;
  margin-bottom: 10px;
}

.card-description {
  font-size: 0.95rem;
  line-height: 1.5;
  max-width: 95%;
}

@keyframes scroll-right {
  0% {
    transform: translateX(-50%);
  }
  100% {
    transform: translateX(0);
  }
}

@media (max-width: 960px) {
  .project-card {
    width: min(92vw, 420px);
    height: 300px;
  }

  .marquee-track {
    animation-duration: 30s;
  }

  .card-title {
    font-size: 1.3rem;
  }

  .card-description {
    font-size: 0.95rem;
  }
}

@media (max-width: 600px) {
  .project-card {
    width: 88vw;
    height: 260px;
  }

  .card-content {
    padding: 20px;
  }

  .card-title {
    font-size: 1.1rem;
  }

  .card-description {
    font-size: 0.85rem;
  }

  .marquee-track {
    animation-duration: 26s;
  }
}
</style>
