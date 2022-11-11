<template lang="pug">
.sign-container(:style="{ backgroundImage: `url('${bg}')` }")
  .sign-wrapper
    .sign-brand
      h1.text-center.text-4xl.mb-0 Manage your account
      h2.text-center.mb-8 Get Started with your Dashboard

    .sign-content
      vc-sign(:gotoForgot="gotoForgot" :gotoRegister="gotoRegister")
    
    .sign-footer
      p.copyright Copyright © 2022-2032
      p.powered Powered by Vincent.Cheng
</template>

<script setup>
import { computed } from 'vue'
import { vcSign } from '@/components/vcSign'

const bgIndex = Math.floor(Math.random() * (5 - 0) + 0)
const bg = computed(() => {
  return [
    'https://pic.3gbizhi.com/2021/1103/20211103044809241.jpg',
    'https://pic.3gbizhi.com/2020/1030/20201030072408868.jpg',
    'https://pic.3gbizhi.com/2020/1030/20201030125909583.jpg',
    'https://pic.3gbizhi.com/2020/1012/20201012103034737.jpg',
    'https://pic.3gbizhi.com/2020/0910/20200910081911307.jpeg'
  ][bgIndex]
})

function gotoForgot() {
  console.log('跳转到忘记密码页面')
}

function gotoRegister() {
  console.log('跳转到注册页面')
}
</script>

<style lang="less">
.sign-container {
  background-color: #f8f9ff;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%; height: 100%;
  overflow: hidden;
  position: relative;
}

.sign-wrapper {
  font-family: 'PingFangSC-Regular', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  width: 400px;
  margin: 0 auto;
  top: 108px;
  position: relative;

  .sign-brand {
    margin-bottom: 15px;
    letter-spacing: -0.5px;
  }

  .sign-footer {
    padding: 25px 0;
    .sign-footer-metas {
      margin: 0 35px;
      font-size: 12px;
      text-align: center;
      p { margin: 0;}
    }

    .copyright {
      color: rgba(0, 0, 0, 0.7);
      text-align: center;
      font-size: 12px;
      padding: 0; margin: 0;
    }

    .powered {
      color: rgba(0, 0, 0, 0.7);
      text-align: center;
      font-size: 12px;
      padding: 0; margin: 0;
    }
  }
}

// 登录
.sign-content {
  background-color:#fff;
  width: 400px; min-height: 460px;
  position: relative;
  box-shadow: 0 2px 10px 0 rgba(57, 106, 255, 0.05);
}
</style>