<template>
    <main class="register-page">
        <section class="register-card">
            <h1 class="register-title">Crie sua conta</h1>

            <form class="register-form" @submit.prevent="cadastrar">
                <p v-if="errors.erro" class="erro" role="alert">
                    {{ errors.erro }}
                </p>

                <div class="field">
                    <label for="username">Usuário</label>
                    <input
                        id="username"
                        v-model="form.username"
                        type="text"
                        placeholder="Escolha um usuário"
                        maxlength="30"
                        required
                        autocomplete="username"
                    />
                    <p v-if="errors.username" class="erro">{{ errors.username }}</p>
                </div>

                <div class="field">
                    <label for="email">E-mail</label>
                    <input
                        id="email"
                        v-model="form.email"
                        type="email"
                        placeholder="Seu e-mail"
                        maxlength="254"
                        required
                        autocomplete="email"
                    />
                    <p v-if="errors.email" class="erro">{{ errors.email }}</p>
                </div>

                <div class="field">
                    <label for="password">Senha</label>
                    <input
                        id="password"
                        v-model="form.password"
                        type="password"
                        placeholder="Crie uma senha"
                        maxlength="72"
                        required
                        autocomplete="new-password"
                    />
                    <p v-if="errors.password" class="erro">{{ errors.password }}</p>
                </div>

                <div class="field">
                    <label for="confirmar">Confirmar senha</label>
                    <input
                        id="confirmar"
                        v-model="form.confirmar"
                        type="password"
                        placeholder="Repita a senha"
                        maxlength="72"
                        required
                        autocomplete="new-password"
                    />
                </div>

                <button class="register-button" type="submit">
                    Cadastrar
                </button>
            </form>

            <div class="divider">
                <span>ou</span>
            </div>

            <div class="register-footer">
                <RouterLink to="/login">voltar ao login</RouterLink>
            </div>
        </section>
    </main>
</template>


<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router';
import { notify } from '@/utils/notify';


const userStore = useUserStore()
const router = useRouter();


const initialForm = {
    username: '',
    email: '',
    password: '',
    confirmar: ''
}

const form = ref({ ...initialForm })
const errors = ref({})

const cadastrar = async () => {
    errors.value = {}

    if (form.value.password !== form.value.confirmar) {
        errors.value.erro = 'Confirmação de senha não bate com a senha fornecida!'
        return
    }

    try {
        await userStore.cadastrarUsuario(form.value)
        notify("Usuário cadastrado com sucesso!", "success")
        router.push('/login')
    } catch (error) {
        const data = error.response?.data || error.data
        if (data) {
            errors.value = data
        } else {
            errors.value.erro = 'Erro ao cadastrar usuário.'
        }
    }
}
</script>

<style scoped>
.register-page {
    min-height: 100vh;
    background-image: url("../assets/back-login.jpg");
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: center;
    justify-content: center;
}

.register-card {
    background: rgba(30, 30, 30, 0.85);
    width: 100%;
    max-width: 380px;
    padding: 2.5rem 2rem;
    border-radius: 12px;
    box-shadow: 0 0 25px rgba(0, 0, 0, 0.7);
    text-align: center;
}

.register-title {
    color: #19db50;
    margin-bottom: 1.5rem;
}

.register-form {
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
    border-radius: 6px;
    border: 1px solid #333;
    background-color: #000;
    color: #fff;
    padding: 0 10px;
}

.register-button {
    margin-top: 1rem;
    height: 42px;
    border-radius: 10px;
    border: 1px solid #fff;
    background-color: #000;
    color: #fff;
    cursor: pointer;
    transition: 0.3s;
}

.register-button:hover {
    background-color: #19db50;
    transform: scale(1.05);
}

.register-footer {
    margin-top: 1.5rem;
}

.register-footer a {
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
</style>
