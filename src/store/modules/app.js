import { defineStore } from 'pinia'

export const appStore = defineStore('app', {
  state: () => (
    JSON.parse(sessionStorage.getItem('solka-app')) || {
      layout: {
        collapsed: false
      }
    }
  ),
  getters: {},
  actions: {
    layoutCollapsed() {
      this.layout.collapsed = !this.layout.collapsed
      sessionStorage.setItem('solka-app', JSON.stringify(this))
    }
  }
})
