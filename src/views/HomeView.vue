<template>
  <div>
    <Home />
    <About />
    <Skills />
    <Qualification />
    <Services />
    <Portfolio />
    <Testimonial />
    <ProjectSection />
    <Contact />
    <Footer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Home from '../components/home.vue';
import About from '../components/about.vue';
import Skills from '../components/skills.vue';
import Qualification from '../components/qualification.vue';
import Services from '../components/services.vue';
import Portfolio from '../components/portfolio.vue';
import Testimonial from '../components/testimonial.vue';
import ProjectSection from '../components/project-section.vue';
import Contact from '../components/contact.vue';
import Footer from '../components/footer.vue';

export default defineComponent({
  name: 'HomeView',
  components: {
    Home,
    About,
    Skills,
    Qualification,
    Services,
    Portfolio,
    Testimonial,
    ProjectSection,
    Contact,
    Footer,
  },
});
</script>
