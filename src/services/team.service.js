import {getRequest, postRequest, patchRequest} from "@/services/axios.service"

async function getAllTeamsFromAPI(){
    return getRequest("/teams/get", "getAllTeams")
}
async function getAllTeams() {
    return await getAllTeamsFromAPI()
}

async function createTeamFromAPI(name){
    return await postRequest("/teams/create", {name}, "createTeam")
}
async function createTeam(name){
    return await createTeamFromAPI(name)
}

async function addHeroesFromAPI(idTeam, idHeroes){
    return await patchRequest("/teams/addheroes", {idTeam, idHeroes}, "addHeroes")
}
async function addHeroes(idTeam, idHeroes){
    return await addHeroesFromAPI(idTeam, idHeroes)
}

async function removeHeroesFromAPI(idTeam, idHeroes){
    return await patchRequest("/teams/removeheroes", {idTeam, idHeroes}, "removeHeroes")
}
async function removeHeroes(idTeam, idHeroes){
    return await removeHeroesFromAPI(idTeam, idHeroes)
}



export {
    getAllTeams,
    createTeam,
    addHeroes,
    removeHeroes
}