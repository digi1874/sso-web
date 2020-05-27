import { createData }   from 'digi'
import { getWebsiteID } from '@/api'

export const website = createData()
export const fetchWebsiteID = host => {
  if (website.host === host || website.loading === true) return

  website.loading = true
  getWebsiteID(host).then(({ data }) => {
    website.id   = data
    website.host = host
  }).finally(() => {
    website.loading = false
  })
}
