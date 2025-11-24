import { defineStore } from "pinia";
import api from "@/utils/axios";

export const useBuildStore = defineStore('build', {

    state: () => {
        return {
            builds: [],
            minhas_builds: []
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
                this.builds.push(response.data)
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
        },

        async editarBuild(build, id) {
            try {
                const response = await api.put(`/build/${id}`, build)
                const index = this.builds.findIndex(b => b.id === id)
                if (index !== -1) {
                    this.builds[index] = response.data
                }
                return response.data
            }
            catch (error) {
                console.log(error)
                throw error
            }

        },

        async listarMinhasBuilds() {
            try {
                const response = await api.get('/build/minhas-builds')
                this.minhas_builds = response.data

            }
            catch (error) {
                console.log(error)
                throw error;
            }
        },

        async darLike(buildId) {
            try {
                const response = await api.post(`/build/${buildId}/like`)
                const updated = response.data

                // encontra o index dessa build já na lista
                const index = this.builds.findIndex(b => b.id === buildId)

                if (index !== -1) {
                    this.builds[index] = updated
                }

                return updated
            }
            catch (error) {
                console.log(error)
                throw error;
            }
        },

        async disLike(buildId) {
            try {
                const response = await api.post(`/build/${buildId}/dislike`)
                const updated = response.data

                const index = this.builds.findIndex(b => b.id === buildId)

                if (index !== -1) {
                    this.builds[index] = updated
                }

                return updated
            }
            catch (error) {
                console.log(error)
                throw error;
            }
        },


        async listarBuilds(ordem){
            try {
                const response = await api.get(`/build?sort=${ordem}`)
                this.builds = response.data
            }
            catch (error) {
                console.log(error)
                throw error;
            }

        }



    }



})