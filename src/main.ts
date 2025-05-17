import { createSSRApp } from 'vue'
import App from './App.vue'
import 'uno.css'
import '@/styles/index.css'

export function createApp() {
  const app = createSSRApp(App)

  // 确保应用实例可以被全局访问
  app.config.globalProperties.$app = app

  return {
    app,
  }
}
