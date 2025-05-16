import { createSSRApp } from 'vue'
import App from './App.vue'
import 'uno.css'
import './styles/index.css' // 导入设计系统样式

export function createApp() {
  const app = createSSRApp(App)
  return {
    app,
  }
}
