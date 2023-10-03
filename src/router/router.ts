import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../components/HomeComponent.vue"),
  },
  {
    path: "/list",
    name: "Pokemon-List",
    component: () => import("../components/pokemon-list/PokemonList.vue"),
  },
  {
    path: "/pokemon/info/:id",
    name: "Pokemon-Info",
    component: () => import("../components/PokemonInfo.vue"),
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
