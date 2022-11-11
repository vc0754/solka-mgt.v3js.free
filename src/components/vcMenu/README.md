该组件是基于 ant-design-vue 进行的二次封装

useage.
```
import { vcMenu } from '@/components/vcMenu'

menus | 菜单数组
options | 菜单属性设置，参照 https://antdv.com/components/menu#API
```

eg.
```
{
  key: 'recruitment',
  title: '招聘管理',
  meta: {
    icon: 'SnippetsOutlined'
  },
  url: '/dashboard/recruitment',
  children: [
    {
      key: 'recruitment',
      title: '职位管理',
      meta: {
        icon: 'FileProtectOutlined'
      },
      url: '/dashboard/recruitment/index'
    },
    {
      key: 'recruitment_add',
      title: '发布职位',
      meta: {
        icon: 'FileAddOutlined'
      },
      url: '/dashboard/recruitment/add'
    },
  ]
},
```