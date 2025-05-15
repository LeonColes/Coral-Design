function handlePath(input: string) {
  if (!input)
    return ''
  // 已经是完整链接或以 /pages 开头，直接返回或补后缀
  if (input.startsWith('http') || input.startsWith('/pages')) {
    if (input.endsWith('.svg') || input.endsWith('.png'))
      return input
    return `/static/icons/${input}.svg`
  }
  // 其他情况，补全路径和后缀
  if (input.endsWith('.svg') || input.endsWith('.png'))
    return `/static/icons/${input}`
  return `/static/icons/${input}.svg`
}
export default handlePath
