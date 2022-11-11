import { createPinia } from 'pinia'

const store = createPinia()

/**************************************************
 * vue 配置 状态机
 **************************************************/
export function setupStore(app) {
  app.use(store)
}

export { store }