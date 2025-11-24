<template>

  <div>
    <div class="ordenar-group">
      <label for="odernar">Ordenar por: </label>
      <select v-model="form.ordem" name="odernar" id="odernar">
        <option value="date&order=desc">Mais recentes</option>
        <option value="date&order=asc">Mais antigas</option>
        <option value="likes&order=desc">Mais likes</option>
        <option value="likes&order=asc">Menos likes</option>
      </select>

    </div>

    <ListagemBuilds :builds="buildStore.builds" />


  </div>




</template>

<script setup>
import ListagemBuilds from '@/components/ListagemBuilds.vue';
import { useBuildStore } from '@/stores/build';
import { onMounted, ref, watch } from 'vue';

const buildStore = useBuildStore()

//Carrega todas a builds antes de passar via props para listagem de builds
onMounted(() => {
  buildStore.listarBuilds(form.value.ordem)
})


const form = ref({ ordem: 'date&order=desc' })

//observa mudança no select de ordem para alterar
watch(() => form.value.ordem, (novaOrdem) => {
  buildStore.listarBuilds(novaOrdem)
})



</script>

<style scoped>
  .ordenar-group{
    display: inline;
    border-radius: 5px;
    padding: 5px;
    color: #ffffff;

  }

  .ordenar-group select{
    background-color: #19db50;
    display: inline;
    border-radius: 5px;

  }

  



</style>