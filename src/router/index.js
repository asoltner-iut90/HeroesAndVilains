import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Organisations from '../views/OrganisationsView.vue'
import Organisation from "@/views/OrganisationView.vue";
import TeamView from "@/views/TeamView.vue";
import TeamsView from "@/views/TeamsView.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/organisations',
    name: 'Organisations',
    component: Organisations
  },
  {
    path: '/organisation',
    name: 'Organisation',
    component: Organisation
  },
  {
    path: '/teams',
    name: 'Teams',
    component: TeamsView
  },
  {
    path: '/team',
    name: 'Team',
    component: TeamView
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
