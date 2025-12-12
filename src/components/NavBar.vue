<template>
  <div v-if="!ocultarNavbar.includes(route.path)" class="nav-group">
    <nav>
      <router-link to="/">
        <button class="home-button">
          <span class="material-icons">home</span>
        </button>
      </router-link>

      <router-link to="/cadastrar-build">
        <button class="cadastro-button">
          <span class="material-icons">assignment_add</span>
          cadastrar build
        </button>
      </router-link>



      <div class="search-box">
        <span class="material-icons">search</span>
        <input type="search" placeholder="Buscar..." />
      </div>



      <div class="user-menu" ref="menuRef">
        <div class="user-info" @click="toggleMenu">
          <span class="material-icons">account_circle</span>
          <span class="username">{{ authStore.user?.username || 'Usuário' }}</span>
          <span class="material-icons arrow" :class="{ open: menuAberto }">expand_more</span>
        </div>

        <div v-if="menuAberto" class="dropdown">

          <router-link to="/cadastrar-operador"> <!--Exclusivo de usuário admin-->
            <button v-if="authStore.user?.role === 'ADMIN'" class="dropdown-item">
              <span class="material-icons">person_add</span>
              cadastrar operador
            </button>
          </router-link>

          <router-link to="/cadastrar-arma">
            <button v-if="authStore.user?.role === 'ADMIN'" class="dropdown-item"> <!--Exclusivo de usuário admin-->
              <span class="material-icons">add_box</span>
              cadastrar arma
            </button>
          </router-link>

          <router-link to="/minhas-builds">
            <button class="dropdown-item">
              <span class="material-icons">assignment</span>
              Minhas builds
            </button>
          </router-link>

          <router-link to="/favoritos">
            <button class="dropdown-item">
              <span class="material-icons">favorite</span>
              Favoritos
            </button>
          </router-link>

          <router-link to="/login">
            <button v-if="!authStore.isAuthenticated" class="dropdown-item">
              <span class="material-icons">login</span>
              Faça login
            </button>
          </router-link>

          <button v-if="authStore.isAuthenticated" @click="sairDaConta" class="dropdown-item">
            <span class="material-icons">logout</span>
            Sair
          </button>
        </div>
      </div>

    </nav>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth';
import { useRouter, useRoute } from 'vue-router';
import { ref } from 'vue'
import { onMounted, onBeforeUnmount } from 'vue';

const authStore = useAuthStore()
const router = useRouter()
const menuAberto = ref(false)
const menuRef = ref(null)
const route = useRoute()

//rotas onde o navbar não irá aparecer
const ocultarNavbar = ['/login', '/registro']




//abre e fecha menu de perfil do usuario 
const toggleMenu = () => {
  menuAberto.value = !menuAberto.value
}


// Fecha menu de usuario ao clicar fora
const handleClickFora = (event) => {
  if (menuRef.value && !menuRef.value.contains(event.target)) {
    menuAberto.value = false
  }
}

//Simplemente sai da conta
const sairDaConta = () => {
  authStore.logout()
  router.push('/login')
}

onMounted(() => {
  document.addEventListener('click', handleClickFora)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickFora)
})

</script>

<style scoped>
/* 🔹 Barra de navegação */
.nav-group {
  background-color: #0f2910;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px 0;
  border: 0.4px solid rgb(105, 105, 105);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
}

nav {
  display: flex;
  align-items: center;
  gap: 25px;
}

/* 🔍 Caixa de busca */
.search-box {
  position: relative;
}

.search-box .material-icons {
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  color: #aaa;
  pointer-events: none;
}

.search-box input {
  width: 300px;
  padding: 10px 10px 10px 38px;
  border-radius: 20px;
  border: 1px solid #2a4a2a;
  background-color: #1b1b1b;
  /* fundo escuro do input */
  color: #d8ffd8;
  /* texto claro */
  outline: none;
  transition: border-color 0.2s;
}

.search-box input:focus {
  border-color: #19db50;
  /* verde claro no foco */
}

/* 🏠 Botão Home */
.home-button {
  border: none;
  background: transparent;
  color: #19db50;
  cursor: pointer;
  font-size: 24px;
}

/* 🚪 Botão Sair */
.logout-btn {
  display: flex;
  align-items: center;
  gap: 5px;
  border: none;
  background: transparent;
  color: #19db50;
  cursor: pointer;
  font-size: 16px;
  transition: color 0.2s;
}


.cadastro-button {
  display: flex;
  align-items: center;
  border: 0.5px solid rgb(36, 163, 11);
  border-radius: 5px;
  background: transparent;
  color: #19db50;
  cursor: pointer;
  font-size: 16px;
  transition: color 0.2s;
}

.logout-btn:hover,
.cadastro-button:hover,
.home-button:hover {
  color: #d8ffd8;
}

a {
  text-decoration: none;
}


/* Estilo do menu de usuário */
.user-menu {
  position: relative;
  display: inline-block;
  color: #19db50;
}

.user-info {
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 6px;
}

.username {
  color: #d8ffd8;
}

.arrow {
  transition: transform 0.3s ease;
}

.arrow.open {
  transform: rotate(180deg);
}

/* Dropdown estilizado */
.dropdown {
  position: absolute;
  top: 120%;
  right: 0;
  background-color: #0f2910;
  border: 1px solid #2a4a2a;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  padding: 8px 0;
  min-width: 200px;
  z-index: 20;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 8px;
  background: transparent;
  border: none;
  color: #d8ffd8;
  width: 100%;
  text-align: left;
  padding: 10px 14px;
  cursor: pointer;
  transition: background 0.2s;
}

.dropdown-item:hover {
  background-color: #1b1b1b;
}

.dropdown-item .material-icons {
  font-size: 20px;
}

router-link {
  text-decoration: none;
}
</style>
