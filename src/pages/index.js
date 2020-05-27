import login          from './login'
import password       from './password'
import register       from './register'
import { iconGithub } from '@/components/icon'


export default [
  login,
  password,
  register,
  {
    tagName: 'footer',
    style: {
      marginTop: '20px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    child: [
      {
        tagName: 'span',
        text: 'ys1994 ©2020 Created by lin07'
      },
      {
        tagName: 'a',
        target: '_blank',
        href: 'https://github.com/digi1874/sso-web',
        style: {
          display: 'flex',
          marginLeft: '10px',
          fontSize: '24px',
          color: '#333'
        },
        child: iconGithub
      }
    ]
  }
]
