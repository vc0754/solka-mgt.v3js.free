<template lang="pug">
a-menu-item(:key="menu.key" :title="menu.title")
  router-link(:to="menu.url || ''")
    vc-icon.icon(:icon="menu.meta.icon" v-if="menu.meta && menu.meta.icon")
    span {{ menu.title }}
</template>

<script setup>
import { RouterLink } from 'vue-router'
import vcIcon from '@/components/vcIcon'

defineProps({
  menu: {
    type: Object,
    require: true
  }
})
</script>