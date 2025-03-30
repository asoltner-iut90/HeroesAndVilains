export default {
    namespaced: true,
    state: {
        OrganisationPassword: "",
    },
    mutations: {
        setOrganisationPassword(state, password) {
            state.OrganisationPassword = password;
        },
    },
    actions: {
        setOrganisationPassword({ commit }, password) {
            commit("setOrganisationPassword", password);
        },
    },
};
