import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import { useAuthStore } from '@/stores/auth'
import CadastrarBuildView from '@/views/CadastrarBuildView.vue'
import CadastrarArmaView from '@/views/CadastrarArmaView.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { requiresAuth: true },

  },
  {
    path: '/cadastrar-build',
    name: 'cadastrarBuild',
    component: CadastrarBuildView,
    meta: { requiresAuth: true },

  },

    {
    path: '/cadastrar-arma',
    name: 'cadastrarArma',
    component: CadastrarArmaView,
    meta: { requiresAuth: true },

  },



  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
 
]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

//Se tentar acessar uma rota marcada com  "meta: { requiresAuth: true }," é redirecionado para login
router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return next('/login')
  }
  
  // Impede abrir /login se já estiver logado
  if (to.name === 'login' && auth.isAuthenticated) {
    return next({ name: 'home' }) 
  }
    next()  // permite navegar normalmente
})

export default router
