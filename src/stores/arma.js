import { defineStore } from "pinia";
import api from "@/utils/axios";

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
                console.log(error)
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
                console.log(error)
                throw error;
            }


        }

    }



})