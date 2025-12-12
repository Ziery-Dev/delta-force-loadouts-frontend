import { defineStore } from "pinia";
import api from "@/utils/axios";

export const useUserStore = defineStore('user', {

    state: () => {
        return {
            usuarios: [],
        }
    },

    actions: {
        async listarUsuarios() {
            try {
                const response = await api.get('/users')
                this.usuarios = response.data
            }
            catch (error) { //ver isso aqui depois...
                console.log(error)
                throw error;
            }
        },

        async cadastrarUsuario(usuario) {
            try {
                const response = await api.post('/users', usuario)
                this.usuarios.push(response)
            }

            catch (error) {
                console.log(error)
                throw error;
            }


        }

    }



})