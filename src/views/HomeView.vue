

<template>
  <ListagemBuilds :builds="buildStore.builds"/>
  



</template>

<script setup>
import ListagemBuilds from '@/components/ListagemBuilds.vue';
import { useBuildStore } from '@/stores/build';
import { onMounted } from 'vue';

const buildStore = useBuildStore()

//Carrega todas a builds antes de passar via props para listagem de builds
onMounted(() => {
  buildStore.listarTodasBuilds()
})





</script>