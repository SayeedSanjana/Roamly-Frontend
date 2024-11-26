import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Onboarding from "../views/Onboarding.vue";
import Dashboard from "../views/Dashboard.vue";
import Login from "../views/Login.vue";
import SignUp from "../views/SignUp.vue";
import Test from "../views/Test.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/onboard",
      name: "onboard",
      component: Onboarding,
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: Dashboard,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/signUp",
      name: "signUp",
      component: SignUp,
      props: true,
    },
    {
      path: "/test",
      name: "test",
      component: Test,
      props: true,
    },
  ],
});

export default router;
