<template lang="pug">
layout-page
  .section-breadcrumb.border-solid.border-0.border-b.border-slate-100.sticky(style="z-index: 100; top: 60px;")
    .px-5.py-3.bg-white
      a-breadcrumb
        a-breadcrumb-item 控制台
        a-breadcrumb-item 工作台

  .content
    .bg-white.px-2.py-6(:class="[ 'sm:px-6', 'md:px-8' ]")
      h1.text-2xl.mb-6 工作台

      .grid.grid-cols-3.gap-4
        .col-span-2
          a.avatar.btn-icon-link.float-left.mr-5
            a-avatar.block(:size="68" icon="user" :src="user.avatar ? user.avatar : DefaultAvatar")
          p.text-xl.mt-1.mb-2 早安，{{ user.display_name }}，祝你开心每一天！
          p.opacity-50.mb-0 高级软件工程师 | Alphabet - Google - DeepMind
        
        .nums.col-span-1.grid.grid-cols-3.gap-4.text-center.items-center
          div
            span.text-sm.opacity-50 项目数
            .text-2xl 56
          div
            span.text-sm.opacity-50 团队内排名
            .text-2xl 8/ 24
          div
            span.text-sm.opacity-50 项目访问
            .text-2xl 2,223

    .mx-2.my-2(:class="[ 'sm:mx-4', 'sm:my-4', 'md:mx-6', 'md:my-6']")
      .grid.grid-cols-3.gap-4
        .col-span-2
          a-card.mb-4.projects(v-bind="cardBind")
            template(#extra)
              a 全部项目
            a-card-grid.project(:hoverable="false" v-for="item in projects.data" @click="goto(item.link)")
              .title
                img(:src="item.icon" :class="[ 'max-w-[2rem]', 'max-h-8']")
                strong.ml-2 {{ item.title }}
              .desc.mt-2.text-sm.opacity-70 {{ item.desc }}
              .mt-3.text-xs.opacity-70
                span {{ item.lastUpdate.user }}
                span.ml-2.opacity-60 {{ item.lastUpdate.date }}
          
          a-card(v-bind="cardBind2")
            ul.events
              li(bordered v-for="item in events.data")
                .float-left
                  a-avatar(:src="item.icon")
                .ml-12
                  .desc.text-sm.opacity-90.whitespace-pre-line {{ item.desc }}
                  .mt-3.text-xs.opacity-70
                    span {{ item.lastUpdate.user }}
                    span.ml-2.opacity-60 {{ item.lastUpdate.date }}
            
        .col-span-1
          a-card.mb-4.quickmenus(title="快速开始 / 便捷导航")
            a-card-grid.text-center(:hoverable="false" v-for="item in quickmenus")
              router-link(:to="item.to")
                vc-icon.icon(:icon="item.icon")
                span {{ item.label }}

          a-card.mb-4(title="这是 Vite Create 的默认首页" :bodyStyle="{ padding: '15px 25px' }")
            HelloWorld(msg="Hello Vue 3 + Vite")

          a-card(v-bind="cardBind3")
            ul.teams
              li.align-middle(v-for="item in teams.data")
                a-avatar(:src="item.avatar")
                span.ml-3 {{ item.name }}

</template>

<script setup>
import axios from '@/utils/http/axios'
import { reactive, onMounted } from 'vue'

import { userStore } from '@/store/modules/user'

import LayoutPage from '@/views/Layout/Page.vue'
import vcIcon from '@/components/vcIcon'

import HelloWorld from '@/components/HelloWorld.vue'
import DefaultAvatar from '@/assets/avatar.jpg'

const user = userStore()

function goto(url) {
  window.open(url)
}

const cardBind = reactive({
  title: '使用的项目',
  loading: false
})

const projects = reactive({
  data: []
})

const cardBind2 = reactive({
  title: '动态',
  loading: false,
  bodyStyle: {
    padding: 0
  }
})

const events = reactive({
  data: []
})

const quickmenus = reactive([
  { icon: 'SmileOutlined', label: '图标', to: { name: 'AntIcon' } },
  { icon: 'SelectOutlined', label: '按钮', to: { name: 'AntButton' } },
  { icon: 'SwitcherOutlined', label: '卡片', to: { name: 'AntCard' } },
  { icon: 'TableOutlined', label: '表格', to: { name: 'AntTable' } },
  { icon: 'SketchOutlined', label: '关于', to: { name: 'AboutMe' } },
  { icon: 'QqOutlined', label: '讨论', to: { name: 'Newbie' } }
])

const cardBind3 = reactive({
  title: '团队',
  loading: false,
  bodyStyle: {
    padding: 0
  }
})
const teams = reactive({
  data: []
})


async function init() {
  cardBind.loading = true
  try {
    const res = await axios.get('projects')
    projects.data = res.data
  } finally {
    cardBind.loading = false
  }

  cardBind2.loading = true
  try {
    const res = await axios.get('events')
    events.data = res.data
  } finally {
    cardBind2.loading = false
  }

  cardBind3.loading = true
  try {
    const res = await axios.get('teams')
    teams.data = res.data
  } finally {
    cardBind3.loading = false
  }
  
}

onMounted(() => {
  init()
})
</script>

<style lang="less" scoped>

.nums {
  & > div {
    position: relative;

    &::after {
      content: '';
      background-color: #eee;
      display: block; width: 1px; height: 70%;
      position: absolute; right: -0.5rem; top: 50%;
      transform: translate3d(0, -50%, 0);
    }

    &:last-child {
      &::after {
        display: none;
      }
    }
  }
}

.projects {
  .project {
    cursor: pointer;

    .title { height: 32px;}
    .desc { height: 40px; overflow: hidden; text-overflow: ellipsis; }

    &:hover {
      background-color: rgba(0, 0, 0, 0.035);
    }
  }
}

ul.events {
  padding: 0; margin: 0;
  list-style: none;

  li {
    padding: 22px 24px; margin: 0;
    border-bottom: solid 1px #eee;
    
    .desc {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3; // 控制多行的行数
      -webkit-box-orient: vertical;
    }

    &:hover {
      background-color: rgba(0, 0, 0, 0.035);
    }

    &::after {
      content: '';
      display: block;
      clear: both;
    }
  }
}

.quickmenus {
  .icon {
    opacity: 0.65;
    display: block;
    font-size: 24px;
    margin-bottom: 3px;
  }

  a {
    color: #333;

    &:hover { color: #5584ff;}
  }
}


ul.teams {
  padding: 0; margin: 0;
  list-style: none;

  li {
    width: 50%;
    float: left;
    padding: 10px 10px 10px 22px;
    cursor: pointer;

    &:hover {
      background-color: rgba(0, 0, 0, 0.035);
    }
  }

  &::after {
    content: ''; display: block; clear: both;
  }
}
</style>