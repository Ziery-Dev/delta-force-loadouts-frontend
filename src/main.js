import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { useAuthStore } from './stores/auth'

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)

const authStore = useAuthStore()

// 🔹 Garante que o axios receba o token antes de tudo
authStore.tryAutoLogin()

app.use(router)
app.mount('#app')
