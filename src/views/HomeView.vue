<template>
  <div class="home">
    <div class="loadout-group">
       <div class="caixa-loadout"  v-for="b in buildStore.builds" v-bind:key="b.id">
        
        <p>Arma: {{getWeaponName(b.weaponId) }} </p>
        <p>Descrição:{{b.description }}</p>
        <p>Alcance: {{ b.distance_range }}</p>
        <p>Código: {{ b.code }}</p>
          <button @click="copiarCodigo(b.code)">Copiar</button>
      </div>
     
 

    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useBuildStore } from '@/stores/build';
import { useArmaStore } from '@/stores/arma';

const buildStore = useBuildStore();
const armaStore = useArmaStore();

onMounted(() => { 
  buildStore.listarTodasBuilds(),
  armaStore.listarArmas()

})

//função que busca no state de armas de armaStore, o nome da arma que corresponde a build atraves do id que a build fornece
function getWeaponName(weaponId) {
const weapon = armaStore.armas.find(a => a.id === weaponId);
  return weapon ? weapon.name : 'Desconhecida'
}


//Função que permite copiar o codigo 
function copiarCodigo(code) {
  navigator.clipboard.writeText(code)
    .then(() => alert('Código copiado!'))
    .catch(err => console.error('Erro ao copiar:', err))
}




</script>

<style scoped>


.loadout-group {
  width: 80%;
  margin: 20px auto;
  gap: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}

.caixa-loadout {
  background-color: #2a4a2a;
  color: wheat;
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
