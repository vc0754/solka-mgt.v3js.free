<template lang="pug">
a-layout-header.header
  .float-left.header-inner

    h1.brand.header-middle
      router-link.logo(:to="{ name: 'Root' }")
        span {{ pkg.name }}

    ul.quick-menu.header-middle
      li
        a.btn-icon-link(@click="app.layoutCollapsed()")
          vc-icon.icon(:icon="app.layout.collapsed ? 'MenuUnfoldOutlined' : 'MenuFoldOutlined'")

      li #[vc-quickmenu-notification]
      li #[vc-quickmenu-language]
      li #[vc-quickmenu-fullscreen]

  .float-right.header-inner
    vc-avatar-dropdown.header-middle
</template>


<script setup>
import { appStore } from '@/store/modules/app'

import { vcQuickmenuNotification} from '@/components/vcQuickmenuNotification'
import { vcQuickmenuLanguage } from '@/components/vcQuickmenuLanguage'
import { vcQuickmenuFullscreen } from '@/components/vcQuickmenuFullscreen'
import { vcAvatarDropdown } from '@/components/vcAvatarDropdown'
import vcIcon from '@/components/vcIcon'

const { pkg } = __APP_INFO__
const app = appStore()
</script>