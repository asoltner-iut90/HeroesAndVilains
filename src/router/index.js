import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import OrganisationsView from "../views/OrganisationsView.vue";
import OrganisationView from "@/views/OrganisationView.vue";
import TeamView from "@/views/TeamView.vue";
import TeamsView from "@/views/TeamsView.vue";
import AuthentificationView from "@/views/AuthentificationView.vue";
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import store from "@/store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView
  },
  {
    path: "/auth",
    name: "auth",
    component: AuthentificationView,
  },
  {
    path: "/organisations",
    name: "organisations",
    component: OrganisationsView,
    meta: { requiresAuth: true }, 
  },
  {
    path: "/organisation",
    name: "organisation",
    component: OrganisationView,
    meta: { requiresAuth: true }, 
  },
  {
    path: "/teams",
    name: "teams",
    component: TeamsView,
    meta: { requiresAuth: true }, 
  },
  {
    path: "/team",
    name: "team",
    component: TeamView,
    meta: { requiresAuth: true },
  },
  {
    path: "*", 
    redirect: "/",
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const isAuthenticated = store.state.auth.isAuthenticated;

  if (requiresAuth && !isAuthenticated) {
    next({ name: "login" });
  } else {
    next();
  }
});

export default router;
