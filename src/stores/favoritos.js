import { defineStore } from "pinia";
import api from "@/utils/axios";

export const useFavoritosStore = defineStore('favoritos', {

    state: () => {
        return {
            favoritos: [],
            currentPage: 0,
            totalPages: 0,
        }
    },

    actions: {
        async listarFavoritos(page = 0, size = 10, sort = 'createdAt,desc') {
            try {
                const response = await api.get(`/users/favoritos?page=${page}&size=${size}&sort=${sort}`)
              
              
                this.favoritos = response.data.content
                this.totalPages = response.data.totalPages;
                this.currentPage = response.data.number; 

            }
            catch (error) {
                console.log(error)
                throw error;
            }
        },
        async adicionarFavorito(buildId) {
            try {
                const response = await api.post(`/users/favoritos/${buildId}`)
                this.favoritos.push(response.data)
            }
            catch (error) {
                console.log(error)
                throw error;
            }
        },

        async removerFavorito(buildId) {
            try {
                await api.delete(`/users/favoritos/${buildId}`)
                this.favoritos = this.favoritos.filter(build => build.id !== buildId)
            }
            catch (error) {
                console.log(error)
                throw error;
            }
        }


    }

})