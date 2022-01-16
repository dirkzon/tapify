import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Landing from "../views/LandingPage.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "LandingPage",
    component: Landing,
  },
  {
    path: "/callback",
    name: "Callback",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Callback.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
