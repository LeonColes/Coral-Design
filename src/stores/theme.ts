import { computed, ref } from 'vue'

// 主题类型
export type ThemeMode = 'light' | 'dark' | 'system' | 'custom'

// 主题设置接口
export interface ThemeSettings {
  mode: ThemeMode
  primaryColor?: string
  borderRadius?: string
}

// 默认主题设置
const defaultSettings: ThemeSettings = {
  mode: 'light',
  primaryColor: '#FF7E6A', // 默认珊瑚色
  borderRadius: 'var(--radius-md)', // 默认圆角
}

// 创建并导出theme store
export function useThemeStore() {
  // 从存储中获取主题设置或使用默认值
  const getSavedSettings = (): ThemeSettings => {
    try {
      const saved = uni.getStorageSync('themeSettings')
      return saved ? JSON.parse(saved) : defaultSettings
    }
    catch (e) {
      console.error('Failed to load theme settings:', e)
      return defaultSettings
    }
  }

  // 主题设置状态
  const settings = ref<ThemeSettings>(getSavedSettings())

  // 系统主题状态
  const systemIsDark = ref(false)

  // 颜色处理工具函数
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result
      ? {
          r: Number.parseInt(result[1], 16),
          g: Number.parseInt(result[2], 16),
          b: Number.parseInt(result[3], 16),
        }
      : null
  }

  // 颜色加深函数
  const darkenColor = (hex: string, percent: number) => {
    const rgb = hexToRgb(hex)
    if (!rgb)
      return hex

    const darken = (color: number) => Math.max(0, Math.floor(color * (1 - percent / 100)))

    const r = darken(rgb.r)
    const g = darken(rgb.g)
    const b = darken(rgb.b)

    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
  }

  // 保存设置到存储
  const saveSettings = () => {
    uni.setStorageSync('themeSettings', JSON.stringify(settings.value))
  }

  // 计算当前应该使用的主题
  const currentTheme = computed(() => {
    if (settings.value.mode === 'system') {
      return systemIsDark.value ? 'dark' : 'light'
    }
    return settings.value.mode
  })

  // 判断是否为暗色主题
  const isDark = computed(() => {
    return currentTheme.value === 'dark'
  })

  // 应用主题
  const applyTheme = () => {
    // #ifdef H5
    // 根据计算的当前主题设置文档类名
    if (isDark.value) {
      document.documentElement.classList.add('theme-dark')
    }
    else {
      document.documentElement.classList.remove('theme-dark')
    }
    // #endif

    // #ifdef APP-PLUS || MP
    try {
      const pages = getCurrentPages()
      const page = pages[pages.length - 1]

      // 只在 setData 存在且为函数时调用
      if (
        page
        && Object.prototype.hasOwnProperty.call(page, 'setData')
        && typeof (page as { setData?: unknown }).setData === 'function'
      ) {
        // 通过类型收窄调用 setData
        (page as { setData: (data: Record<string, unknown>) => void }).setData({
          themeClass: isDark.value ? 'theme-dark' : '',
        })
      }

      // 设置导航栏颜色以反映主题
      setTimeout(() => {
        uni.setNavigationBarColor({
          frontColor: isDark.value ? '#ffffff' : '#000000',
          backgroundColor: isDark.value ? '#181818' : '#ffffff',
          animation: {
            duration: 300,
            timingFunc: 'easeIn',
          },
        })
      }, 0)
    }
    catch (e) {
      console.error('Failed to apply theme in MP/APP environment:', e)
    }
    // #endif
  }

  // 检测系统主题
  const detectSystemTheme = () => {
    // #ifdef H5
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    systemIsDark.value = mediaQuery.matches

    mediaQuery.addEventListener('change', (e) => {
      systemIsDark.value = e.matches
      applyTheme()
    })
    // #endif

    // #ifdef APP-PLUS || MP
    // uni-app 获取系统主题
    uni.getSystemInfo({
      success: (res) => {
        // 部分平台支持 theme 属性
        if (res.theme) {
          systemIsDark.value = res.theme === 'dark'
        }
      },
    })
    // #endif
  }

  // 切换主题
  const setTheme = (mode: ThemeMode) => {
    settings.value.mode = mode
    saveSettings()
    applyTheme()
  }

  // 设置自定义主题色
  const setPrimaryColor = (color: string) => {
    settings.value.primaryColor = color

    // #ifdef H5
    document.documentElement.style.setProperty('--primary', color)
    // 根据颜色自动计算衍生颜色
    const rgbColor = hexToRgb(color)
    if (rgbColor) {
      // 计算浅色版本
      document.documentElement.style.setProperty(
        '--primary-light',
        `rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, 0.2)`,
      )
      // 计算深色版本
      document.documentElement.style.setProperty(
        '--primary-dark',
        darkenColor(color, 15),
      )
      // 计算更深色版本
      document.documentElement.style.setProperty(
        '--primary-darker',
        darkenColor(color, 30),
      )
    }
    // #endif

    // #ifdef APP-PLUS || MP
    // 针对APP和小程序的CSS变量设置
    // 不同平台可能需要不同的实现方式
    uni.setNavigationBarColor({
      frontColor: isDark.value ? '#ffffff' : '#000000',
      backgroundColor: color,
      animation: {
        duration: 300,
        timingFunc: 'easeIn',
      },
    })
    // #endif

    saveSettings()
  }

  // 设置边框圆角
  const setBorderRadius = (radius: string) => {
    settings.value.borderRadius = radius

    // #ifdef H5
    document.documentElement.style.setProperty('--radius-md', radius)
    // #endif

    saveSettings()
  }

  // 初始化
  detectSystemTheme()
  applyTheme()

  // 如果有自定义颜色，应用它
  if (settings.value.primaryColor && settings.value.primaryColor !== defaultSettings.primaryColor) {
    setPrimaryColor(settings.value.primaryColor)
  }

  if (settings.value.borderRadius && settings.value.borderRadius !== defaultSettings.borderRadius) {
    setBorderRadius(settings.value.borderRadius)
  }

  return {
    settings,
    currentTheme,
    isDark,
    setTheme,
    setPrimaryColor,
    setBorderRadius,
  }
}
