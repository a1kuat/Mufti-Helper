import { Path } from './types'

export const DATA_API_URL: string = import.meta.env.VITE_DATA_SERVICE

// 
export const SEARCH_BACKEND: string = import.meta.env
  .VITE_SEARCH_BACKEND
export const X_API_KEY: string = import.meta.env.VITE_X_API_KEY
export const DEFAULT_ERROR_MESSAGE =
  'Sorry. Unknown internal issue. This event is logged and the team will look into this.'

export const sourceMenu = [
  {
    name: 'Add URL',
    link: Path.WEBSITE,
    disabled: false,
  },
]

export const dialogTitle = {
  [Path.DOCUMENTS]: 'Upload PDF Documents',
  [Path.WEBSITE]: 'Add repository link',
  [Path.YOUTUBE]: 'Add youtube links',
  [Path.APPS]: 'Connect application',
  [Path.DATABASES]: 'Connect a database',
  [Path.MEDIA]: 'Upload Images, Videos',
  [Path.AUDIO]: 'Add Audio',
}
