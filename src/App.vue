<template>
  <div>
    <NavBar />
    <router-view />
    <AvisoLentidao  v-if="mostrarAviso"
    @close="handleClose"/>
    <ToastContainer/>

  </div>


</template>

<script setup>
import AvisoLentidao from './components/AvisoLentidao.vue';
import NavBar from './components/NavBar.vue'
import ToastContainer from './components/ToastContainer.vue';
import { onMounted,ref } from 'vue';


//Script para exibir aviso de lentidao
const mostrarAviso = ref(false)

const INTERVALO_AVISO = 60 * 60 * 1000// 1 hora

onMounted(() => {
  const esconder = localStorage.getItem('serverWarningHidden') === 'true'
  const ultimaExibicao = Number(localStorage.getItem('serverWarningLastShown') || 0)

  if (esconder) return

  const now = Date.now()
  const podeExibirNovamente = now - ultimaExibicao >= INTERVALO_AVISO

  if (podeExibirNovamente) {
    mostrarAviso.value = true
  }
})

function handleClose(naoMostarNovamente) {
  localStorage.setItem('serverWarningLastShown', Date.now().toString())

  if (naoMostarNovamente) {
    localStorage.setItem('serverWarningHidden', 'true')
  }

  mostrarAviso.value = false
}


</script>

<style>
*{
  padding: 0;
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #f4f7fa;
}

body {
  margin: 0;
  background-color: #101410; /* fundo escuro do site */
  color: #d8ffd8; /* texto levemente esverdeado */
  font-family: sans-serif;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #ffffff;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
