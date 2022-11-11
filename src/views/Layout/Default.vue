<template lang="pug">
a-layout(style="min-height: 100vh")
  layout-aside
  a-layout.vc-container
    layout-header
    router-view
</template>

<script setup>
import LayoutAside from './Aside.vue'
import LayoutHeader from './Header.vue'
</script>