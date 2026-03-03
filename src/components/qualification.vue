<template>
  <v-container id="qualification" class="py-16">
    <h2 class="text-h4 text-center font-weight-bold mb-2">Qualification</h2>
    <p class="text-center text-subtitle-1 mb-10">My personal journey</p>

    <!-- Tabs -->
    <v-row justify="center" class="mb-6">
      <v-btn
        v-for="tab in tabs"
        :key="tab.id"
        :variant="activeTab === tab.id ? 'flat' : 'outlined'"
        color="primary"
        class="ma-2"
        @click="activeTab = tab.id"
      >
        <v-icon start>{{ tab.icon }}</v-icon>
        {{ tab.label }}
      </v-btn>
    </v-row>

    <!-- Timeline -->
    <div class="q-timeline">
      <QualificationCard
        v-for="(item, index) in activeList"
        :key="index"
        :data="item"
        :reverse="index % 2 === 1"
      />
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import QualificationCard from './qualificationCard.vue';

const activeTab = ref<'education' | 'work'>('education');

const tabs = [
  { id: 'education', label: 'Education', icon: 'mdi-school' },
  { id: 'work', label: 'Work', icon: 'mdi-briefcase' },
] as const;

const education = [
  {
    title: 'Frontend Developer',
    subtitle: 'Sweden - Nackademin',
    date: '2024 - 2025',
  },
  {
    title: 'Swedish Language',
    subtitle: 'Sweden - Komvux Jensen, ABF-Skolan',
    date: '2022 - 2024',
  },
  {
    title: 'English Language',
    subtitle: 'Sweden - Komvux-Jensen',
    date: '2021 - 2022',
  },
  {
    title: 'Business Administration Management Finance',
    subtitle: 'Universidad Tecnológica de Chile, INACAP',
    date: '2013 - 2016',
  },
];

const work = [
  {
    title: 'Multitask Restaurant Worker',
    subtitle: 'Sweden - Hawaii Poke',
    date: '2022 - 2024',
  },
  {
    title: 'Food Runner',
    subtitle: 'Sweden - BallBreaker',
    date: '2021 - 2022',
  },
  {
    title: 'Sales Executive',
    subtitle: 'Chile - Caja Los Andes',
    date: '2018 - 2019',
  },
  {
    title: 'Administrator and Store Manager',
    subtitle: 'Chile - El Dolar Beauty Store',
    date: '2018',
  },
];

const activeList = computed(() =>
  activeTab.value === 'education' ? education : work,
);
</script>

<style scoped>
.q-timeline {
  position: relative;
  max-width: 900px;
  margin: 0 auto;
  padding: 8px 0;
}

.q-timeline::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  width: 4px;
  transform: translateX(-50%);
  background: rgba(63, 81, 181, 0.85);
  border-radius: 999px;
}

@media (max-width: 960px) {
  .q-timeline::before {
    left: 16px;
    transform: none;
  }
}
</style>
