import i18n from "../../translations";

const state = {
  error: null,
};

const mutations = {
  setError(state, error) {
    switch (error) {
      case "UserExists":
        state.error = i18n.global.t("errors.userExists");
        break;
      case "ConfirmEmail":
        state.error = i18n.global.t("errors.ConfirmEmail");
        break;
      case "NotAuth":
        state.error = i18n.global.t("errors.NotAuth");
        break;
      case "NoUser":
        state.error = i18n.global.t("errors.NoUser");
        break;
      case "UserNotFound":
        state.error = i18n.global.t("errors.UserNotFound");
        break;
      default:
        state.error = error;
        break;
    }
  },
  cleanError(state) {
    state.error = null;
  },
};

const actions = {};

const getters = {
  error: (state) => state.error,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
