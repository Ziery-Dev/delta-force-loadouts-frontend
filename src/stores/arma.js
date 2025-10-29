import { defineStore } from "pinia";
import api from "@/utils/axios";

export const useArmaStore = defineStore ('arma', {

    state:() => {
        return {
            armas:[],
        }
    },

    actions: { 
        async listarArmas(){
            try{
                const response = await api.get('/arma')
                this.armas = response.data
            }
            catch(error){ //ver isso aqui depois...
                console.log(error)
                throw error;
            }
        },

      






    }



})