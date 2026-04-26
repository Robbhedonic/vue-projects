<template>
  <v-container id="qualification" class="py-16">
    <h2 class="text-h4 text-center font-weight-bold mb-2">
      {{ t('qualification.title') }}
    </h2>
    <p class="text-center text-subtitle-1 mb-10">
      {{ t('qualification.subtitle') }}
    </p>

    <!-- Tabs -->
    <v-row justify="center" class="mb-4 mb-sm-6 qualification-tabs">
      <v-btn
        v-for="tab in tabs"
        :key="tab.id"
        :variant="activeTab === tab.id ? 'flat' : 'outlined'"
        color="primary"
        size="small"
        class="ma-1 ma-sm-2"
        @click="activeTab = tab.id"
      >
        <v-icon start size="small">{{ tab.icon }}</v-icon>
        {{ t(tab.labelKey) }}
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
import { useI18n } from 'vue-i18n';
import QualificationCard from './qualificationCard.vue';

const { t } = useI18n();

const activeTab = ref<'education' | 'work'>('education');

const tabs = [
  { id: 'education', labelKey: 'qualification.education', icon: 'mdi-school' },
  { id: 'work', labelKey: 'qualification.work', icon: 'mdi-briefcase' },
] as const;

const education = [
  {
    title: 'Cloud Development',
    subtitle: 'NBI/Handelsakademin',
    date: 'April 2026 - October 2026',
  },
  {
    title: 'Backend Development',
    subtitle: 'Sweden - Sundsgardens folkhogskola',
    date: '2026 - Spring',
  },
  {
    title: 'Samhallsvetenskap',
    subtitle: 'Sweden - Komvux',
    date: 'August 2025 - October 2025',
  },
  {
    title: 'TypeScript Course',
    subtitle: 'Online Course',
    date: 'January 2025 - April 2025',
  },
  {
    title: 'Frontend Development',
    subtitle: 'Sweden - Nackademin',
    date: '2023 - 2025',
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
    subtitle: 'Technological University of Chile, INACAP',
    date: '2013 - 2016',
  },
];

const work = [
  {
    title: 'Freelance Fullstack Developer',
    subtitle: 'Independent',
    date: 'March 2026 - Present',
  },
  {
    title: 'Junior Developer Intern',
    subtitle: 'Sweden - Onify',
    date: 'December 2024 - May 2025',
  },
  {
    title: 'Multitask Restaurant Worker',
    subtitle: 'Sweden - Hawaii Poke',
    date: '2022 - 2026',
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
    title: 'Personal Operator and Supervisor',
    subtitle: 'Chile - Lider Walmart',
    date: '2012 - 2016',
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

.qualification-tabs {
  flex-wrap: wrap;
  gap: 4px;
}

/* Mobile: line and dots aligned (padding + column = same position) */
@media (max-width: 960px) {
  .q-timeline {
    padding-left: 8px;
  }

  .q-timeline::before {
    left: 15px;
    transform: none;
  }
}

@media (max-width: 600px) {
  .q-timeline {
    padding-left: 5px;
  }

  .q-timeline::before {
    left: 11px;
    width: 3px;
  }
}
</style>
