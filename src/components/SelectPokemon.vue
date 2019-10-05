<template>
  <div>
    <h1>Select Your Pokemon</h1>
    <carousel-3d width="250">
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
  components: {
    Slide,
    Carousel3d
  },
  computed: mapGetters(["allPokemon"]),
  methods: {
    ...mapActions(["fetchAllPokemon"]),
    capitalize(name) {
      return name[0].toUpperCase(0).concat(name.slice(1));
    },
    goToSlide(index) {
      this.$refs.mycarousel.goSlide(index);
    }
  },
  created() {
    this.fetchAllPokemon();
  }
};
</script>

<style></style>
