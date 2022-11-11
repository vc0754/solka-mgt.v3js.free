<template lang="pug">
a-layout-content.wrapper
  slot
  //- layout-tabs(v-if="layout.tabs.visible")
  //- router-view(v-else)

  LayoutFooter
</template>

<script setup>
import LayoutFooter from './Footer.vue'

</script>