import Mock, { Random } from 'mockjs'

// console.log(Mock)
// Mock.setup({
//   timeout: '1500' // 表示响应时间介于 200 和 600 毫秒之间，默认值是'10-100'。
// })

function getAvatar() {
  return 'https://joeschmoe.io/api/v1/random'
}

export default [
  // 登录
  {
    url: '/api/signin',
    method: 'post',
    response: () => {
      return {
        'id|+1': 1,
        'display_name': '@cname',
        'email': '@email',
        'gender': '@boolean',
        'avatar': ''
      }
    }
  },

  // 发送短信验证码
  {
    url: '/api/sms',
    method: 'post',
    response: () => {
      return {
        'codehash': Mock.Random.string(32)
      }
    }
  },
  
  // 获取项目
  {
    url: '/api/projects',
    method: 'get',
    response: () => {
      return {
        'data': [
          {
            icon: 'https://vitejs.dev/logo.svg',
            title: 'Vite',
            desc: 'Next Generation Frontend Tooling',
            link: 'https://vitejs.dev/',
            lastUpdate: {
              user: '@cname',
              date: '@datetime'
            }
          },
          {
            icon: 'https://router.vuejs.org/logo.png',
            title: 'Vue',
            desc: 'The Progressive JavaScript Framework',
            link: 'https://vuejs.org/',
            lastUpdate: {
              user: '@cname',
              date: '@datetime'
            }
          },
          {
            icon: 'https://www.antdv.com/assets/logo.1ef800a8.svg',
            title: 'Ant Design',
            desc: '为 Web 应用提供了丰富的基础 UI 组件，我们还将持续探索企业级应用的最佳 UI 实践。',
            link: 'https://antdv.com/components/overview-cn',
            lastUpdate: {
              user: '@cname',
              date: '@datetime'
            }
          },
          {
            icon: 'https://pinia.vuejs.org/logo.svg',
            title: 'Pinia',
            desc: 'The Vue Store that you will enjoy using',
            link: 'https://pinia.vuejs.org/',
            lastUpdate: {
              user: '@cname',
              date: '@datetime'
            }
          },
          {
            icon: 'https://tailwindcss.com/_next/static/media/tailwindcss-mark.79614a5f61617ba49a0891494521226b.svg',
            title: 'tailwindcss',
            desc: 'Rapidly build modern websites without ever leaving your HTML.',
            link: 'https://tailwindcss.com/',
            lastUpdate: {
              user: '@cname',
              date: '@datetime'
            }
          },
          {
            icon: 'https://axios-http.com/assets/logo.svg',
            title: 'Axios',
            desc: 'Promise based HTTP client for the browser and node.js',
            link: 'https://axios-http.com/',
            lastUpdate: {
              user: '@cname',
              date: '@datetime'
            }
          }
        ]
      }
    }
  },

  // 获取动态
  {
    url: '/api/events',
    method: 'get',
    response: () => {
      return {
        'data|6': [
          {
            'id|+1': 1,
            icon: 'https://joeschmoe.io/api/v1/random',
            desc: '@csentence(12,42)',
            lastUpdate: {
              user: '@cname',
              date: '@datetime'
            }
          }
        ]
      }
    }
  },

  // 获取团队
  {
    url: '/api/teams',
    method: 'get',
    response: () => {
      return {
        'data|6': [
          {
            'id|+1': 1,
            avatar: 'https://joeschmoe.io/api/v1/random',
            name: '@cname',
          }
        ]
      }
    }
  },
]