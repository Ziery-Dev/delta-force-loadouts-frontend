
<!-- Componente que nada mais é que o input de pesquisa do navbar-->
<template>
    <div class="search-box">
        <span class="material-icons">search</span>
        <input v-model="search" type="search" placeholder="Buscar arma ou criador..." />
        <button @click="buscar()">Buscar</button>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useBuildStore } from '@/stores/build';


const buildStore = useBuildStore()



const search = ref('')

const buscar =  async () => {
    buildStore.setSearch(search.value)
}




</script>

<style scoped>
/* 🔍 Caixa de busca */
.search-box {
    position: relative;
}

.search-box .material-icons {
    position: absolute;
    top: 50%;
    left: 10px;
    transform: translateY(-50%);
    color: #aaa;
    pointer-events: none;
}

.search-box input {
    width: 300px;
    padding: 10px 10px 10px 38px;
    border-radius: 20px;
    border: 1px solid #2a4a2a;
    background-color: #1b1b1b;
    /* fundo escuro do input */
    color: #d8ffd8;
    /* texto claro */
    outline: none;
    transition: border-color 0.2s;
}

.search-box input:focus {
    border-color: #19db50;
    /* verde claro no foco */
}

button{
    border: none;
    border-radius: 7px;
    background-color: #2a4a2a;
    margin-left: 3px;
    height: 25px;
    width: 48px;
    color: white;
    transition: all 0.4s;
    cursor: pointer;
}

button:hover{
    background-color: #19db50;
    transform: scale(1.1);
}

/* Responsividade */
@media (max-width: 768px) {

  .search-box input {
   width: 200px;
  }
  .search-box .material-icons {
     position: absolute;
    top: 50%;
    left: 10px;
    transform: translateY(-50%);
    color: #aaa;
    pointer-events: none;
  }
}
</style>
