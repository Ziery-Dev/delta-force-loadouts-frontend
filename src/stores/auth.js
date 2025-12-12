import { defineStore } from 'pinia'
import api from '@/utils/axios'
import { jwtDecode } from 'jwt-decode'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    user: null, // dados decodificados do token (ex: username, roles)
    isAuthenticated: !!localStorage.getItem('token')
  }),

  actions: {
    async login(username, password) {
      try {
        const res = await api.post('/auth/login', { username, password })
        this.token = res.data.token

        localStorage.setItem('token', this.token)
        api.defaults.headers.common['Authorization'] = `Bearer ${this.token}`

        this.decodeAndSetUser(this.token)
        this.isAuthenticated = true
      }
      catch (error) {
        /*
        // Log detalhado para debug
        console.error("Erro no login:", error)

        // Trate de forma segura
        if (error.response?.status === 400) {
          alert("Usuário ou senha inválidos.")
        }
        else if (error.response?.status === 401) {
          alert("Não autorizado. Verifique suas credenciais.")
        }
        else {
          alert("Erro ao conectar com o servidor.")
        }
           */
          // Importante: garantir que o estado não fique sujo
        this.isAuthenticated = false
        this.token = null
        localStorage.removeItem('token')

        console.log(error)
        throw error;

   
      }
    },


    decodeAndSetUser(token) {
      try {
        const decoded = jwtDecode(token)
        this.user = {
          id: decoded.id,
          username: decoded.sub,
          role: decoded.role || ''
        }
      } catch (e) {
        console.error('Erro ao decodificar token:', e)
        this.logout()
      }
    },

    tryAutoLogin() {
      const token = localStorage.getItem('token')
      if (token) {
        this.token = token
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`
        try {
          const decoded = jwtDecode(token)
          this.user = {
            id: decoded.id,
            username: decoded.sub,
            role: decoded.role || '',
            buildsFavoritas: decoded.favoritesBuilds || []
          }
          this.isAuthenticated = true
        } catch (error) {
          console.error('Erro ao decodificar token:', error)
          this.logout()
        }
      }
    },



    logout() {
      this.token = null
      this.user = null
      this.isAuthenticated = false
      localStorage.removeItem('token')
      delete api.defaults.headers.common['Authorization']
    },

    hasRole(role) {
      return this.user?.roles?.includes(role)
    }
  }



})
