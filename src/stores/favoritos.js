import { defineStore } from "pinia";
import api from "@/utils/axios";

export const useFavoritosStore = defineStore('favoritos', {

    state: () => {
        return {
            favoritos: [],
        }
    },

    actions: {
        async listarFavoritos() {
            try {
                const response = await api.get("/users/favoritos")
                this.favoritos = response.data

            }
            catch (error) { 
                console.log(error)
                throw error;
            }
        },
        async adicionarFavorito(buildId) {
            try {
              await api.post(`/users/favoritos/${buildId}`)
            //   this.favoritos.push(response.data)        
            }
            catch (error) { 
                console.log(error)
                throw error;
            }
        }


    }

})