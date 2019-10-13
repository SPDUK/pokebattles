<template>
  <div class="battle">
    <div class="enemy">
      <img :src="enemy.sprites['front_default']" :alt="enemy.name" />
      <div class="hpBarWrapper">
        <span>
          {{ enemy.name }}
        </span>
        <span>
          {{ enemyHp }}
        </span>
        <div
          :class="enemyHpClass"
          class="hpBar"
          :style="{ width: `${enemyHp}%` }"
        ></div>
      </div>
    </div>
    <div class="player">
      <img :src="pokemon.sprites['back_default']" :alt="pokemon.name" />
      <div class="hpBarWrapper">
        <span>
          {{ pokemon.name }}
        </span>
        <span>
          {{ hp }}
        </span>
        <div :class="hpClass" class="hpBar" :style="{ width: `${hp}%` }"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "BattlePokemon",
  data() {
    return {
      pokemon: undefined,
      hp: 75,
      enemy: undefined,
      enemyHp: 100
    };
  },
  computed: {
    ...mapGetters(["randomPokemon", "selectedPokemon"]),
    hpClass() {
      if (this.hp > 80) return "info";
      if (this.hp > 50) return "warning";
      return "danger";
    },
    enemyHpClass() {
      if (this.enemyHp > 80) return "info";
      if (this.enemyHp > 50) return "warning";
      return "danger";
    }
  },
  methods: {
    ...mapActions(["fetchAllPokemon", "selectPokemon"])
  },
  created() {
    this.pokemon = this.selectedPokemon;
    this.enemy = this.randomPokemon;

    console.log(this.pokemon);
    console.log(this.enemy);
  }
};
</script>

<style>
.battle {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 75vh;
}

.enemy,
.player {
  width: 100%;
  max-width: 350px;
  margin: 0 auto;
}
.enemy img,
.player img {
  width: 200px;
  height: 200px;
}
.hpBarWrapper {
  position: relative;
  display: flex;
  justify-content: space-between;
  background: rgba(43, 43, 43, 0.2);
  border: 2px solid rgb(43, 43, 43);
  max-width: 350px;
}
.hpBarWrapper span {
  z-index: 20;
  padding: 0 10px;
}

.hpBar {
  position: absolute;
  height: 25px;
  z-index: 0;

  max-width: 346px;
}
</style>
