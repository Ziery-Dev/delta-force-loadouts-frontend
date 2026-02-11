import { useToastStore } from "@/stores/toast";

export function notify(message, type = "info", timeout = 3000) {
  const toast = useToastStore();
  toast.show(message, type, timeout);
}