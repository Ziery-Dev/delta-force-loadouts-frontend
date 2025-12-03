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
    <div class="filtrar-group">
    <label for="alcance">Filtrar: </label>
    <select v-model="form.alcance" id="alcance">
      <option value="">Todos</option>
      <option v-for="a in alcances" :key="a.value" :value="a.value">
        {{ a.label }}
      </option>
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


const form = ref({ ordem: 'date&order=desc', alcance: '' })

//observa mudança no select de ordem para alterar
watch([
  () => form.value.ordem,
  () => form.value.alcance
], ([novaOrdem, novosAlcances]) => {

  //cada alcancace é adicionado: &distanceRange= + o tipo de alcance
  const alcanceParams = `&distanceRange=${novosAlcances}`
    

  //junta os alcances a ordem para ir para a url
  const params = `${novaOrdem}${alcanceParams}`;
  buildStore.listarBuilds(params);

  console.log(params)

})

const alcances = [
  { label: 'Curto alcance', value: 'CURTO' },
  { label: 'Médio alcance', value: 'MEDIO' },
  { label: 'Longo alcance', value: 'LONGE' },
  { label: 'Muito longo', value: 'MUITO_LONGE' }
]



</script>

<style scoped>
.ordenar-group, .filtrar-group {
  display: inline;
  border-radius: 5px;
  padding: 5px;
  color: #ffffff;

}

.ordenar-group select,  .filtrar-group select {
  background-color: #19db50;
  display: inline;
  border-radius: 5px;

}
</style>