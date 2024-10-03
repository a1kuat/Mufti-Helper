import axios, { AxiosError } from 'axios'
import { notify } from '@/components/ui/notification'
import { DATA_API_URL, DEFAULT_ERROR_MESSAGE } from './constants'

const instance = axios.create({
  timeout: 4000 * 1000,
  baseURL: DATA_API_URL,
})

instance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const e: any = error?.response?.data
    switch (error?.response?.status) {
      case 400:
      case 422:
      case 500:
      case 503:
      case 504:
        notify(e.detail ?? DEFAULT_ERROR_MESSAGE, 'error')
        break
      case 404:
        notify(e.detail ?? DEFAULT_ERROR_MESSAGE, 'error')
        break
      default:
        notify(DEFAULT_ERROR_MESSAGE, 'error')
        break
    }
    return Promise.reject(error.response)
  }
)

export default instance
