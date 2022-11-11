<template lang="pug">
.camera
  .parallaxes
    .parallax
      a-card(title="高级工具组件")
        template(#extra)
          vc-card-extra(v-bind="vcCardExtraBind")

        a-spin(:indicator="spinBind.indicator" :spinning="spinBind.spinning")
          h3.text-md.mb-4 功能完善的 card-extra 组件
          p.mb-5 高级工具组件是新开发的 a-card extra 组件，它主要是对一些附加作用的小功能进行包装，避免重复劳动。不过它看上去依旧很具备吸引力，使用它让你的 a-card 组件变得更加炫酷吧！
          .float-left.mr-3
            a-avatar.block(:size="36" icon="user" :src="DefaultAvatar")
          .text-xs.opacity-60
            span.block.mb-1 高级产品经理
            span UI/UX 于 YOYOZONE

    .parallax
    .parallax
    .parallax
    .parallax
    
    .parallax
</template>

<script setup>
import { message } from 'ant-design-vue'
import { LoadingOutlined } from '@ant-design/icons-vue'
import { reactive, onMounted, onUnmounted, h } from 'vue'

import { vcCardExtra } from '@/components/vcCardExtra'
import DefaultAvatar from '@/assets/avatar.jpg'

const spinBind = reactive({
  spinning: false,
  indicator: h(LoadingOutlined, {
    style: {
      fontSize: '24px',
    },
    spin: true,
  })
})

const vcCardExtraBind = {
  menus: [
    { label: 'API', click: () => { message.success('点击了 API') } },
    { label: 'Preferences', click: () => { message.success('点击了 Preferences') } },
    { label: 'About', click: () => { message.success('点击了 About') } },
  ],
  remove: false,
  api: () => {
    return new Promise((resolve, reject) => {
      spinBind.spinning = true
      setTimeout(() => {
        spinBind.spinning = false

        let num = Math.random() * 10
        if (num > 5) return resolve()
        reject('刷新失败')
      }, 2000)
    })
  }
}

function transformElement(element, x, y) {
  const multiple = 30
  let box = element.getBoundingClientRect()
  let calcX = -(y - box.y - box.height / 2) / multiple
  let calcY = (x - box.x - box.width / 2) / multiple
  
  element.style.transform = `rotateX(${calcX}deg) rotateY(${calcY}deg)`
}

function init() {
  const wrapper = document.querySelector('body')
  const camera = document.querySelector('.camera')
  const parallaxes = camera.querySelector('.parallaxes')
  const parallax = camera.querySelectorAll('.parallax')
  
  wrapper.addEventListener('mousemove', e => {
    window.requestAnimationFrame(() => {      
      transformElement(parallaxes, e.clientX, e.clientY)
    })
  })

  wrapper.addEventListener('mouseleave', e => {
    window.requestAnimationFrame(() => {
      parallaxes.style.transform = 'rotateX(0) rotateY(0)'
    })
  })
}

onMounted(() => {
  init()
})

onUnmounted(() => {
  // wrapper.removeEventListener('mousemove', parallax)
})
</script>

<style lang="less" scoped>
.camera {
  position: relative; z-index: 101;
  transform-style: preserve-3d;
  perspective: 500px;
}

.parallaxes {
  width: 460px; height: 270px; margin: 0 auto;
  position: relative;
  // transform: rotateX(10deg) rotateY(-28deg);
  transform-style: preserve-3d;
  transition: all .1s ease;
  backface-visibility: visible;

  .parallax {
    width: 100%; height: 100%;
    position: absolute;

    &:nth-child(1) {
      background-color: #f5f5f5;
      transform: translateZ(0px);
    }

    &:nth-child(2) {
      width: 30px;
      background-color: #fafafa;
      transform: rotateY(-90deg) translateZ(15px);
    }

    &:nth-child(3) {
      width: 30px;
      background-color: #fafafa;
      transform: rotateY(90deg) translateZ(445px);
    }

    &:nth-child(4) {
      height: 30px;
      background-color: #fafafa;
      transform: rotateX(90deg) translateZ(15px);
    }

    &:nth-child(5) {
      height: 30px;
      background-color: #fafafa;
      transform: rotateX(-90deg) rotateZ(-180deg) translateZ(255px);
    }

    &:nth-child(6) {
      height: 20px; width: 90%; left: 5%;
      background-color: rgba(0, 0, 0, 0.15);
      transform: rotateX(-90deg) translateZ(305px);
      filter: blur(25px);
    }
  }
}

.avatar.btn-icon-link {
  &::before {
    background-color: #fff;
    top: -4px; right: -4px; bottom: -4px; left: -4px;
  }
}

@keyframes spin {
  from { transform: rotateY(0); }
  to   { transform: rotateY(360deg); }
}
</style>