import { defineStore } from "pinia";

let nextId = 1;

export const useToastStore = defineStore("toast", {
  state: () => ({
    toasts: [],
  }),

  actions: {
    show(message, type = "info", timeout = 3000) {
      const id = nextId++;
      this.toasts.push({ id, message, type });

      if (timeout > 0) {
        setTimeout(() => this.remove(id), timeout);
      }
    },

    remove(id) {
      this.toasts = this.toasts.filter((t) => t.id !== id);
    },

    clear() {
      this.toasts = [];
    },
  },
});
