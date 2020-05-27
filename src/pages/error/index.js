import { createData } from 'digi'
import './index.scss'

const data = createData()

export default {
  path: {
    pathname: '/error',
    watch: ({ params }) => {
      data.msg = decodeURIComponent(params.msg)
    }
  },
  className: 'error-page',
  child: {
    tagName: 'h2',
    className: 'msg',
    text: data.$tp('msg')
  }
}