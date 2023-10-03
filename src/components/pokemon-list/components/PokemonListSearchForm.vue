<script setup lang="ts">
import { ref, defineEmits, onUpdated } from "vue";
const emit = defineEmits(["searchPokemon"]);
const search = ref<string>("");

onUpdated(() => {
  emit("searchPokemon", search.value);
});
</script>
<template>
  <div>
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
  </div>
</template>
<style></style>
