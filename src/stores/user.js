import { defineStore } from "pinia";
import api from "@/utils/axios";

export const useUserStore = defineStore('user', {

    state: () => {
        return {
            usuarios: [],
            currentPage: 0,
            totalPages: 0
        }
    },

    actions: {

        async listarUsuarios(page = 0) {
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
                console.log(error)
                throw error
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


        },

        async removerUsuario(id) {
            try {
                await api.delete(`/users/${id}`)
                this.usuarios = this.usuarios.filter(build => build.id !== id)
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
                console.log(error)
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
                console.log(error)
                throw error;
            }

        }

    }



})