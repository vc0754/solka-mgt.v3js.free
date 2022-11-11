<template lang="pug">
a.btn-icon-link(
  @click="iconEvents.click")
  vc-icon.icon(icon="GlobalOutlined")
</template>


<script setup>
import { message } from 'ant-design-vue'
import { reactive } from 'vue'

import vcIcon from '@/components/vcIcon'

const iconEvents = reactive({
  click () {
    message.success('地球图标被点击！')
  }
})
</script>