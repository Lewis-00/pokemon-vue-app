<script setup lang="ts">
import { ref, onMounted, watchEffect } from "vue";
import type { IGenericTypes } from "../../../utils/types";
import { capitalizeFirstLetter } from "../../../utils/methods";

// constantes
const ABILITY_LIMIT_RESULT = 20;

const emit = defineEmits(["searchPokemon", "abilityFilter"]);
const search = ref<string>("");
const listOfAbilities = ref<string[]>([]);
const abilitySelected = ref<string>("");

// Methods
const fetchPokemonAbility = async () => {
  const response = await fetch(
    `https://pokeapi.co/api/v2/ability/?limit=${ABILITY_LIMIT_RESULT}`
  );
  const ability = await response.json();
  listOfAbilities.value = await ability?.results?.map(
    (ability: IGenericTypes) => ability.name
  );
};

watchEffect(() => emit("searchPokemon", search.value));
watchEffect(() => emit("abilityFilter", abilitySelected.value));

onMounted(async () => {
  try {
    await fetchPokemonAbility();
  } catch (error) {
    console.log("OPS! Si è verificato un errore: ", error);
  }
});
</script>
<template>
  <div class="d-flex flex-row gap-3">
    <div class="mb-3 flex-grow-1">
      <input
        type="text"
        v-model="search"
        class="form-control"
        placeholder="Search Pokemon"
        aria-label="search-pokemon"
        aria-describedby="basic-addon1"
      />
    </div>
    <div class="flex-grow-1">
      <select
        class="form-select"
        v-model="abilitySelected"
        aria-label="Default select example"
      >
        <option value="" selected>Filter for ability</option>
        <option
          v-for="(ability, index) in listOfAbilities"
          :key="index"
          :value="ability"
        >
          {{ capitalizeFirstLetter(ability) }}
        </option>
      </select>
    </div>
  </div>
</template>
<style></style>
