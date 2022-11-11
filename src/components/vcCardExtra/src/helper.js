import { useFullscreen } from '@vueuse/core'
import { ref, reactive, computed, watch } from 'vue'

export function useElementParent() {
  
  const parentInstance = ref(null)
  const parentInstanceBind = reactive({
    classes: [],
    loading: false,
    fullscreen: false,
    fullscreenToggle: () => {}
  })

  // 初始化
  function init(parent) {
    // if (parent.type.name !== 'ACard') return console.log('不支持')

    parentInstance.value = parent

    const { isFullscreen, toggle } = useFullscreen(parentInstance.value.vnode.el)

    parentInstanceBind.fullscreen = isFullscreen
    parentInstanceBind.fullscreenToggle = toggle
    
    watch(
      () => parentInstance.value.attrs.class,
      cls => parentInstanceBind.classes = cls ? cls.split(' ') : []
    )

    watch(
      () => parentInstance.value.props.loading,
      val => parentInstanceBind.loading = val
    )
    
    watch(
      () => parentInstanceBind.fullscreen,
      bool => {
        const toggleClassName = 'rounded-none'
        bool ? addClass(toggleClassName) : removeClass(toggleClassName)
      },
      {
        immediate: true,
        // deep: true,
        // flush: 'post'
      }
    )
  }
  
  // 删除
  function remove() {
    parentInstance.value.vnode.el.remove()
  }

  // Loading 相关
  const isLoading = computed(() => {
    return parentInstanceBind.loading
  })
  function toggleLoading() {
    // if (!parentInstance.value) return
    // parentInstance.value.props.loading = !parentInstance.value.props.loading
  }

  // Collapse 相关
  const collapseClassName = 'collapsed'
  const isCollapse = computed(() => {
    return parentInstanceBind.classes.includes(collapseClassName)
  })
  function toggleCollapse() {
    isCollapse.value ? removeClass(collapseClassName) : addClass(collapseClassName)
  }

  // Fullscreen 相关
  const isFullscreen = computed(() => {
    return parentInstanceBind.fullscreen
  })
  function toggleFullscreen() {
    parentInstanceBind.fullscreenToggle()
  }

  // Class actions
  function getClasses() {
    return parentInstance.value.attrs.class?.split(' ') || []
  }

  function hasClass(cls) {
    const classes = getClasses()
    return classes.includes(cls)
  }

  function addClass(cls) {
    if (hasClass(cls)) return

    const classes = getClasses()
    classes.push(cls)

    parentInstance.value.vnode.el.classList.add(cls)
    parentInstance.value.attrs.class = classes.length ? classes.join(' ') : null
  }

  function removeClass(cls) {
    if (!hasClass(cls)) return
    
    const classes = getClasses()
    const index = classes.findIndex(item => item === cls)
    classes.splice(index, 1)

    parentInstance.value.vnode.el.classList.remove(cls)
    parentInstance.value.attrs.class = classes.length ? classes.join(' ') : null
  }

  return {
    init,
    remove,
    isLoading,
    toggleLoading,
    isCollapse,
    toggleCollapse,
    isFullscreen,
    toggleFullscreen
  }
}
