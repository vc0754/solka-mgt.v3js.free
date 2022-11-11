import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

import { viteMockServe } from 'vite-plugin-mock'

import pkg from './package.json'
import dayjs from 'dayjs'

const { name, description, version, dependencies, devDependencies } = pkg
const __APP_INFO__ = {
  pkg: { name, description, version, dependencies, devDependencies },
  lastBuildTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
}

// https://vitejs.dev/config/
export default defineConfig({
  base: '',
  plugins: [
    vue(),

    Components({
      dirs: [ 'src/components' ], // 配置需要默认导入的自定义组件文件夹，该文件夹下的所有组件都会自动 import
      resolvers: [ AntDesignVueResolver({ importStyle: true, resolveIcons: true }) ],
      directoryAsNamespace: true
    }),

    viteMockServe({
      supportTs: false,
      // logger: false,
      mockPath: './src/mock'
    })
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },

  define: {
    __APP_INFO__: JSON.stringify(__APP_INFO__),
  },
})
