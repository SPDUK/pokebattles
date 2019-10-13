<template>
  <SelectPokemon v-if="!$store.state.selectedPokemon" />
  <BattlePokemon v-else />
</template>

<script>
import SelectPokemon from "../components/SelectPokemon";
import BattlePokemon from "../components/BattlePokemon";

export default {
  components: {
    SelectPokemon,
    BattlePokemon
  }
};
</script>
