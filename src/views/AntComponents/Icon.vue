<template lang="pug">
layout-page
  .section-breadcrumb.border-solid.border-0.border-b.border-slate-100.sticky(style="z-index: 100; top: 60px;")
    .px-5.py-3.bg-white
      a-breadcrumb
        a-breadcrumb-item 控制台
        a-breadcrumb-item 组件
        a-breadcrumb-item 图标

  .content.overflow-hidden
    .bg-white.px-2.py-10(:class="[ 'sm:px-6', 'md:px-12', '2xl:px-28' ]")
      h1.text-3xl.mb-8 图标 Icon

      .grid.gap-8(:class="[ 'sm:grid-cols-2' ]")
        .col-span-1.pb-5
          h3.text-2xl.mb-6 简单易用的图标库组件
          .max-w-lg.opacity-80
            p 本项目使用的图标全部采用 ant-design-vue 官方图标库。官方样例是按需引入及调用，使用过程中经常遇到的以下两个问题：<br/>1）一个 .vue 文件调用多个图标需引入多个图标名，不便利，不直观；<br/>2）无法使用变量赋值使图标变化的问题；
            p 基于以上原因，我创建了 vcIcon 组件，通过传递 icon 属性，以达到显示相应图标的目的，也很好解决了动态变化图标的问题。

        .col-span-1
          icon-jumbotron
        
    .mx-2.my-2(:class="[ 'sm:mx-6', 'sm:my-8', 'md:mx-12', 'md:my-8', '2xl:mx-28', '2xl:my-8' ]")
      .grid.gap-4(:class="[ 'sm:grid-cols-2' ]")
      
        a-card(:bordered="false")
          h3.text-md.mb-2 如何使用
          p.mb-5 只需引入组件即可使用, icon 属性支持参见官网文档，支持变量调用
          
          pre.code.mb-5(v-html="sampleCode")

          a.ant-btn.ant-btn-sm.ant-btn-primary(href="https://antdv.com/components/icon" target="_blank")
            span.text-xs 查阅更多
          p.text-xs.opacity-60.mt-2.mb-0 更多图标信息<br/>请查看官方文档以获取

        a-card.transparent(:bordered="false" :bodyStyle="{ padding: '1em 1em 0.1em' }")
          h3.text-md.mb-2 部分图标预览
          p.opacity-80.mb-6 这里展示了部分图标样例以供查看，全部样例及使用细节可参考官网文档为准。
          div
            a-card-grid.card-grid(:hoverable="false" v-for="item in icons")
              vc-icon.icon18(:icon="item.icon")
          

</template>

<script setup>
import { reactive } from 'vue'

import LayoutPage from '@/views/Layout/Page.vue'
import IconJumbotron from '../modules/IconJumbotron.vue'
import vcIcon from '@/components/vcIcon'

const sampleCode = `&lt;template lang="pug"&gt;
vc-icon(icon="SettingOutlined")
&lt;/template setup&gt;

&lt;script setup&gt;
import vcIcon from "@/components/vcIcon"
&lt;/script setup&gt;`

const icons = reactive([
  { icon: 'EditFilled' },
  { icon: 'DeleteFilled' },
  { icon: 'PieChartFilled' },
  { icon: 'GithubFilled' },
  { icon: 'Html5Filled' },
  { icon: 'AlipayCircleFilled' },
  { icon: 'WechatFilled' },
  { icon: 'ChromeFilled' },
  { icon: 'SlidersFilled' },
  { icon: 'ApiFilled' },
  { icon: 'AudioFilled' },
  { icon: 'BellFilled' },
  { icon: 'CameraFilled' },
  { icon: 'CloudFilled' },
  { icon: 'EyeFilled' },
  { icon: 'ExperimentFilled' },
  { icon: 'EnvironmentFilled' },
  { icon: 'DatabaseFilled' },
  { icon: 'HomeFilled' },
  { icon: 'HeartFilled' },
  { icon: 'LikeFilled' },
  { icon: 'PhoneFilled' },
  { icon: 'PrinterFilled' },
  { icon: 'SafetyCertificateFilled' },
  { icon: 'SettingFilled' },
  { icon: 'SoundFilled' },
  { icon: 'PushpinFilled' },
  { icon: 'LayoutFilled' },
  { icon: 'MessageFilled' },
  { icon: 'SmileFilled' },
])
</script>

<style lang="less" scoped>
.code { font-family: 'Courier New', Courier, monospace; background: #353535; color: #fff; padding: 2px 7px; border-radius: 3px;}
.card-grid {
  text-align: center;
  box-shadow: 1px 0 0 0 #ccc, 0 1px 0 0 #ccc, 1px 1px 0 0 #ccc, 1px 0 0 0 #ccc inset, 0 1px 0 0 #ccc inset;
  padding: 16px 15px;
  width: 16.66%;
}
.icon18 { color: #444; font-size: 18px;}
</style>