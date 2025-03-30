import {getRequest, postRequest, putRequest, authAxiosAgent} from "@/services/axios.service"

async function getAliasesFromAPI(){
    return getRequest("/heroes/getaliases", "getAliases")
}
async function getAliases() {
    return await getAliasesFromAPI()
}

async function createHeroFromAPI(hero){
    return await postRequest("/heroes/create", hero, "createHero")
}
async function createHero(hero){
    return await createHeroFromAPI(hero)
}

async function updateHeroFromAPI(hero, secret){
    return await putRequest("/heroes/update", hero, "updateHero", {"params": {"org-secret": secret}})
}
async function updateHero(hero, secret){
    return await updateHeroFromAPI(hero, secret)
}

async function getHeroByIDFromAPI(id, secret){
    return await getRequest(`/heroes/getbyid/${id}`, "getHeroByID", {"params": {"org-secret": secret}})
}
async function getHeroByID(id, secret){
    return await getHeroByIDFromAPI(id, secret)
}

async function authUpdateHeroFromAPI(hero) {
    return await authAxiosAgent.put("/heroes/authupdate", hero, "authUpdateHero");
}

async function authUpdateHero(hero) {
    return await authUpdateHeroFromAPI(hero);
}

export {
    getAliases,
    createHero,
    updateHero,
    getHeroByID,
    authUpdateHero,
}