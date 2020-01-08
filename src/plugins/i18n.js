/* eslint-disable */

import Vue from 'vue';
import VueI18n from 'vue-i18n';
import axios from 'axios';
import messages from '@/assets/langs';

// i18n
Vue.use(VueI18n);
const i18n = new VueI18n({
  locale: process.env.VUE_APP_DEFAULT_LOCALE,
  fallbackLocale: process.env.VUE_APP_FALLBACK_LOCALE,
  messages,
});

// i18n Service
const i18nService = {
  install(Vue) {
    const service = {};

    service.setLanguage = (lang) => {
      document.documentElement.setAttribute('lang', lang);
      axios.defaults.headers.common['Accept-Language'] = lang;
      i18n.locale = lang;
    };

    Vue.prototype.$i18nService = service;
  },
};
Vue.use(i18nService);

export default i18n;
