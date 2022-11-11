import { createApp } from 'vue'
import { setupStore } from '@/store'
import { router, setupRouter } from '@/router'
import { setupUI } from '@/ui'

import App from './App.vue'

async function bootstrap() {
  const app = createApp(App)
  
  // Store 配置
  setupStore(app)
  
  // Route 配置
  setupRouter(app)

  // UI 配置
  setupUI(app)
  
  await router.isReady()

  app.mount('#app')
}

bootstrap()

console.log(
  '%c solka-mgt v3js %c free %c v1.0.0 ',
  'padding: 2px 1px; border-radius: 3px 0 0 3px; color: #fff; background: #5584ff; font-weight: bold;',
  'padding: 2px 1px; border-radius: 0 0 0 0; color: #fff; background: #12102e; font-weight: bold;',
  'padding: 2px 1px; border-radius: 0 3px 3px 0; color: #fff; background: #42c02e; font-weight: bold;',
)