import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import errors from "@/store/modules/errors";
import auth from "@/store/modules/auth";
import lang from "@/store/modules/lang";

export default createStore({
  state: {
    isLoading: false,
  },
  getters: {
    isLoading: (state) => state.isLoading,
  },
  mutations: {
    setLoading(state, isLoading) {
      state.isLoading = isLoading;
    },
  },
  actions: {},
  modules: {
    errors,
    auth,
    lang,
  },
  plugins: [
    createPersistedState({
      key: "edplus",
      paths: ["errors", "auth", "lang"],
    }),
  ],
});
