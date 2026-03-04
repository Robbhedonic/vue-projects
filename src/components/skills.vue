<template>
  <v-container>
    <h2 class="text-h4 text-center font-weight-bold mb-4">Frontend Skills</h2>

    <v-row>
      <v-col
        cols="12"
        sm="6"
        md="4"
        v-for="skill in frontendSkills"
        :key="skill.name"
        class="text-center"
      >
        <Doughnut :data="generateChartData(skill)" :options="chartOptions" />
        <p class="mt-2 font-weight-medium">
          {{ skill.name }} - {{ skill.level }}%
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
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

// Datos de las habilidades
const frontendSkills = [
  { name: 'HTML', level: 90 },
  { name: 'CSS', level: 80 },
  { name: 'JavaScript', level: 80 },
  { name: 'React', level: 70 },
  { name: 'SASS', level: 80 },
  { name: 'Figma', level: 70 },
  { name: 'GitHub', level: 90 },
  { name: 'Rest Api', level: 80 },
  { name: 'MongoDB', level: 70 },
  { name: 'Vue.js', level: 90 },
  { name: 'Vuetify', level: 90 },
  { name: 'Node.js', level: 80 },
  { name: 'Express.js', level: 80 },
  { name: 'CI/CD', level: 70 },
  { name: 'SQL, NOSQL', level: 70 },
];

// Función para generar datos por habilidad
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

// Opciones del gráfico
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: '70%', // hace que el círculo sea más delgado
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
.v-col {
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

canvas {
  max-height: 120px !important;
}
</style>
