<template lang="pug">
component(:is="SignPassword" :gotoForgot="gotoForgot" :gotoRegister="gotoRegister" v-if="type === 'static'")
component(:is="SignWeixin" :gotoForgot="gotoForgot" :gotoRegister="gotoRegister" v-if="type === 'wx'")

component.extra-icon(:is="QrcodeOutlined" @click="iconEvents.click('wx')" v-if="type === 'static'")
component.extra-icon(:is="IdcardOutlined" @click="iconEvents.click('static')" v-if="type === 'wx'")

</template>

<script setup>
import { reactive, computed } from 'vue'
import { router } from '@/router'

import {
  QrcodeOutlined,
  IdcardOutlined
} from '@ant-design/icons-vue'

import SignPassword from './password.vue'
import SignWeixin from './weixin.vue'

const props = defineProps({
  gotoRegister: {
    type: Function,
    default: null
  },
  gotoForgot: {
    type: Function,
    default: null
  }
})

const type = computed(() => {
  return router.currentRoute.value.query.type || 'static'
})

const iconEvents = reactive({
  click(type) {
    const query = router.currentRoute.value.query
    router.replace({
      name: 'Sign',
      query: Object.assign({ type: '' }, query, { type })
    })
  }
})
</script>


<style lang="less" scoped>
.extra-icon {
  color: #bbb;
  font-size: 42px;
  width: 56px; height: 56px; display: block;
  padding: 8px 0 0 0;
  position: absolute; top: 0; right: 0;
  
  &::after {
      content: ''; display: block;
      pointer-events: none;
      position: absolute; bottom: 0; left: 0;
      width: 56px;
      height: 56px;
      border: 28px solid;
      border-color: transparent transparent #fff #fff;
      transition: all 0.3s;
    }
    &:hover {
      &::after {
        width: 30px;
        height: 30px;
        border-width: 15px;
      }
    }
}
</style>