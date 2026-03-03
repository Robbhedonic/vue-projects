<template>
  <v-row class="mb-10" :class="reverse ? 'flex-row-reverse' : ''">
    <v-col cols="12" md="6">
      <v-card flat>
        <h3 class="text-h6 font-weight-bold mb-1">{{ data.title }}</h3>
        <p class="text-subtitle-2">{{ data.subtitle }}</p>
        <v-icon start size="16">mdi-calendar</v-icon>
        <span class="text-caption">{{ data.date }}</span>
      </v-card>
    </v-col>

    <v-col cols="12" md="6" class="d-flex justify-center align-start">
      <div class="dot" />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
defineProps<{
  data: { title: string; subtitle: string; date: string };
  reverse?: boolean;
}>();
</script>

<style scoped>
.dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: #3f51b5;
  margin-top: 12px;
}
</style>
