import {getRequest, postRequest, patchRequest} from "@/services/axios.service"

async function getAllOrganisationNamesFromAPI(){
    return getRequest("/orgs/get", "getAllOrganisationNames")
}
async function getAllOrganisationNames() {
    return await getAllOrganisationNamesFromAPI()
}

async function createOrganisationFromAPI(name, secret){
    return await postRequest("/orgs/create", {name, secret}, "createOrganisation")
}
async function createOrganisation(name, secret){
    return await createOrganisationFromAPI(name, secret)
}

async function addTeamFromAPI(idTeam, secret){
    return await patchRequest("/orgs/addteam", {idTeam}, "addTeam", {"params": {"org-secret": secret}}, )
}
async function addTeam(idTeam, secret){
    return await addTeamFromAPI(idTeam, secret)
}

async function removeTeamFromAPI(idTeam, secret){
    return await patchRequest("/orgs/removeteam", {idTeam}, "removeTeam",{"params": {"org-secret": secret}} )
}
async function removeTeam(idTeam, secret){
    return await removeTeamFromAPI(idTeam, secret)
}

async function getOrganisationByIDFromAPI(id, secret){
    return await getRequest(`/orgs/getbyid/${id}`, "getOrganisationByID", {"params": {"org-secret": secret}})
}
async function getOrganisationByID(id, secret){
    return await getOrganisationByIDFromAPI(id, secret)
}



export {
    getAllOrganisationNames,
    createOrganisation,
    addTeam,
    removeTeam,
    getOrganisationByID
}