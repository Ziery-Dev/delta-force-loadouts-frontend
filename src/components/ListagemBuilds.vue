<template>
  <div class="loadout-group">
    <div class="caixa-loadout" v-for="b in props.builds" v-bind:key="b.id">
      <div class="arma-img-group"> <img :src="getWeaponImg(b.weaponId)"></div>
      <div class="text-group">
        <p><span class="nomeCampo">Criada por: </span> {{ b.creatorUsername }} </p>
        <p><span class="nomeCampo">Arma: </span> {{ getWeaponName(b.weaponId) }} </p>
        <p><span class="nomeCampo">Descrição: </span> {{ b.description }}</p>
        <p><span class="nomeCampo"> Alcance: </span> {{ b.distance_range }}</p>
        <p><span class="nomeCampo">Código: </span> {{ b.code }}</p>
        <p><span class="nomeCampo">Criação: </span> {{ b.createdAt }}</p>
      </div>

      <div class="button-group">
        <button @click="copiarCodigo(b.code)"><span class="material-icons">content_copy</span></button>
        <button v-if="podeEditarOuRemover(b)" @click="removerBuild(b.id)"><span
            class="material-icons">delete</span></button>
        <button v-if="podeEditarOuRemover(b)" @click="editarBuild(b)"><span
            class="material-icons">edit_document</span></button>
        <button v-if="authStore.isAuthenticated" :class="{ favoritado: buildFavoritada(b.id) }"
          @click="toggleFavorito(b.id)">
          <span class="material-icons">favorite</span>
        </button>
      </div>
      <div class="like-group">
        <button @click="avaliarBuild(b.id, 1)" :class="{ ativo: b.likedByUser }">
          <span class="material-icons">thumb_up</span>
        </button>
        <button @click="avaliarBuild(b.id, -1)" :class="{ ativo: b.dislikedByUser }">
          <span class="material-icons like-deslike">thumb_down</span>
        </button>
      </div>


    </div>

    <div v-if="editando" class="editando-group" @click="fecharSeClicouFora">
      <cadastrar-build-view @click.stop :editando="editando" :build="buildEmEdicao" @fechar-edicao="editando = false" />
    </div>
  </div>

</template>

<script setup>
import { onMounted, ref, defineProps } from 'vue';
import { useBuildStore } from '@/stores/build';
import { useArmaStore } from '@/stores/arma';
import CadastrarBuildView from '@/views/CadastrarBuildView.vue';
import { useAuthStore } from '@/stores/auth';
import { useFavoritosStore } from '@/stores/favoritos';
import router from '@/router'



const props = defineProps({
  builds: {
    type: Array,
    required: true,
    // Garante que se for um array vazio, o valor padrão é []
    default: () => []
  }
})



const buildStore = useBuildStore();
const armaStore = useArmaStore();
const authStore = useAuthStore();
const favoritosStore = useFavoritosStore()


const editando = ref(false)
const buildEmEdicao = ref(null)


onMounted(async () => {
  await armaStore.listarArmas()
  if (authStore.isAuthenticated) { //Impede que o edpoint seja chamado caso o usuário não esteja logado
    await favoritosStore.listarFavoritos()  //garante o carregamento da lista de favoritos antes de realizar alguma operação
  }

})



//função que busca no state de armas de armaStore, o nome da arma que corresponde a build atraves do id que a build fornece
function getWeaponName(weaponId) {
  const weapon = armaStore.armas.find(a => a.id === weaponId);
  return weapon ? weapon.name : 'Desconhecida'

}

