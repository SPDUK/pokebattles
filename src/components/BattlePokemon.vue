`<template>
  <div class="battle">
    <div class="enemy">
      <img :src="enemy.sprites['front_default']" :alt="enemy.name" />
      <div class="hpBarWrapper">
        <span>{{ enemy.name }}</span>
        <span>{{ enemyHp }}</span>
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
        <span>{{ pokemon.name }}</span>
        <span>{{ hp }}</span>
        <div :class="hpClass" class="hpBar" :style="{ width: `${hp}%` }"></div>
      </div>
    </div>
    <div class="options">
      <template v-for="n in 3">
        <v-btn
          v-if="pokemon.moves[n]"
          color="primary"
          :key="n"
          @click="attack"
          >{{ pokemon.moves[n].name }}</v-btn
        >
        <v-btn v-else color="primary" :key="n" @click="attack">
          Attack
        </v-btn>
      </template>
      <v-btn color="green" @click="heal">Heal</v-btn>
    </div>
    <div class="log">
      <div v-for="([first, second], i) in splitLogs" :key="i">
        <span>{{ first }}</span>
        <span>{{ second }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { splitEvery } from "ramda";

export default {
  name: "BattlePokemon",
  data() {
    return {
      pokemon: undefined,
      hp: 100,
      enemy: undefined,
      enemyHp: 100,
      log: []
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
    },
    splitLogs() {
      return splitEvery(2, this.log);
    }
  },
  methods: {
    ...mapActions(["selectPokemon"]),
    attack() {
      const dmg = this.randomDamage();
      this.addActionToLog(
        `${this.pokemon.name} dealt ${dmg} dmg to ${this.enemy.name}`
      );
      this.enemyHp -= dmg;
      if (this.enemyHp <= 0) return this.resetData();

      this.enemyMove();
    },
    heal() {
      if (this.hp + 15 >= 100) {
        this.addActionToLog(`${this.pokemon.name} healed to 100`);
        this.hp = 100;
      } else {
        this.addActionToLog(`${this.pokemon.name} healed to ${this.hp + 15}`);
        this.hp += 15;
      }

      this.enemyMove();
      if (this.hp <= 0) this.resetData();
    },
    enemyMove() {
      if (this.enemyHp > 90) return this.enemyAttack();

      if (this.enemyHp > 70) {
        if (Math.random() > 0.8) return this.enemyHeal();
        return this.enemyAttack();
      }
      if (this.enemyHp > 40) {
        if (Math.random() > 0.7) return this.enemyHeal();
        return this.enemyAttack();
      }

      if (Math.random() > 0.5) return this.enemyHeal();
      return this.enemyAttack();
    },

    enemyAttack() {
      const dmg = this.randomDamage();
      this.addActionToLog(
        `${this.enemy.name} dealt ${dmg} dmg to ${this.pokemon.name}`
      );
      this.hp -= dmg;
      if (this.hp < 0) this.resetData();
    },
    enemyHeal() {
      if (this.enemyHp + 15 >= 100) {
        this.addActionToLog(`${this.enemy.name} healed to 100`);
        this.enemyHp = 100;
      } else {
        this.addActionToLog(
          `${this.enemy.name} healed to ${this.enemyHp + 15}`
        );
        this.enemyHp += 15;
      }
    },
    randomDamage() {
      return 10 + Math.round(Math.random() * 15);
    },
    resetData() {
      if (this.hp <= 0) this.addActionToLog("You Lost!");
      if (this.enemyHp <= 0) this.addActionToLog("You Won!");
      this.hp = 100;
      this.enemyHp = 100;
      this.enemy = this.randomPokemon();
    },
    randomPokemon() {
      return this.allPokemon[
        Math.floor(Math.random() * this.allPokemon.length)
      ];
    },
    addActionToLog(info) {
      this.log.unshift(info);
    }
  },
  created() {
    this.pokemon = this.selectedPokemon;
    this.resetData();
  }
};
</script>

<style scoped>
.battle {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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

.log {
  overflow-y: scroll;
  margin-top: 20px;
  height: 165px;
  background: rgb(82, 82, 82);
  color: white;
}
.log div {
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid rgb(32, 32, 32);
  margin-bottom: 10px;
}
</style>
