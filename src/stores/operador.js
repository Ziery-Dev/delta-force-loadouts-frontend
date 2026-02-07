import { defineStore } from "pinia";
import api from "@/utils/axios";

export const useOperadorStore = defineStore('operador', {

    state: () => {
        return {
            operadores: [],
        }
    },

    actions: {
        async listarOperadores() {
            try {
                const response = await api.get('/operador')
                this.operadores = response.data
            }
            catch (error) {
                if (error?.response?.status === 401) return
                console.log(error)
                throw error;
            }
        },

        async cadastrarOperador(operador) {
            try {
                const response = await api.post('/operador', operador)
                this.operadores.push(response)
            }

            catch (error) {
                if (error?.response?.status === 401) return
                console.log(error)
                throw error;
            }


        }

    }



})