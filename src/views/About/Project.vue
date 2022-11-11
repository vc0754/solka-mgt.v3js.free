<template lang="pug">
layout-page
  .section-breadcrumb.border-solid.border-0.border-b.border-slate-100.sticky(style="z-index: 100; top: 60px;")
    .px-5.py-3.bg-white
      a-breadcrumb
        a-breadcrumb-item 关于
        a-breadcrumb-item 项目概述
          
  .content.overflow-hidden
    .bg-white.px-2.py-10(:class="[ 'sm:px-6', 'md:px-12', '2xl:px-28' ]")
      h1.text-3xl.mb-8 项目概述

      .grid.gap-8(:class="[ 'sm:grid-cols-2', 'md:grid-cols-11' ]")
        .col-span-1.pb-5(:class="[ 'md:col-span-6' ]")
          h3.text-2xl.mb-6 友好面向 Vue2 JS 的开发人员
          .mb-6.max-w-xl.opacity-80
            p.whitespace-pre-line #[strong.brand: span.logo {{ name }}] {{ description }}
          a-button.float-left.mr-3(href="https://github.com/vc0754/solka-mgt.v3js.free" target="_blank") 下载代码
          
          a-button.btn-animated.from-left(type="primary" @click="modalBind.visible = true")
            vc-icon.icon.icon21(icon='CoffeeOutlined')
            span 购买增值服务

            a-modal(
              v-model:visible="modalBind.visible"
              v-bind="modalBind"
              :afterClose="modalEvents.afterClose")
              h3.text-2xl.mb-6 增值服务
              template(v-if="setp === 1")
                .mb-10.text-base.opacity-80
                  p 该增值服务包含长达 2 个月的线上技术支持和一个在线辅导解惑的计划，解惑的内容主要针对该项目内涉及的知识点与技术点。同时享有 8.8 折购买专业版的特权。
                  
                .grid.gap-2.grid-cols-12.pb-16.border-solid.border-0.border-b.border-slate-200
                  .col-span-8
                    h4.font-semibold.mb-3 包含说明
                    ul.list-none.p-0.m-0.opacity-80.leading-7
                      li 2 个月的线上技术支持
                      li 项目内涉及知识点解惑
                      li 专业版 8.8 折购买特权

                  .col-span-4
                    h4.font-semibold.mb-3 技术栈
                    ul.list-none.p-0.m-0.opacity-80.leading-7
                      li Vue3 / JS / Pug / Less
                      li Tailwind / Antdesign

                .flex.justify-between.items-center.pt-6
                  .pirce
                    span.text-2xl ￥
                    span.text-4xl.font-bold 200
                  a-button(type="primary" size="large" @click="setp = 2")
                    vc-icon(icon="CoffeeOutlined")
                    span 购买

              template(v-if="setp === 2")
                .mb-5.text-base.opacity-80
                  p 请使用微信扫码付款后联系我，并提供付款凭证。我将为你进行登记并提供服务。
                .text-center
                  img.max-w-full(:src="WechatVAS")
            
        .col-span-1(:class="[ 'md:col-span-5' ]")
          project-jumbotron

    .mx-2.my-2(:class="[ 'sm:mx-6', 'sm:my-8', 'md:mx-12', 'md:my-8', '2xl:mx-28', '2xl:my-8' ]")
      
      a-card.mb-3(title="项目信息" size="small")
        a-descriptions(:column="{ xs: 1, sm: 1, md: 2 }" size="small" bordered)
          a-descriptions-item(:label="item.label" v-for="item in infoSchema") {{ item.value }}

      a-card.mb-3(title="生成环境依赖" size="small")
        a-descriptions(:column="{ xs: 1, sm: 1, md: 2, lg: 3 }" size="small" bordered)
          a-descriptions-item(:label="item.label" v-for="item in dependenciesSchema") {{ item.value }}

      a-card(title="开发环境依赖" size="small")
        a-descriptions(:column="{ xs: 1, sm: 1, md: 2, lg: 3 }" size="small" bordered)
          a-descriptions-item(:label="item.label" v-for="item in devDependenciesSchema") {{ item.value }}

</template>

<script setup>
import { ref, reactive } from 'vue'
import LayoutPage from '@/views/Layout/Page.vue'
import vcIcon from '@/components/vcIcon'
import ProjectJumbotron from '@/views/modules/ProjectJumbotron.vue'
import WechatVAS from '@/assets/WechatVAS.jpg'

const { pkg, lastBuildTime } = __APP_INFO__

const { name, description, version, dependencies, devDependencies } = pkg

const setp = ref(1)

const modalBind = reactive({
  visible: false,
  footer: null,
  width: 540,
  bodyStyle: { padding: '40px 50px' }
})
const modalEvents = reactive({
  afterClose: () => setp.value = 1
})

const infoSchema = reactive([
  {
    label: '版本',
    value: version
  },
  {
    label: '最后编译时间',
    value: lastBuildTime
  },
  {
    label: '文档地址',
    value: '不提供'
  },
  {
    label: '预览地址',
    value: 'https://yoyo.zone/free/'
  },
  {
    label: 'Github',
    value: 'https://github.com/vc0754/solka-mgt.v3js.free'
  }
])
const dependenciesSchema = reactive([])
const devDependenciesSchema = reactive([])

Object.keys(dependencies).map(key => {
  dependenciesSchema.push({ label: key, value: dependencies[key] })
})

Object.keys(devDependencies).map(key => {
  devDependenciesSchema.push({ label: key, value: devDependencies[key] })
})
</script>

<style lang="less" scoped>
.icon21 { font-size: 21px;}

.brand {
  .logo {
    background-image: url('@/assets/logo_2x.png');
    width: 46px; height: 13px;
    top: -1px;
  }
  span {
    font: italic bolder 1em 'Lucida Sans';
  }
}
</style>