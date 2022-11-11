<template lang="pug">
a.btn-icon-link(
  @click="toggle()")
  vc-icon.icon(:icon="isFullscreen ? 'FullscreenExitOutlined' : 'FullscreenOutlined'")
</template>


<script setup>
import { useFullscreen } from '@vueuse/core'

import vcIcon from '@/components/vcIcon'

const { isFullscreen, toggle } = useFullscreen()
</script>