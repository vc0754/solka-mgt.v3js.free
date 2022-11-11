<template lang="pug">
layout-page
  .section-breadcrumb.border-solid.border-0.border-b.border-slate-100.sticky(style="z-index: 100; top: 60px;")
    .px-5.py-3.bg-white
      a-breadcrumb
        a-breadcrumb-item 控制台
        a-breadcrumb-item 组件
        //- a-breadcrumb-item
          a() Application Center
        a-breadcrumb-item 按钮

  .content.overflow-hidden
    .bg-white.px-2.py-10(:class="[ 'sm:px-6', 'md:px-12', '2xl:px-28' ]")
      h1.text-3xl.mb-8 按钮 Button

      .grid.gap-8(:class="[ 'sm:grid-cols-2' ]")
        .col-span-1.pb-5
          h3.text-2xl.mb-6 精致、多变的按钮组合
          .mb-6.max-w-lg.opacity-80
            p 我并不喜欢随意造一些看似很酷，但其实功能和实现的结果却很有限的 “轮子”，我更喜欢在原有基础上把 “轮子” 修饰得更加符合开发的需求。
            p 以下为一些常规的、和新增的两种按钮形态。新增了 “动画按钮” 和 “按钮组” 两种展示形态，更好的满足了 a-button 的使用
          a(href="https://antdv.com/components/button" target="_blank") 查阅更多说明
          
        .col-span-1
          button-jumbotron(style="transform: translate3d(0, -10px, 0);")

      .bg-slate-100.px-10.py-10.my-5
        .max-w-5xl.mx-auto
          .grid.gap-4(:class="[ 'sm:grid-cols-2', 'md:grid-cols-4' ]")
            .col-span-1.text-center
              a-button.mb-6(type="link") 链接式按钮
              a-card.text-left(size="small" :bordered="false")
                p.opacity-90.font-semibold.mb-1 链接式按钮
                p.text-sm.opacity-80 文本按钮通常用于不太重要的操作。主要用作页面中的链接
                p.text-xs.opacity-60.mb-0 强调程度低

            .col-span-1.text-center
              a-button.mb-6() 轮廓式按钮
              a-card.text-left(size="small" :bordered="false")
                p.opacity-90.font-semibold.mb-1 轮廓式按钮
                p.text-sm.opacity-80 轮廓式按钮比链接式按钮更容易被发现
                p.text-xs.opacity-60.mb-0 强调程度中

            .col-span-1.text-center
              a-button.mb-6(type="primary") 填充式按钮
              a-card.text-left(size="small" :bordered="false")
                p.opacity-90.font-semibold.mb-1 填充式按钮
                p.text-sm.opacity-80 填充式按钮有着鲜明的对比色，是最容易发现的按钮形态
                p.text-xs.opacity-60.mb-0 强调程度高

            .col-span-1.text-center
              .btn-group.mb-6
                a-button
                  vc-icon.icon(icon="BoldOutlined")
                a-button
                  vc-icon.icon(icon="ItalicOutlined")
                a-button
                  vc-icon.icon(icon="EditOutlined")
              a-card.text-left(size="small" :bordered="false")
                p.opacity-90.font-semibold.mb-1 按钮组
                p.text-sm.opacity-80 按钮分组，应该是使用频率较低的一种按钮形态
                p.text-xs.opacity-60.mb-0 强调程度中


    .mx-2.my-2(:class="[ 'sm:mx-6', 'sm:my-8', 'md:mx-12', 'md:my-8', '2xl:mx-28', '2xl:my-8' ]")
      .grid.gap-4(:class="[ 'sm:grid-cols-2', 'md:grid-cols-4' ]")
      
        a-card(title="按钮动画" :bordered="false" :class="[ 'md:col-span-2' ]")
          h3.text-md.mb-2 添加样式就可以为按钮设置动画内容
          p.text-sm.mb-8 在 a-button 上添加 .btn-animated 和方向样式 .from-left、.from-top 或 .from-bottom 即可让按钮内容以动画呈现

          a-button.btn-animated.from-left(type="primary")
            vc-icon.icon.icon19(icon='LikeOutlined')
            span 支持我们

          a-button.btn-animated.from-top.ml-3(type="dashed")
            vc-icon.icon.icon19(icon='CloudDownloadOutlined')
            span 下载文件

          a-button.btn-animated.from-right.ml-3()
            vc-icon.icon.icon19(icon='ShoppingCartOutlined')
            span 购买专业版

          a-popconfirm(title="你确定要执行该删除吗?")
            a-button.btn-animated.from-bottom.ml-3(type="primary" danger)
              vc-icon.icon.icon19(icon='DeleteOutlined')
              span 删除数据

        a-card(title="按钮组" :bordered="false" :class="[ 'md:col-span-2' ]")
          h3.text-md.mb-2 添加样式就可以为按钮设置分组
          p.mb-6 通过 .btn-group 样式包裹的 a-button 会自动形成按钮组
          
          .btn-group.mb-4
            a-button
              vc-icon.icon(icon='LikeOutlined')
              span 支持我们
            
            a-button
              vc-icon.icon(icon='ShoppingCartOutlined')
              span 购买专业版
          
          .btn-group
            a-button
              .px-5.pt-1
                vc-icon.icon.icon17(icon='HeartOutlined')
                div.text-sm 收藏夹

            a-button
              .px-5.pt-1
                vc-icon.icon.icon17(icon='HistoryOutlined')
                div.text-sm 浏览记录

            a-button
              .px-5.pt-1
                vc-icon.icon.icon17(icon='PhoneOutlined')
                div.text-sm 电话簿

</template>

<script setup>
import LayoutPage from '@/views/Layout/Page.vue'
import ButtonJumbotron from '../modules/ButtonJumbotron.vue'
import vcIcon from '@/components/vcIcon'
</script>


<style lang="less" scoped>
.icon { font-size: 14px;}
.icon17 { font-size: 17px;}
.icon19 { font-size: 19px;}
</style>