/*
* @Author: lin.zhenhui
* @Date: 2020-03-10 14:57:51
 * @Last Modified by: lin.zhenhui
 * @Last Modified time: 2020-05-27 18:36:21
*/

import axios                     from 'axios'
import { notification, loading } from '@/components'
import { get }                   from './get'

// api baseURL
const baseURL  = process.env.NODE_ENV === 'development' ? 'http://localhost:8021/login' : 'https://myDomain/login'
const instance = axios.create({ baseURL })

// 拦截请求
instance.interceptors.request.use(config => {
  loading.show()
  return config
})

// 拦截回应
instance.interceptors.response.use(response => {
  loading.hide()
  const date = get(response, 'headers.date')
  if (date) {
    const { data } = response
    data.h = Math.floor(new Date(date) / 1000) + ''
  }
  return response.data
}, error => {
  loading.hide()
  notification.error(get(error, 'response.data.msg') || error)
  return Promise.reject(error)
})

export const request = instance
export default instance
