import { languages } from "../../i18n";

const state = {
  lang: "en",
  fullLang: languages,
};

const mutations = {
  setLang(state, lang) {
    state.lang = lang;
  },
};

const actions = {};

const getters = {
  lang: (state) => state.lang,
  fullLang: (state) => Object.entries(state.fullLang),
};

export default {
  state,
  mutations,
  actions,
  getters,
};
