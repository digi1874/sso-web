import { createData }   from 'digi'
import { getRsaPubKey } from '@/api'

export const rsa = createData()
export const fetchRsaPubKey = () => {
  return getRsaPubKey().then(({ data }) => {
    rsa.pubKey = data
  })
}
