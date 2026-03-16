<template>
    <div class="container">
        <h1>Lista de usuários</h1>
        <CarregamentoComponent v-if="userStore.isLoading" />
        
        <p v-else-if="userStore.usuarios.length === 0">
            Nenhum usuário encontrado.
        </p>

        <div v-else class="listagem-group">
            <ul>
                <li v-for="user in userStore.usuarios" :key="user.id" class="user-group">
                    <p>{{ user.username }}</p>
                    <p> ID: {{ user.id }}</p>
                    <p> ativo: {{ user.enabled ? "Sim" : "Não" }}</p>
                    <button @click="remover(user.id)">
                        Remover
                    </button>
                    <button @click="toggleBloquear(user)">
                        {{ user.enabled ? "Bloquear" : "Desbloquear" }}
                    </button>
                </li>
            </ul>
        </div>

       
    <PaginacaoComponent
      v-if="!userStore.isLoading && totalPages > 1"
      :currentPage="currentPage"
      :totalPages="totalPages"
      :proximaPg="proximaPg"
      :anteriorPg="anteriorPg"
    />
    </div>

</template>


<script setup>
import { useUserStore } from '@/stores/user';
import { onMounted, computed } from 'vue';
import router from '@/router'
import { useAuthStore } from '@/stores/auth';
import { notify } from '@/utils/notify';
import PaginacaoComponent from '@/components/PaginacaoComponent.vue';
import CarregamentoComponent from '@/components/CarregamentoComponent.vue';


const authStore = useAuthStore()
const userStore = useUserStore()

const currentPage = computed(() => userStore.currentPage)
const totalPages = computed(() => userStore.totalPages)


onMounted(() => {
    try {
        if (!userStore.usuarios.length) {
            userStore.listarUsuarios()
        }
    }
    catch (error) {
        const mensagem = error.response?.data?.erro || "Erro ao carregar usuários"
        notify(mensagem, "error")
    }
})


const proximaPg = async () => {
    try {
        if (currentPage.value + 1 >= totalPages.value) return
        userStore.listarUsuarios(currentPage.value + 1)
    } catch (error) {
        const mensagem = error.response?.data?.erro || "Erro ao carregar usuários"
        notify(mensagem, "error")
    }
}

const anteriorPg = async () => {
    try {
        if (currentPage.value <= 0) return
        userStore.listarUsuarios(currentPage.value - 1)
    } catch (error) {
        const mensagem = error.response?.data?.erro || "Erro ao carregar usuários"
        notify(mensagem, "error")
    }
}

const remover = async (id) => {
    if (!authStore.isAuthenticated) {
        router.push("/requisicao-login")
        return
    }
    try {
        await userStore.removerUsuario(id)
        notify("Usuário removido!", "warning")
    }
    catch (error) {
        const mensagem = error.response?.data?.erro || "Erro desconhecido, tente novamente"
        notify(mensagem, "error")
    }
}
const toggleBloquear = async (user) => {
    if (!authStore.isAuthenticated) {
        router.push("/requisicao-login")
        return
    }
    if (user.enabled) {
        try {
            await userStore.bloquearUsuario(user.id)
            notify("Usuário bloqueado!", "warning")
        }
        catch (error) {
            const mensagem = error.response?.data?.erro || "Erro desconhecido, tente novamente"
            notify(mensagem, "error")
        }
    }
    else {
        try {
            await userStore.desbloquearUsuario(user.id)
            notify("Usuário desbloqueado!", "success")
        }
        catch (error) {
            const mensagem = error.response?.data?.erro || "Erro desconhecido, tente novamente"
            notify(mensagem, "error")
        }
    }
}

</script>
<style scoped>
.container {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;

}

.listagem-group {
    width: 70%;
    max-width: 400px;
}

.user-group {
    box-shadow: 0px 0px 2px 0.5px rgb(255, 255, 255);
    border-radius: 2px;
    background-color: rgba(15, 27, 12, 0.438);
    padding: 10px;

}

li {
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
