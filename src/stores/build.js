import { defineStore } from "pinia";
import api from "@/utils/axios";

export const useBuildStore = defineStore('build', {

    state: () => {
        return {
            builds: [],
        }
    },

    actions: {
        async listarTodasBuilds() {
            try {
                const response = await api.get('/build')
                this.builds = response.data
            }
            catch (error) { //ver isso aqui depois...
                console.log(error)
                throw error;
            }

        },

        async cadastrarBuild(build) {
            try {
                const response = await api.post('/build', build)
                this.builds.push = response.data
                return response.data
            }
            catch (error) {
                console.log(error)
                throw error
            }
        },

        async removerBuild(id) {
            try {
                await api.delete(`/build/${id}`)
                this.builds = this.builds.filter(build => build.id !== id)
            }
            catch (error) {
                console.log(error)
                throw error
            }
        }


    }



})