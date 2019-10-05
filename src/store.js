import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    pokemon: []
  },
  getters: {
    allPokemon: state => state.pokemon
  },
  actions: {
    async fetchAllPokemon({ commit }) {
      const { data } = await axios.get(
        // 151 - all gen1
        "https://pokeapi.co/api/v2/pokemon/?limit=1"
      );

      // get all the info for all 151 pokemon
      const pokemonData = await Promise.all(
        data.results.map(({ url }) => axios.get(url))
      );

      // map over all the pokemon and only retain the data for each pokemon, throw away header info etc
      const allPokemon = pokemonData.map(({ data }) => data);

      console.log(allPokemon);

      commit("setAllPokemon", allPokemon);
    }
  },
  mutations: {
    setAllPokemon: (state, pokemon) => (state.pokemon = pokemon)
  }
});
