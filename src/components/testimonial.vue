<template>
  <v-container id="testimonial" class="py-16 testimonial-wrap">
    <h2 class="text-h4 font-weight-bold text-center mb-2">Testimonial</h2>
    <p class="text-subtitle-1 text-center mb-6">My employers say</p>

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
                {{ testimonial.name }}
              </div>
              <div class="text-subtitle-2 mb-2">
                <a
                  v-if="testimonial.link"
                  :href="testimonial.link"
                  target="_blank"
                  rel="noopener"
                  class="testimonial-link"
                >
                  {{ testimonial.role }}
                </a>
                <template v-else>{{ testimonial.role }}</template>
              </div>

              <div class="mb-2">
                <v-icon v-for="n in 5" :key="n" color="amber" size="small">
                  mdi-star
                </v-icon>
              </div>

              <p class="testimonial-text text-body-2">{{ testimonial.text }}</p>
            </v-col>
          </v-row>
        </v-card>
      </v-carousel-item>
    </v-carousel>
  </v-container>
</template>

<script setup lang="ts">
const barbaraImg = new URL('../assets/img/barbara.JPG', import.meta.url).href;
const camilaImg = new URL('../assets/img/camila.JPG', import.meta.url).href;
const gabrielaImg = new URL('../assets/img/gabriel.JPG', import.meta.url).href;
const robertImg = new URL('../assets/img/robert.jpg', import.meta.url).href;

const testimonials = [
  {
    name: 'Robert Lundsten',
    role: 'Grundare & CTO, Onify',
    image: robertImg,
    link: 'https://onify.co',
    text: 'Jag har handledat Roberto under hans LIA-praktik på Onify. Han utvecklade vårt admingränssnitt med Vue och Vuetify, integrerade mot REST API:er och arbetade med Figma. Roberto visar mycket god förståelse för frontend, är självständig och lösningsorienterad, och blev snabbt uppskattad i teamet. Jag rekommenderar honom varmt för roller inom frontendutveckling.',
  },
  {
    name: 'Lara Celaya',
    role: 'Manager - Hawaii Poke',
    image: barbaraImg,
    text: 'Roberto is an excellent worker; I have a very good impression of him. He consistently shows responsibility in his duties at the company.',
  },
  {
    name: 'Camila Aguila',
    role: 'Supervisor - Caja los Andes',
    image: camilaImg,
    text: 'Roberto demonstrated motivation and a positive attitude. He showed strong skills in client relations, particularly in critical areas such as debt collections.',
  },
  {
    name: 'Gabriela Marzan',
    role: 'Employer - Walmart',
    image: gabrielaImg,
    text: 'Roberto has always been responsible and stood out among his colleagues. He worked at Walmart for four years to finance his studies.',
  },
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

/* En pantallas chicas: más margen para que las flechas queden a los lados del card */
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
