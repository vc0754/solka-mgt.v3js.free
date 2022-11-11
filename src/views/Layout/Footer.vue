<template lang="pug">
a-layout-footer.footer
  p.float-left.mb-0 {{ copyright }} #[strong.brand: span.logo {{ pkg.name }}]. All Rights Reserved.
  p.float-right.mb-0 Hand-crafted #[span.f-ovo &amp;] Made with #[span(style="color: #dd2e44;") ❤] Powered by Vincent.Cheng
</template>

<script setup>
import { computed } from 'vue'

const { pkg } = __APP_INFO__

const copyright = computed(() => {
  const date = new Date()
  return `Copyright © ${date.getFullYear()}`
})
</script>