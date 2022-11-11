import { defineStore } from 'pinia'

export const userStore = defineStore('user', {
  state: () => (
    JSON.parse(sessionStorage.getItem('solka-user')) || {
      id: 0,
      display_name: ''
    }
  ),
  getters: {
    signed() {
      return Boolean(this.id)
    }
  },
  actions: {
    sign(res) {
      sessionStorage.setItem('solka-user', JSON.stringify(res))
      this.id = res.id
      this.display_name = res.display_name
    }
  }
})
