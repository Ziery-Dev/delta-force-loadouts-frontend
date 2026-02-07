
import axios from 'axios';
import router from '@/router'
import { useAuthStore } from '@/stores/auth'

const api = axios.create({
  baseURL: 'http://localhost:8080',
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
    }

    return Promise.reject(error) // <- SEMPRE rejeita no erro
  }
)


// api.interceptors.response.use(
//   response => response,
//   error => {
//     const status = error.response?.status
//     const authStore = useAuthStore()
//     if ((status === 401 || status === 403) && authStore.isAuthenticated) {

//       authStore.logout() // limpa user + token
//       router.push('/')   // ou '/login'
//     }

//     return Promise.reject(error)
//   }
// )


export default api;
