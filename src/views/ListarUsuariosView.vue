<template>
    <div class="container">
        <h1>Lista de usuários</h1>
        <div class="listagem-group">
            <ul v-for="user in userStore.usuarios" :key="user.id">
                <div class="user-group">
                    <li>
                        {{ user.username }}
                    </li>
                    <li> ID: {{ user.id }}</li>
                    <li> ativo: {{ user.enabled ? "Sim" : "Não" }}</li>

                    <button @click="remover(user.id)">
                        Remover
                    </button>
                    <button @click="toggleBloquear(user)">
                        {{ user.enabled ? "Bloquear" : "Desbloquear" }}
                    </button>
                </div>

            </ul>

        </div>


    </div>



</template>


<script setup>
import { useUserStore } from '@/stores/user';
import { onMounted } from 'vue';


const userStore = useUserStore()



onMounted(() => {
    userStore.listarUsuarios()
})


const remover = async (id) => {
    try {
        await userStore.removerUsuario(id)
        alert("Usuário removido com sucesso!")
    }
    catch (error) {
        console.log(error)
        const mensagem = error.response?.data?.erro || "Erro desconhecido, tente novamente"
        alert(mensagem)
        console.log(mensagem)
    }
}
const toggleBloquear = async (user) => {
    if (user.enabled) {
        try {
            await userStore.bloquearUsuario(user.id)
            alert("Usuário bloqueado com sucesso!")
        }
        catch (error) {
            console.log(error)
            const mensagem = error.response?.data?.erro || "Erro desconhecido, tente novamente"
            alert(mensagem)
            console.log(mensagem)
        }
    }
    else {
        try {
            await userStore.desbloquearUsuario(user.id)
            alert("Usuário desbloqueado com sucesso!")
        }
        catch (error) {
            console.log(error)
            const mensagem = error.response?.data?.erro || "Erro desconhecido, tente novamente"
            alert(mensagem)
            console.log(mensagem)
        }
    }
}







</script>




<style>
.container {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;

}

.listagem-group{
    width: 70%;
    max-width: 400px;
}


.user-group {
    box-shadow: 0px 0px 2px 0.5px rgb(255, 255, 255);
    border-radius: 2px;
    background-color: rgba(15, 27, 12, 0.438);
    padding: 10px;


}


.user-group li {
    list-style: none;
    font-weight: bold;
}

.user-group button {
    margin: 5px;
    border-radius: 2px;
    border: none;
    padding: 5px;
    background-color: #19db50;
    color: rgb(0, 0, 0);
    cursor: pointer;
    transition: all 0.2s;
}

.user-group button:hover {
    box-shadow: 0px 0px 4px 2px white;
    transform: scale(1.04);

}
</style>
