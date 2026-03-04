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
  align-items: flex-start;
}

/* Punto: alineado con la línea del timeline (centro a 7px en móvil) */
.q-dot {
  width: 14px;
  height: 14px;
  min-width: 14px;
  border-radius: 50%;
  background: #3f51b5;
  margin-top: 4px;
  z-index: 2;
  box-shadow: 0 0 0 4px rgba(63, 81, 181, 0.12);
}


.q-left .q-card {
  text-align: right;
}
.q-right .q-card {
  text-align: left;
}

/* Móvil: punto y texto en la misma fila; el punto sigue la fila del card visible */
@media (max-width: 960px) {
  .q-item {
    grid-template-columns: 15px 1fr;
    grid-template-rows: auto auto;
    column-gap: 12px;
    margin: 20px 0;
    align-items: start;
  }

  .q-left {
    grid-column: 2;
    grid-row: 1;
  }

  .q-right {
    grid-column: 2;
    grid-row: 2;
  }

  .q-mid {
    grid-column: 1;
    grid-row: 1;
    justify-content: flex-start;
  }

  /* Cuando el card está a la derecha (reverse), el punto debe estar en la 2ª fila con el texto */
  .q-item.reverse .q-mid {
    grid-row: 2;
  }

  .q-left .q-card,
  .q-right .q-card {
    text-align: left;
  }

  .q-card {
    padding: 4px 4px 4px 0;
  }
}

/* Pantalla muy pequeña: misma lógica de alineación punto-texto */
@media (max-width: 600px) {
  .q-item {
    grid-template-columns: 12px 1fr;
    grid-template-rows: auto auto;
    column-gap: 10px;
    margin: 16px 0;
  }

  .q-item.reverse .q-mid {
    grid-row: 2;
  }

  .q-dot {
    width: 12px;
    height: 12px;
    min-width: 12px;
    margin-top: 2px;
    box-shadow: 0 0 0 3px rgba(63, 81, 181, 0.12);
  }

  .q-card h3 {
    font-size: 1rem;
  }

  .q-card .text-subtitle-2 {
    font-size: 0.8rem;
  }
}
</style>