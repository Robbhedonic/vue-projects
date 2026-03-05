<template>
  <v-container id="testimonial" class="py-16 testimonial-wrap">
    <h2 class="text-h4 font-weight-bold text-center mb-2">{{ t('testimonial.title') }}</h2>
    <p class="text-subtitle-1 text-center mb-6">{{ t('testimonial.subtitle') }}</p>

    <v-carousel
      hide-delimiters
      show-arrows
      cycle
      class="testimonial-carousel"
      height="360"
    >
      <v-carousel-item v-for="(testimonial, i) in testimonials" :key="i">
        <v-card
          class="mx-auto testimonial-card pa-4 pa-sm-6 color"
          max-width="800"
          elevation="4"
        >
          <v-row align="center" no-gutters class="testimonial-row">
            <v-col cols="12" md="4" class="text-center pa-2 pa-md-4">
              <v-avatar size="80" class="d-md-none">
                <v-img :src="testimonial.image" cover />
              </v-avatar>
              <v-avatar size="100" class="d-none d-md-inline-flex">
                <v-img :src="testimonial.image" cover />
              </v-avatar>
            </v-col>

            <v-col cols="12" md="8" class="pa-3 pa-sm-4">
              <div class="text-h6 font-weight-bold">
                {{ t(`testimonial.items.${testimonial.index}.name`) }}
              </div>
              <div class="text-subtitle-2 mb-2">
                <a
                  v-if="testimonial.link"
                  :href="testimonial.link"
                  target="_blank"
                  rel="noopener"
                  class="testimonial-link"
                >
                  {{ t(`testimonial.items.${testimonial.index}.role`) }}
                </a>
                <template v-else>{{ t(`testimonial.items.${testimonial.index}.role`) }}</template>
              </div>

              <div class="mb-2">
                <v-icon v-for="n in 5" :key="n" color="amber" size="small">
                  mdi-star
                </v-icon>
              </div>

              <p class="testimonial-text text-body-2">{{ t(`testimonial.items.${testimonial.index}.text`) }}</p>
            </v-col>
          </v-row>
        </v-card>
      </v-carousel-item>
    </v-carousel>
  </v-container>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const barbaraImg = new URL('../assets/img/barbara.JPG', import.meta.url).href;
const camilaImg = new URL('../assets/img/camila.JPG', import.meta.url).href;
const gabrielaImg = new URL('../assets/img/gabriel.JPG', import.meta.url).href;
const robertImg = new URL('../assets/img/robert.jpg', import.meta.url).href;

const testimonials = [
  { index: 0, image: robertImg, link: 'https://onify.co' },
  { index: 1, image: barbaraImg },
  { index: 2, image: camilaImg },
  { index: 3, image: gabrielaImg },
];
</script>

<style scoped>
.color {
  color: white;
  background: linear-gradient(135deg, #3f51b5, #1e88e5);
  border-radius: 12px;
}

.testimonial-wrap {
  overflow: hidden;
}

.testimonial-carousel {
  min-height: 320px;
}

.testimonial-carousel :deep(.v-carousel__item) {
  align-items: center;
}

.testimonial-card {
  min-height: 260px;
  margin: 0 8px;
  width: calc(100% - 16px);
  max-width: 800px;
}

/* On small screens: more margin so the arrows stay on the sides of the card */
@media (max-width: 960px) {
  .testimonial-card {
    margin: 0 44px;
    width: calc(100% - 88px);
  }
}

@media (max-width: 600px) {
  .testimonial-card {
    margin: 0 40px;
    width: calc(100% - 80px);
  }
}

.testimonial-text {
  line-height: 1.5;
  opacity: 0.95;
  max-height: 12em;
  overflow-y: auto;
}

.testimonial-link {
  color: inherit;
  text-decoration: underline;
  opacity: 0.95;
}
.testimonial-link:hover {
  opacity: 1;
}

@media (min-width: 600px) {
  .testimonial-card {
    min-height: 220px;
  }
}

@media (min-width: 960px) {
  .testimonial-carousel {
    min-height: 380px;
  }
  .testimonial-card {
    min-height: 250px;
  }
}
</style>
