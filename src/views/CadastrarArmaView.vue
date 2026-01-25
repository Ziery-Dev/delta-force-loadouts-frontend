<template>


    <div class="cadastro-group">

        <h1>Cadastre uma nova arma</h1>

        <form @submit.prevent="cadastrar">

            <p class="erro">{{ errors.erro }}</p>

            <label for="nome">Nome da arma:</label>
            <input v-model="form.name" id="nome" type="text" maxlength="15" required>
            <p v-if="errors.name" class="erro">{{ errors.name }}</p>


            <label for="arma">Selecione a categoria da arma</label>
            <select v-model="form.category" name="categoria" id="categoria" required>
                <option value=null disabled>Selecione...</option>
                <option v-for="c in categoriaArma" :key="c" :value="c.value">{{ c.label }}
                </option>
            </select>
            <p v-if="errors.category" class="erro">{{ errors.category }}</p>

            <label for="operador">Selecione os operadores compatíveis</label>
            <div class="selecinar-operador">
                <div v-for="op in operadorStore.operadores" :key="op.id">
                    <p :for="op.id">{{ op.name }}</p>
                    <input type="checkbox" :id="op.id" :value="op.id" v-model="form.operatorIds" name="operador" />
                </div>
            </div>
            <p v-if="errors.operatorIds" class="erro">{{ errors.operatorIds }}</p>




            <label for="imagem">Insira a url da imagem </label>
            <input v-model="form.imgUrl" id="imagem" type="text" maxlength="200" required>
            <p v-if="errors.imgUrl" class="erro">{{ errors.imgUrl }}</p>


            <button type="submit"> Cadastrar</button>

        </form>


    </div>

</template>




<script setup>
import { useArmaStore } from '@/stores/arma';
import { ref, onMounted } from 'vue';
import { useOperadorStore } from '@/stores/operador';



const armaStore = useArmaStore()
const operadorStore = useOperadorStore()


onMounted(() => {
    operadorStore.listarOperadores()

})

const errors = ref({});

// dessa forma para poder limpar o formulário
const initialForm = { name: '', category: null, imgUrl: '', operatorIds: [] }
const form = ref({ ...initialForm })


const categoriaArma = [
    { label: 'Fuzil', value: 'FUZIL' },
    { label: 'SMG', value: 'SMG' },
    { label: 'LMG', value: 'LMG' },
    { label: 'MR', value: 'MR' },
    { label: 'SR', value: 'SR' }
]





const cadastrar = async () => {

    if (form.value.operatorIds.length === 0) {
        errors.value.operatorIds = "Selecione pelo menos um operador"
        return
    }
    try {
        await armaStore.cadastrarArma(form.value)
        alert("Sucesso ao cadastrar arma")
        Object.assign(form.value, initialForm) //Limpa o formulário após cadastro
        errors.value = {}

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
.cadastro-group {
    border: 1px solid #a11313;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;


}

form {
    border: 1px solid rgb(67, 41, 163);
    width: 70%;
    max-width: 400px;
    padding: 2rem;
    border-radius: 10px;
    background: #0f2910;
    display: flex;
    align-items: center;
    flex-direction: column;
    color: #19db50;
    box-shadow: 0px 0px 1px 0.5px white;

}

label {
    padding: 5px;
    background-color: black;
    color: #19db50;
    border-radius: 3px;
    border: 1px solid white;
    font-weight: bold;
}

select {
    background-color: #19db50;
    width: 80%;
    height: 40px;
    border-radius: 5px;
    border: none;
    margin: 10px 0px 20px 0px;
    font-weight: bold;

}

input {
    background-color: #19db50;
    width: 78%;
    height: 32px;
    border-radius: 5px;
    border: none;
    margin: 10px 0px 20px 0px;
    padding: 5px;
}



button {
    width: 80%;
    height: 40px;
    background-color: #000000;
    border-radius: 10px;
    border: 1px solid white;
    cursor: pointer;
    transition: all 0.6s;
    color: rgb(255, 255, 255);
}

button:hover {
    transform: scale(1.1);
    box-shadow: 0px 0px 3px 0.5px white;
    background-color: #38e76a;

}

h1 {
    background-color: #38e76a;
    color: #000000;
    font-family: 'Arial Narrow Bold', sans-serif;
    border-radius: 10px;
    margin-bottom: 10px;
    margin-top: 10px;
}

.selecinar-operador {
    border: 1px solid green;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: 20px;
    width: 80%;

}

.selecinar-operador div {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-size: 0.8em;
    margin: 5px;
    border: 1px dashed rgb(118, 197, 94);
    padding: 5px;
    height: 60px;
    width: 100px;
}


.erro {
    color: red;
    font-size: 0.9rem;
    margin-top: -15px;
    margin-bottom: 10px;
}
</style>
