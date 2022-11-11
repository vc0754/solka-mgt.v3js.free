<template lang="pug">
.camera
  .parallaxes
    .parallax
      a-table(v-bind="tableBind")
    .parallax
    .parallax
    .parallax
    .parallax
    .parallax
    .parallax
    .parallax
    .parallax
    .parallax
    .parallax
    .parallax

    .parallax
</template>

<script setup>
import { reactive, onMounted, onUnmounted } from 'vue'

const tableBind = reactive({
  bordered: true,
  size: 'small',
  pagination: false,
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
    {
      key: '5',
      name: 'John Watson',
      age: 46,
      money: '￥128,000.00',
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
  // animation: spin 8s infinite linear;
  width: 460px; height: 235px; margin: 0 auto;
  position: relative;
  // transform: rotateX(10deg) rotateY(-28deg);
  transform-style: preserve-3d;
  transition: all .1s ease;
  backface-visibility: visible;

  // btn bg #e8e8e8 / #d0d0d0

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
      transform: rotateX(-90deg) rotateZ(-180deg) translateZ(220px);
    }
    
    // 

    &:nth-child(6) {
      width: 30px;
      background-color: #fafafa;
      transform: rotateY(90deg) translateZ(163px);
    }

    &:nth-child(7) {
      width: 30px;
      background-color: #fafafa;
      transform: rotateY(90deg) translateZ(268px);
    }
    
    // 

    &:nth-child(8) {
      height: 30px;
      background-color: #fafafa;
      transform: rotateX(-90deg) translateZ(24px);
    }

    &:nth-child(9) {
      height: 30px;
      background-color: #fafafa;
      transform: rotateX(-90deg) translateZ(64px);
    }

    &:nth-child(10) {
      height: 30px;
      background-color: #fafafa;
      transform: rotateX(-90deg) translateZ(103px);
    }

    &:nth-child(11) {
      height: 30px;
      background-color: #fafafa;
      transform: rotateX(-90deg) translateZ(141px);
    }

    &:nth-child(12) {
      height: 30px;
      background-color: #fafafa;
      transform: rotateX(-90deg) translateZ(180px);
    }

    &:nth-child(13) {
      height: 20px; width: 90%; left: 5%;
      background-color: rgba(0, 0, 0, 0.15);
      transform: rotateX(-90deg) translateZ(265px);
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