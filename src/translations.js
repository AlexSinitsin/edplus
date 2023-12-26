import { createI18n } from "vue-i18n";
import { languages } from "./i18n";
import store from "./store";

console.log(store);
const messages = Object.assign(languages);

const i18n = createI18n({
  legacy: false,
  fallbackLocale: "en",
  globalInjection: true,
  locale: store.getters.lang,
  messages,
});

export default i18n;
