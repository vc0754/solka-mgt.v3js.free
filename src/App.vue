<template lang="pug">
a-config-provider(:locale="locale")
  router-view
</template>


<script setup>
import 'dayjs/locale/zh-cn'

import zhCN from 'ant-design-vue/es/locale/zh_CN'

const locale = zhCN

</script>