import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { useAuthStore } from './stores/auth'

const pinia = createPinia();
const app = createApp(App);
app.use(pinia);
app.use(router);


// 🔹 Chama o auto login antes de montar o app
const authStore = useAuthStore()
authStore.tryAutoLogin()

app.mount('#app');