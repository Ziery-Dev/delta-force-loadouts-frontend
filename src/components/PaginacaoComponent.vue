<template>
  <div class="pagination">
      <button class="arrow-button" @click="props.anteriorPg" :disabled="props.currentPage === 0">
        <span class="material-icons">arrow_circle_left</span>
      </button>

      <span v-if="props.totalPages > 0">Página {{ props.currentPage + 1 }} de {{ props.totalPages }}</span>
      <span v-if="props.totalPages === 0">Página {{ props.currentPage }} de {{ props.totalPages }}</span>

      <button class="arrow-button" @click="props.proximaPg"
        :disabled="props.currentPage + 1 === props.totalPages">
        <span class="material-icons">arrow_circle_right</span>

      </button>

    </div>
</template>

<script setup>
  import { defineProps } from 'vue';

  
const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
    default: () => 0
  },

  totalPages: {
    type: Number,
    required: true,
    default: () => 0
  },
  proximaPg: {
    type: Function,
    required: true,
  },
  anteriorPg: {
    type: Function,
    required: true,
  }
  
})





</script>





<style scoped>
  .pagination {
  display: flex;
  justify-content: center;
  align-items: center;
}

.arrow-button {
  border: 0.5px solid rgb(36, 163, 11);
  border-radius: 5px;
  background: transparent;
  color: #19db50;
  cursor: pointer;
  font-size: 16px;
  margin: 5px 30px;
   transition: all 0.3s;

}

.arrow-button:hover {
  transform: scale(1.1);
  box-shadow: 0px 0px 5px 1px rgb(46, 255, 46);
  color: #ffffff;
}

</style>
