import { createRouter, createWebHistory } from 'vue-router'
import { userStore } from '@/store/modules/user'

/**************************************************
 * 导出 路由实例
 **************************************************/
export const router = createRouter({
  strict: true,
  history: createWebHistory(import.meta.env.VITE_PUBLIC_PATH),
  routes: [
    {
      path: '/',
      name: 'Root',
      meta: { title: '入口' },
      component: () => import('@/views/Layout/Default.vue'),
      redirect: '/workplace',
      children: [
        {
          path: 'newbie',
          name: 'Newbie',
          meta: { icon: 'ios-stats', title: '新手上路' },
          component: () => import('@/views/Newbie/Newbie.vue')
        },
        {
          path: 'workplace',
          name: 'Workplace',
          meta: { icon: 'ios-stats', title: '工作台', keepAlive: true },
          component: () => import('@/views/System/Workplace.vue')
        },
        {
          path: 'blank',
          name: 'Blank',
          meta: { title: '空白页' },
          component: () => import('@/views/System/Blank.vue'),
        },
        {
          path: '/about/me',
          name: 'AboutMe',
          meta: { title: '关于作者' },
          component: () => import('@/views/About/Me.vue'),
        },
        {
          path: '/about/project',
          name: 'AboutProject',
          meta: { title: '关于项目' },
          component: () => import('@/views/About/Project.vue'),
        }
      ]
    },

    // 组件
    {
      path: '/components',
      name: 'AntComponents',
      meta: { title: '组件' },
      component: () => import('@/views/Layout/Default.vue'),
      redirect: '/components/icon',
      children: [
        {
          path: '/components/icon',
          name: 'AntIcon',
          meta: { icon: 'ios-stats', title: '图标' },
          component: () => import('@/views/AntComponents/Icon.vue')
        },
        {
          path: '/components/button',
          name: 'AntButton',
          meta: { icon: 'ios-stats', title: '按钮' },
          component: () => import('@/views/AntComponents/Button.vue')
        },
        {
          path: '/components/card',
          name: 'AntCard',
          meta: { icon: 'ios-stats', title: '卡片' },
          component: () => import('@/views/AntComponents/Card.vue')
        },
        {
          path: '/components/table',
          name: 'AntTable',
          meta: { icon: 'ios-stats', title: '表格' },
          component: () => import('@/views/AntComponents/Table.vue')
        },
      ]
    },
    
    // :::::::: 登陆 / 注册 / 忘记密码 ::::::::
    {
      path: '/sign',
      name: 'Sign',
      meta: { title: '登陆', auth: false },
      component: () => import('@/views/User/Sign.vue' /* webpackChunkName: 'sign' */)
    },
    {
      path: '/:path(.*)*',
      name: 'NotFound',
      component: () => import('@/views/Exception/404.vue'),
      meta: {
        title: 'NotFound'
      }
    }
  ],
  // 是否应该禁止尾部斜杠。默认为假
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 })
})


/**************************************************
 * 导出 路由 vue 配置 
 **************************************************/
export function setupRouter(app) {
  const user = userStore()

  const WHITELIST = [
    '/sign'
  ]
  
  router.beforeEach(async (to, from, next) => {
    const { auth = true, title } = to.meta

    if (!user.signed) {
      if (WHITELIST.includes(to.path)) return next()

      return auth ? next({ name: 'Sign', query: { redirect: to.path } }) : next()
    }
    
    if (title) document.title = title
    next()
  })

  app.use(router)
}