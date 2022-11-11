<template lang="pug">
a-sub-menu(:key="menu.key")
  template(#icon)
    vc-icon.icon(:icon="menu.meta.icon" v-if="menu.meta && menu.meta.icon")
  template(#title)
    span {{ menu.title }}
    
  component(:is="item.children && item.children.length ? SubMenu : MenuItem" :menu="item" v-for="item in menu.children" :key="item.key")
</template>

<script setup>
import SubMenu from './submenu.vue'
import MenuItem from './menuitem.vue'
import vcIcon from '@/components/vcIcon'

defineProps({
  menu: {
    type: Object,
    require: true
  }
})
</script>