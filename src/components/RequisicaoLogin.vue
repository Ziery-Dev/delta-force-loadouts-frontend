<template>
    <div class="requisicao-group">
        <h1>Opa, parece que você ainda não está logado</h1>
        <h2>Faça login e acesse funcionalidades exclusivas!</h2>
        <ul>
            <li>Cadastro de build</li>
            <li>Listagem de builds cadastradas</li>
            <li>Adicionar build a lista de favoritas</li>
            <li>Avaliar build (curti/não curti)</li>
            <li>E muito mais...</li>
        </ul>
        <button  @click="fazerLogin">
            <span class="material-icons">login</span>
            Fazer login agora
        </button>
        <button @click="voltarPagina">
            <span class="material-icons">replay</span>
           Ignorar por enquanto
        </button>

    </div>

</template>

<script setup>
import router from '@/router';

const fazerLogin = () =>  {
    router.push("/login")
}
const voltarPagina = () =>  {
    router.push("/")
}


</script>

<style scoped>
.requisicao-group {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 20PX;
    gap: 10PX;
}

ul li {
    list-style: inside;
    text-align: left;
    margin: 10px 0;
}

button {
    display: flex;
    align-items: center;
    padding-left: 10px;
    width: 150px;
    height: 30px;
    margin: 5px;
    border-radius: 8px;
    border: none;
    background-color: #2f3a2fc7;
    color: rgb(13, 212, 72);
    cursor: pointer;
    transition: all 0.3s;
    box-shadow: 0px 0px 1px 0.5px rgb(168, 166, 166);
}

button:hover {
    transform: scale(1.1);
    box-shadow: 0px 0px 5px 1px rgb(46, 255, 46);
    color: #ffffff;
}
</style>
