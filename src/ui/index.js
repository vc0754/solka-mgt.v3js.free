import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

import './tailwindcss/common.css'
import './tailwindcss/admin-layout.css'

// 自定义组件样式
import './common.less'

// 框架主题配置
export function setupUI(app) {
  app.use(Antd)
}