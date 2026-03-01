import { defineStore } from "pinia";
import api from "@/utils/axios";
import { notify } from "@/utils/notify";

export const useArmaStore = defineStore('arma', {

    state: () => {
        return {
            armas: [],
        }
    },

    actions: {
        async listarArmas() {
            try {
                const response = await api.get('/arma')
                this.armas = response.data
            }
            catch (error) {
                if (error?.response?.status === 401) return
                notify(error, "error")
                throw error;
            }
        },

        async cadastrarArma(arma) {
            try {
                const response = await api.post('/arma', arma)
                this.armas.push(response.data)
            }

            catch (error) {
                if (error?.response?.status === 401) return
                notify(error, "error")
                throw error;
            }


        },

        async removerArma(id){
            try{
                 await api.delete (`/arma/${id}`)
                this.armas = this.armas.filter( a => a.id !== id) //filtra armas removendo localmente a arma excluida sem necessida de recarregar as informações da api
            }
               catch (error) {
                if (error?.response?.status === 401) return
                throw error;
            }


        },

        async editarArma(arma, id){
            try {
               const response =  await api.put(`/arma/${id}`, arma)
                const index = this.armas.findIndex(b => b.id === id)
                if (index !== -1) {
                    this.armas[index] = response.data
                }
            }
            catch (error){
                if (error?.response?.status === 401) return
            //    notify(error, "error")
                throw error;
            }

        }

    }



})