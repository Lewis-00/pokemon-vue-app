<script setup lang="ts">
import NavbarComponent from "./components/generics/NavbarComponent.vue";
import HomeComponent from "./components/HomeComponent.vue";
import PokemonList from "./components/PokemonList.vue";
import { ref, computed, type Component, onMounted } from "vue";

const routes: { [key: string]: Component } = {
  "/": HomeComponent,
  "/list": PokemonList,
};

const currentRoute = ref<string>("/");

const currentView = computed(() => {
  return routes[currentRoute.value] || "/";
});

onMounted(() => {
  const currentPathToMatch = window.location.pathname;
  if (currentPathToMatch !== currentRoute.value) {
    currentRoute.value = currentPathToMatch;
  }
});
</script>

<template>
  <div>
    <NavbarComponent />
    <component :is="currentView" />
  </div>
</template>

<style></style>
