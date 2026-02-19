<template>
    <main class="login-page">
        <section class="login-card">
            <h1 class="login-title">Faça login</h1>

            <form class="login-form" @submit.prevent="fazerLogin">
                <p v-if="errors.global" class="erro" role="alert">
                    {{ errors.global }}
                </p>

                <div class="field">
                    <label for="username">Usuário</label>
                    <input id="username" v-model="username" type="text" placeholder="Digite seu usuário" required
                        autocomplete="username" />

                </div>


                <div class="field">
                    <label for="password">Senha</label>
                    <div class="field-senha">
                        <input id="password" v-model="password" :type="exibirSenha ? 'text' : 'password'"
                            placeholder="Digite sua senha" required autocomplete="current-password" />
                        <button @click="togleSenha" type="button" class="togleSenha-botao">
                            <span class="material-icons">{{ exibirSenha ? 'visibility' : 'visibility_off' }}</span>
                        </button>
                    </div>

                </div>


                <button class="login-button" type="submit">
                    Entrar
                </button>
            </form>

            <div class="divider">
                <span>ou</span>
            </div>

            <div class="login-footer">
                <RouterLink to="/registro">cadastre-se</RouterLink>
            </div>
        </section>
    </main>
</template>


<script setup>
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';
import { ref } from "vue"

const router = useRouter();
const authStore = useAuthStore();
const username = ref("");
const password = ref("");

const exibirSenha = ref(false)


const errors = ref({})

const fazerLogin = async () => {
    errors.value = {}
    try {
        await authStore.login(username.value, password.value);
        router.push("/"); // redireciona após login
    } catch (error) {
        const data = error.response?.data

        if (data?.erro) {
            errors.value.global = data.erro
        } else if (data?.message) {
            errors.value.global = data.message
        } else {
            errors.value.global = "Falha ao realizar login."
        }
    }
}

//função que exibe a senha mudando o valor para true que muda o tipo do campo da senha de password para text
function togleSenha() {
    exibirSenha.value = !exibirSenha.value
}

</script>
<style scoped>
.login-page {
    min-height: 100vh;
    background-image: url("../assets/back-login.jpg");
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: center;
    justify-content: center;
}

.login-card {
    background: rgba(30, 30, 30, 0.85);
    width: 100%;
    max-width: 380px;
    padding: 2.5rem 2rem;
    border-radius: 12px;
    box-shadow: 0 0 25px rgba(0, 0, 0, 0.7);
    text-align: center;
}

.login-title {
    color: #19db50;
    margin-bottom: 1.5rem;
}

.login-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.field {
    display: flex;
    flex-direction: column;
    text-align: left;
}

.field label {
    color: #19db50;
    font-weight: bold;
    margin-bottom: 5px;
}

.field input {
    height: 42px;
    width: 100%;
    box-sizing: border-box;
    border-radius: 6px;
    border: 1px solid #333;
    background-color: #000;
    caret-color: #19db50; 
    color: #fff;
    padding: 0 10px;

}

.login-button {
    margin-top: 1rem;
    height: 42px;
    border-radius: 10px;
    border: 1px solid #fff;
    background-color: #000;
    color: #fff;
    cursor: pointer;
    transition: 0.3s;
}

.login-button:hover {
    background-color: #19db50;
    transform: scale(1.05);
}

.login-footer {
    margin-top: 1.5rem;
}

.login-footer a {
    color: #19db50;
    text-decoration: none;
    font-weight: bold;
}

.divider {
    display: flex;
    align-items: center;
    margin: 1.5rem 0;
    color: #aaa;
    font-size: 0.9rem;
}

.divider::before,
.divider::after {
    content: "";
    flex: 1;
    height: 1px;
    background-color: #444;
}

.divider span {
    padding: 0 10px;
    color: #19db50;
    font-weight: bold;
}

.erro {
    color: red;
    font-size: 0.9rem;
}


/*Exibição de senha */


.field-senha{
    position: relative;
}

.togleSenha-botao{
    position: absolute;
    transform: translateY(-50%);
    top: 50%;
    border: none;
    background-color: #00000000;
    right: 10px;

}

.material-icons{
    background: transparent;
    color: white;
}

.field-senha input {
    padding-right: 40px;
}



/*Correção do fundo claro no preenchimento automatico */
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  -webkit-box-shadow: 0 0 0 1000px #000 inset;
  -webkit-text-fill-color: #fff;
}

</style>