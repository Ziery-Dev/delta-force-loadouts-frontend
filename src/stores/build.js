import { defineStore } from "pinia";
import api from "@/utils/axios";

export const useBuildStore = defineStore ('build', {

    state:() => {
        return {
            builds:[],
        }
    },

    actions: { 
        async listarTodasBuilds(){
        try{
            const response = await api.get('/build')
            this.builds = response.data
        }
        catch(error){ //ver isso aqui depois...
            console.log(error)
            throw error;
        }
    },






    }



})