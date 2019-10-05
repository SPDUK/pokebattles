<template>
  <div>
    <h1>Select Your Pokemon</h1>

    <v-autocomplete
      label="Search for a Pokemon"
      :items="allPokemonNames"
      :filter="activeFilter"
      filled
      rounded
      no-data-text="No Pokemon found"
      @change="handleSearchChange"
    ></v-autocomplete>
    <carousel-3d ref="pokeCarousel" width="250">
      <template v-for="(p, i) in allPokemon">
        <slide class="slide" :key="p.id" :index="i">
          <h2>
            {{ capitalize(p.name) }}
          </h2>
          <img
            class="poke-image"
            :src="p.sprites['front_default']"
            :alt="p.name"
          />
        </slide>
      </template>
    </carousel-3d>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { Carousel3d, Slide } from "vue-carousel-3d";
export default {
  name: "SelectPokemon",
  data() {
    return {
      search: null,
      filters: [
        {
          value: 0,
          fn: (item, queryText) => item.indexOf(queryText) > -1,
          text: "Exact Match"
        },
        {
          value: 1,
          fn: (item, queryText) =>
            queryText.length > 2 && item.toLowerCase().indexOf(queryText) > -1,
          text: "Search Length > 2 & Loose Match"
        }
      ]
    };
  },
  components: {
    Slide,
    Carousel3d
  },
  computed: {
    ...mapGetters(["allPokemon", "allPokemonNames", "findPokemonByName"]),
    activeFilter() {
      if (this.search == null) return undefined;
      return this.filters[this.model].fn;
    }
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

<style></style>
