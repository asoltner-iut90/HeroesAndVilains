
import {createOrganisation, getAllOrganisationNames, getOrganisationByID, addTeam, removeTeam} from "@/services/org.service";
import {getAliases, getHeroByID, createHero, updateHero} from "@/services/hero.service";
import {getAllTeams, createTeam, addHeroes, removeHeroes} from "@/services/team.service";

export default {
    namespaced: true,
    state: {
        HeroAliases: [],
        CurrentHero: null,
        Teams: [],
        CurrentTeam: null,
        OrganisationNames: [],
        CurrentOrganisation: null,
        HeroPowerTypes: [
            "force",
            "vitesse",
            "endurance",
            "magie",
            "effrayant",
            "furtivité",
            "stupidité",
        ],
    },
    mutations: {
        setOrganisationPassword(state, password){
            state.OrganisationPassword = password;
        },
        setHeroAliases(state, aliases) {
            state.HeroAliases = aliases;
        },
        setCurrentHero(state, hero) {
            state.CurrentHero = hero;
        },
        setTeams(state, teams) {
            state.Teams = teams;
        },
        setCurrentTeam(state, team) {
            state.CurrentTeam = team;
            console.log("Updated members array:", state.CurrentTeam);
        },
        setOrganisationNames(state, names) {
            state.OrganisationNames = names;
        },
        setCurrentOrganisation(state, org) {
            state.CurrentOrganisation = org;
        },
    },
    actions: {
        async getHeroAliases({ commit }) {
            console.log("STORE: Get all hero aliases")
            try {
                let result = await getAliases();
                if (result.error === 0) {
                    commit("setHeroAliases", result.data);
                } else {
                    console.log(result.data)
                }
            } catch (err) {
                console.log("Cas anormal dans getHeroAliases()")
            }
        },

        async getHero({state}, heroId){
            console.log("STORE: Get hero by id")
            try {
                let result = await getHeroByID(heroId);
                if (result.error === 0) {
                    state.CurrentHero = result.data;
                } else {
                    console.log(result.data)
                }
            } catch (err) {
                console.log("Cas anormal dans getHero() : " + err)
            }
        },

        async getTeams({ commit }) {
            console.log("STORE: Get all teams")
            try {
                let result = await getAllTeams();
                if (result.error === 0) {
                    commit("setTeams", result.data);
                } else {
                    console.log(result.data)
                }
            } catch (err) {
                console.log("Cas anormal dans getTeams()")
            }
        },

        async getOrganisations({ commit }) {
            console.log("STORE: Get all organisation names")
            try {
                let result = await getAllOrganisationNames();
                if (result.error === 0) {
                    commit("setOrganisationNames", result.data);
                } else {
                    console.log(result.data)
                }
            } catch (err) {
                console.log("Cas anormal dans getOrganisations()")
            }
        },

        async getOrganisation({ commit }, data) {
            console.log("STORE: Get organisation by id")
            try {
                let result = await getOrganisationByID(data.id, data.secret);
                if (result.error === 0) {
                    commit("setCurrentOrganisation", result.data[0]);
                } else {
                    console.log(result.data)
                }
            } catch (err) {
                console.log("Cas anormal dans getOrganisation()")
            }
        },

        async newOrganisation({commit, state}, data) {
            console.log("STORE: Create new organisation")
            let name = data.name
            let secret = data.password
            let result = null;
            try {
                result = await createOrganisation(name, secret);
                if(result.error === 0) {
                    let organisations = state.OrganisationNames
                    organisations.push(result.data)
                    commit('setOrganisationNames', organisations)
                }else{
                    console.log(result.data)
                }
            } catch(err) {
                console.log("Cas anormal dans newOrganisation()")
            }
        },

        async addTeamToOrganisation({commit, state}, data){
            console.log("STORE: Add new team")
            let idTeam = data.idTeam
            let name = data.nameTeam
            let result = null;
            try{
                result = await addTeam(idTeam,state.OrganisationPassword)
                if(result.error === 0) {
                    let org = state.CurrentOrganisation
                    let team = result.data.teams.find(t => t._id === idTeam)
                    team.name = name
                    org.teams.push(team)
                    commit("setCurrentOrganisation", org)
                }else{
                    console.log(result.data)
                }
            }catch(err) {
                console.log("Cas anormal dans addTeamToOrganisation(): " + err)
            }
        },

        async removeTeamFromOrganisation({commit, state}, data){
            console.log("STORE: Remove team")
            let idTeam = data.idTeam
            let result = null;
            try{
                result = await removeTeam(idTeam,state.OrganisationPassword)
                if(result.error === 0) {
                    commit("setCurrentOrganisation", result.data)
                }else{
                    console.log(result.data)
                }
            }catch(err) {
                console.log("Cas anormal dans removeTeamFromOrganisation(): " + err)
            }
        },

        async setCurrentTeam({ commit }, team) {
            console.log("Original team members:", team.members); 
            let current = JSON.parse(JSON.stringify(team)); 
            try {
                for (let i = 0; i < team.members.length; i++) {
                    let heroId = team.members[i];
                    console.log(`Fetching hero with ID: ${heroId}`); 
                    let result = await getHeroByID(heroId); 
                    if (result.error === 0) {
                        const hero = result.data[0]; 
                        console.log(`Fetched hero data for ID ${heroId}:`, hero); 
                        current.members[i] = hero; 
                    } else {
                        console.log(`Error fetching hero with ID ${heroId}:`, result.data);
                    }
                }
                console.log("Updated team members with hero data:", current.members); 
                commit("setCurrentTeam", current); 
            } catch (err) {
                console.log("Error in setCurrentTeam:", err);
            }
        },

        async createTeam({commit, state}, data){
            console.log("STORE: Create new team")
            let name = data.name
            let result = null;
            try{
                result = await createTeam(name)
                if(result.error === 0){
                    let teams = state.Teams
                    teams.push(result.data)
                    commit('setTeams', teams)
                }else{
                    console.log(result.data)
                }
            }catch(err) {
                console.log("Cas anormal dans createTeam()")
            }
        },

        async addHeroesToTeam({dispatch}, data){
            console.log("STORE: Add heroes to team")
            let idTeam = data.idTeam
            let heroes = data.heroes
            let result = null;
            try{
                result = await addHeroes(idTeam, heroes)
                if(result.error === 0){
                    await dispatch("setCurrentTeam", result.data)
                }else{
                    console.log(result.data)
                }
            }catch(err) {
                console.log("Cas anormal dans addHeroesToTeam()")
            }
        },
    
          async removeHeroesFromTeam({dispatch}, data){
            console.log("STORE: Remove heroes from team")
            let idTeam = data.idTeam
            let heroes = data.heroes
            let result = null;
            try{
                result = await removeHeroes(idTeam, heroes)
                if(result.error === 0){
                    await dispatch("setCurrentTeam", result.data)
                }else{
                    console.log(result.data)
                }
            }catch(err) {
                console.log("Cas anormal dans removeHeroesFromTeam()")
            }
        },

        async createHero({ dispatch }, hero) {
            try {
                let result = await createHero(hero);
                if (result.error === 0) {
                    await dispatch("getHeroAliases");
                    return result.data;
                } else {
                    console.log(result.data)
                }
            } catch (err) {
                console.log("Cas anormal dans createHero()")
            }
        },

        async updateHero({ dispatch, state }, hero) {
            try {
                let result = await updateHero(hero, state.OrganisationPassword);
                if (result.error === 0) {
                    if (state.CurrentTeam) {
                        await dispatch(
                            "setCurrentTeam",
                            state.CurrentOrganisation.teams.find(
                                (t) => t._id === state.CurrentTeam._id
                            )
                        );
                    }
                    await dispatch("getHeroAliases");
                } else {
                    console.log(result.data)
                }
            } catch (err) {
                console.log("Cas anormal dans updateHero()", err)
            }
        },
    },
};
