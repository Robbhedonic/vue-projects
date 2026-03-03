<template>
  <v-container id="about" class="py-16">
    <v-row justify="center">
      <v-col cols="12" md="8" class="text-center">
        <h2 class="text-h4 font-weight-bold mb-2">About Me</h2>
        <span class="text-subtitle-1 mb-6 d-block">My introduction</span>

        <v-img
          src="/src/assets/img/jungle.png"
          alt="About image"
          max-width="300"
          class="mx-auto mb-6"
        />

        <p class="mb-4">
          I am a Frontend Developer with a diverse skill set, actively seeking
          an internship opportunity.
        </p>
        <p class="mb-6">
          I am deeply passionate about culture, art, and innovation.
        </p>

        <!-- Info blocks -->
        <v-row justify="center" class="mb-6">
          <v-col cols="12" sm="4" class="text-center">
            <h3 class="text-h5">1.5+</h3>
            <span class="text-caption">Years of studies</span>
          </v-col>
          <v-col cols="12" sm="4" class="text-center">
            <h3 class="text-h5">06+</h3>
            <span class="text-caption">Completed projects</span>
          </v-col>
          <v-col cols="12" sm="4" class="text-center">
            <h3 class="text-h5">10+</h3>
            <span class="text-caption">Skills</span>
          </v-col>
        </v-row>

        <!-- Open Dialog Button -->
        <v-btn color="primary" variant="outlined" @click="dialog = true">
          View CV
          <v-icon end>mdi-eye</v-icon>
        </v-btn>

        <!-- Dialog -->
        <v-dialog
          v-model="dialog"
          :fullscreen="isFullScreen"
          :width="isFullScreen ? undefined : '80%'"
          :height="isFullScreen ? undefined : '80%'"
        >
          <v-card
            :style="
              isFullScreen
                ? 'height: 100vh;'
                : 'height: 80vh; display: flex; flex-direction: column;'
            "
          >
            <v-toolbar flat color="primary" dark>
              <v-toolbar-title>Curriculum Vitae</v-toolbar-title>
              <v-spacer />
              <v-btn icon @click="toggleFullscreen">
                <v-icon>
                  {{ isFullScreen ? 'mdi-arrow-collapse' : 'mdi-arrow-expand' }}
                </v-icon>
              </v-btn>
              <v-btn icon @click="dialog = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-toolbar>

            <!-- PDF iframe -->
            <v-card-text style="flex: 1; overflow: hidden; padding: 0">
              <iframe
                src="/src/assets/pdf/Roberto.Carcamo-CV.pdf"
                width="100%"
                height="100%"
                style="border: none"
              ></iframe>
            </v-card-text>

            <!-- Actions -->
            <v-card-actions>
              <v-spacer />
              <v-btn
                color="primary"
                variant="tonal"
                href="/src/assets/pdf/Roberto.Carcamo-CV.pdf"
                download
              >
                Download CV
                <v-icon end>mdi-download</v-icon>
              </v-btn>
              <v-btn text @click="dialog = false">Close</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const dialog = ref(false);
const isFullScreen = ref(false);

function toggleFullscreen() {
  isFullScreen.value = !isFullScreen.value;
}
</script>
