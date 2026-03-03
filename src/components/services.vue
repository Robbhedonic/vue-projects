<template>
  <v-container id="services" class="py-16">
    <h2 class="text-h4 text-center font-weight-bold mb-4">Services</h2>
    <p class="text-center text-subtitle-1 mb-10">What I offer</p>

    <v-row justify="center" dense>
      <v-col cols="12" md="4" v-for="service in services" :key="service.title">
        <v-card class="pa-4 text-center">
          <v-icon size="36" color="primary" class="mb-2">{{
            service.icon
          }}</v-icon>
          <h3 class="text-h6 font-weight-bold mb-2">{{ service.title }}</h3>
          <v-btn variant="text" color="primary" @click="openModal(service)">
            View More
            <v-icon end>mdi-arrow-right</v-icon>
          </v-btn>
        </v-card>
      </v-col>
    </v-row>

    <!-- Modal -->
    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-card-title class="font-weight-bold">{{
          selected?.title
        }}</v-card-title>
        <v-card-text>
          <v-list density="compact">
            <v-list-item
              v-for="(item, index) in selected?.details"
              :key="index"
            >
              <template v-slot:prepend>
                <v-icon color="primary">mdi-check-circle</v-icon>
              </template>
              {{ item }}
            </v-list-item>
          </v-list>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text color="primary" @click="dialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const dialog = ref(false);
const selected = ref<null | {
  title: string;
  details: string[];
}>(null);

const openModal = (service: typeof selected.value) => {
  selected.value = service;
  dialog.value = true;
};

const services = [
  {
    icon: 'mdi-code-tags',
    title: 'Frontend Developer',
    details: [
      'I develop the user interface',
      'Web page development',
      'Optimizing the user experience',
    ],
  },
  {
    icon: 'mdi-briefcase',
    title: 'Business Admin & Management',
    details: [
      'Marketing and Sales',
      'Growth Strategy Consulting',
      'Financial planning and analysis',
    ],
  },
  {
    icon: 'mdi-palette',
    title: 'Design & Brand',
    details: ['Brand strategy', 'Brand manual', 'Visual identity'],
  },
];
</script>
