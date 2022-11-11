import { createVNode } from 'vue'
import * as Icons from '@ant-design/icons-vue'

export default ({
  props: {
    icon: String,
    className: String,
    rotate: Number,
    spin: Boolean,
    style: [ Object, String ],
    twoToneColor: String
  },
  render (props) {
    const { icon, className, rotate, spin, style, twoToneColor } = props
    return createVNode(Icons[icon], { 
      className,
      rotate,
      spin,
      style,
      twoToneColor
    })
  }
})