<template>
  <div class="pagination">
    <button class="arrow-button" @click="props.anteriorPg" :disabled="props.currentPage === 0">
      <span class="material-icons">arrow_circle_left</span>
    </button>

    <span v-if="props.totalPages > 0">Página {{ props.currentPage + 1 }} de {{ props.totalPages }}</span>
    <span v-else>Nenhuma página disponível</span>

    <button class="arrow-button" @click="props.proximaPg" :disabled="props.currentPage + 1 === props.totalPages">
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
  },

  totalPages: {
    type: Number,
    required: true,
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

<style scoped lang="scss">
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;

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

  .arrow-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    box-shadow: none;
    transform: none;
  }

  .arrow-button:disabled:hover {
    transform: none;
    box-shadow: none;
    color: #19db50;
  }
}
</style>
