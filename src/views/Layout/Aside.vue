<template lang="pug">
a-layout-sider.sidebar(
  v-bind="asideBind")
  
  header.nav-header
    //- 品牌
    h1.brand
      router-link.logo(:to="{ name: 'Root' }" v-if="!app.layout.collapsed")
        span {{ pkg.name }}

  .nav-menu.pb-20(v-if="menus.length")
    vc-menu(:menus="menus" :options="menuOptions")
</template>

<script setup>
import { router } from '@/router'
import { reactive, computed, watch } from 'vue'
import { appStore } from '@/store/modules/app'
import { vcMenu } from '@/components/vcMenu'

import { findNodes } from '@/utils/helper'

const { pkg } = __APP_INFO__
const app = appStore()

const asideBind = reactive({
  class: 'primary-aside',
  collapsed: computed(() => {
    return app.layout.collapsed
  }),
  collapsedWidth: 70,
  collapsible: true,
  defaultCollapsed: false,
  reverseArrow: false,
  theme: 'dark',
  trigger: null,
  width: 250,
})

const menuOptions = reactive({
  forceSubMenuRender: false,
  mode: 'inline',
  openKeys: [],
  selectable:	true,
  selectedKeys: [],
  theme: 'dark',
  triggerSubMenuAction: 'hover'
})

const menus = reactive([
  {
    key: 'Newbie',
    title: '新手引导',
    meta: { icon: 'FlagOutlined' },
    url: '/newbie'
  },
  {
    key: 'Workplace',
    title: '工作台',
    meta: { icon: 'StarOutlined' },
    url: '/workplace'
  },

  {
    key: 'AntComponents',
    title: '组件介绍',
    meta: { icon: 'AppstoreOutlined' },
    url: '',
    children: [
      {
        key: 'AntIcon',
        title: '图标 Icon',
        url: '/components/icon'
      },
      {
        key: 'AntButton',
        title: '按钮 Button',
        url: '/components/button'
      },
      {
        key: 'AntCard',
        title: '卡片 Card',
        url: '/components/card'
      },
      {
        key: 'AntTable',
        title: '表格 Table',
        url: '/components/table'
      },
    ]
  },

  {
    key: 'Extra',
    title: '更多页面',
    meta: { icon: 'FileOutlined' },
    url: '',
    children: [
      {
        key: 'Blank',
        title: '空白页',
        url: '/blank'
      },
      {
        key: 'NotFound',
        title: '404',
        url: '/404'
      },
      {
        key: 'Sign',
        title: '登录页',
        url: '/sign'
      },
    ]
  },

  {
    key: 'About',
    title: '关于',
    meta: { icon: 'RestOutlined' },
    url: '',
    children: [
      {
        key: 'AboutMe',
        title: '关于 Vincent',
        url: '/about/me'
      },
      {
        key: 'AboutProject',
        title: '关于该项目',
        url: '/about/project'
      },
    ]
  },

  // 
])

watch([
  () => router.currentRoute.value.name
], () => {
  const menuList = findNodes(menus, (n) => n.key === router.currentRoute.value.name)
  menuOptions.openKeys = (menuList || []).map(item => item.key)
  menuOptions.selectedKeys = [ router.currentRoute.value.name ]
}, {
  immediate: true
})
</script>