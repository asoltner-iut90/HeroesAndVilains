import { signIn, getUser, registerUser } from "@/services/auth.service";
import { authUpdateHero } from "@/services/hero.service";

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
    async updateHero({ state }, hero) {
      if (!state.isAuthenticated) {
        console.log("User is not authenticated.");
        return false;
      }
      try {
        const result = await authUpdateHero(hero);
        if (result.error === 0) {
          console.log("Hero updated successfully:", result.data);
          return true;
        } else {
          console.log("Error updating hero:", result.data);
          return false;
        }
      } catch (err) {
        console.log("Error in updateHero:", err);
        return false;
      }
    },
    async registerUser(_, { login, password, hero, captchaToken }) {
      const result = await registerUser(login, password, hero, captchaToken);
      return result;
    },
    logout({ commit }) {
      commit("setAuthentication", { isAuthenticated: false, xsrfToken: null });
      commit("setUser", null);
    },
  },
};