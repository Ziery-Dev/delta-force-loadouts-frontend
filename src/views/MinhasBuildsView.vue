<template>
    <div>
        <h1>Builds que você mesmo cadastrou:</h1>
        <h2 v-if="buildStore.minhasBuilds.length === 0">Opa, parece que você ainda não possui builds cadastradas!</h2>
        <ListagemBuilds :builds="buildStore.minhasBuilds" />
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
import { notify } from '@/utils/notify';



const buildStore = useBuildStore();


onMounted(async () => {
    try {
        await buildStore.listarMinhasBuilds()
    } catch (error) {
        const mensagem = error.response?.data?.erro || "Erro ao carregar suas builds"
        notify(mensagem, "error")
    }
})

const proximaPg = async () => {
    if (buildStore.totalPages > 0 && buildStore.currentPage + 1 < buildStore.totalPages) {
        try {
            await buildStore.listarMinhasBuilds(buildStore.currentPage + 1)
        } catch (error) {
            const mensagem = error.response?.data?.erro || "Erro ao carregar suas builds"
            notify(mensagem, "error")
        }
    }
}
const anteriorPg = async () => {
    if (buildStore.currentPage > 0) {
        try {
            await buildStore.listarMinhasBuilds(buildStore.currentPage - 1)
        } catch (error) {
            const mensagem = error.response?.data?.erro || "Erro ao carregar suas builds"
            notify(mensagem, "error")
        }

    }



}

const { currentPage, totalPages } = storeToRefs(buildStore); //Usado para passar multiplos componentes do store via prps sem perder a reatividade


</script>
