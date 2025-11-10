<template>
  <div v-if="authStore.isAuthenticated" class="nav-group">
    <nav>
      <router-link to="/">
        <button class="home-button">
          <span class="material-icons">home</span>
        </button>
      </router-link>

      <router-link to="/cadastrar-build">
        <button class="cadastro-button">
          <span class="material-icons">add_box</span>
          cadastrar build
        </button>
        
      </router-link>
      <router-link to="/cadastrar-arma">
        <button class="cadastro-button">
          <span class="material-icons">add_box</span>
          cadastrar arma
        </button>
        
      </router-link>

      <div class="search-box">
        <span class="material-icons">search</span>
        <input type="search" placeholder="Buscar..." />
      </div>

      <button @click="sairDaConta" v-if="authStore.isAuthenticated" class="logout-btn">
        <span class="material-icons">logout</span>
        Sair
      </button>
    </nav>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';
const router = useRouter();
const authStore = useAuthStore();

const sairDaConta = () => {
  authStore.logout();
  router.push("/login");
};
</script>

<style scoped>
/* 🔹 Barra de navegação */
.nav-group {
  background-color: #0f2910; /* verde escuro */
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
  background-color: #1b1b1b; /* fundo escuro do input */
  color: #d8ffd8; /* texto claro */
  outline: none;
  transition: border-color 0.2s;
}

.search-box input:focus {
  border-color: #19db50; /* verde claro no foco */
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


.cadastro-button{
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

.logout-btn:hover, .cadastro-button:hover, .home-button:hover {
  color: #d8ffd8;
}



 a{
  text-decoration: none;
}
</style>
