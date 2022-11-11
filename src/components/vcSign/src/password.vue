<template lang="pug">
a-card(
  v-bind="cardBind"
  @tabChange="key => cardBind.activeTabKey = key")

  //- 账号密码登录
  a-form.sign-form(v-if="cardBind.activeTabKey === 'account'"
    v-bind="formBind"
    :model="formData"
    @finish="formEvents.finish"
    @finishFailed="formEvents.finishFailed")

    a-form-item(
      label="" name="account"
      :rules="[{ required: true, message: '请填写账号/手机号/邮箱', trigger: 'blur' }]")
      a-input(size="large" placeholder="账号/手机号/邮箱" v-model:value="formData.account")
        template(#prefix)
          component(:is="UserOutlined" style="color: rgba(0, 0, 0, 0.25)")

    a-form-item(
      label="" name="password"
      :rules="[{ required: true, message: '请填写密码' }]")
      a-input-password(:max-length="6" size="large" placeholder="密码" v-model:value="formData.password")
        template(#prefix)
          component(:is="LockOutlined" style="color: rgba(0, 0, 0, 0.25)")

    a-form-item
      a-button(v-bind="submitButtonBind") 登录

    a-form-item(
      label="" name="remember")
      a-checkbox(v-model:checked="formData.remember") 下次自动登录

      div.sign-meta
        a.login-form-forgot(@click="goForgot") 忘记密码
        a-divider(type="vertical")
        a(@click="goRegister") 注册
  
  //- 短信登录
  a-form.sign-form(v-if="cardBind.activeTabKey === 'sms'"
    v-bind="formBind"
    :model="formData"
    @finish="formEvents.finish"
    @finishFailed="formEvents.finishFailed")
    
    a-row(:gutter="8")
      a-col(:span="9")
        a-form-item(
          label="" name="area"
          :rules="[{ required: true, message: '请选择区号' }]")
          a-input-group(compact)
            a-select(size="large" placeholder="区号" :allowClear="true" :dropdownStyle="{ minWidth: '352px' }" :style="{ width: '127px' }" v-model:value="formData.area")
              a-select-option(:value="item.code" v-for="(item, index) in countryCodes" :key="index")
                span {{ item.area }}
                span(style="float: right; color: #ccc") {{ item.code }}

      a-col(:span="15")
        a-form-item(
          label="" name="mobile"
          :rules="[{ required: true, message: '请填写手机号' }]")
          a-input(size="large" placeholder="手机号" :max-length="11" v-model:value="formData.mobile")

    a-form-item
      vc-slider(@finish="formData.verification = true")
      
    a-form-item.captcha(
      label="" name="captcha"
      :rules="[{ required: true, message: '请填写短信验证码' }]")
      a-input-group
        a-row(:gutter="8")
          a-col(:span="15")
            a-input(size="large" placeholder="短信验证码" :max-length="6" v-model:value="formData.captcha")
              template(#prefix)
                component(:is="LockOutlined" style="color: rgba(0, 0, 0, 0.25)")

          a-col(:span="9")
            a-button(v-bind="smsButtonBind" style="min-height: 40px;" v-if="smsCounter.counting")
              span {{ smsCounter.counter }} 秒后重发
            a-button(v-bind="smsButtonBind" @click="smsButtonEvents.sendSMS" style="min-height: 40px;" v-else)
              span 发送验证码

    a-form-item
      a-button(v-bind="submitButtonBind") 登录 / 注册

    a-form-item(
      label="" name="remember")
      a-checkbox(v-model:checked="formData.remember") 下次自动登录

      div.sign-meta
        a.login-form-forgot(@click="goForgot") 忘记密码
        a-divider(type="vertical")
        a(@click="goRegister") 注册
  
  //- 第三方登录
  .sign-social
    a-divider 使用第三方账号登录
    div
      a.btn-icon-link.github-sign(data-href="/thirdregister/github.do?appId=1006")
        vc-icon.icon(icon="GithubOutlined")

      a.btn-icon-link.wechat-sign(data-href="/thirdlogin/wechat.do?appId=1006")
        vc-icon.icon(icon="WechatOutlined")

      a.btn-icon-link.qq-sign(data-href="/thirdlogin/qq.do?appId=1006")
        vc-icon.icon(icon="QqOutlined")

      a.btn-icon-link.weibo-sign(data-href="/thirdlogin/wb.do?appId=1006")
        vc-icon.icon(icon="WeiboOutlined")

</template>

<script setup>
import { message } from 'ant-design-vue'
import { reactive, computed } from 'vue'
import { router } from '@/router'
import { userStore } from '@/store/modules/user'

import {
  countryCodes
} from '@/enums'

import { vcSlider } from '@/components/vcSlider'
import vcIcon from '@/components/vcIcon'
import axios from '@/utils/http/axios'

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


/******************************
 * 卡片
 ******************************/
const cardBind = reactive({
  // title: '密码 / 短信 登陆',
  bordered: false,
  class: [ 'sign-static' ],
  bodyStyle: { paddingTop: '28px' },
  tabList: [
    { key: 'account', tab: '密码登录' },
    { key: 'sms', tab: '短信登录' }
  ],
  activeTabKey: 'account'
})

/******************************
 * 表单
 ******************************/
const formData = reactive({
  account: '',
  email: '',
  mobile: '',
  password: '',
  remember: false,
  verification: false
})
const formBind = reactive({
  name: 'sign',
  autocomplete: 'off'
})
const formEvents = reactive({
  async finish() {
    try {
      submitButtonBind.loading = true

      const params = new URLSearchParams([
        ['type', cardBind.activeTabKey]
      ])
      
      const res = await axios.post(`signin?${params.toString()}`, formData)

      const user = userStore()
      user.sign(res)
      
      if(router.currentRoute.value.query.redirect) {
        router.replace({ path: router.currentRoute.value.query.redirect })
      } else {
        router.replace({ name: 'Root' })
      }
      
    } finally {
      submitButtonBind.loading = false
    }
  },
  finishFailed(errorInfo) {
    message.error('提交失败!')
  }
})
const submitButtonBind = reactive({
  loading: false,
  disabled: false,
  block: true,
  size: 'large',
  type: 'primary',
  htmlType: 'submit'
})

/******************************
 * 发送验证码
 ******************************/
const smsCounter = reactive({
  num: 60,
  counting: false,
  counter: computed(() => {
    if (!smsCounter.counting) return `{n}`
    
    setTimeout(() => {
      --smsCounter.num
      if (smsCounter.num <= 0) {
        smsCounter.num = 60
        smsCounter.counting = false
      }
    }, 1000)

    return smsCounter.num
  })
})
const smsButtonBind = reactive({
  block: true,
  loading	: false,
  disabled: computed(() => {
    return !Boolean(smsButtonBind.loading || (formData.mobile && formData.verification))
  }),
  style: { height: '40px' }
})
const smsButtonEvents = reactive({
  async sendSMS() {
    if (!formData.mobile) return message.error('验证码发送失败! 请稍后再试，或采用密码登陆')

    smsButtonBind.loading = true
    
    try {
      const res = await axios.post('sms', {
        mobile: formData.mobile
      })

      message.success(`验证码已发送成功，请注意查收!`)
      formData.codehash = res.codehash
      smsCounter.counting = true
    } finally {
      smsButtonBind.loading = false
    }
  }
})

// 跳转到忘记密码页面
function goForgot() {
  if (props.gotoForgot) return props.gotoForgot()
  const { href } = router.resolve({ name: 'LostPassword' })
  window.open(href, '_blank')
}

// 跳转到注册页面
function goRegister() {
  if (props.gotoRegister) return props.gotoRegister()
  const { href } = router.resolve({ name: 'Register' })
  window.open(href, '_blank')
}
</script>

<script>
import {
  UserOutlined,
  LockOutlined,

  GithubOutlined,
  WechatOutlined,
  QqOutlined,
  WeiboOutlined
} from '@ant-design/icons-vue'

export default {
  components: {
    UserOutlined,
    LockOutlined,
    
    GithubOutlined,
    WechatOutlined,
    QqOutlined,
    WeiboOutlined
  }
}
</script>

<style lang="less">
.sign-static {
  .ant-tabs-nav {
    height: 58px;
    .ant-tabs-tab {
      font-size: 15px;
    }
  }

  .sign-meta { float: right;}

  //- 三方登录
  .sign-social {
    text-align: center;
    width: 200px; padding: 0 0 20px; margin: 40px auto 0;

    .ant-divider {
      .ant-divider-inner-text {
        color: #999;
        font-size: 14px;
        padding: 0 10px;
      }
    }

    .btn-icon-link {
      font-size: 22px;
      display: inline-block;
      margin: 0 8px;
      color: #666;
      text-align: center;
      line-height: 30px;
      width: 30px;
      height: 30px;
      
      &.github-sign {
        &:hover {
          color: #fff;
          &::before {
            background-color: #000;
          }
        }
      }
      &.wechat-sign {
        &:hover {
          color: #fff;
          &::before {
            background-color: #58bc46;
          }
        }
      }
      &.qq-sign {
        &:hover {
          color: #fff;
          &::before {
            background-color: #3caae3;
          }
        }
      }
      &.weibo-sign {
        &:hover {
          color: #fff;
          &::before {
            background-color: #e90e24;
          }
        }
      }
    }

    .icon {
      position: relative;
      top: -1px;
    }
  }

  // AntDesign OverWrite
  .ant-input-prefix {
    margin-right: 6px;
  }
  .ant-select-selection-placeholder { font-size: 14px;}
  .ant-select-selection-item { font-size: 14px;}
  input::placeholder {
    font-size: 14px;
    transform: translate3d(0, -2px, 0);
  }
}
</style>