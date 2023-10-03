<script setup lang="ts">
import { onMounted, reactive } from "vue";
import { useRoute } from "vue-router";

const { params } = useRoute();
const id = params.id;

const currentPokemonToDisplay = reactive({
  id: 0,
  name: "",
  image: "",
  types: [],
  abilities: [],
});

onMounted(async () => {
  const fetchPokemonInfo = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${id}`
  );
  const pokemonInfo = await fetchPokemonInfo.json();
  currentPokemonToDisplay.id = pokemonInfo.id;
  currentPokemonToDisplay.name = pokemonInfo.name;
  currentPokemonToDisplay.image = pokemonInfo.sprites.front_default;
  currentPokemonToDisplay.types = pokemonInfo.types.map(
    (typeInfo: any) => typeInfo.type.name
  );
  currentPokemonToDisplay.abilities = pokemonInfo.abilities.map(
    (abilityInfo: any) => abilityInfo.ability.name
  );
});
</script>
<template>
  <div
    class="d-flex flex-column align-items-center mt-3 justify-content-center"
  >
    <h1>Pokemon Info</h1>
    <div class="card" style="width: 18rem">
      <img
        :src="currentPokemonToDisplay.image"
        class="card-img-top"
        :alt="currentPokemonToDisplay.name"
      />
      <div class="card-body">
        <h2 class="card-text">Name: {{ currentPokemonToDisplay.name }}</h2>
        <p class="card-text">
          <span class="text-bold">Types</span>:
          {{ currentPokemonToDisplay.types.join(", ") }}
        </p>
        <p class="card-text">
          <b>Abilities</b>: {{ currentPokemonToDisplay.abilities.join(", ") }}
        </p>
      </div>
    </div>
  </div>
</template>

<style>
.text-bold {
  font-weight: bold;
}
</style>
