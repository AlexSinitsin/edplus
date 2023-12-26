import Auth from "@/api/Auth";
import instance from "../../http";
//import axios from 'axios'

const state = {
  user: {},
  token: "",
  isAuth: false,
};

const mutations = {
  setToken(state, token) {
    state.token = token;
  },
  setUser(state, user) {
    state.user = user;
  },
  setIsAuth(state, bool) {
    state.isAuth = bool;
  },
};

const actions = {
  AUTH: async ({ commit }, auth) => {
    commit("setLoading", true);
    commit("cleanError");

    try {
      const { data } = await Auth.auth(auth);

      commit("setToken", data.token);
      commit("setIsAuth", true);

      //localStorage.setItem('userId', data.data.id);

      return true;
    } catch (e) {
      if (/403/.test(e.message)) {
        commit("setError", e.response.data.message);
        return;
      }
      commit("setError", e.message);
    } finally {
      commit("setLoading", false);
    }
  },
  REGISTRATION: async ({ commit }, user) => {
    commit("setLoading", true);
    commit("cleanError");

    try {
      //http.defaults.headers.common['Authorization'] = 'Bearer ' + getters.token
      await Auth.registrtion(user);

      return true;
    } catch (e) {
      if (/500/.test(e.message)) {
        alert(e.response.data.message);
        commit("setError", e.response.data.message);
        // new Error("111");
        return false;
      }
      commit("setError", e.message);
      return false;
    }
  },
  GET_USER: async ({ commit, getters }) => {
    commit("setLoading", true);
    commit("cleanError");

    try {
      console.log(getters.token);
      instance.defaults.headers.common["Authorization"] = getters.token;
      const { data } = await Auth.getUser();

      console.log(data);
      commit("setUser", data.user);

      return true;
    } catch (e) {
      if (/403/.test(e.message)) {
        commit("setError", e.response.data.message);
        return;
      }
      commit("setError", e.message);
    } finally {
      commit("setLoading", false);
    }
  },
  LOG_OUT: async ({ commit }, auth) => {
    commit("setLoading", true);
    commit("cleanError");

    try {
      const { data } = await Auth.auth(auth);

      commit("setToken", data.token);
      commit("setIsAuth", true);

      //localStorage.setItem('userId', data.data.id);

      return true;
    } catch (e) {
      if (/403/.test(e.message)) {
        commit("setError", e.response.data.message);
        return;
      }
      commit("setError", e.message);
    } finally {
      commit("setLoading", false);
    }
  },
  UPDATE_ACCOUNT: async ({ commit, dispatch }, user) => {
    commit("setLoading", true);
    commit("cleanError");

    try {
      await Auth.update(user);
      dispatch("GET_USER");

      return true;
    } catch (e) {
      if (/403/.test(e.message)) {
        commit("setError", e.response.data.message);
        return;
      }
      commit("setError", e.message);
    } finally {
      commit("setLoading", false);
    }
  },
  GET_SET_AVATAR: async ({ commit, dispatch }, avatar) => {
    commit("setLoading", true);
    commit("cleanError");

    try {
      await Auth.avatar(avatar);
      dispatch("GET_USER");

      return true;
    } catch (e) {
      if (/403/.test(e.message)) {
        commit("setError", e.response.data.message);
        return;
      }
      commit("setError", e.message);
    } finally {
      commit("setLoading", false);
    }
  },
  RECOVERY: async ({ commit }, email) => {
    commit("setLoading", true);
    commit("cleanError");

    try {
      await Auth.recovery(email);

      return true;
    } catch (e) {
      if (/500/.test(e.message)) {
        commit("setError", e.response.data.message);
        return;
      }
      commit("setError", e.message);
    } finally {
      commit("setLoading", false);
    }
  },
};

const getters = {
  isAuth: (state) => state.isAuth,
  userId: (state) => state.userId,
  token: (state) => state.token,
  user: (state) => state.user,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
