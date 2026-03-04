<template>
  <Projects />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Projects from '../components/Projects.vue';

export default defineComponent({
  name: 'ProjectsView',
  components: {
    Projects,
  },
});
</script>
