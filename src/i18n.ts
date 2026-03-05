import { createI18n } from 'vue-i18n';
import en from './locales/en.json';
import es from './locales/es.json';
import sv from './locales/sv.json';
import zh from './locales/zh.json';
import ar from './locales/ar.json';
import de from './locales/de.json';
import hi from './locales/hi.json';
import pt from './locales/pt.json';
import no from './locales/no.json';
import da from './locales/da.json';
import fi from './locales/fi.json';
import fr from './locales/fr.json';
import ti from './locales/ti.json';
import sw from './locales/sw.json';
import ja from './locales/ja.json';
import ko from './locales/ko.json';
import id from './locales/id.json';
import arn from './locales/arn.json';
import ru from './locales/ru.json';
import ur from './locales/ur.json';
import uk from './locales/uk.json';
import bn from './locales/bn.json';

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
    hi,
    pt,
    no,
    da,
    fi,
    fr,
    ti,
    sw,
    ja,
    ko,
    id,
    arn,
    ru,
    ur,
    uk,
    bn,
  },
});
