# 开放登录系统前端

这是一个开放式登录系统，可供给任何网站做登录用。

系统安全可靠，数据传输安全可靠，JWT验证安全可靠。使用非对称加密后发给数据，不怕传输数据被拦截，服务器临时生成密钥，任何人都没法查看密钥。JWT的密钥也是服务器运行时随机生成。

* [前端网站](https://login.ys1994.nl/)
* [后端接口项目](https://github.com/digi1874/sso-api)

### 使用者
* [影视1994](https://www.ys1994.nl/)

------------------------

## 构建
``` bash
# 安装依赖
$ yarn

# 开发，开启http://localhost:9021/
$ yarn serve

# 生成静态文件在dist文件夹
$ yarn build
```

------------------------

## 使用说明
第三方的网站登录注册链接指向 -> 开放登录系统链接 -> 用户在开放登录系统登录注册后 -> 带上JWT返回到第三方的网站 -> 第三方的网站后端拿到JWT -> 发JWT给开放登录系统验证接口 -> 通过验证 -> 第三方的网站后端存储JWT -> 以后自行验证有效时间即可

* 链接
  > 开放登录系统链接参数：https://login.ys1994.nl?title=网页标题&redirect=返回链接&bgImg=背景样式(style.backgroundImage)

  > 登录注册后跳转回链接：返回链接?(/&)jwt=payload.signature
  >> jwt 中的 payload 存储了用户id、ip地址、有效时间<br>
  >> jwt header 不返回，是因为对前端没有用，而且是个固定值。

  > 修改密码链接：https://login.ys1994.nl/password?signature=signature&title=网页标题&bgImg=背景样式(style.backgroundImage)

------------------------
