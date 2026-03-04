<template>
  <v-container id="services" class="py-16">
    <h2 class="text-h4 text-center font-weight-bold mb-2">Services</h2>
    <p class="text-center text-subtitle-1 mb-10">What I offer</p>

    <v-row justify="center">
      <v-col
        v-for="service in services"
        :key="service.title"
        cols="12"
        sm="6"
        md="4"
      >
        <v-card
          class="service-card pa-6 text-center h-100"
          elevation="2"
          @click="openModal(service)"
        >
          <div class="service-icon-wrap mb-4">
            <v-icon :icon="service.icon" size="40" color="primary" />
          </div>
          <h3 class="text-h6 font-weight-bold mb-3">{{ service.title }}</h3>
          <p class="text-body-2 text-medium-emphasis mb-4">
            {{ service.summary }}
          </p>
          <v-btn
            variant="text"
            color="primary"
            append-icon="mdi-arrow-right"
            @click.stop="openModal(service)"
          >
            Ver más
          </v-btn>
        </v-card>
      </v-col>
    </v-row>

    <!-- Modal -->
    <v-dialog v-model="dialog" max-width="500" persistent>
      <v-card rounded="lg">
        <v-card-title class="font-weight-bold text-h6 pa-4">
          {{ selected?.title }}
        </v-card-title>
        <v-divider />
        <v-card-text class="pa-4">
          <v-list density="compact" class="py-0">
            <v-list-item
              v-for="(item, index) in selected?.details"
              :key="index"
              class="px-0"
            >
              <template v-slot:prepend>
                <v-icon color="primary" size="small" class="me-2"
                  >mdi-check-circle</v-icon
                >
              </template>
              <span class="text-body-2">{{ item }}</span>
            </v-list-item>
          </v-list>
        </v-card-text>
        <v-card-actions class="pa-4 pt-0">
          <v-spacer />
          <v-btn variant="text" color="primary" @click="dialog = false">
            Cerrar
          </v-btn>
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
    title: 'Fullstack Developer',
    summary: 'Desarrollo web completo, UI y experiencia de usuario.',
    details: [
      'Desarrollo de interfaces de usuario',
      'Desarrollo de páginas y aplicaciones web',
      'Optimización de la experiencia de usuario',
    ],
  },
  {
    icon: 'mdi-briefcase',
    title: 'Business Admin & Management',
    summary: 'Consultoría en estrategia, ventas y análisis financiero.',
    details: [
      'Marketing y ventas',
      'Consultoría en estrategia de crecimiento',
      'Planificación y análisis financiero',
    ],
  },
  {
    icon: 'mdi-palette',
    title: 'Design & Brand',
    summary: 'Estrategia de marca e identidad visual.',
    details: ['Estrategia de marca', 'Manual de marca', 'Identidad visual'],
  },
];
</script>

<style scoped>
.service-card {
  border-radius: 12px;
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
}
.service-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12) !important;
}
.service-icon-wrap {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 72px;
  height: 72px;
  margin: 0 auto;
  border-radius: 50%;
  background: rgba(var(--v-theme-primary), 0.1);
}
</style>
