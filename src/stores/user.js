import { defineStore } from "pinia";
import api from "@/utils/axios";

export const useUserStore = defineStore('user', {

    state: () => {
        return {
            usuarios: [],
            currentPage: 0,
            totalPages: 0,
            isLoading: false
        }
    },

    actions: {

        async listarUsuarios(page = 0) {
            this.isLoading = true
            try {
                const response = await api.get('/users', {
                    params: {
                        page: page,
                        size: 30
                    }
                })

                this.usuarios = response.data.content
                this.currentPage = response.data.number
                this.totalPages = response.data.totalPages

            } catch (error) {
                if (error?.response?.status === 401) return
                throw error
            }
            finally{
                this.isLoading = false
            }
        },

        async cadastrarUsuario(usuario) {
            try {
                const response = await api.post('/users', usuario)
                this.usuarios.push(response.data)
            }

            catch (error) {
                if (error?.response?.status === 401) return   // 401 é tratado globalmente no interceptor
                throw error;
            }


        },

        async removerUsuario(id) {
            try {
                await api.delete(`/users/${id}`)
                this.usuarios = this.usuarios.filter(usuario => usuario.id !== id)
            }

            catch (error) {
                console.log(error)
                throw error;
            }


        },

        async bloquearUsuario(id) {
            try {
                await api.post(`/users/bloquear-usuario/${id}`)
                const user = this.usuarios.find(u => u.id === id)
                if (user) user.enabled = false
            }

            catch (error) {
                if (error?.response?.status === 401) return
                throw error;
            }

        },


        async desbloquearUsuario(id) {
            try {
                await api.post(`/users/desbloquear-usuario/${id}`)
                const user = this.usuarios.find(u => u.id === id)
                if (user) user.enabled = true
            }

            catch (error) {
                if (error?.response?.status === 401) return
                throw error;
            }

        }

    }



})