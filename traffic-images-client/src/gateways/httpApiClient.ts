import { HTTP_PROXY_PATH } from '@/config/env'
import { createAxiosInstance } from '@/lib/axios'
import cloneDeep from 'lodash/cloneDeep'

const getConfig = () => {
  return { baseURL: HTTP_PROXY_PATH }
}

export const httpApiClient = createAxiosInstance(getConfig())

httpApiClient.interceptors.request.use((config) => {
  const baseConfig = cloneDeep(config)

  return baseConfig
})
