import { createData, pick }       from 'digi'
import router                     from 'digi-router'
import { iconUser, iconKey,  }    from '@/components/icon'
import { Input, notification }    from '@/components'
import { rsaEncrypt }             from '@/utils'
import {
  rsa, redirect,
  getRedirect
}                                 from '@/data'
import { register, numberExist }  from '@/api'

const data = createData()

const inputs = [
  new Input({
    data,
    rules: [
      { required: true, message: '账号不能为空' },
      { min: 6, message: '账号不能少于6字符' },
      { RE: /^\w+$/, message: '账号只能由英文、数字、下划线组成' }
    ],
    value: data.$tp('number'),
    placeholder: '账号',
    prefix: iconUser,
    onblur () {
      data.number && !inputs[0].validate() &&
      numberExist(data.number).then(res => {
        res.data && notification.error(`账号${data.number}已被注册`)
      })
    }
  }),
  new Input({
    data,
    rules: [{ required: true, message: '密码不能为空' }, { min: 6, message: '密码不能少于6字符' }],
    value: data.$tp('password'),
    placeholder: '密码',
    type: 'password',
    autocomplete: 'new-password',
    prefix: iconKey
  }),
  new Input({
    data,
    rules: [{ required: true, message: '确认密码不能为空' }, { eq: 'password', message: '两次密码不同' }],
    value: data.$tp('confirm'),
    placeholder: '确认密码',
    type: 'password',
    autocomplete: 'new-password',
    prefix: iconKey
  })
]

export default {
  path: {
    pathname: '/register',
    watch: ({ params }) => {
      data.params = params
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

      if (inputs.filter(item => item.validate(data)).length) return

      const formData = rsaEncrypt(pick(data, ['number', 'password']), rsa.pubKey)
      formData && register({ data: formData, host: redirect.location.host }).then(({ data }) => {
        redirect.location.params.jwt = data
        const rl = new router.Location(pick(redirect.location, ['href', 'params']))
        window.location.replace(rl.href)
      })
    },
    child: [
      {
        tagName: 'h2',
        className: 'title',
        text: '欢迎注册'
      },
      ...inputs,
      {
        tagName: 'button',
        className: 'submit',
        text: '注册',
        type: 'submit'
      },
      {
        className: 'links',
        child: [
          {
            href: redirect.$tp('location.origin'),
            tagName: 'a',
            text: '首页'
          },
          {
            to: {
              href: '/',
              replace: true,
              params: data.$tp('params')
            },
            tagName: 'a',
            text: '已有帐号？登录'
          }
        ]
      }
    ]
  }
}
