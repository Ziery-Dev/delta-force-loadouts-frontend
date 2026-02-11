<template>
  <div class="toast-container">
    <div
      v-for="t in toastStore.toasts"
      :key="t.id"
      class="toast"
      :class="t.type"
      @click="toastStore.remove(t.id)"
    >
      {{ t.message }}
    </div>
  </div>
</template>

<script setup>
import { useToastStore } from "@/stores/toast";
const toastStore = useToastStore();
</script>

<style scoped>
.toast-container {
  position: fixed;
  top: 16px;
  right: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 9999;
}

.toast {
  padding: 12px 14px;
  border-radius: 10px;
  cursor: pointer;
  max-width: 320px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.25);
  font-weight: 600;
}

/* você pode ajustar cores depois */
.toast.info { background: #1f2937; color: #fff; }
.toast.success { background: #16a34a; color: #fff; }
.toast.error { background: #dc2626; color: #fff; }
.toast.warning { background: #f59e0b; color: #111; }
</style>
