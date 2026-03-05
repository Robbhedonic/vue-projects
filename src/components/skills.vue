<template>
  <v-container id="skills">
    <h2 class="text-h4 text-center font-weight-bold mb-4">{{ t('skills.title') }}</h2>

    <div class="skills-marquee">
      <div class="skills-track">
        <div
          v-for="(skill, i) in frontendSkills"
          :key="'a-' + i"
          class="skill-item"
        >
          <div class="skill-chart">
            <Doughnut :data="generateChartData(skill)" :options="chartOptions" />
            <div class="skill-chart-icon">
              <v-icon v-if="skill.icon" :icon="skill.icon" size="32" />
              <img
                v-else-if="skill.image"
                :src="skill.image"
                :alt="skill.name"
                class="skill-chart-img"
              />
            </div>
          </div>
          <p class="skill-label">{{ skill.name }} — {{ skill.level }}%</p>
        </div>
        <div
          v-for="(skill, i) in frontendSkills"
          :key="'b-' + i"
          class="skill-item"
        >
          <div class="skill-chart">
            <Doughnut :data="generateChartData(skill)" :options="chartOptions" />
            <div class="skill-chart-icon">
              <v-icon v-if="skill.icon" :icon="skill.icon" size="32" />
              <img
                v-else-if="skill.image"
                :src="skill.image"
                :alt="skill.name"
                class="skill-chart-img"
              />
            </div>
          </div>
          <p class="skill-label">{{ skill.name }} — {{ skill.level }}%</p>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { Doughnut } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
} from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

const { t } = useI18n();
type SkillItem = { name: string; level: number; icon?: string; image?: string };

// Skills data (icon = MDI, image = optional URL)
const frontendSkills: SkillItem[] = [
  { name: 'HTML', level: 90, icon: 'mdi-language-html5' },
  { name: 'CSS', level: 80, icon: 'mdi-language-css3' },
  { name: 'JavaScript', level: 80, icon: 'mdi-language-javascript' },
  { name: 'React', level: 70, icon: 'mdi-react' },
  { name: 'SASS', level: 80, icon: 'mdi-sass' },
  { name: 'Figma', level: 70, icon: 'mdi-palette' },
  { name: 'GitHub', level: 90, icon: 'mdi-github' },
  { name: 'Rest Api', level: 80, icon: 'mdi-api' },
  { name: 'MongoDB', level: 70, icon: 'mdi-database' },
  { name: 'Vue.js', level: 90, icon: 'mdi-vuejs' },
  { name: 'Vuetify', level: 90, icon: 'mdi-vuetify' },
  { name: 'Node.js', level: 80, icon: 'mdi-nodejs' },
  { name: 'Express.js', level: 80, icon: 'mdi-server' },
  { name: 'CI/CD', level: 70, icon: 'mdi-cog-sync' },
  { name: 'SQL, NOSQL', level: 70, icon: 'mdi-database-outline' },
];

// Function to generate data per skill
const generateChartData = (skill: { name: string; level: number }) => {
  return {
    labels: ['Skill', 'Remaining'],
    datasets: [
      {
        data: [skill.level, 100 - skill.level],
        backgroundColor: ['#1976D2', '#E0E0E0'],
        borderWidth: 0,
      },
    ],
  };
};

// Chart options
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: '70%', // makes the circle thinner
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: false,
    },
  },
};
</script>

<style scoped>
.skills-marquee {
  overflow: hidden;
  width: 100%;
  padding: 0.5rem 0;
}

.skills-track {
  display: flex;
  gap: 1.5rem;
  width: max-content;
  animation: scroll-left 40s linear infinite;
}

.skill-item {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 110px;
}

.skill-chart {
  width: 110px;
  height: 110px;
  position: relative;
}

.skill-chart-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  color: rgb(var(--v-theme-primary));
}

.skill-chart-img {
  width: 32px;
  height: 32px;
  object-fit: contain;
}

.skill-label {
  margin: 0.35rem 0 0;
  font-size: 0.9rem;
  font-weight: 600;
  text-align: center;
  white-space: nowrap;
}

.skill-chart canvas {
  max-width: 110px !important;
  max-height: 110px !important;
}

@keyframes scroll-left {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}
</style>
