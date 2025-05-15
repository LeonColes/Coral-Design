// vite.lib.config.ts
import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

export default async () => {
  // 动态导入UnoCSS
  const UnoCSS = (await import('unocss/vite')).default
  
  return defineConfig({
    plugins: [
      vue(),
      UnoCSS(),
      dts({ 
        insertTypesEntry: true,
        include: ['src/components/**/*.vue', 'src/index.ts'],
        outDir: 'dist/types'
      })
    ],
    // 其余配置保持不变
    build: {
      lib: {
        entry: resolve(__dirname, 'src/index.ts'),
        name: 'CoralDesign',
        fileName: (format) => `index.${format === 'es' ? 'mjs' : 'js'}`
      },
      rollupOptions: {
        external: ['vue', '@dcloudio/uni-app'],
        output: {
          globals: {
            vue: 'Vue',
            '@dcloudio/uni-app': 'UniApp'
          },
          assetFileNames: (assetInfo) => {
            if (assetInfo.name === 'style.css') return 'index.css'
            return assetInfo.name || 'assets/[name].[ext]'
          }
        }
      },
      cssCodeSplit: true
    }
  })
}