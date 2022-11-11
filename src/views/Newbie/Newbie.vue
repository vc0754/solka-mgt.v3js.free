<template lang="pug">
layout-page.bg-white

  .content.p-2(:class="[ 'xs:p-5', 'sm:p-10', 'md:p-20' ]")
      .grid.grid-cols-6
        .col-span-6(:class="[ 'lg:col-start-2', 'lg:col-span-4' ]")
          h1.text-2xl.mb-6 新手引导

          a-card.mb-5.overflow-hidden
            .grid.grid-cols-3
              .col-span-2
                h2.text-lg.mb-2 了解发现
                .mb-5.max-w-lg.opacity-60
                  p.mb-0 了解该项目的开发者，加入讨论群，共同探讨，学习进步。
                  p 了解该项目的概况，使用范围，说明文档等等。
                .grid.grid-cols-2
                  .col-span-1
                    router-link(:to="{ name: 'AboutMe' }") 关于作者
                  .col-span-1
                    router-link(:to="{ name: 'AboutProject' }") 关于项目
              .col-span-1
                vc-icon.icon(icon="UsergroupAddOutlined")
          
          a-card.mb-5.overflow-hidden
            .grid.grid-cols-3
              .col-span-2
                h2.text-lg.mb-2 UI/UX 的制作
                .mb-5.max-w-lg.opacity-60
                  p.mb-0 该项目使用了 ant-design-vue 的组件作为基础，充分利用了编程解耦的方式，添加了一些有趣又有用的小功能组件，展示了实际项目应用中，组件开发的思路。
                .grid.grid-cols-2
                  .col-span-1.mb-3
                    router-link(:to="{ name: 'AntIcon' }") 图标 Icon
                  .col-span-1.mb-3
                    router-link(:to="{ name: 'AntButton' }") 按钮 Button
                  .col-span-1
                    router-link(:to="{ name: 'AntCard' }") 卡片 Card
                  .col-span-1
                    router-link(:to="{ name: 'AntTable' }") 表格 Table
              .col-span-1
                vc-icon.icon(icon="FormOutlined")
          
          a-card.overflow-hidden
            .grid.grid-cols-3
              .col-span-2
                h2.text-lg.mb-2 工作台 &amp; 其他页面
                .mb-5.max-w-lg.opacity-60
                  p.mb-0 我希望该项目可以作为 vue2 js 栈的开发人员的入门学习案例，所以该项目只制作了基本的几个页面，实际业务页面和表单页面并没有包含。
                .grid.grid-cols-2
                  .col-span-1.mb-3
                    router-link(:to="{ name: 'Workplace' }") 工作台
                  .col-span-1.mb-3
                    router-link(:to="{ name: 'Blank' }") 空白页
                  .col-span-1
                    router-link(:to="{ name: 'Sign' }") 登录页
                  .col-span-1
                    router-link(:to="{ name: 'NotFound' }") 404 页面
              .col-span-1
                vc-icon.icon(icon="ReconciliationOutlined")

</template>


<script setup>
import LayoutPage from '@/views/Layout/Page.vue'
import vcIcon from '@/components/vcIcon'
</script>


<style lang="less" scoped>
.icon {
  font-size: 150px;
  color: #eee;
  position: absolute; right: -45px; bottom: -45px;
}
</style>