<template> 
<div >
    <h1>Suas builds favoritas!</h1>
    <h2 v-if="favoritosStore.favoritos.length === 0">Opa, parece que você ainda não possui builds adicionadas a favoritos!</h2>
    <ListagemBuilds :builds="favoritosStore.favoritos"/>



</div>




</template>


<script setup>

import ListagemBuilds from '@/components/ListagemBuilds.vue';
import { onMounted } from 'vue';
import { useFavoritosStore } from '@/stores/favoritos';


const favoritosStore = useFavoritosStore()


onMounted(()=>{
    favoritosStore.listarFavoritos()
})

 



</script>