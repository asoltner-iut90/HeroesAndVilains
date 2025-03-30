export default {
    namespaced: true,
    state: {
        errorMessage: null,
    },
    mutations: {
        setErrorMessage(state, message) {
            state.errorMessage = message;
        },
        clearErrorMessage(state) {
            state.errorMessage = null;
        },
    },
    actions: {
        triggerError({ commit }, message) {
            commit("setErrorMessage", message);
        },
        clearError({ commit }) {
            commit("clearErrorMessage");
        },
    },
};