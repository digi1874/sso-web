import { request } from '@/utils'

export const getWebsiteID = host => request.get(`/website/${host}/id`)
