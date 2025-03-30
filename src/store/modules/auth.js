import { signIn, getUser } from "@/services/auth.service";

export default {
  namespaced: true,
  state: {
    isAuthenticated: false,
    xsrfToken: null,
    user: null,
  },
  mutations: {
    setAuthentication(state, { isAuthenticated, xsrfToken }) {
      state.isAuthenticated = isAuthenticated;
      state.xsrfToken = xsrfToken;
      if (xsrfToken) {
        localStorage.setItem("xsrfToken", xsrfToken);
      } else {
        localStorage.removeItem("xsrfToken");
      }
    },
    setUser(state, user) {
      state.user = user;
    },
  },
  actions: {
    async login({ commit }, { login, password }) {
      const result = await signIn(login, password);
      if (result.error === 0) {
        commit("setAuthentication", { isAuthenticated: true, xsrfToken: result.data.xsrfToken });
        return true;
      } else {
        commit("setAuthentication", { isAuthenticated: false, xsrfToken: null });
        return false;
      }
    },
    async fetchUser({ commit }, login) {
      const result = await getUser(login);
      if (result.error === 0) {
        commit("setUser", result.data);
      } else {
        commit("setUser", null);
      }
    },
    logout({ commit }) {
      commit("setAuthentication", { isAuthenticated: false, xsrfToken: null });
      commit("setUser", null);
    },
  },
};