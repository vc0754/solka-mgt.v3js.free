<template lang="pug">
.camera
  .parallaxes
    .parallax
      img.max-w-full(:src="Logo")
    .parallax
    .parallax
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import Logo from '@/assets/logo-white_2x.png'

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
  // animation: spin 8s infinite linear;
  width: 320px; height: 160px; margin: 0 auto;
  position: relative;
  transform: rotateX(10deg) rotateY(-28deg);
  transform-style: preserve-3d;
  transition: all .1s ease;
  backface-visibility: visible;

  .parallax {
    text-align: center;
    width: 100%; height: 100%;
    position: absolute;

    &:nth-child(1) {
      padding: 4em 5em;
      background-color: transparent;
      transform: translateZ(20px);
      
      &::after {
        content: 'Mgt.Free';
        background: #fff;
        color: rgb(0, 32, 61);
        font: normal bolder 0.5em 'Lucida Sans';
        display: block;
        padding: 1px 5px;
        position: absolute; top: 32px; left: 72px;
        border-radius: 5px 0;
        transform: skew(-10deg);
      }
    }

    &:nth-child(2) {
      background-color: rgb(0, 32, 61);
      transform: translateZ(0px);
    }

    &:nth-child(3) {
      background-color: rgba(133, 158, 179, 0.75);
      transform: rotateY(180deg) rotateX(0deg) translateZ(30px);
      filter: blur(35px);
    }
  }
}

@keyframes spin {
  from { transform: rotateX(0) rotateY(0); }
  to   { transform: rotateX(360deg) rotateY(360deg); }
}
</style>