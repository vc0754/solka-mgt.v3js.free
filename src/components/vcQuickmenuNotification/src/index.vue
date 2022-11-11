<template lang="pug">
a.btn-icon-link(
  @click="iconEvents.click")
  a-badge(:dot="notification.dot")
    vc-icon.icon(icon="BellOutlined")
</template>
  
  
<script setup>
import { message } from 'ant-design-vue'
import { reactive } from 'vue'

import vcIcon from '@/components/vcIcon'

const iconEvents = reactive({
  click () {
    message.success('通知图标被点击！')

    notification.dot = true
    
    setTimeout(() => {
      notification.dot = false
    }, 1500)
  }
})

const notification = reactive({
  dot: false
})
</script>