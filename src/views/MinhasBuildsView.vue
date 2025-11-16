<template> 
<div >
    <h2 v-if="buildStore.minhas_builds.length === 0">Opa, parece que você ainda não possui buids cadastradas!</h2>
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