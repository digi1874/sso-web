import { request } from '@/utils'

export const login       = data   => request.post('/', data)
export const password    = data   => request.post('/password', data)
export const register    = data   => request.post('/register', data)
export const numberExist = number => request.get(`/number/${number}/exist`)
