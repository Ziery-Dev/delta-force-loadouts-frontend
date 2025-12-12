<template>
    <div class="background-container">
        <h1>Registre-se</h1>
        <div class="form-group">
            <form @submit.prevent="cadastrar">
                <p class="erro">{{ errors.erro }}</p>


                <label for="username">Nome de usuário</label>
                <input type="text" v-model="form.username" id="username" placeholder="Seu nome de usuário" maxlength="30"  required>
                <p v-if="errors.username" class="erro">{{ errors.username }}</p>

                <label for="email">E-mail de recuperação</label>
                <input type="text" v-model="form.email" id="email" placeholder="Seu e-mail" maxlength="254"  required>
                <p v-if="errors.email" class="erro">{{ errors.email }}</p>


                <label for="password">Senha</label>
                <input type="password" v-model="form.password" id="password" placeholder="Criar senha" maxlength="72" required>
                <p v-if="errors.password" class="erro">{{ errors.password }}</p>

                <label for="confirmar">Confirmar senha</label>
                <input type="password" v-model="form.confirmar" id="confirmar" placeholder="Repita sua senha" maxlength="72" required>
                <button type="submit">Cadastrar</button>
            </form>
            <div class="voltar-login">
                <p>ou</p>
                <RouterLink to="/login">
                    <p>voltar ao login</p>
                </RouterLink>
            </div>

        </div>



    </div>


</template>


<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/user';

const userStore = useUserStore()





// dessa forma para poder limpar o formulário
const initialForm = { username: '', email: '', password: '', confirmar: '' }
const form = ref({ ...initialForm })

const errors = ref({});


const cadastrar = async () => {
    try {
        if(form.value.password !== form.value.confirmar){   
            errors.value.erro = "Confirmação de senha não bate com a senha fornecida!"
            return
        }
        await userStore.cadastrarUsuario(form.value)
        alert("sucesso ao cadastrar usuário")
    }
    catch (error) {
        console.log(error.response?.data)
        if (error.response?.data) {
            errors.value = error.response.data
        } else if (error.data) {
            errors.value = error.data
        }
    }

}



</script>


<style scoped>
.background-container {
    height: 100%;
    background-image: url("../assets/back-login.jpg");
    background-size: cover;
    /* Garante que a área seja coberta */
    background-position: center center;
    /* Centraliza a imagem no viewport */
    background-repeat: no-repeat;
    background-attachment: fixed;
    /* (Opcional) Fixa a imagem na tela ao rolar (se houver outro conteúdo rolável) */

    /* 2. Propriedades de Tela Cheia e Bloqueio de Scroll */
    position: fixed;
    /* Fixa o container na posição de viewport */
    top: 0;
    /* Define o topo */
    left: 0;
    /* Define a esquerda */
    width: 100vw;
    /* Ocupa 100% da Largura do Viewport */
    height: 100vh;
    /* Ocupa 100% da Altura do Viewport */
    z-index: -1000;
    /* Coloca a imagem atrás de todo o conteúdo */

    /* 3. Bloqueio de Scroll do Elemento (essencial para eliminar vazamento) */
    overflow: hidden;

    /* 4. Alinhamento de components filhos */
    display: flex;
    align-items: center;
    flex-direction: column;

}


.form-group {
    background: rgba(30, 30, 30, 0.85);
    width: 100%;
    max-width: 380px;
    border-radius: 12px;
    padding: 2.5rem 2rem;
    box-shadow: 0 0 25px rgba(0, 0, 0, 0.7);
}

/* Form */
.form-group form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
}

input {
    width: 100%;
    box-sizing: border-box;
    height: 42px;
    border-radius: 6px;
    border: 1px solid #333;
    background-color: #000;
    color: #fff;
    padding: 0 10px;
}

button {
    width: 80%;
    height: 40px;
    margin-top: 20px;
    background-color: #000000;
    border-radius: 10px;
    border: 1px solid white;
    cursor: pointer;
    transition: all 0.6s;
    color: rgb(255, 255, 255);

}

button:hover {
    background-color: #19db50;
    transform: scale(1.1);

}

label {
    padding: 5px;
    color: #19db50;
    border-radius: 3px;
    font-weight: bold;
    margin-bottom: 10px;
}

h1 {
    margin-top: 100px;
    margin-bottom: 10px;
    color: #19db50;
    background: rgb(30, 30, 30);
    border-radius: 5px;
    padding: 10px;
}

.voltar-login p {
    margin: 20px;
}

.voltar-login a {
    color: #19db50;
    text-decoration: none;
}

.erro {
    color: red;
    font-size: 0.9rem;
    margin-top: -15px;
    margin-bottom: 10px;
}
</style>