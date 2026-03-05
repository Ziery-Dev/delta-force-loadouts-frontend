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


        },

        async removerOperador(id) {
            try {
                await api.delete(`/operador/${id}`)
                this.operadores = this.operadores.filter(b => b.id !== id)
            }

              catch (error) {
                if (error?.response?.status === 401) return
                console.log(error)
                throw error;
            }
        },

        async editarOperador(operador, id){
            try{
                const response = await api.put(`/operador/${id}`, operador)
                const index = this.operadores.findIndex(op => op.id == id ) //procura na lista "operadores" a posição de um item op onde o seu id é igual ao id recbido, armazendo essa posição na varivel index
                if(!index !== -1){ //-1 significa que não encontrou
                    this.operadores[index] = response.data //troca o item da posição encontrada pelo item que veio de resposata da api
                }
            }
            
              catch (error) {
                if (error?.response?.status === 401) return
                console.log(error)
                throw error;
            }
        }

    }



})