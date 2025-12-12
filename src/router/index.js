import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import { useAuthStore } from '@/stores/auth'
import CadastrarBuildView from '@/views/CadastrarBuildView.vue'
import CadastrarArmaView from '@/views/CadastrarArmaView.vue'
import CadastrarOperadorView from '@/views/CadastrarOperadorView.vue'
import MinhasBuildsView from '@/views/MinhasBuildsView.vue'
import FavoritosView from '@/views/FavoritosView.vue'
import RequisicaoLogin from '@/components/RequisicaoLogin.vue'
import RegistrarUsuarioView from '@/views/RegistrarUsuarioView.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,


  },
  {
    path: '/cadastrar-build',
    name: 'cadastrarBuild',
    component: CadastrarBuildView,
    meta: { requiresAuth: TransformStreamDefaultController},

  },

  {
    path: '/cadastrar-arma',
    name: 'cadastrarArma',
    component: CadastrarArmaView,
    meta: { requiresAuth: true,  requiredRole: "ADMIN"  },

  },
  {
    path: '/cadastrar-operador',
    name: 'cadastrarOperador',
    component: CadastrarOperadorView,
    meta: { requiresAuth: true, requiredRole: "ADMIN"  },

  },
  {
    path: '/minhas-builds',
    name: 'minhasBuilds',
    component: MinhasBuildsView,
    meta: { requiresAuth: true },

  },
  {
    path: '/requisicao-login',
    name: 'requisicaoLogin',
    component: RequisicaoLogin,

  },
  {
    path: '/favoritos',
    name: 'favoritos',
    component: FavoritosView,
    meta: { requiresAuth: true },

  },



  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/registro",
    name: "registro",
    component: RegistrarUsuarioView,
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
    return next('/requisicao-login')
  }


  if (to.meta.requiredRole && auth.user?.role !== to.meta.requiredRole) {
  return next("/") //adicionar um forbbiden aqui futuramente
}


  // Impede abrir /login se já estiver logado
  if (to.name === 'login' && auth.isAuthenticated) {
    return next({ name: 'home' })
  }
  next()  // permite navegar normalmente
})

export default router
