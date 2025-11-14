<template> 
<div >
    <ListagemBuilds :builds="buildStore.minhas_builds"/>



</div>




</template>


<script setup>

import ListagemBuilds from '@/components/ListagemBuilds.vue';
import { useBuildStore } from '@/stores/build';
import { onMounted } from 'vue';


const buildStore = useBuildStore();

onMounted(()=>{
    buildStore.listarMinhasBuilds()
})

 



</script>