import { defineStore } from "pinia";
import api from "@/utils/axios";

export const useBuildStore = defineStore('build', {

    state: () => {
        return {
            builds: [],
            minhas_builds: [],
            search: '',
            currentPage: 0,
            totalPages: 0,
        }
    },

    actions: {

        async cadastrarBuild(build) {
            try {
                const response = await api.post('/build', build)
                this.builds.push(response.data)
                return response.data
            }
            catch (error) {
                if (error?.response?.status === 401) return
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
                if (error?.response?.status === 401) return
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
                if (error?.response?.status === 401) return
                console.log(error)
                throw error
            }

        },

        async listarMinhasBuilds(page = 0, size = 10, sort = 'createdAt,desc') {
            try {
                const response = await api.get(`/build/minhas-builds?page=${page}&size=${size}&sort=${sort}`)

                this.minhas_builds = response.data.content
                this.totalPages = response.data.totalPages;
                this.currentPage = response.data.number;

            }
            catch (error) {
                if (error?.response?.status === 401) return
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


        async listarBuilds({ sort, order, alcance, search, page, size = 10 }) {
            try {
                const response = await api.get('/build', {
                    params: {
                        page,
                        size,
                        sort,
                        order,
                        distanceRange: alcance || null,
                        search
                    }
                });

                this.builds = response.data.content;
                this.totalPages = response.data.totalPages;
                this.currentPage = response.data.number;
            }
            catch (error) {
                if (error?.response?.status === 401) return
                console.log(error);
                throw error;
            }
        },


        setSearch(valor) {
            this.search = valor,
                this.currentPage = 0

        }



        // proximaPag() {
        //     this.currentPage += 1
        // }




    }



})