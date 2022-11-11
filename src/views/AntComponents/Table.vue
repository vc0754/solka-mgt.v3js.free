<template lang="pug">
layout-page
  .section-breadcrumb.border-solid.border-0.border-b.border-slate-100.sticky(style="z-index: 100; top: 60px;")
    .px-5.py-3.bg-white
      a-breadcrumb
        a-breadcrumb-item 控制台
        a-breadcrumb-item 组件
        a-breadcrumb-item 表格
        
  .content.overflow-hidden
    .bg-white.px-2.py-10(:class="[ 'sm:px-6', 'md:px-12', '2xl:px-28' ]")
      h1.text-3xl.mb-8 表格 Table

      .grid.gap-8(:class="[ 'sm:grid-cols-12' ]")
        .col-span-1.pb-5(:class="[ 'sm:col-span-5' ]")
          h3.text-2xl.mb-6 功能强大的表格组件
          .mb-6.max-w-lg.opacity-80
            p 这里主要展示了表格组件的一些使用样例
            p 这些功能足够强大以支撑大部分应用场景
          a(href="https://antdv.com/components/table" target="_blank") 查阅更多说明
          
        .col-span-1(:class="[ 'sm:col-span-7' ]")
          table-jumbotron(style="transform: translate3d(0, -55px, 0);")

      //- 

      a-card.col-span-2(title="自定义表格示例" :bordered="false" :headStyle="{ padding: 0 }" :bodyStyle="{ padding: 0 }")
        template(#extra)
          vc-card-extra(v-bind="vcCardExtraBind")

        .table-nav.table-nav-top.flex.justify-between.justify-items-center.py-4
          .actions
            .action
              a-select(placeholder="批量操作" allowClear style="width: 120px")
                a-select-option(value="edit") 编辑
                a-select-option(value="trash") 删除
                a-select-option(value="upgrade") 更新等级
              a-button.ml-2 执行

          a-pagination(
            :total="18"
            :pageSize="6")

        a-table(v-bind="tableBind")

        .table-nav.table-nav-bottom.flex.justify-between.justify-items-center.py-4
          .actions
            a-button 导出
            a-button.ml-2 导入
          a-pagination(
            :total="18"
            :pageSize="6")


    .mx-2.my-2(:class="[ 'sm:mx-6', 'sm:my-8', 'md:mx-12', 'md:my-8', '2xl:mx-28', '2xl:my-8' ]")
      .grid.gap-8(:class="[ 'sm:grid-cols-2' ]")
        //- 

        a-card(title="大小表格，边框，头部、脚部插槽 和 超出省略列设置示例" :bordered="false")
          a-table(v-bind="tableBind2")
            template(#title) Header Slot
            template(#footer) Footer Slot
          template(#extra)
            vc-card-extra(v-bind="vcCardExtraBind2")

        a-card(title="可选择，可收缩表格示例" :bordered="false")
          a-table(v-bind="tableBind3")
            template(#expandedRowRender="{ record }")
              p {{ record.address }}
          
</template>


<script setup>
import { reactive, onMounted } from 'vue'

import LayoutPage from '@/views/Layout/Page.vue'
import { vcCardExtra } from '@/components/vcCardExtra'
import TableJumbotron from '../modules/TableJumbotron.vue'

const vcCardExtraBind = {
  toggle: false,
  fullscreen: false,
  remove: true,
  menus: [
    { label: '大表格', click: () => { tableBind.size = 'large' } },
    { label: '中表格', click: () => { tableBind.size = 'middle' } },
    { label: '小表格', click: () => { tableBind.size = 'small' } },
  ],
  api: () => {
    return new Promise((resolve, reject) => {
      tableBind.loading = true
      setTimeout(() => {
        tableBind.loading = false
        resolve()
      }, 2000)
    })
  }
}

const tableBind = reactive({
  // showHeader: false,
  bordered: true,
  size: 'small',
  rowSelection: {},
  scroll: { x: 1500 },
  stripe: true,
  loading: false,
  pagination: false,
  rowConfig: {
    isHover: true
  },
  isLoading: false,
  dataSource: [],
  columns: [
    {
      title: 'Full Name',
      width: 120,
      dataIndex: 'name',
      key: 'name',
      fixed: 'left',
    },
    {
      title: 'Age',
      width: 80,
      dataIndex: 'age',
      key: 'age',
      align: 'center',
    },
    {
      title: 'Column 1',
      dataIndex: 'address',
      key: '1',
      width: 150,
    },
    {
      title: 'Column 2',
      dataIndex: 'address',
      key: '2',
      width: 150,
    },
    {
      title: 'Column 3',
      dataIndex: 'address',
      key: '3',
      width: 150,
    },
    {
      title: 'Column 4',
      dataIndex: 'address',
      key: '4',
      width: 150,
    },
    {
      title: 'Column 5',
      dataIndex: 'address',
      key: '5',
      width: 150,
    },
    {
      title: 'Column 6',
      dataIndex: 'address',
      key: '6',
      width: 150,
    },
    {
      title: 'Column 7',
      dataIndex: 'address',
      key: '7',
      width: 150,
    },
    { title: 'Column 8', dataIndex: 'address', key: '8' },
    {
      title: 'Action',
      key: 'operation',
      fixed: 'right',
      width: 100,
    },
  ]
})

const vcCardExtraBind2 = {
  toggle: false,
  fullscreen: false,
  remove: false,
  menus: [
    { label: '大表格', click: () => { tableBind2.size = 'large' } },
    { label: '中表格', click: () => { tableBind2.size = 'middle' } },
    { label: '小表格', click: () => { tableBind2.size = 'small' } },
  ]
}

const tableBind2 = reactive({
  bordered: true,
  size: 'default',
  dataSource: [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      money: '￥300,000.00',
      address: 'Sidney No. 1 Lake Park, Sidney No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Ben Kang',
      age: 21,
      money: '￥56,000.00',
      address: 'London No. 2 Lake Park, London No. 2 Lake Park',
    },
  ],
  columns: [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '125px'
    },
    {
      title: 'Cash Assets',
      className: 'column-money',
      dataIndex: 'money',
      width: '125px'
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      align: 'center',
      width: '75px'
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      ellipsis: true,
    },
  ],
})

const tableBind3 = reactive({
  bordered: true,
  size: 'default',
  rowSelection: {},
  dataSource: [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      money: '￥300,000.00',
      address: 'Sidney No. 1 Lake Park, Sidney No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Ben Kang',
      age: 21,
      money: '￥56,000.00',
      address: 'London No. 2 Lake Park, London No. 2 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 42,
      money: '￥1,256,000.00',
      address: 'New York No. 1 Lake Park, New York No. 1 Lake Park',
    },
    {
      key: '4',
      name: 'Sakula',
      age: 32,
      money: '￥356,000.00',
      address: 'Tokio No. 1 Lake Park, New York No. 1 Lake Park',
    },
  ],
  columns: [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '125px'
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      align: 'center',
      width: '75px'
    },
    {
      title: 'Cash Assets',
      className: 'column-money',
      dataIndex: 'money',
      width: '125px'
    },
  ],
})

async function init() {
  for (let i = 0; i < 6; i++) {
    tableBind.dataSource.push({
      key: i,
      name: `Edrward ${i}`,
      age: 32,
      address: `London Park no. ${i}`,
    });
  }
}

onMounted(() => {
  init()
})
</script>