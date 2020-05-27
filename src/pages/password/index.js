import { createData, pick }    from 'digi'
import digiRouter              from 'digi-router'
import { iconKey }             from '@/components/icon'
import { Input, notification } from '@/components'
import { rsaEncrypt }          from '@/utils'
import { rsa }                 from '@/data'
import { password }            from '@/api'

const data = createData()

const inputs = [
  new Input({
    data,
    rules: [{ required: true, message: '旧密码不能为空' }],
    value: data.$tp('password'),
    placeholder: '旧密码',
    type: 'password',
    autocomplete: 'new-password',
    prefix: iconKey
  }),
  new Input({
    data,
    rules: [
      { required: true, message: '新密码不能为空' },
      { min: 6, message: '新密码不能少于6字符' },
      { different: 'password', message: '不能跟旧密码相同' }
    ],
    value: data.$tp('newPassword'),
    placeholder: '新密码',
    type: 'password',
    autocomplete: 'new-password',
    prefix: iconKey
  }),
  new Input({
    data,
    rules: [{ required: true, message: '确认新密码不能为空' }, { eq: 'newPassword', message: '两次新密码不同' }],
    value: data.$tp('confirm'),
    placeholder: '确认新密码',
    type: 'password',
    autocomplete: 'new-password',
    prefix: iconKey
  })
]

export default {
  path: {
    pathname: '/password',
    watch: ({ params }) => {
      data.params = params
      data.signature = params.signature
    }
  },
  className: 'login-page',
  child: {
    tagName: 'form',
    className: 'form',
    onsubmit: e => {
      e.preventDefault()
      if (!rsa.pubKey || !data.signature) {
        notification.error('环境不安全，系统无法使用')
        return
      }

      if (inputs.filter(item => item.validate(data)).length) return

      const formData = rsaEncrypt(pick(data, ['signature', 'password', 'newPassword']), rsa.pubKey)
      formData && password({ data: formData }).then(res => {
        notification.success(res.data)
        if (data.params.back) {
          setTimeout(() => window.history.back(), 1000)
        } else {
          data.newPassword = ''
        }
      }).catch(({ response }) => {
        if (response.status === 401) {
          digiRouter.replace({ pathname: '/', params: { ...data.params, pathname: '/password' } })
        }
      })
    },
    child: [
      {
        tagName: 'h2',
        className: 'title',
        text: '更改密码'
      },
      ...inputs,
      {
        tagName: 'button',
        className: 'submit',
        text: '提交',
        type: 'submit'
      }
    ]
  }
}
