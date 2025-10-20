<template>
    <form @submit.prevent="fazerLogin">
        <div class="form-group">
            <label for="username">Usuário</label>
            <input id="username" v-model="username" type="text" placeholder="Digite seu usuário" required />
        </div>
        <div class="form-group">
            <label for="password">Senha</label>
            <input id="password" v-model="password" type="password" placeholder="Digite sua senha" required />
        </div>
        <button type="submit">
            Entrar
        </button>

    </form>


</template>

<script setup>
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';
import {ref} from "vue"

const router = useRouter();
const authStore = useAuthStore();
const username = ref("");
const password = ref("");

const fazerLogin = async() => {
    try {
    await authStore.login(username.value, password.value);
    router.push("/"); // redireciona após login
  } catch (error) {
    if(error.response.status === 401)
    alert("Usuário ou senha inválidos.")
    console.log(error)
   // error.value = "Usuário ou senha inválidos.";
  }
}

</script>