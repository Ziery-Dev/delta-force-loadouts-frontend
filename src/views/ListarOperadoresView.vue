<template>
    <div class="container">
        <h1>Lista de operadores</h1>
        <div class="listagem-group">

            <ul>
                <li v-for="operador in operadorStore.operadores" :key="operador.id">
                    <div><p> {{ operador.name }}</p></div>
                    <button @click="editarArma(operador)">Editar</button>
                    <button @click="remover(operador.id)">Remover</button>
                    <hr>
                </li>
            </ul>
        </div>

        <div v-if="editando" class="edicao-group" @click="fecharEdicao">
            <CadastrarOperadorView @click.stop :editando="editando" :operador="operadorEmEdicao"  @fechar-edicao="fecharEdicao" />
        </div>

    </div>
</template>

<script setup>
import { useOperadorStore } from '@/stores/operador';
import { notify } from '@/utils/notify';
import { onMounted, ref } from 'vue';
import CadastrarOperadorView from './CadastrarOperadorView.vue';

const operadorStore = useOperadorStore();
const editando = ref(false)
const operadorEmEdicao = ref(null)

onMounted(() => {
    operadorStore.listarOperadores()
})


const remover = async (id) => {
    try {
        await operadorStore.removerOperador(id)
        notify("Operador removido com sucesso!", "success")
    }

    catch (error) {
        const mensagem = error.response?.data?.erro || "Erro desconhecido, tente novamente"
        notify(mensagem, "error")
    }

}

const editarArma = (operador) => {
    editando.value = true;
    operadorEmEdicao.value = { ...operador }

}


const fecharEdicao = () => {
    editando.value = false,
    operadorEmEdicao.value = null
}


</script>


<style scoped lang="scss">
.listagem-group {
    margin-top: 20px;

    ul {
        li {
            p {
                font-weight: bold;
                display: inline-block;
                border: 1px solid #ccc;
                border-radius: 3px;
                padding: 4px 8px;

            }

            hr {
                border: none;
                height: 1px;
                background-color: #ccc;
                margin: 10px auto;
                width: 40%;
            }

            button {
                height: 30px;
                margin: 10px 5px 5px 5px;
                color: rgb(13, 212, 72);
                background-color: transparent;
                border: 1px solid green;
                border-radius: 3px;
                cursor: pointer;
                transition: all 0.3s;
                padding: 5px;
            }


            /*Responsvidade */
            @media (hover: hover) and (pointer: fine) {

                button:hover {
                    transform: scale(1.1);
                    color: #ffffff;
                    background-color: #19db50c0;



                }
            }

            @media (hover: none) and (pointer: coarse) {
                button:active {
                    transform: scale(1.03);
                    color: #ffffff;
                    background-color: #19db50c0;



                }
            }



        }
    }

}





.edicao-group {
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.459);
    z-index: 1000;
    overflow-y: auto;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding: 100px 0;

  
}
</style>