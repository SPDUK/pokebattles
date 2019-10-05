<template>
  <div>
    <h1>Select Your Pokemon</h1>
    <h3 v-if="pokemonLoading">Loading...</h3>
    <template v-else>
      <v-autocomplete
        label="Search for a Pokemon"
        :items="allPokemonNames"
        filled
        rounded
        no-data-text="No Pokemon found"
        @change="handleSearchChange"
      ></v-autocomplete>
      <carousel-3d ref="pokeCarousel" height="350" width="250">
        <template v-for="(p, i) in allPokemon">
          <slide class="pokemon-card" :key="p.id" :index="i">
            <h4>
              {{ capitalize(p.name) }}
            </h4>
            <img
              class="poke-image"
              :src="p.sprites['front_default']"
              :alt="p.name"
            />
          </slide>
        </template>
      </carousel-3d>
    </template>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { Carousel3d, Slide } from "vue-carousel-3d";
export default {
  name: "SelectPokemon",
  data() {
    return {
      search: null
    };
  },
  components: {
    Slide,
    Carousel3d
  },
  computed: {
    ...mapGetters(["allPokemon", "allPokemonNames", "pokemonLoading"])
  },
  methods: {
    ...mapActions(["fetchAllPokemon"]),
    capitalize(name) {
      return name[0].toUpperCase(0).concat(name.slice(1));
    },
    goToSlide(index) {
      this.$refs.mycarousel.goSlide(index);
    },
    handleSearchChange(pokemon) {
      if (!pokemon) return;
      const pokemonIdx = this.$store.state.pokemon.findIndex(
        p => p.name === pokemon
      );
      console.log(pokemonIdx);
      this.$refs.pokeCarousel.goSlide(pokemonIdx);
    }
  },
  created() {
    this.fetchAllPokemon();
  }
};
</script>

<style>
.pokemon-card {
  border-radius: 5px;
  border: 10px solid#FFCB05 !important; /* have to use important to avoid library problems */
  background-color: #e7ba77;
}
</style>
