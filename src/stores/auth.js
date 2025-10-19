import { defineStore } from 'pinia'
import api from '@/utils/axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null,
    user: null,
    isAuthenticated: false
  }),
  actions: {
    async login(username, password) {
      const res = await api.post('/auth/login', { username, password })
      this.token = res.data.token
      this.user = res.data.user
      this.isAuthenticated = true
      localStorage.setItem('token', this.token)

      api.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
    },
    logout() {
      this.token = null
      this.user = null
      this.isAuthenticated = false
      localStorage.removeItem('token')
      delete api.defaults.headers.common['Authorization']
    },
    tryAutoLogin() {
      const token = localStorage.getItem('token')
      if (token) {
        this.token = token
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`
        this.isAuthenticated = true
      }
    }
  }
})
