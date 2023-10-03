<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import type { IPokemon } from "src/utils/types.ts";
import { useRouter } from "vue-router";

const LIMIT = 150;
const router = useRouter();

const pokemonList = ref<IPokemon[]>([]);
const isLoading = ref<boolean>(false);

const search = ref<string>("");

const filteredPokemonList = computed(() => {
  return pokemonList.value.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(search.value.toLowerCase())
  );
});

const redirectToPokemonInfo = (pokemon: IPokemon) => {
  router.push({ name: "Pokemon-Info", params: { id: pokemon.id } });
};

onMounted(async () => {
  isLoading.value = true;
  for (let i = 1; i <= LIMIT; i++) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
    const pokemon = await response.json();
    const pokemonObject: IPokemon = {
      id: pokemon.id,
      name: pokemon.name,
      image: pokemon.sprites.front_default,
      types: pokemon.types.map((typeInfo: any) => typeInfo.type.name),
      abilities: pokemon.abilities.map(
        (abilityInfo: any) => abilityInfo.ability.name
      ),
    };
    pokemonList.value.push(pokemonObject);
  }
  isLoading.value = false;
});
</script>
<template>
  <div
    v-if="isLoading"
    class="d-flex justify-content-center align-items-center gap-3 mt-3"
  >
    <h1>Loading...</h1>
    <div class="spinner-border" role="status"></div>
  </div>

  <div v-else class="container text-center">
    <div class="input-group mb-3">
      <input
        type="text"
        v-model="search"
        class="form-control"
        placeholder="Search Pokemon"
        aria-label="search-pokemon"
        aria-describedby="basic-addon1"
      />
    </div>

    <div class="row">
      <div
        v-for="pokemon in filteredPokemonList"
        :key="pokemon.id"
        class="col-3"
      >
        <div class="card mt-3">
          <img :src="pokemon.image" class="card-img-top" :alt="pokemon.name" />
          <div class="card-body">
            <h5 class="card-title">{{ pokemon.name }}</h5>
            <button
              type="button"
              @click="redirectToPokemonInfo(pokemon)"
              class="btn btn-info"
            >
              Info
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
