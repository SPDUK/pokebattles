<template>
  <div>
    <h1>Select Your Pokemon</h1>
    <div v-for="p in allPokemon" :key="p.id">
      {{ p.id }}
      {{ p.name }}
      <img :src="p.sprites['front_default']" :alt="p.name" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  computed: mapGetters(["allPokemon"]),
  methods: {
    ...mapActions(["fetchAllPokemon"])
  },
  created() {
    this.fetchAllPokemon();
  }
};
</script>

<style></style>
