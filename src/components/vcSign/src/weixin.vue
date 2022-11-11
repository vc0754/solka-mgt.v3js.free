<template lang="pug">
a-card(v-bind="signCardBind")
  .sign-qrcode
    .weixin-qrcode
      img(:src="qrCode" alt="")
    .opacity-70
      .mb-1 请使用微信扫描二维码登录
      p #[strong.brand: span.logo {{ pkg.name }}]
  
  .text-center.m-t-35.mt-6
    a(@click="signPassword") 密码登录
    a-divider(type="vertical")
    a(@click="goRegister") 注册新帐号

</template>


<script setup>
import { reactive } from 'vue'
import { router } from '@/router'

import qrCode from '@/assets/qrcode.jpg'

const { pkg } = __APP_INFO__

const props = defineProps({
  gotoRegister: {
    type: Function,
    default: null
  }
})

const signCardBind = reactive({
  title: '微信扫码登录',
  bordered: false,
  class: [ 'sign-weixin' ]
})

// 密码登录
function signPassword() {
  const query = router.currentRoute.value.query
  router.replace({
    name: 'Sign',
    query: Object.assign({ type: '' }, query, { type: 'static' })
  })
}

// 跳转到注册页面
function goRegister() {
  if (props.gotoRegister) return props.gotoRegister()
  const { href } = router.resolve({ name: 'Register' })
  window.open(href, '_blank')
}
</script>


<style lang="less">
.sign-weixin {
  .ant-card-head {
    height: 58px;
  }
  
  .sign-qrcode {
    text-align: center;

    p { margin: 0;}

    .weixin-qrcode {
      overflow: hidden;
      max-height: 226px;
      margin-bottom: 20px;

      img {
        width: 218px;
        border: 1px solid transparent;
      }
    }
  }

  .brand {
    .logo {
      background-image: url('@/assets/logo_2x.png');
      width: 48px; height: 13px;
    }
    span {
      font: italic bolder 1em 'Lucida Sans';
      display: inline-block;
    }
    &::after {
      display: inline-block;
      content: 'Mgt.Free';
      background: #212121;
      color: #fff;
      font: normal bolder 0.5em 'Lucida Sans';
      padding: 1px 5px; margin-left: 2px;
      border-radius: 5px 0;
      transform: skew(-10deg) scale(0.9);
    }
  }
}
</style>