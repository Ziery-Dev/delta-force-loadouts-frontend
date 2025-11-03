<template>
  <div class="home">
    <div class="loadout-group">
       <div class="caixa-loadout"  v-for="b in buildStore.builds" v-bind:key="b.id">
          
          <p>Arma: {{getWeaponName(b.weaponId) }} </p>
          <p>Descrição:{{b.description }}</p>
          <p>Alcance: {{ b.distance_range }}</p>
          <p>Código: {{ b.code }}</p>
        <button @click="copiarCodigo(b.code)">Copiar</button>
        <button @click="removerBuild(b.id)">Remover</button>
        <button @click="editarBuild(b)">Editar</button>
      </div>
     
    </div>
    <div v-if="editando" class="editando-group" @click="fecharSeClicouFora">
      <cadastrar-build-view
      @click.stop
      :editando="editando"
      :build="buildEmEdicao"
      @fechar-edicao="editando = false"
      />    
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useBuildStore } from '@/stores/build';
import { useArmaStore } from '@/stores/arma';
import CadastrarBuildView from './CadastrarBuildView.vue';


const buildStore = useBuildStore();
const armaStore = useArmaStore();


const editando = ref(false)
const buildEmEdicao = ref (null)


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

//remover build

const removerBuild = async (id) => {
  try {
    await buildStore.removerBuild(id)
    alert("Removido com sucesso!")
  } 
  catch (error) {
    const mensagem = error.response?.data?.erro || "Erro desconhecido, tente novamente"
    alert(mensagem)
  }
}

//editar build
const editarBuild = async(build) => {
  editando.value = true
  buildEmEdicao.value = {...build}
}


//Fecha a tela de edição se clicar fora dela
function fecharSeClicouFora() {
  editando.value = false
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
  text-align: start;
  background-image: url('/src/assets/card.jpg');
  background-color: #2a4a2a;
  color: wheat;
  width: 380px;
  height: 220px;
  border-radius: 20px;
  cursor: pointer;
  transition: 0.4s;
  box-shadow: 0px 0px 1px 1px rgb(34, 172, 0);
  padding: 10px;
}
.caixa-loadout:hover {
  transform: scale(1.1);
  box-shadow: 0px 0px 5px 0.4px white;
}

.caixa-loadout img{
  width: 90%;
}

/*Estilo editando*/
.editando-group{
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.7);
  position: fixed;
  z-index: 1000; /* Garante que estará acima da maioria dos elementos */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 8px;
}



</style>
