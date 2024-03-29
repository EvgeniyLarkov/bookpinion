import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from './locales/translations';

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: ['en', 'ru'],
    fallbackLng: ['en', 'ru'],
    debug: process.env.NODE_ENV === 'development',

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
