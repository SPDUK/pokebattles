`<template>
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
    <div class="options">
      <template v-for="n in 3">
        <v-btn color="primary" :key="n" @click="attack">
          {{ capitalize(pokemon.moves[n].move.name) }}
        </v-btn>
      </template>
      <v-btn color="green" @click="heal">Heal</v-btn>
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
      hp: 100,
      enemy: undefined,
      enemyHp: 100
    };
  },
  computed: {
    ...mapGetters(["allPokemon", "selectedPokemon"]),
    hpClass() {
      if (this.hp > 90) return "green";
      if (this.hp > 80) return "info";
      if (this.hp > 50) return "warning";
      return "red";
    },
    enemyHpClass() {
      if (this.enemyHp > 90) return "green";
      if (this.enemyHp > 80) return "info";
      if (this.enemyHp > 50) return "warning";
      return "red";
    }
  },
  methods: {
    ...mapActions(["allPokemon", "selectPokemon"]),
    attack() {
      this.enemyHp -= this.randomDamage();

      if (this.enemyHp <= 0) return this.resetData();

      this.enemyMove();
    },
    heal() {
      if (this.hp + 15 >= 100) this.hp = 100;
      else {
        this.hp += 15;
      }

      this.enemyMove();
      if (this.hp <= 0) this.resetData();
    },
    enemyMove() {
      if (this.enemyHp > 90) return this.enemyAttack();

      if (this.enemyHp > 70) {
        if (Math.random() > 0.8) return (this.enemyHp += 15);
        return this.enemyAttack();
      }
      if (this.enemyHp > 40) {
        if (Math.random() > 0.7) return (this.enemyHp += 15);
        return this.enemyAttack();
      }

      if (Math.random() > 0.5) return (this.enemyHp += 15);
      return this.enemyAttack();
    },

    enemyAttack() {
      this.hp -= this.randomDamage();
      if (this.hp < 0) this.resetData();
    },
    randomDamage() {
      return 10 + Math.round(Math.random() * 15);
    },
    resetData() {
      this.hp = 100;
      this.enemyHp = 100;
      this.enemy = this.randomPokemon();
    },
    capitalize(name) {
      return name[0].toUpperCase(0).concat(name.slice(1));
    },
    randomPokemon() {
      return this.allPokemon[
        Math.floor(Math.random() * this.allPokemon.length)
      ];
    }
  },
  created() {
    this.pokemon = this.selectedPokemon;
    this.resetData();
  }
};
</script>

<style>
.battle {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 75vh;
  margin: 0 auto;
  max-width: 350px;
}

.enemy,
.player {
  width: 100%;
  max-width: 350px;
  margin: 0 auto;
}
.enemy img,
.player img {
  width: 150px;
  height: 150px;
}

@media (min-width: 800px) {
  .enemy img,
  .player img {
    width: 200px;
    height: 200px;
  }
}
.hpBarWrapper {
  position: relative;
  display: flex;
  justify-content: space-between;
  background: rgba(43, 43, 43, 0.2);
  border: 2px solid rgb(43, 43, 43);
}
.hpBarWrapper span {
  z-index: 2;
  padding: 0 10px;
}

.hpBar {
  position: absolute;
  height: 25px;
  z-index: 0;
  max-width: 346px;
}

.options {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.options button {
  width: 48%;
  height: 35px;
  line-height: 35px;
  margin: 4px 2px;
}
</style>
