<template lang="pug">
ul.card-actions
  li(v-if="menus.length")
    a-dropdown(
      v-bind="dropdownBind")
      a.btn-icon-link
        vc-icon(icon="EllipsisOutlined")
      template(#overlay)
        a-menu()
          a-menu-item(v-for="item in menus" @click="item.click") {{ item.label }}

  li(v-if="toggle")
    a.btn-icon-link(@click="toggleCollapse")
      vc-icon(:icon="isCollapse ? 'DownOutlined' : 'UpOutlined'")

  li(v-if="api")
    a.btn-icon-link(@click="handleApi")
      vc-icon(:icon="isLoading ? 'LoadingOutlined' : 'ReloadOutlined'")

  li(v-if="fullscreen")
    a.btn-icon-link(@click="toggleFullscreen")
      vc-icon(:icon="isFullscreen ? 'ShrinkOutlined' : 'ArrowsAltOutlined'")

  li(v-if="remove")
    a-popconfirm(title="确定要移除吗?" @confirm="removeParent")
      a.btn-icon-link
        vc-icon(icon="CloseOutlined")

</template>


<script setup>
import { message } from 'ant-design-vue'
import { reactive, getCurrentInstance, onMounted } from 'vue'

import vcIcon from '@/components/vcIcon'

import { useElementParent } from './helper.js'
const {
  init: initParent, remove: removeParent,
  isLoading, toggleLoading,
  isCollapse, toggleCollapse,
  isFullscreen, toggleFullscreen
} = useElementParent()

const props = defineProps({
  menus: {
    type: Array,
    default: []
  },
  api: {
    type: Function,
    default: undefined
  },
  toggle: {
    type: Boolean,
    default: true
  },
  fullscreen: {
    type: Boolean,
    default: true
  },
  remove: {
    type: Boolean,
    default: true
  },
})

const dropdownBind = reactive({
  destroyPopupOnHide: true,
  // getPopupContainer: () => document.getElementsByClassName('user-profile')[0],
  trigger: [ 'click' ],
  placement: 'bottomRight',
  overlayClassName: 'fixed'
})

async function handleApi() {
  toggleLoading()

  try {
    await props.api()
    message.success('刷新成功')
  } catch(err) {
    message.error(err)
  } finally {
    toggleLoading()
  }
}

function init() {
  const instance = getCurrentInstance()
  initParent(instance.parent)
}

onMounted(() => {
  init()
})
</script>