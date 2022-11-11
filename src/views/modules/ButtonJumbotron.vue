<template lang="pug">
.camera
  .parallaxes
    .parallax
      .btn-group
        a-button.grow
          .px-5.pt-1.pb-1
            vc-icon.icon.icon17(icon='HeartOutlined')
            div.text-sm 收藏夹

        a-button.grow
          .px-5.pt-1.pb-1
            vc-icon.icon.icon17(icon='HistoryOutlined')
            div.text-sm 浏览记录

        a-button.grow
          .px-5.pt-1.pb-1
            vc-icon.icon.icon17(icon='PhoneOutlined')
            div.text-sm 电话簿
    .parallax 
    .parallax
    .parallax
    .parallax
    .parallax

    .parallax
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import vcIcon from '@/components/vcIcon'

function transformElement(element, x, y) {
  const multiple = 20
  let box = element.getBoundingClientRect()
  let calcX = -(y - box.y - box.height / 2) / multiple
  let calcY = (x - box.x - box.width / 2) / multiple
  
  element.style.transform = `rotateX(${calcX}deg) rotateY(${calcY}deg) translateZ(70px)`
}

function init() {
  const wrapper = document.querySelector('body')
  const camera = document.querySelector('.camera')
  const parallaxes = camera.querySelector('.parallaxes')
  
  wrapper.addEventListener('mousemove', e => {
    window.requestAnimationFrame(() => {      
      transformElement(parallaxes, e.clientX, e.clientY)
    })
  })

  wrapper.addEventListener('mouseleave', e => {
    window.requestAnimationFrame(() => {
      // parallaxes.style.transform = 'rotateX(0) rotateY(0) translateZ(70px)'
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
  // animation: spin 8s infinite linear;
  width: 360px; height: 60px;
  margin: 55px auto;
  transform: rotateX(-20deg) rotateY(28deg);
  transform-style: preserve-3d;
  transition: all .1s ease;
  backface-visibility: visible;
  transform: translateZ(70px);

  .parallax {
    text-align: center;
    width: 100%; height: 100%;
    position: absolute;

    &:nth-child(1) {
      background-color: rgba(255, 255, 255, 0.1);
      transform: translateZ(30px);
    }

    &:nth-child(2) {
      background-color: rgba(191.25, 191.25, 191.25, 0.1);
      transform: rotateY(180deg) rotateX(0deg) translateZ(30px);
    }

    &:nth-child(3) {
      width: 60px;
      background-color: rgba(127.5, 127.5, 127.5, 0.1);
      transform: rotateY(-90deg) translateZ(30px);
    }

    &:nth-child(4) {
      width: 60px;
      background-color: rgba(63.75, 63.75, 63.75, 0.1);
      transform: rotateY(90deg) translateZ(330px);
    }

    &:nth-child(5) {
      background-color: rgba(0, 0, 0, 0.1);
      transform: rotateX(90deg) translateZ(30px);
    }

    &:nth-child(6) {
      background-color: rgba(63.75, 63.75, 63.75, 0.1);
      transform: rotateX(-90deg) rotateZ(-180deg) translateZ(30px);
    }

    &:nth-child(7) {
      background-color: rgba(0, 0, 0, 0.15);
      transform: rotateX(-90deg) rotateZ(-180deg) translateZ(75px);
      filter: blur(35px);
    }
  }

  .ant-btn {
    border-radius: 0;
    background-color: transparent;
    &:hover {
      background-color: rgba(255, 255, 255, 1);
    }
  }
}

@keyframes spin {
  from { transform: rotateX(0) rotateY(0); }
  to   { transform: rotateX(360deg) rotateY(360deg); }
}
</style>