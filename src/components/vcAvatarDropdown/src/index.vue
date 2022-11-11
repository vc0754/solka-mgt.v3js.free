<template lang="pug">
.user-profile(ref="vcAvatarRef")
  span.float-left.mr-2 {{ user.display_name }}

  a-dropdown.float-right(v-bind="dropdownBind")
    a.avatar.btn-icon-link.float-right
      a-avatar.block(:size="32" icon="user" :src="DefaultAvatar")
    
    template(#overlay)
      a-menu(@click="dropdownClick")
        a-menu-item(key="profile")
          vc-icon.mr-3(icon="UserOutlined")
          span 个人中心
          
        a-menu-item(key="logout")
          vc-icon.mr-3(icon="LogoutOutlined")
          span 退出登陆

</template>
  
  
<script setup>
import { message } from 'ant-design-vue'
import { ref, reactive } from 'vue'
import { router } from '@/router'

import { userStore } from '@/store/modules/user'

import vcIcon from '@/components/vcIcon'

import DefaultAvatar from '@/assets/avatar.jpg'

const user = userStore()

const vcAvatarRef = ref(null)

const dropdownBind = reactive({
  destroyPopupOnHide: true,
  getPopupContainer: () => vcAvatarRef.value,
  trigger: [ 'click' ],
  placement: 'bottomRight',
  overlayClassName: 'user-profile-dropdown fixed',
  overlayStyle: {
    minWidth: '120px'
  }
})

function dropdownClick(e) {
  switch(e.key) {
    case 'profile':
      message.success('个人中心被点击！')
      break;
    case 'logout':
      sessionStorage.removeItem('solka-user')
      router.replace({ name: 'Sign' })
      break;
    default:
      // console.log(e)
  }
}
</script>

<style lang="less">
.user-profile {
  float: left;
  line-height: 32px;
  height: 32px;

  .avatar.btn-icon-link {
    width: 32px !important;
    height: 32px !important;

    &::before {
      top: -4px; right: -4px; bottom: -4px; left: -4px;
    }
  }
}

.user-profile-dropdown {
  .ant-dropdown-content {
    position: absolute; width: 100%;
    transform: translate3d(5px, 5px, 0);

    .ant-dropdown-menu {
      box-shadow: rgba(15, 15, 15, 0.05) 0px 0px 0px 1px, rgba(15, 15, 15, 0.1) 0px 3px 6px, rgba(15, 15, 15, 0.2) 0px 9px 24px;
    }

    &::before {
      content: '';
      display: inline-block;
      position: absolute; top: -7px; right: 15px;
      border-right: 7px solid transparent;
      border-bottom: 7px solid #ccc;
      border-left: 7px solid transparent;
      border-bottom-color: rgba(0, 0, 0, 0.2);
    }

    &::after {
      content: '';
      display: inline-block;
      position: absolute; top: -6px; right: 16px;
      border-right: 6px solid transparent;
      border-bottom: 6px solid #fff;
      border-left: 6px solid transparent;
    }
  }
  
  .icon {
    font-size: 16px;
  }

  &::before {
    display: none;
  }
}
</style>