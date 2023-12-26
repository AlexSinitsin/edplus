import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import i18n from "./translations";
import store from "./store";
//import { languages } from './i18n'
//import { defaultLocal } from './i18n'
import { useI18n } from "vue-i18n";
import "./scss/index.scss";

//const messages = Object.assign(languages)

const app = createApp(App, {
  data() {
    return {
      showModal: false,
    };
  },
  setup() {
    const { t } = useI18n();
    return { t };
  },
});
app.use(store).use(i18n).use(router).mount("#app");
