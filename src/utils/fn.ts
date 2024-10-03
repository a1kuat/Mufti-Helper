export const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ')
}

export const formatDate = (date: Date) => {
  const date_formatted = date.toUTCString()
  return date_formatted
}

export const getImageUrl = (name: string) => {
  return new URL(`/${name}.png`, import.meta.url).href
}

export const jsonToBase64 = (object: object) => {
  const json = JSON.stringify(object)
  return Buffer.from(json).toString('base64')
}

export const base64ToJson = (base64String: string) => {
  const json = Buffer.from(base64String, 'base64').toString()
  return JSON.parse(json)
}

export const findSourceIcon = (source: string = '') => {
  switch (true) {
    case source.endsWith('.pdf'):
      return '📄'
    case source.startsWith('https://'):
      return '🔗'
    case source.includes('youtube.com'):
      return '🎥'
    default:
      return '📌'
  }
}
