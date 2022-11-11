<template lang="pug">
a-menu(
  v-bind="props.options"
  @openChange="menuEvents.openChange"
  @select="menuEvents.select")
  
  component(:is="item.children && item.children.length ? SubMenu : MenuItem" :menu="item" v-for="item in menus" :key="item.key")
</template>

<script setup>
import { reactive } from 'vue'
import SubMenu from './submenu.vue'
import MenuItem from './menuitem.vue'

const props = defineProps({
  options: {
    type: Object,
    require: true
  },
  menus: {
    type: Array
  }
})

const menuEvents = reactive({
  openChange(openKeys) {
    props.options['openKeys'] = openKeys
  },
  select({ item, key, selectedKeys }) {
    props.options['selectedKeys'] = selectedKeys
  }
})
</script>