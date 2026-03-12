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
import { notify } from '@/utils/notify';

const favoritosStore = useFavoritosStore()


onMounted(async () => {
    try{
        await favoritosStore.listarFavoritos()
    }
    catch(error){
        const mensagem = error.response?.data?.erro || "Erro ao carregar builds favoritas!"
        notify(mensagem, "error")
    }
})

const proximaPg = async () => {
    if (favoritosStore.totalPages > 0 && favoritosStore.currentPage + 1 < favoritosStore.totalPages) {
        try {
            await favoritosStore.listarFavoritos(favoritosStore.currentPage + 1)
        } catch (error) {
            const mensagem = error.response?.data?.erro || "Erro ao carregar suas builds favoritas!"
            notify(mensagem, "error")
        }
    }
}
const anteriorPg = async () => {
    if (favoritosStore.currentPage > 0) {
        try {
            await favoritosStore.listarFavoritos(favoritosStore.currentPage - 1)
        } catch (error) {
            const mensagem = error.response?.data?.erro || "Erro ao carregar suas builds favoritas!"
            notify(mensagem, "error")
        }

    }



}


const { currentPage, totalPages } = storeToRefs(favoritosStore); //Usado para passar multiplos componentes do store via prps sem perder a reatividade



</script>