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
      const res = await api.post('/auth/login', { username, password })
      this.token = res.data.token

      localStorage.setItem('token', this.token)
      api.defaults.headers.common['Authorization'] = `Bearer ${this.token}`

      this.decodeAndSetUser(this.token)
      this.isAuthenticated = true
    },

    decodeAndSetUser(token) {
      try {
        const decoded = jwtDecode(token)
        this.user = {
          username: decoded.sub,
          roles: decoded.roles || []
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
      this.user = { username: decoded.sub } // 👈 aqui usamos o sub
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
