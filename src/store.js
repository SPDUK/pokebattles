import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    pokemon: [],
    types: {},
    selectedPokemon: undefined
  },
  getters: {
    allPokemon: state => state.pokemon,
    allTypes: state => state.types,
    pokemonLoading: state => state.pokemon.length === 0,
    allPokemonNames: state => state.pokemon.map(({ name }) => name),
    selectedPokemon: state => state.selectedPokemon
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

      const capitalize = name => name[0].toUpperCase(0).concat(name.slice(1));
      // map over all the pokemon and only retain the data for each pokemon, throw away header info etc
      const allPokemon = pokemonData.map(({ data }) => {
        return {
          ...data,
          name: capitalize(data.name),
          moves: data.moves.map(({ move }) => ({
            ...move,
            name: capitalize(move.name)
          }))
        };
      });

      const allTypes = {};

      allPokemon.forEach(({ types }) => {
        for (const { type } of types) {
          allTypes[type.name] = type.url;
        }
      });

      // can't place into localStorage because the response is too big :(

      commit("setAllPokemon", allPokemon);
      commit("setAllTypes", allTypes);
    },
    selectPokemon({ commit }, idx) {
      commit("setSelectedPokemon", idx);
    }
  },
  mutations: {
    setAllPokemon: (state, pokemon) => (state.pokemon = pokemon),
    setAllTypes: (state, types) => (state.types = types),
    setSelectedPokemon: (state, idx) =>
      (state.selectedPokemon = state.pokemon[idx])
  }
});
