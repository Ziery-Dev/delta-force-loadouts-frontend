import { defineStore } from "pinia";
import api from "@/utils/axios";

export const useArmaStore = defineStore('arma', {

    state: () => {
        return {
            armas: [],
            isLoading: false
        }
    },

    actions: {
        async listarArmas() {
            this.isLoading = true
            try {
                const response = await api.get('/arma')
                this.armas = response.data
            }
            catch (error) {
                if (error?.response?.status === 401) return   // 401 é tratado globalmente no interceptor
                throw error;
            }
            finally{
                this.isLoading = false
            }
        },

        async cadastrarArma(arma) {
            try {
                const response = await api.post('/arma', arma)
                this.armas.push(response.data)
            }

            catch (error) {
                if (error?.response?.status === 401) return
                throw error;
            }


        },

        async removerArma(id) {
            try {
                await api.delete(`/arma/${id}`)
                this.armas = this.armas.filter(a => a.id !== id) //filtra armas removendo localmente a arma excluida sem necessida de recarregar as informações da api
            }
            catch (error) {
                if (error?.response?.status === 401) return
                throw error;
            }


        },

        async editarArma(arma, id) {
            try {
                const response = await api.put(`/arma/${id}`, arma)
                const index = this.armas.findIndex(a => a.id === id)
                if (index !== -1) {
                    this.armas[index] = response.data
                }
            }
            catch (error) {
                if (error?.response?.status === 401) return
                throw error;
            }
            

        }

    }



})