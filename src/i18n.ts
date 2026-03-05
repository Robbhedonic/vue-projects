import { createI18n } from 'vue-i18n';
import en from './locales/en.json';
import es from './locales/es.json';
import sv from './locales/sv.json';
import zh from './locales/zh.json';
import ar from './locales/ar.json';
import de from './locales/de.json';

export const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en,
    es,
    sv,
    zh,
    ar,
    de,
  },
});