function getWeaponImg(weaponId) {
  const weapon = armaStore.armas.find(a => a.id === weaponId);
  return weapon ? weapon.imgUrl : 'https://static.vecteezy.com/system/resources/thumbnails/001/198/850/small/weapon.png';
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
const editarBuild = async (build) => {
  editando.value = true
  buildEmEdicao.value = { ...build }
}


//Fecha a tela de edição se clicar fora dela
function fecharSeClicouFora() {
  editando.value = false
}

//decide se o usuário atual é admin ou criador da build, para exibir os botões de excluir e editar
const podeEditarOuRemover = (build) => {
  const user = authStore.user
  if (!user) return false

  const isAdmin = user.role === 'ADMIN'
  const isCriador = user.id === build.creatorId

  return isAdmin || isCriador
}

//Quando acionado, adiciona a build a lista de favoritos do usuário
const toggleFavorito = async (buildId) => {
  try {


    if (!favoritosStore.favoritos.some(f => f.id === buildId)) { //verifica se a build atual ainda não pertence a favoritos
      await favoritosStore.adicionarFavorito(buildId)
      alert('adicionado a favoritos com sucesso!')
    }
    else {
      await favoritosStore.removerFavorito(buildId)
      alert("removido de favoritos")

    }
  }
  catch (error) {
    const mensagem = error.response?.data?.erro || "Erro desconhecido, tente novamente"
    alert(mensagem)
  }

}

//Simplemente função que diz se o usuário avaliou a build com like
const avaliarBuild = async (buildId, valor) => {
  if(!authStore.isAuthenticated){
    router.push("/requisicao-login")
    return
  }
  let acao
  if (valor === 1) {
    acao = buildStore.darLike
  } else if (valor === -1) {
    acao = buildStore.disLike
  } else {
    alert("Erro inesperado")
    return
  }

  try {
    await acao(buildId)
    alert("voto computado")
  } catch (error) {
    const mensagem = error.response?.data?.erro || "Erro desconhecido, tente novamente"
    alert(mensagem)
  }
}


//verifica se a build ja foi adicionado a fovoritos para mudar o estilo do botão de favoritos
const buildFavoritada = (id) => {
  return favoritosStore.favoritos.some(f => f.id === id)
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
  align-items: center;
  text-align: start;
  background-image:
    linear-gradient(rgba(10, 10, 10, 0.5), rgba(29, 28, 28, 0.1)),
    url('/src/assets/card.jpg');
  background-size: cover;
  background-position: center;
  width: 380px;
  height: 450px;
  border-radius: 20px;
  transition: 0.4s;
  box-shadow: 0px 0px 1px 1px rgb(34, 172, 0);
  padding: 10px;
}

.caixa-loadout:hover {
  transform: scale(1.1);
  box-shadow: 0px 0px 5px 0.4px white;
}

.text-group {
  font-weight: bold;
  color: rgb(117, 228, 53);
  height: 48%;

  /*Quebra de linha do texto */
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: normal;

  /*Oculta texto Sobressalente */
  overflow: hidden;

  display: flex;
  flex-direction: column;
  justify-content: space-around;

}

.text-group p {
  padding: 3px;
}

.nomeCampo {
  color: rgb(216, 221, 221);
}


.arma-img-group {
  display: flex;
  width: 100%;
  height: 35%;
  justify-content: center;
  background-color: #fafffa38;
  border-radius: 10px;
}

.arma-img-group img {
  width: 60%;
}

.button-group {

  width: 100%;
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: center;


}

.button-group button {
  width: 20%;
  height: 30px;
  margin: 5px;
  border-radius: 8px;
  border: none;
  background-color: #2f3a2fc7;
  color: rgb(13, 212, 72);
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0px 0px 1px 0.5px rgb(168, 166, 166);

}

.button-group button:hover {
  transform: scale(1.1);
  box-shadow: 0px 0px 5px 1px rgb(46, 255, 46);
  color: #ffffff;
}


/* Estilo botões like e deslike */
.like-group {
  margin-top: 5px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

}


.like-group button {
  height: 30px;
  margin: 0 5px;
  color: rgb(13, 212, 72);
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.3s;

}

.like-group button:hover {
  transform: scale(1.1);
  color: #ffffff;
}

.like-group .ativo {
  transform: scale(1.1);
  color: #ffffff;
}


/*Estilo editando*/
.editando-group {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  position: fixed;
  z-index: 1000;
  /* Garante que estará acima da maioria dos elementos */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 8px;
}


/*estilo favoritado, quando a build ja foi adicionada a favorto*/
.button-group .favoritado {
  color: white;
  box-shadow: 0px 0px 5px 1px rgb(46, 255, 46);

}
</style>
