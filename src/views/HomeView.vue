<template>
  <div class="home">
    <h2>{{ armaStore.armas }}</h2>
    <div class="loadout-group">
      <div class="caixa-loadout">
        teste
      </div>
       <div class="caixa-loadout">
        <img src="@/assets/arma-teste.webp" alt="">
        <span>Nome: Arma teste</span>
        <span>Classe compativél: fulano, beratano, cliclano </span>
        <span>Distância de uso: Média distância</span>
        <span>Código do loadout: 871378783197873y11</span>
      </div>
       <div class="caixa-loadout">
        teste
      </div>
       <div class="caixa-loadout">
        teste
      </div>
       <div class="caixa-loadout">
        teste
      </div>
       <div class="caixa-loadout">
        teste
      </div>
       <div class="caixa-loadout">
        teste
      </div>
       <div class="caixa-loadout">
        teste
      </div>
       <div class="caixa-loadout">
        teste
      </div>
       <div class="caixa-loadout">
        teste
      </div>
       <div class="caixa-loadout">
        teste
      </div>
       <div class="caixa-loadout">
        teste
      </div>
       <div class="caixa-loadout">
        teste
      </div>
       <div class="caixa-loadout">
        teste
      </div>
       <div class="caixa-loadout">
        teste
      </div>
       <div class="caixa-loadout">
        teste
      </div>
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


.loadout-group {
  width: 80%;
  margin: 0 auto;
  gap: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}

.caixa-loadout {
  background-color: #2a4a2a;
  width: 220px;
  height: 220px;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.4s;
}
.caixa-loadout:hover {
  transform: scale(1.1);
  box-shadow: 0px 0px 5px 0.4px white;
}

.caixa-loadout img{
  width: 90%;
}
</style>
