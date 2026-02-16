
import axios from 'axios';
import router from '@/router'
import { useAuthStore } from '@/stores/auth'
import { notify } from './notify';

const api = axios.create({
  baseURL:  process.env.VUE_APP_API_URL || "http://localhost:8080",
  withCredentials: true
});



api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status
    const authStore = useAuthStore()

    if (status === 401 && authStore.isAuthenticated) {
      authStore.logout()
      router.push("/requisicao-login")
      notify("Sessão expirada", "warning");
    }

    return Promise.reject(error) // <- SEMPRE rejeita no erro
  }
)




export default api;
