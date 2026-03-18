import { defineStore } from 'pinia'
import api from '@/utils/axios'
import { jwtDecode } from 'jwt-decode'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    user: null, // dados decodificados do token (ex: username, roles)
    isAuthenticated: !!localStorage.getItem('token'),
    isLoggingIn: false
  }),

  actions: {
    async login(username, password) {
      this.isLoggingIn = true
      try {
        const res = await api.post('/auth/login', { username, password })
        this.token = res.data.token

        localStorage.setItem('token', this.token)
        api.defaults.headers.common['Authorization'] = `Bearer ${this.token}`

        this.decodeAndSetUser(this.token)
        this.isAuthenticated = true
      }
      catch (error) {
        // Importante: garantir que o estado não fique sujo
        this.isAuthenticated = false
        this.token = null
        this.user = null
        localStorage.removeItem('token')

        throw error;


      }
      finally {
        this.isLoggingIn = false
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
        this.decodeAndSetUser(token)
        this.isAuthenticated = true
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
      return this.user?.role === role
    }
  }



})
