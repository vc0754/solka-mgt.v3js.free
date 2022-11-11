<template lang="pug">
layout-page.bg-slate-50
  .section-breadcrumb.border-solid.border-0.border-b.border-slate-100.sticky(style="z-index: 100; top: 60px;")
    .px-5.py-3.bg-white
      a-breadcrumb
        a-breadcrumb-item 关于
        a-breadcrumb-item 关于 VC 
          
  .content
    .px-2.py-10.text-center(:class="[ 'sm:px-6', 'md:px-12', '2xl:px-28' ]")
      .fonts.relative.z-0.text-7xl.mt-3.mb-2(:style="shadow") Vincent.Cheng
      .fonts.relative.z-10.text-6xl.opacity-80.mb-24(:style="shadow") Full Stack
      .text-base.max-w-2xl.mx-auto.text-left
        p 嗨，我叫 Vincent.Cheng，你可以叫我 VC。我是一位经验丰富的全栈工程师，同时也是一名 UI/UX 设计师，对系统设计、程序交互充满热情。从项目规划、设计，到编码、上线这一整个过程经常让我觉得很有成就感。
        p 我是一个热心解决问题的人，喜欢学习新事物，目前正在学习 3D 建模，掌握的技术包括 PS, AE, H5, Vue, Nodejs, Java, php, Mysql... 等等，开发参与过很多 Web 应用、WebRTC 应用、Flash 游戏、Unity 游戏、各种类型的小程序和一些原生 Android 项目。
        p.mb-20 我喜欢户外活动、探索新地方、徒步旅行、手工、绘画和学习新技能。利用闲暇的时间，我做了这个项目，并免费提供给任何需要的人。如果你觉得该项目对你有帮助，可以通过以下方式对我进行打赏！如果你有感兴趣的话题想和其他小伙伴一起探讨，也可以通过以下方式加入群聊。

        .grid.gap-8.grid-cols-12
          .col-span-7
            a-divider
              span.text-sm 打赏
            ul.icons
              li
                a-tooltip(title="微信")
                  a.btn-icon-link(@click="modalShow('wechat')")
                    vc-icon.icon(icon="WechatOutlined")
              li
                a-tooltip(title="支付宝")
                  a.btn-icon-link(@click="modalShow('alipay')")
                    vc-icon.icon(icon="AlipayCircleOutlined")
              li
                a-tooltip(title="QQ")
                  a.btn-icon-link(@click="modalShow('qq')")
                    vc-icon.icon(icon="QqOutlined")
              li
                a-tooltip(title="ETH")
                  a.btn-icon-link(@click="modalShow('blockchain')")
                    svg.icon(style="width: 1em; height: 1em; vertical-align: text-bottom; fill: currentColor;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg")
                      path(d="M815.8 521.6L512 707.2 208 521.6 512 0l303.8 521.6zM512 766.8L208 581.2 512 1024l304-442.8-304 185.6z")

            a-divider

            a-modal(v-model:visible="modalBind.visible" v-bind="modalBind")
              img.max-w-full(:src="WechatDonation" v-if="visibleType === 'wechat'")
              img.max-w-full(:src="AlipayDonation" v-if="visibleType === 'alipay'")
              img.max-w-full(:src="QQDonation" v-if="visibleType === 'qq'")
              template(v-if="visibleType === 'blockchain'")
                img.max-w-full(:src="ETHDonation" alt="0x6ED2bfF2427B092ac0dDA501Ad95Fb3b61891B4c")

          .col-span-5
            a-divider
              span.text-sm 交流

            ul.icons
              li
                a.btn-icon-link(href="https://qm.qq.com/cgi-bin/qm/qr?k=ljNl_U14a6Sq0Vjlr2_Fji-n5EEIztWb&jump_from=webapi&authKey=TVVH2XINVUf8Ds3IHkdk3UTg+/XwUQbTmhdcUOHtYAQ/RNjU71USLwu8MCVKGpW8" target="_blank")
                  vc-icon.icon(icon="QqOutlined")
              li
                a.btn-icon-link(href="mailto:vc@yoyo.zone" target="_blank")
                  vc-icon.icon(icon="MailOutlined")

            a-divider

</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useMouse } from '@vueuse/core'
import LayoutPage from '@/views/Layout/Page.vue'
import vcIcon from '@/components/vcIcon'

import WechatDonation from '@/assets/WechatDonation.png'
import AlipayDonation from '@/assets/AlipayDonation.png'
import QQDonation from '@/assets/QQDonation.png'
import ETHDonation from '@/assets/ETHDonation.png'

const { x, y } = useMouse()

const position = reactive({
  x: 1,
  y: 1
})

const shadow = computed(() => {
  const all = []
  all.push(`-1px 1px 0 rgb(160 160 160 / 10%)`)
  all.push(`1px -1px 0 rgb(255 255 255 / 10%)`)
  all.push(`1px -1px 25px rgb(255 255 255)`)

  for(let i = 1; i <= 25; ++i) {
    all.push(`${ i * -1 * position.x }px ${ i * 1.9 * position.y }px ${ i * 1 }px rgb(160 160 160 / ${ 160 / 2 / i }%)`)
  }
  return {
    textShadow: all.join(',')
  }
})

const visibleType = ref('')
const modalBind = reactive({
  visible: false,
  footer: null,
  width: 360,
  bodyStyle: { padding: 0 }
})

function modalShow(type) {
  if (type === 'wechat') modalBind.title = '请使用微信扫码'
  if (type === 'alipay') modalBind.title = '请使用支付宝扫码'
  if (type === 'qq') modalBind.title = '请使用 QQ 扫码'
  if (type === 'blockchain') modalBind.title = '请扫码获取公共地址'
  modalBind.visible = true
  visibleType.value = type
}
</script>

<style lang="less" scoped>
.icon {
  font-size: 21px;
}

.icons {
  list-style: none;
  padding: 0;
  text-align: center;

  a {
    color: #575757;
    line-height: 39px;
    width: 36px;
    height: 36px;
  }
  
  li {
    margin: 0 8px;
    display: inline-block;
  }

  &::after {
    content: ''; display: block; clear: both;
  }
}

.fonts {
  color: #fefeff;
  // font-size: 90px;
  font-weight: 500; line-height: 1;
  text-align: center;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
}
</style>