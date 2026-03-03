<template>
  <v-container id="testimonial" class="py-16">
    <h2 class="text-h4 font-weight-bold text-center mb-2">Testimonial</h2>
    <p class="text-subtitle-1 text-center mb-6">My employers say</p>

    <v-carousel hide-delimiters show-arrows cycle height="400">
      <v-carousel-item v-for="(testimonial, i) in testimonials" :key="i">
        <v-card
          class="mx-auto pa-6 color"
          max-width="800"
          height="250"
          elevation="4"
        >
          <v-row align="center">
            <v-col cols="12" md="4" class="text-center">
              <v-avatar size="100">
                <v-img :src="testimonial.image" />
              </v-avatar>
            </v-col>
            <v-col cols="12" md="8">
              <div class="text-h6 font-weight-bold">{{ testimonial.name }}</div>
              <div class="text-subtitle-2 mb-2">{{ testimonial.role }}</div>
              <div class="mb-2">
                <v-icon v-for="n in 5" :key="n" color="amber">mdi-star</v-icon>
              </div>
              <p>{{ testimonial.text }}</p>
            </v-col>
          </v-row>
        </v-card>
      </v-carousel-item>
    </v-carousel>
  </v-container>
</template>

<script setup lang="ts">
const testimonials = [
  {
    name: 'Barbara Haniecka',
    role: 'Employer - Hawaii Poke',
    image: '/src/assets/img/barbara.JPG',
    text: 'Roberto is an excellent worker; I have a very good impression of him. He consistently shows responsibility in his duties at the company.',
  },
  {
    name: 'Camila Aguila',
    role: 'Supervisor - Caja los Andes',
    image: '/src/assets/img/camila.JPG',
    text: 'Roberto demonstrated motivation and a positive attitude. He showed strong skills in client relations, particularly in critical areas such as debt collections.',
  },
  {
    name: 'Gabriela Marzan',
    role: 'Employer - Walmart',
    image: '/src/assets/img/gabriel.JPG',
    text: 'Roberto has always been responsible and stood out among his colleagues. He worked at Walmart for four years to finance his studies.',
  },
];
</script>

<style>
.color {
  color: white;
  background: linear-gradient(135deg, #3f51b5, #1e88e5);
  border-radius: 12px;
}
</style>
