<template>
    <div class="cadastro-group">

        <h1>Cadastre uma nova build</h1>

        <form @submit.prevent="cadastrar">

            <p class="erro">{{ errors.erro }}</p>

            <label for="arma">Selecione a arma</label>
            <select v-model="form.weaponId" name="arma" id="arma">
                <option value=null disabled>Selecione...</option>
                <option v-for="arma in armaStore.armas" :key="arma.id" :value="arma.id">{{ arma.name }}</option>
            </select>
            <p v-if="errors.weaponId" class="erro">{{ errors.weaponId }}</p>


            <label for="descricao">Descriação da build:</label>
            <input v-model="form.description" id="descricao" type="text">
            <p v-if="errors.description" class="erro">{{ errors.description }}</p>



            <label for="alcance">Selecione o alcance:</label>
            <select v-model="form.distance_range" name="alcance" id="alcance">
                <option value=null disabled>Selecione...</option>
                <option v-for="alcance in alcances" :key="alcance" :value="alcance.value">{{ alcance.label }}</option>
            </select>
            <p v-if="errors.distance_range" class="erro">{{ errors.distance_range }}</p>


            <label for="codigo">Insira o codigo da build:</label>
            <input v-model="form.code" id="codigo" type="text">
            <p v-if="errors.code" class="erro">{{ errors.code }}</p>


            <button type="submit">Cadastrar</button>

        </form>


    </div>


</template>


<script setup>
import router from '@/router';
import { useBuildStore } from '@/stores/build';
import { ref, onMounted } from 'vue';
import { useArmaStore } from '@/stores/arma';

const buildStore = useBuildStore();
const armaStore = useArmaStore();



const errors = ref({});


const form = ref({
    code: '',
    description: '',
    distance_range: null,
    weaponId: null,
})

onMounted(() => {
    buildStore.listarTodasBuilds(),
        armaStore.listarArmas()

})



//Exibe os alca\nces de forma mais amigavel
const alcances = [
    { label: 'Curto alcance', value: 'CURTO' },
    { label: 'Médio alcance', value: 'MEDIO' },
    { label: 'Longo alcance', value: 'LONGE' },
    { label: 'Muito longo', value: 'MUITO_LONGE' }
]


const cadastrar = async () => {
    try {
        await buildStore.cadastrarBuild(form.value)
        router.push('/')
        alert('Sucesso ao cadastrar build!')

    }
    catch (error) {
        if (error.response?.data) {
            errors.value = error.response.data
        }
        else if (error.data) {
            errors.value = error.data
        }
    }


}


</script>

<style scoped>
.cadastro-group {
    width: 450px;
    margin: 50px auto;

}

form {
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
}

.erro {
    color: red;
    font-size: 0.9rem;
    margin-top: -15px;
    margin-bottom: 10px;
}
</style>
