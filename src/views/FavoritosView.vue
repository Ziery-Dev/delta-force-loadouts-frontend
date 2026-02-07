<template>
    <div>
        <h1>Suas builds favoritas!</h1>
        <h2 v-if="favoritosStore.favoritos.length === 0">Opa, parece que você ainda não possui builds adicionadas a
            favoritos!</h2>
        <ListagemBuilds :builds="favoritosStore.favoritos" />
        <PaginacaoComponent :currentPage="currentPage" :totalPages="totalPages" :proximaPg="proximaPg"
            :anteriorPg="anteriorPg" />

    </div>

</template>


<script setup>

import ListagemBuilds from '@/components/ListagemBuilds.vue';
import { onMounted } from 'vue';
import { useFavoritosStore } from '@/stores/favoritos';
import PaginacaoComponent from '@/components/PaginacaoComponent.vue';
import { storeToRefs } from 'pinia';



const favoritosStore = useFavoritosStore()


onMounted(() => {
    favoritosStore.listarFavoritos()
})

const proximaPg = () => {
    if (favoritosStore.totalPages > 0 && favoritosStore.currentPage < favoritosStore.totalPages) { //verificação evitar aumentar pagina atual quando total de paginas for 0
        favoritosStore.listarFavoritos(favoritosStore.currentPage + 1)
    }
}
const anteriorPg = () => {
    if (favoritosStore.currentPage > 0) {
        favoritosStore.listarFavoritos(favoritosStore.currentPage - 1)
    }

}


const { currentPage, totalPages } = storeToRefs(favoritosStore); //Usado para passar multiplos componentes do store via prps sem perder a reatividade



</script>