import type { App, Component } from 'vue'
import '@/design/index.scss'

// 定义模块类型
interface ModuleType {
  default: Component
}

// 自动导入所有组件
const modules = import.meta.glob<ModuleType>('./components/*.vue', { eager: true })

// 组件集合
const components: Record<string, Component> = {}

// 处理组件名称和注册
Object.entries(modules).forEach(([path, module]) => {
  // 从文件路径中提取组件名 (如 './components/Coral-Button.vue' -> 'CoralButton')
  const componentName = path
    .split('/')
    .pop()
    ?.replace(/\.vue$/, '')
    ?.replace(/-(\w)/g, (_, c) => c.toUpperCase()) // 将kebab-case转为camelCase

  if (componentName && module.default) {
    // 添加非空检查
    components[componentName] = module.default
  }
})

// 插件安装函数 - 使用箭头函数
function install(app: App): void {
  // 注册所有组件
  Object.entries(components).forEach(([name, component]) => {
    if (component) { // 添加额外的非空检查
      app.component(name, component)
    }
  })
}

// 导出组件
export { components }

// 可以通过增加一个辅助函数供用户按需导入
export const getComponent = (name: string): Component | undefined => components[name]

// 默认导出插件对象
export default { install }
