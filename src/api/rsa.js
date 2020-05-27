/*
* @Author: lin.zhenhui
* @Date: 2020-03-10 14:59:10
 * @Last Modified by: lin.zhenhui
 * @Last Modified time: 2020-05-25 03:19:02
*/


import { request, jwtDecoded } from '@/utils'
import digiRouter              from 'digi-router'

export const getRsaPubKey = () => request.get('/rsa').then(response => {
  const { payloadData } = jwtDecoded('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' + response.data, response.h)

  if (!payloadData || !payloadData.pub) {
    digiRouter.replace({ pathname: '/error', params: { msg: '环境不安全，系统无法使用。您可能用了代理或是网络被劫持。' } })
    return Promise.reject()
  } else {
    response.data = payloadData.pub
  }

  return response
})