<template lang="pug">
layout-page
  .section-breadcrumb.border-solid.border-0.border-b.border-slate-100.sticky(style="z-index: 100; top: 60px;")
    .px-5.py-3.bg-white
      a-breadcrumb
        a-breadcrumb-item 控制台
        a-breadcrumb-item 组件
        a-breadcrumb-item 卡片

  .content
    .bg-white.px-2.py-10(:class="[ 'sm:px-6', 'md:px-12', '2xl:px-28' ]")
      h1.text-3xl.mb-8 卡片 Card

      .grid.gap-8(:class="[ 'sm:grid-cols-12' ]")
        .col-span-1.pb-5(:class="[ 'sm:col-span-5' ]")
          h3.text-2xl.mb-6 卡片组件轻松定制
          .mb-6.max-w-lg.opacity-80
            p 卡片组件无疑是 UI 界面中使用最频繁的组件之一，使用这些卡片组件，可以立即在项目中获得类似应用程序或操作系统的感觉。
            p 这里主要展示了一款新增的 card extra 组件和一些简单的应用示例，这些组件和示例可以快速让你的 card 展示变得更加炫酷。
          a(href="https://antdv.com/components/card" target="_blank") 查阅更多说明
          
        .col-span-1(:class="[ 'sm:col-span-7' ]")
          card-jumbotron(style="transform: translate3d(0, -55px, 0);")


    .mx-2.my-2(:class="[ 'sm:mx-6', 'sm:my-8', 'md:mx-12', 'md:my-8', '2xl:mx-28', '2xl:my-8' ]")
      .grid.gap-4.mb-12(:class="[ 'sm:grid-cols-2', 'md:grid-cols-2', 'lg:grid-cols-3', '2xl:grid-cols-3' ]")
      
        div
          a-card(title="基础工具组件" :bordered="false")
            h3.text-md.mb-2 简单易用的 card-extra 组件
            p 基础工具组件是新开发的 a-card extra 组件
            .bg-white.p-5
              a-empty(:description="null")
            template(#extra)
              vc-card-extra
      
        div
          a-card(title="大/小卡片" :size="vcCardBind.size" :bordered="false")
            h3.text-md.mb-2 大/小卡片是原有的属性功能
            p 是通过卡片组件的 size 属性进行实现的
            .bg-white.p-5
              a-empty(:description="null")
            template(#extra)
              ul.card-actions
                li
                  a-popover(trigger="click" placement="topRight" arrow-point-at-center)
                    template(#content)
                      .flex
                        span 大卡片
                        .mx-2
                          a-switch(v-model:checked="vcCardBind.size" checkedValue="small" unCheckedValue="default")
                        span 小卡片
                    a.btn-icon-link
                      vc-icon(icon="SettingOutlined")

        div.row-span-2
          a-card(title="内容卡片" hoverable)
            h3.text-xl.mb-4 内容卡片
            p 内容卡片是通过 cover、actions 插槽 和 a-card-meta 组件进行实现的

            template(#cover)
              <img src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />

            template(#actions)
              <setting-outlined key="setting" />
              <edit-outlined key="edit" />
              <ellipsis-outlined key="ellipsis" />

            a-card-meta(title="title" description="description When it comes to digital design, the lines between functionality")
              template(#avatar)
                a-avatar.block(:size="32" icon="user" :src="DefaultAvatar")

        div
          a-card(title="内容区域滚动" :bordered="false" :bodyStyle="{ maxHeight: `${vcCardBind.bodyHeight}px` }")
            h3.text-md.mb-2 设置内容区域滚动
            p 是通过设置卡片组件的 bodyStyle 属性（min-height, overflow-y）进行实现的
            .bg-slate-50.py-20.px-5
              a-empty(:description="null")
            template(#extra)
              ul.card-actions
                li
                  a-popover(trigger="click" placement="topRight" arrow-point-at-center)
                    template(#content)
                      .flex
                        span 内容高度
                        .mx-2
                          a-input-number(:min="100" :max="550" :step="10" size="small" v-model:value="vcCardBind.bodyHeight")
                    a.btn-icon-link
                      vc-icon(icon="SettingOutlined")
      
        div
          a-card(title="透明卡片" :class="[ vcCardBind.transparent ? 'transparent' : '']")
            h3.text-md.mb-2 添加样式就可以使卡片变成透明
            p 透明卡片是通过对卡片组件添加 .transparent 样式，配合 css 实现的
            .p-5(:class="[ vcCardBind.transparent ? 'bg-gray-300' : 'bg-white']")
              a-empty(:description="null")
            template(#extra)
              ul.card-actions
                li
                  a-popover(trigger="click" placement="topRight" arrow-point-at-center)
                    template(#content)
                      .flex
                        span 不透明
                        .mx-2
                          a-switch(v-model:checked="vcCardBind.transparent")
                        span 透明
                    a.btn-icon-link
                      vc-icon(icon="SettingOutlined")


      h3.text-2xl.mb-6 可拖动卡片
      
      //- 
      draggable.grid.gap-4(:class="[ 'sm:grid-cols-2', 'md:grid-cols-2', 'lg:grid-cols-3']"
        v-bind="draggableBind")
        template(#item="{ element }")
          a-card(:title="`可拖动卡片 ${ element.id }`" :bordered="false")
            vc-icon.text-3xl.mb-3(:icon="element.icon")
            p 可拖动卡片是利用 draggable 组件进行实现的
            .bg-slate-50.p-5
              a-empty(:description="null")

</template>

<script setup>
import draggable from 'vuedraggable'
import { reactive } from 'vue'

import LayoutPage from '@/views/Layout/Page.vue'
import { vcCardExtra } from '@/components/vcCardExtra'
import CardJumbotron from '../modules/CardJumbotron.vue'
import vcIcon from '@/components/vcIcon'
import DefaultAvatar from '@/assets/avatar.jpg'

const vcCardBind = reactive({
  size: 'default',
  transparent: true,
  bodyHeight: 266
})

// draggable
const draggableBind = reactive({
  list: [
    { id: 1, title: '应用实例', icon: 'AppleFilled' },
    { id: 2, title: '应用实例', icon: 'AndroidFilled' },
    { id: 3, title: '应用实例', icon: 'WindowsFilled' },
    { id: 4, title: '应用实例', icon: 'ChromeFilled' },
    { id: 5, title: '应用实例', icon: 'GithubFilled' },
    { id: 6, title: '应用实例', icon: 'Html5Filled' }
  ],
  group: 'ghost',
  animation: 200,
  itemKey: 'id'
})
</script>