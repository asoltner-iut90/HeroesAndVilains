import Vue from "vue";
import Vuex from "vuex";
import auth from "./modules/auth";
import general from "./modules/general";
import errors from "./modules/errors";
import secret from "./modules/secret";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    general,
    errors,
    secret,
    auth,
  },
});