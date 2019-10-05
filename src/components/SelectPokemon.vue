<template>
  <div>
    <h1>Select Your Pokemon</h1>
    <template v-for="p in allPokemon">
      {{ p.id }}
    </template>
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
