<template lang="pug">
.vc-slder
  a-slider(
    v-bind="sliderBind"
    @change="sliderEvents.change"
    @afterChange="sliderEvents.afterChange")

  span.pass(v-if="sliderBind.value === 100") 验证通过
  span.tip(v-else) 请按住滑块，拖动到最右边
</template>

<script setup>
import { reactive } from 'vue'

const emit = defineEmits([ 'finish' ])

const sliderBind = reactive({
  value: 0,
  tooltipVisible: false,
  disabled: false
})

const sliderEvents = reactive({
  change(value) {
    sliderBind.value = value
    sliderBind.disabled = Boolean(value === 100)
  },
  afterChange(value) {
    if (value !== 100) return sliderBind.value = 0
    emit('finish')
  }
})

</script>

<style lang="less">
.vc-slder {
  transition: background-color 0.3s;
  background-color: #91d5ff;
  height: 32px; padding: 0 20px;
  position: relative;

  &::before {
    content: '';
    transition: background-color 0.3s;
    background-color: #f5f5f5;
    height: 32px; display: block;
    position: absolute; top: 0; right: 0; left: 0; z-index: 0;
  }

  &:hover {
    background-color: #69c0ff;
    
    .ant-slider-track {
      background-color: #69c0ff;
    }
    &::before {
      background-color: #e1e1e1;
    }
  }
  
  .ant-slider {
    height: 0px;
    padding: 0; margin: 0;
    
    .ant-slider-rail,
    .ant-slider-step {
      height: 0px;
    }
    
    .ant-slider-track,
    .ant-slider-handle {
      height: 32px;
      border-radius: 0;
      box-shadow: none;
    }
    .ant-slider-track {
      margin: 0 -20px;
    }
    .ant-slider-handle {
      cursor: grab;
      &:active {
        cursor: grabbing;
      }
    }
    
    // .ant-slider-rail {}
    // .ant-slider-track {}
    // .ant-slider-step {}
    .ant-slider-handle {
      width: 40px;
      border: 1px solid #ccc;
      margin: 0;
      z-index: 99;
    }

    &.ant-slider-disabled {
      .ant-slider-handle {
        cursor: not-allowed;
        // &:active {
        //   cursor: grabbing;
        // }
      }
    }
  }

  & > .ant-slider-disabled {
    background-color: rgba(0, 0, 0, 0.25) !important;
  }
  
  .tip,
  .pass {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    font-size: 12px;
    text-align: center;
    line-height: 32px;
    position: absolute; top: 0; left: 0;
    width: 100%; height: 100%;
  }
  .tip {
    background: -webkit-gradient(
      linear, left top, right top, color-stop(0,#4d4d4d), color-stop(.4,#4d4d4d), color-stop(.5,#fff),color-stop(.6,#4d4d4d),color-stop(1,#4d4d4d)
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    -webkit-text-size-adjust: none;

    animation: slidetounlock 3s infinite;
    -webkit-animation: slidetounlock 3s infinite;
    
    pointer-events: none;
  }
  .pass { color:#fff; z-index: 100;}
}

@keyframes slidetounlock {
  0% { background-position: -200px 0 }
  100% { background-position: 200px 0 }
}

@-webkit-keyframes slidetounlock {
  0% { background-position: -200px 0 }
  100% { background-position: 200px 0 }
}
</style>