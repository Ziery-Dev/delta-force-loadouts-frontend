<template>
    <div>
        <h1>Builds que você mesmo cadastrou:</h1>
        <h2 v-if="buildStore.minhas_builds.length === 0">Opa, parece que você ainda não possui builds cadastradas!</h2>
        <ListagemBuilds :builds="buildStore.minhas_builds" />
        <PaginacaoComponent :currentPage="currentPage" :totalPages="totalPages" :proximaPg="proximaPg"
            :anteriorPg="anteriorPg" />

    </div>




</template>


<script setup>

import ListagemBuilds from '@/components/ListagemBuilds.vue';
import { useBuildStore } from '@/stores/build';
import { onMounted } from 'vue';
import PaginacaoComponent from '@/components/PaginacaoComponent.vue';
import { storeToRefs } from 'pinia';



const buildStore = useBuildStore();


onMounted(() => {
    buildStore.listarMinhasBuilds()
})

const proximaPg = () => {
    if (buildStore.totalPages > 0 && buildStore.currentPage < buildStore.totalPages) { //verificação evitar aumentar pagina atual quando total de paginas for 0
        buildStore.listarMinhasBuilds(buildStore.currentPage + 1)
    }
}
const anteriorPg = () => {
    if (buildStore.currentPage > 0) {
        buildStore.listarMinhasBuilds(buildStore.currentPage - 1)
    }

}

const { currentPage, totalPages } = storeToRefs(buildStore); //Usado para passar multiplos componentes do store via prps sem perder a reatividade


</script>

