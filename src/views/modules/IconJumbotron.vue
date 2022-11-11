<template lang="pug">
.camera
  .parallaxes
    .parallax
      vc-icon.icon(icon="MessageFilled")
    .parallax 
      vc-icon.icon(icon="Html5Filled" style="opacity: 0.15;")
    .parallax
      vc-icon.icon(icon="PhoneFilled" style="opacity: 0.15;")
    .parallax
      vc-icon.icon(icon="HeartFilled")
    .parallax
      vc-icon.icon(icon="CloudFilled")
    .parallax
      vc-icon.icon(icon="LayoutFilled" style="opacity: 0.15;")

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
  
  element.style.transform = `rotateX(${calcX}deg) rotateY(${calcY}deg)`
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
      // parallaxes.style.transform = 'rotateX(0) rotateY(0)'
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
  width: 150px; height: 150px;
  margin: 0 auto;
  transform: rotateX(-20deg) rotateY(28deg);
  transform-style: preserve-3d;
  transition: all .1s ease;
  backface-visibility: visible;

  .parallax {
    text-align: center;
    width: 100%; height: 100%;
    position: absolute;

    &:nth-child(1) {
      background-color: rgba(255, 255, 255, 0.1);
      transform: translateZ(75px);
    }

    &:nth-child(2) {
      background-color: rgba(191.25, 191.25, 191.25, 0.1);
      transform: rotateY(180deg) rotateX(0deg) translateZ(75px);
    }

    &:nth-child(3) {
      background-color: rgba(127.5, 127.5, 127.5, 0.1);
      transform: rotateY(-90deg) translateZ(75px);
    }

    &:nth-child(4) {
      background-color: rgba(63.75, 63.75, 63.75, 0.1);
      transform: rotateY(90deg) translateZ(75px);
    }

    &:nth-child(5) {
      background-color: rgba(0, 0, 0, 0.1);
      transform: rotateX(90deg) translateZ(75px);
    }

    &:nth-child(6) {
      background-color: rgba(63.75, 63.75, 63.75, 0.1);
      transform: rotateX(-90deg) rotateZ(-180deg) translateZ(75px);
    }

    &:nth-child(7) {
      background-color: rgba(0, 0, 0, 0.15);
      transform: rotateX(-90deg) rotateZ(-180deg) translateZ(125px);
      filter: blur(35px);
    }
  }

  .icon {
    font-size: 52px;
    position: absolute; top: 50%; left: 50%;
    transform: translate3d(-50%, -50%, 0);
  }
}

@keyframes spin {
  from { transform: rotateX(0) rotateY(0); }
  to   { transform: rotateX(360deg) rotateY(360deg); }
}
</style>