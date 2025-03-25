import Vue from 'vue'
import Vuex from 'vuex'
import {createOrganisation, getAllOrganisationNames, getOrganisationByID, addTeam, removeTeam} from "@/services/org.service";
import {getAliases, getHeroByID, createHero, updateHero} from "@/services/hero.service";
import {getAllTeams, createTeam, addHeroes, removeHeroes} from "@/services/team.service";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    OrganisationPassword: '',
    HeroAliases: [],
    CurrentHero: null,
    Teams: [],
    CurrentTeam: null,
    OrganisationNames: [],
    CurrentOrganisation: null,
      HeroPowerTypes: ["force", "vitesse", "endurance", "magie", "effrayant", "furtivité", "stupidité"]
  },
  getters: {
  },
  mutations: {
    setOrganisationPassword(state, password){
      state.OrganisationPassword = password
    },
    setHeroAliases(state, aliases){
      state.HeroAliases = aliases
    },
    setCurrentHero(state, hero){
      state.CurrentHero = hero
    },
    setTeams(state, teams){
      state.Teams = teams
    },
    setCurrentTeam(state, team){
      state.CurrentTeam = team
    },
    setOrganisationNames(state, names){
      state.OrganisationNames = names
    },
    setCurrentOrganisation(state, org){
      state.CurrentOrganisation = org
    },
  },
  actions: {

    setOrganisationPassword({commit}, password){
        commit("setOrganisationPassword", password)
    },

    async getHeroAliases({commit}){
        console.log("STORE: Get all hero aliases")
        let result = null;
        try{
            result = await getAliases()
            if(result.error === 0){
                commit("setHeroAliases", result.data)
            }else{
                console.log(result.data)
            }
        }catch(err) {
            console.log("Cas anormal dans getHeroAliases()")
        }
    },

    async getHero({state}, heroId){
      console.log("STORE: Get hero by id")
        let secret = state.OrganisationPassword
        let result = null;
      try {
          result = await getHeroByID(heroId, secret)
        if(result.error === 0) {
          return result.data[0]
        }else{
            console.log(result.data)
        }
      }catch(err) {
        console.log("Cas anormal dans getHero() : " + err)
      }
    },

    async getTeams({commit}){
        console.log("STORE: Get all teams")
        let result = null;
        try{
            result = await getAllTeams()
            if(result.error === 0){
            commit("setTeams", result.data)
            }else{
            console.log(result.data)
            }
        }catch(err) {
            console.log("Cas anormal dans getTeams()")
        }
    },

    async getOrganisations({commit}){
      console.log("STORE: Get all organisation names")
      let result = null;
      try{
        result = await getAllOrganisationNames()
        if(result.error === 0){
          commit("setOrganisationNames", result.data)
        }else{
          console.log(result.data)
        }
      }catch(err) {
        console.log("Cas anormal dans getOrganisations()")
      }
    },

    async getOrganisation({commit}, data){
      console.log("STORE: Get organisation by id")
        let orgId = data.id
        let secret = data.secret
      let result = null;
      try{
        result = await getOrganisationByID(orgId, secret)
        if(result.error === 0){
          commit("setCurrentOrganisation", result.data[0])
        }else{
          console.log(result.data)
        }
      }catch(err) {
        console.log("Cas anormal dans getOrganisation()")
      }
    },

    async newOrganisation({commit, state}, data){
        console.log("STORE: Create new organisation")
        let name = data.name
        let secret = data.password
        let result = null;
        try{
            result = await createOrganisation(name, secret)
            if(result.error === 0){
                let organisations = state.OrganisationNames
                organisations.push(result.data)
                commit('setOrganisationNames', organisations)
            }else{
                console.log(result.data)
            }
        }catch(err) {
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

      async setCurrentTeam({commit, dispatch}, team){
        let current = JSON.parse(JSON.stringify(team))
        console.log("STORE: Set current team", team)
          try{
              for(let i = 0; i < team.members.length; i++){
                  let heroId = team.members[i]
                  let hero = await dispatch("getHero", heroId)
                    current.members[i] = hero
              }
              commit("setCurrentTeam", current)
          }catch(err){
                console.log("Cas anormal dans setCurrentTeam()")
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

    async createHero({dispatch}, hero){
        console.log("STORE: Create new hero")
        let result = null;
        try{
            result = await createHero(hero)
            if(result.error === 0){
                await dispatch("getHeroAliases")
                return result.data
            }else{
                console.log(result.data)
            }
        }catch(err) {
            console.log("Cas anormal dans createHero()")
        }
    },

    async updateHero({dispatch, state},  hero){
        console.log("STORE: Update hero", hero)
        let result = null;
        try{
            result = await updateHero(hero, state.OrganisationPassword)
            if(result.error === 0){
                if(state.CurrentTeam){
                    await dispatch("setCurrentTeam", state.CurrentOrganisation.teams.find(t => t._id === state.CurrentTeam._id))
                }
                await dispatch("getHeroAliases")
            }else{
                console.log(result.data)
            }
        }catch(err) {
            console.log("Cas anormal dans updateHero()", err)
        }
    }

  },





  modules: {

  }
})
