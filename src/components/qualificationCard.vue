<template>
  <div class="q-item" :class="{ reverse }">
    <!-- Left content -->
    <div class="q-side q-left">
      <div v-if="!reverse" class="q-card">
        <h3 class="text-h6 font-weight-bold mb-1">{{ data.title }}</h3>
        <p class="text-subtitle-2 mb-2">{{ data.subtitle }}</p>

        <div class="q-date">
          <v-icon size="16" class="mr-1">mdi-calendar</v-icon>
          <span class="text-caption">{{ data.date }}</span>
        </div>
      </div>
    </div>

    <!-- Middle dot -->
    <div class="q-mid">
      <span class="q-dot" />
    </div>

    <!-- Right content -->
    <div class="q-side q-right">
      <div v-if="reverse" class="q-card">
        <h3 class="text-h6 font-weight-bold mb-1">{{ data.title }}</h3>
        <p class="text-subtitle-2 mb-2">{{ data.subtitle }}</p>

        <div class="q-date">
          <v-icon size="16" class="mr-1">mdi-calendar</v-icon>
          <span class="text-caption">{{ data.date }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  data: { title: string; subtitle: string; date: string };
  reverse?: boolean;
}>();
</script>

<style scoped>

.q-item {
  display: grid;
  grid-template-columns: 1fr 56px 1fr;
  align-items: start;
  column-gap: 16px;
  margin: 28px 0;
}

.q-side {
  min-width: 0;
}

.q-card {
  padding: 4px 8px;
}

.q-mid {
  position: relative;
  display: flex;
  justify-content: center;
}

/* Punto */
.q-dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #3f51b5;
  margin-top: 10px;
  z-index: 2;
  box-shadow: 0 0 0 6px rgba(63, 81, 181, 0.12);
}


.q-left .q-card {
  text-align: right;
}
.q-right .q-card {
  text-align: left;
}

@media (max-width: 960px) {
  .q-item {
    grid-template-columns: 32px 1fr;
    column-gap: 12px;
  }

  .q-left,
  .q-right {
    grid-column: 2;
  }

  .q-mid {
    grid-column: 1;
    justify-content: flex-start;
  }

  .q-left .q-card,
  .q-right .q-card {
    text-align: left;
  }
}
</style>