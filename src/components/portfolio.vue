<template>
  <v-container id="portfolio" class="py-16">
    <h2 class="text-h4 text-center font-weight-bold mb-2">
      {{ t('portfolio.title') }}
    </h2>
    <p class="text-center text-subtitle-1 mb-10">
      {{ t('portfolio.subtitle') }}
    </p>

    <div class="portfolio-carousel" @mouseleave="stopAutoSlide">
      <div class="carousel-track">
        <div
          v-for="item in visibleProjects"
          :key="item.position + item.project.titleKey"
          class="carousel-slide"
          :class="item.position"
          :style="{ backgroundImage: `url(${item.project.image})` }"
          @mouseenter="handleSlideEnter(item.position)"
          @click="setActive(item.realIndex)"
        >
          <div class="overlay" />

          <div class="slide-content">
            <h3 class="slide-title">
              {{ t(item.project.titleKey) }}
            </h3>

            <p class="slide-description" v-if="item.position === 'center'">
              {{ t(item.project.descriptionKey) }}
            </p>

            <v-btn
              v-if="item.position === 'center'"
              :href="item.project.link"
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
        </div>
      </div>

      <div class="carousel-indicators">
        <span
          v-for="(project, index) in projects"
          :key="project.titleKey"
          class="indicator"
          :class="{ active: index === activeIndex }"
          @click="setActive(index)"
        />
      </div>
    </div>
  </v-container>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const quizImg = new URL('../assets/img/quiz.jpeg', import.meta.url).href;
const pokemonImg = new URL('../assets/img/pokemon.jpeg', import.meta.url).href;
const firstWebsiteImg = new URL('../assets/img/f-w.jpeg', import.meta.url).href;
const filmsHouseImg = new URL('../assets/img/films-house.jpeg', import.meta.url)
  .href;

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
  {
    titleKey: 'portfolio.films.title',
    descriptionKey: 'portfolio.films.description',
    image: filmsHouseImg,
    link: 'https://films-house.vercel.app/',
  },
];

const activeIndex = ref(0);
const isAnimating = ref(false);

const getWrappedIndex = (index: number) => {
  const total = projects.length;
  return (index + total) % total;
};

const setActive = (index: number) => {
  if (isAnimating.value || index === activeIndex.value) return;

  isAnimating.value = true;
  activeIndex.value = index;

  setTimeout(() => {
    isAnimating.value = false;
  }, 900);
};

const hoverInterval = ref<number | null>(null);
const hoverDirection = ref<'left' | 'right' | null>(null);
const handleSlideEnter = (position: string) => {
  if (position === 'center') {
    stopAutoSlide();
    return;
  }

  hoverDirection.value = position as 'left' | 'right';

  if (!hoverInterval.value) {
    hoverInterval.value = window.setInterval(() => {
      if (hoverDirection.value === 'left') {
        activeIndex.value = getWrappedIndex(activeIndex.value - 1);
      }

      if (hoverDirection.value === 'right') {
        activeIndex.value = getWrappedIndex(activeIndex.value + 1);
      }
    }, 1400);
  }
};
const stopAutoSlide = () => {
  if (hoverInterval.value) {
    clearInterval(hoverInterval.value);
    hoverInterval.value = null;
  }

  hoverDirection.value = null;
};

const visibleProjects = computed(() => {
  const leftIndex = getWrappedIndex(activeIndex.value - 1);
  const centerIndex = activeIndex.value;
  const rightIndex = getWrappedIndex(activeIndex.value + 1);

  return [
    {
      position: 'left',
      project: projects[leftIndex],
      realIndex: leftIndex,
    },
    {
      position: 'center',
      project: projects[centerIndex],
      realIndex: centerIndex,
    },
    {
      position: 'right',
      project: projects[rightIndex],
      realIndex: rightIndex,
    },
  ];
});
</script>

<style scoped>
.portfolio-carousel {
  position: relative;
  width: 100%;
  min-height: 560px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.carousel-track {
  position: relative;
  width: 100%;
  height: 460px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.carousel-slide {
  position: absolute;
  width: 58%;
  height: 400px;
  border-radius: 28px;
  overflow: hidden;
  background-size: cover;
  background-position: center;
  cursor: pointer;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.28);
  transition:
    transform 0.9s ease,
    opacity 0.9s ease,
    filter 0.9s ease,
    width 0.9s ease,
    height 0.9s ease,
    box-shadow 0.9s ease;
  will-change: transform, opacity, filter;
}

.carousel-slide .overlay {
  position: absolute;
  inset: 0;
  transition: background 0.9s ease;
}

.carousel-slide.center .overlay {
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
.slide-content {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  padding: 32px;
  color: white;
  transition:
    opacity 0.9s ease,
    transform 0.9s ease;
}

.slide-title {
  font-size: 1.9rem;
  font-weight: 700;
  margin-bottom: 12px;
}

.slide-description {
  font-size: 1rem;
  line-height: 1.6;
  max-width: 85%;
}

.carousel-slide.center {
  z-index: 3;
  transform: translateX(0) scale(1);
  opacity: 1;
  filter: blur(0) brightness(1);
}

.carousel-slide.left {
  z-index: 2;
  transform: translateX(-62%) scale(0.82);
  opacity: 0.72;
  filter: blur(3px) brightness(0.58);
}

.carousel-slide.left .overlay,
.carousel-slide.right .overlay {
  background: linear-gradient(to top, rgba(0, 0, 0, 0.62), rgba(0, 0, 0, 0.36));
}

.carousel-slide.right {
  z-index: 2;
  transform: translateX(62%) scale(0.82);
  opacity: 0.72;
  filter: blur(3px) brightness(0.58);
}

.carousel-slide.left:hover,
.carousel-slide.right:hover {
  opacity: 0.82;
  filter: blur(2px) brightness(0.68);
}

.carousel-indicators {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 26px;
}

.indicator {
  width: 12px;
  height: 12px;
  border-radius: 999px;
  background: rgba(120, 120, 120, 0.35);
  cursor: pointer;
  transition:
    transform 0.4s ease,
    background 0.4s ease;
}

.indicator.active {
  background: rgb(var(--v-theme-primary));
  transform: scale(1.2);
}

@media (max-width: 960px) {
  .portfolio-carousel {
    min-height: 480px;
  }

  .carousel-track {
    height: 380px;
  }

  .carousel-slide {
    width: 72%;
    height: 330px;
  }

  .carousel-slide.left {
    transform: translateX(-44%) scale(0.78);
  }

  .carousel-slide.right {
    transform: translateX(44%) scale(0.78);
  }

  .slide-title {
    font-size: 1.45rem;
  }

  .slide-description {
    font-size: 0.95rem;
    max-width: 100%;
  }
}

@media (max-width: 600px) {
  .carousel-track {
    height: 300px;
  }

  .carousel-slide {
    width: 86%;
    height: 265px;
  }

  .carousel-slide.left,
  .carousel-slide.right {
    opacity: 0.32;
    filter: blur(3px) brightness(0.5);
  }

  .carousel-slide.left {
    transform: translateX(-28%) scale(0.74);
  }

  .carousel-slide.right {
    transform: translateX(28%) scale(0.74);
  }

  .slide-content {
    padding: 20px;
  }

  .slide-title {
    font-size: 1.15rem;
  }

  .slide-description {
    font-size: 0.85rem;
  }
}
</style>
