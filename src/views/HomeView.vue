<template>

  <div>
    <div class="ordenar-group">
      <label for="odernar">Ordenar por: </label>
      <select v-model="form.ordem">
        <option :value="{ sort: 'createdAt', order: 'desc' }">Mais recentes</option>
        <option :value="{ sort: 'createdAt', order: 'asc' }">Mais antigas</option>
        <option :value="{ sort: 'likeCount', order: 'desc' }">Mais likes</option>
        <option :value="{ sort: 'dislikeCount', order: 'desc' }">Mais dislikes</option>
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
    <PaginacaoComponent :currentPage="currentPage" :totalPages="totalPages" :proximaPg="proximaPg"
      :anteriorPg="anteriorPg" />

  </div>


</template>

<script setup>
import ListagemBuilds from '@/components/ListagemBuilds.vue';
import PaginacaoComponent from '@/components/PaginacaoComponent.vue';
import { useBuildStore } from '@/stores/build';
import { onMounted, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';


const buildStore = useBuildStore()

//Carrega todas a builds antes de passar via props para listagem de builds
onMounted(() => {
  carregarBuilds(0)
});


const form = ref({
  ordem: { sort: 'createdAt', order: 'desc' },
  alcance: ''
});

//observa mudança no select de ordem para alterar
watch(
  () => [form.value.ordem, form.value.alcance, buildStore.search],
  () => {
    carregarBuilds(0) 
  }
)


const alcances = [
  { label: 'Curto alcance', value: 'CURTO' },
  { label: 'Médio alcance', value: 'MEDIO' },
  { label: 'Longo alcance', value: 'LONGE' },
  { label: 'Muito longo', value: 'MUITO_LONGE' }
]



const carregarBuilds = (page = 0) => {
  buildStore.currentPage = page
  buildStore.listarBuilds({
    sort: form.value.ordem.sort,
    order: form.value.ordem.order,
    alcance: form.value.alcance,
    search: buildStore.search,
    page
  })
}


const proximaPg = () => {
  carregarBuilds(buildStore.currentPage + 1)
}

const anteriorPg = () => {
  carregarBuilds(buildStore.currentPage - 1)
}


const { currentPage, totalPages } = storeToRefs(buildStore); //Usado para passar multiplos componentes do store via prps sem perder a reatividade


</script>

<style scoped>
.ordenar-group,
.filtrar-group {
  display: inline;
  border-radius: 5px;
  padding: 5px;
  color: #ffffff;

}

.ordenar-group select,
.filtrar-group select {
  background-color: #19db50;
  display: inline;
  border-radius: 5px;

}
</style>