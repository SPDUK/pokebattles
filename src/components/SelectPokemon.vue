<template>
  <div>
    <h1 v-if="!pokemonLoading">Select Your Pokemon</h1>
    <loading-spinner v-if="pokemonLoading"></loading-spinner>
    <template v-else>
      <v-autocomplete
        class="search-bar"
        label="Search for a Pokemon"
        :items="allPokemonNames"
        filled
        rounded
        no-data-text="No Pokemon found"
        @change="handleSearchChange"
      ></v-autocomplete>
      <carousel-3d ref="pokeCarousel" height="350" width="250">
        <template v-for="(p, i) in allPokemon">
          <slide
            class="pokemon-card"
            :key="p.id"
            :index="i"
            :style="getBackgroundColor(p.types)"
          >
            <h4>
              {{ p.name }}
            </h4>
            <v-card
              :elevation="5"
              width="100%"
              height="150"
              class="pokemon-image"
            >
              <img :src="p.sprites['front_default']" :alt="p.name" />
            </v-card>
            <div class="pokemon-info">
              Length: {{ getHeight(p.height) }}, Weight:
              {{ getWeight(p.weight) }}.
            </div>
            <div v-for="n in p.moves.slice(0, 4).length" :key="n">
              <span class="pokemon-ability">
                <span class="pokemon-ability-icon"></span>
                {{ getMove(p.moves[n - 1]) }}
              </span>
            </div>
          </slide>
        </template>
      </carousel-3d>
      <v-btn
        color="primary"
        @click="selectPokemon($refs.pokeCarousel.currentIndex)"
      >
        Select Pokemon
      </v-btn>
    </template>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { Carousel3d, Slide } from "vue-carousel-3d";
import LoadingSpinner from "./LoadingSpinner";
export default {
  name: "SelectPokemon",
  data() {
    return {
      search: null
    };
  },
  components: {
    Slide,
    Carousel3d,
    LoadingSpinner
  },
  computed: {
    ...mapGetters(["allPokemon", "allPokemonNames", "pokemonLoading"])
  },
  methods: {
    ...mapActions(["fetchAllPokemon", "selectPokemon"]),
    handleSearchChange(pokemon) {
      if (!pokemon) return;
      const pokemonIdx = this.$store.state.pokemon.findIndex(
        p => p.name === pokemon
      );
      this.$refs.pokeCarousel.goSlide(pokemonIdx);
    },
    getHeight(h) {
      if (h < 10) return `0.${h}m`;

      return h
        .toString()
        .split("")
        .join(".")
        .concat("m");
    },
    getWeight(w) {
      if (w < 10) return `0.${w}kg`;
      const split = w.toString().split("");

      // kgs is all but the last number
      const kgs = split.slice(0, split.length - 1).join("");
      // the decimal place is the last number, if it's 0 just return the kgs, else add the decimal place
      const decimals = split[split.length - 1];
      const weight = decimals === "0" ? `${kgs}kg` : `${kgs}.${decimals}kg`;

      return weight;
    },
    getMove(move) {
      return move.name || "Attack";
    },
    getBackgroundColor(types) {
      // types: [{ type: { name: "grass" } }]

      const basicTypes = {
        fire: "#e6374b",
        grass: "#6cf569",
        water: "#69a3f5",
        electric: "#e9f268",
        normal: "#cccccc",
        psychic: "#e164e8",
        rock: "#804c2a",
        ice: "#61faf2"
      };
      const secondaryTypes = {
        fighting: "#804c2a",
        ground: "#804c2a",
        dragon: "#f5ebf1",
        fairy: "#f2cee3",
        poison: "#e08ff2",
        bug: "#8be098"
      };

      // check if type.name exists in hash
      const validBasicType = types.find(({ type }) => basicTypes[type.name]);

      // split into if, if there is a basic type we want to use that (eg grass takes priority over poison)
      if (validBasicType) {
        return { backgroundColor: basicTypes[validBasicType.type.name] };
      }

      const validSecondaryType = types.find(
        ({ type }) => secondaryTypes[type.name]
      );
      return {
        backgroundColor: secondaryTypes[validSecondaryType.type.name]
      };
    }
  },
  created() {
    this.fetchAllPokemon();
  }
};
</script>

<style scoped>
.search-bar {
  margin: 0 auto !important;
  max-width: 400px !important;
}
.pokemon-card {
  border-radius: 5px;
  border: 10px solid#FFCB05 !important; /* have to use important to avoid library problems */
  background-color: #e7ba77;
  padding: 15px;
  color: black;
  margin: 0 auto;
}
.pokemon-image {
  border: 3px solid #ffcb05;
  background: rgba(255, 255, 255, 0.3) !important;
}
.pokemon-image img {
  width: 200px;
  height: 150px;
}
.pokemon-info {
  background-color: #ffcb05;
  width: 90%;
  font-size: 0.625em;
  margin: 3px auto 10px auto;
  text-align: center;
  font-weight: 600;
  font-style: italic;
}
.pokemon-ability-icon {
  display: inline-block;
  height: 10px;
  width: 10px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.2);
}
</style>
