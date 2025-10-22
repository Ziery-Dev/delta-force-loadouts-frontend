<template>
  <div class="home">
    <h2>{{ armaStore.armas }}</h2>
    <div class="loadout-group">
      <div class="caixa-loadout">
        teste
      </div>

    </div>
  </div>
</template>

<script setup>
import { useArmaSotore } from '@/stores/arma';
import { onMounted } from 'vue';

const armaStore = useArmaSotore();

onMounted(() => armaStore.listarArmas())

</script>

<style scoped>
.home {
  border: 1px solid wheat;

}

.loadout-group {
  width: 800px;

  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  border: 1px solid white;
}

.caixa-loadout {
  background-color: aqua;
  width: 50px;
  height: 50px;
}
</style>
