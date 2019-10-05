import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    pokemon: [],
    types: {}
  },
  getters: {
    allPokemon: state => state.pokemon,
    allTypes: state => state.types,
    pokemonLoading: state => state.pokemon.length === 0,
    allPokemonNames: state => state.pokemon.map(({ name }) => name)
  },
  actions: {
    async fetchAllPokemon({ commit }) {
      const { data } = await axios.get(
        // 151 - all gen1
        "https://pokeapi.co/api/v2/pokemon/?limit=151"
      );

      // get all the info for all 151 pokemon
      const pokemonData = await Promise.all(
        data.results.map(({ url }) => axios.get(url))
      );

      // map over all the pokemon and only retain the data for each pokemon, throw away header info etc
      const allPokemon = pokemonData.map(({ data }) => data);

      const allTypes = {};

      allPokemon.forEach(({ types }) => {
        for (const { type } of types) {
          allTypes[type.name] = type.url;
        }
      });

      // maybe map over allTypes and get all type info later
      // const t = await axios.get("https://pokeapi.co/api/v2/type/4/");
      // console.log(t.data);
      console.log(allPokemon);
      commit("setAllPokemon", allPokemon);
      commit("setAllTypes", allTypes);
    }
  },
  mutations: {
    setAllPokemon: (state, pokemon) => (state.pokemon = pokemon),
    setAllTypes: (state, types) => (state.types = types)
  }
});
