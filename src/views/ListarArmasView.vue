<template>


    <div class="listagem-group">
        <h1>Lista de armas</h1>
        <ul v-for="a in armaStore.armas" :key="a.id">
            <li>
                <div class="card-arma">
                    <div class="img-arma">
                        <img :src="a.imgUrl">
                    </div>
                    <div class="info-arma">
                        <p> {{ a.name }}</p>
                        <button @click="editarArma(a)">
                            Editar
                        </button>
                        <button @click="removerArma(a.id)">
                            Remover
                        </button>
                    </div>

                </div>

            </li>
        </ul>

    </div>
    <div v-if="editando" class="edicao-group" @click="fecharEdicao">
        <CadastrarArmaView @click.stop :editando="editando" :arma="armaEmEdicao" @fechar-edicao="fecharEdicao" />
    </div>

</template>

<script setup>
import { useArmaStore } from '@/stores/arma';
import { onMounted, ref } from 'vue';
import { notify } from '@/utils/notify';
import CadastrarArmaView from './CadastrarArmaView.vue';



const armaStore = useArmaStore();

const editando = ref(false)
const armaEmEdicao = ref(null)


onMounted(async () => {
    await armaStore.listarArmas()

})

const removerArma = async (id) => {
    try {
        await armaStore.removerArma(id)
        notify("Arma removida!", "success")
    }
    catch (error) {
        const mensagem = error.response?.data?.erro || "Erro desconhecido, tente novamente"
        notify(mensagem, "error")
    }
}

const editarArma = (arma) => {
    editando.value = true;
    armaEmEdicao.value = { ...arma }
}

const fecharEdicao = () => {
    editando.value = false,
        armaEmEdicao.value = null
}



</script>

<style scoped lang="scss">
//comecei usar scss!

.listagem-group {
    width: 70%;
    gap: 20px;
    flex-wrap: wrap;
    margin: 0 auto;
    display: flex;
    justify-content: center;

    li {
        list-style: none;

        .card-arma {
            border: 1px solid green;
            border-radius: 3px;
            box-shadow: 0px 0px 3px 1px green;
            width: 250px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 30px;
            background-image:
                linear-gradient(rgba(10, 10, 10, 0.5), rgba(29, 28, 28, 0.1)),
                url('/src/assets/fundo-arma.jpg');

            .info-arma {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 5px;

                button {
                    width: 70px;
                    border-radius: 4px;
                    border: 1px solid white;
                    background-color: #19db50;
                    color: rgb(0, 0, 0);
                    margin-bottom: 2px;
                    cursor: pointer;
                     transition: all 0.5s;
                }

                /*Responsvidade */
                @media (hover: hover) and (pointer: fine) {

                    button:hover {
                        transform: scale(1.1);
                        box-shadow: 0px 0px 2px 1px rgb(46, 255, 46);
                        color: #ffffff;
                       
                    }
                }

                @media (hover: none) and (pointer: coarse) {
                    button:active {
                        transform: scale(1.03);
                        box-shadow: 0px 0px 5px 1px rgb(46, 255, 46);
                        color: #ffffff;
                     
                    }
                }



            }

            .img-arma {
                img {
                    width: 100px;

                }

            }


        }

    }

    h1 {
        display: block;
        width: 100%;
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
    padding: 40px 0;
}
</style>