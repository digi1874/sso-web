import { createData, pick }    from 'digi'
import digiRouter              from 'digi-router'
import { iconUser, iconKey,  } from '@/components/icon'
import { Input, notification } from '@/components'
import { rsaEncrypt }          from '@/utils'
import {
  rsa, redirect,
  getRedirect
}                              from '@/data'
import { login }               from '@/api'
import './index.scss'

const data = createData()
window.data = data
const inputs = [
  new Input({
    data,
    rules: [{ required: true, message: '账号不能为空' }],
    value: data.$tp('number'),
    placeholder: '账号',
    prefix: iconUser
  }),
  new Input({
    data,
    rules: [{ required: true, message: '密码不能为空' }],
    value: data.$tp('password'),
    placeholder: '密码',
    type: 'password',
    prefix: iconKey
  })
]

export default {
  path: {
    pathname: '/',
    watch: ({ params }) => {
      data.params = params
      data.linksDisplay = !data.params.pathname || 'none'
      getRedirect()
    }
  },
  className: 'login-page',
  child: {
    tagName: 'form',
    className: 'form',
    onsubmit: e => {
      e.preventDefault()
      if (!rsa.pubKey) {
        notification.error('环境不安全，系统无法使用')
        return
      }

      if (inputs.filter(item => item.validate()).length) return

      const formData = rsaEncrypt(pick(data, ['number', 'password']), rsa.pubKey)
      formData && login({ data: formData, host: redirect.location.host }).then(res => {
        if (data.params.pathname) {
          const params = { ...data.params }
          const { pathname } = params
          delete params.pathname
          digiRouter.replace({ pathname, params: { ...params, signature: res.data.replace(/.+\./, '') } })
        } else {
          redirect.location.params.jwt = res.data
          const rl = new digiRouter.Location(pick(redirect.location, ['href', 'params']))
          window.location.replace(rl.href)
        }
      })
    },
    child: [
      {
        tagName: 'h2',
        className: 'title',
        text: '欢迎登录'
      },
      ...inputs,
      {
        tagName: 'button',
        className: 'submit',
        text: '登录',
        type: 'submit'
      },
      {
        style: {
          display: data.$tp('linksDisplay')
        },
        className: 'links',
        child: [
          {
            href: redirect.$tp('location.origin'),
            tagName: 'a',
            text: '首页'
          },
          {
            to: {
              href: '/register',
              replace: true,
              params: data.$tp('params')
            },
            tagName: 'a',
            text: '立即注册'
          }
        ]
      }
    ]
  }
}
