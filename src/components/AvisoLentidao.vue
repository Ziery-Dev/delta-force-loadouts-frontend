<template>
    <div class="overlay">
        <div class="modal">
            <h2>Aviso!</h2>
            <p>
                Devido às limitações do servidor, o primeiro acesso após 15 minutos de
                inatividade pode demorar até 59 segundos. Após isso, o site funciona
                normalmente.
            </p>

            <label>
                <input type="checkbox" v-model="naoMostarNovamente" />
                Não exibir novamente
            </label>
            <div> 
                <button @click="closeModal"> X Fechar </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue'

const emit = defineEmits(['close'])
const naoMostarNovamente = ref(false)

function closeModal() {
    emit('close', naoMostarNovamente.value)
}
</script>

<style scoped>
.overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
}

.modal {
    font-weight: bold;
    background: rgb(45, 121, 45);
    padding: 24px;
    border-radius: 12px;
    max-width: 420px;
    width: 80%;
    box-shadow: 0px 0px 10px 0.3px rgb(255, 255, 255);
    color: white;
    text-align: center;
    
}

button {
    padding: 5px;
    border-radius: 4px;
    border: none;
    background-color: #000000;
    color: rgb(255, 255, 255);
    margin-top: 10px;
    cursor: pointer;
    transition: all 0.5s;
}

label {
    color: rgb(0, 0, 0);
}

p {
    margin-bottom: 10px;
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
</style>