<template>
  <v-container id="about" class="py-16">
    <v-row justify="center">
      <v-col>
        <v-img
          :src="aboutImageUrl"
          alt="About image"
          max-width="400"
          class="mx-auto mb-6"
          cover
        />
      </v-col>
      <v-col cols="12" md="8" class="text-center">
        <h2 class="text-h3 font-weight-bold mb-2">{{ t('about.title') }}</h2>
        <p class="mb-6">
          {{ t('about.fullProfile') }}
        </p>

        <!-- Info blocks -->
        <v-row justify="center" class="mb-6">
          <v-col cols="12" sm="4" class="text-center">
            <h3 class="text-h5">3+</h3>
            <span class="text-caption">{{ t('about.yearsStudies') }}</span>
          </v-col>
          <v-col cols="12" sm="4" class="text-center">
            <h3 class="text-h5">06+</h3>
            <span class="text-caption">{{ t('about.completedProjects') }}</span>
          </v-col>
          <v-col cols="12" sm="4" class="text-center">
            <h3 class="text-h5">20+</h3>
            <span class="text-caption">{{ t('about.skillsCount') }}</span>
          </v-col>
        </v-row>

        <!-- Open Dialog Button -->
        <v-btn color="primary" variant="outlined" @click="dialog = true">
          {{ t('about.viewCv') }}
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
              <v-toolbar-title>{{
                t('about.curriculumVitae')
              }}</v-toolbar-title>
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

            <v-card-text style="flex: 1; overflow: hidden; padding: 0">
              <iframe
                :src="cvPdf"
                width="100%"
                height="100%"
                style="border: none"
              ></iframe>
            </v-card-text>

            <!-- Actions -->
            <v-card-actions>
              <v-spacer />
              <v-btn color="primary" variant="tonal" :href="cvPdf" download>
                {{ t('about.downloadCv') }}
                <v-icon end>mdi-download</v-icon>
              </v-btn>
              <v-btn text @click="dialog = false">{{ t('about.close') }}</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useUserSettings } from '@/composables/useUserSettings';

const { t } = useI18n();
const { settings } = useUserSettings();

const dialog = ref(false);
const isFullScreen = ref(false);

function toggleFullscreen() {
  isFullScreen.value = !isFullScreen.value;
}

const defaultAboutImg = new URL('../assets/img/jungle.png', import.meta.url)
  .href;
const aboutImageUrl = computed(
  () => settings.value.aboutImageUrl || defaultAboutImg,
);
const cvPdf = new URL('../assets/pdf/Roberto-Carcamo-CV.pdf', import.meta.url)
  .href;
</script>
