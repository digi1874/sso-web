/*
* @Author: lin.zhenhui
* @Date: 2020-03-09 12:31:52
 * @Last Modified by: lin.zhenhui
 * @Last Modified time: 2020-03-14 23:59:54
*/

import { forEach, isFunction, isUndefined, set, isNumber } from 'digi'
import Base from '../base'
import './index.scss'

const inputParams = ['value', 'placeholder', 'disabled', 'type', 'autocomplete']

export class Input extends Base {
  tagName = 'span'

  constructor (params) {
    // data 做双向绑定用，Base深拷贝会更改params.data，所以在这备一份
    const pData = params.data
    delete params.data

    super(params)
    params = this.params

    // 做双向绑定
    !isUndefined(pData) && isFunction(pData.$tp) && !isUndefined(params.value) && this.bind(pData)

    if (params.disabled) {
      this.data.disabled = true
    }

    this.className = [
      'input-wrapper',
      {
        'input-error': this.data.$tp('error'),
        'disabled': this.data.$tp('disabled')
      },
      ...this.className
    ]

    const { prefix, suffix } = params
    delete params.prefix
    delete params.suffix

    !isUndefined(prefix) && this.pushFix(prefix, 'prefix')
    this.pushInput()
    !isUndefined(suffix) && this.pushFix(suffix, 'suffix')
    this.errorInfo()

    forEach(params, (value, key) => {
      this[key] = value
    })

    delete this.params
  }

  bind (pData) {
    const { params } = this
    if (params.value.replace(/.+([0-9]+).+/, '$1') === pData.$tp('').replace(/.+([0-9]+).+/, '$1')) {
      const path    = params.value.replace(/^{{.+?\.(.+)}}$/, '$1')
      const onkeyup = params.onkeyup
      params.onkeyup = e => {
        set(pData, path, e.target.value)
        this.data.value = e.target.value
        this.validate(pData)
        onkeyup && onkeyup(e)
      }
    }
  }

  pushFix (child, fix) {
    this.child.push({
      tagName: 'span',
      class: `input-${fix}`,
      child
    })
  }

  pushInput () {
    const input = {}
    forEach(this.params, (value, key) => {
      if (isFunction(value) || inputParams.indexOf(key) !== -1) {
        input[key] = value
        delete this.params[key]
      }
    })
    this.child.push({
      ...input,
      tagName: 'input',
      class: 'input'
    })
  }

  errorInfo () {
    this.child.push({
      tagName: 'span',
      className: 'input-error-info',
      text: this.data.$tp('error')
    })
  }

  validate (pData = {}) {
    this.data.error = ''
    forEach(this.rules, rule => {
      if (rule.required && !this.data.value ) {
        this.data.error = rule.message
      } else if (rule.max) {
        if (isNumber(this.data.value) && rule.max < this.data.value || rule.max < this.data.value.length) {
          this.data.error = rule.message
        }
      } else if (rule.min) {
        if (isNumber(this.data.value) && rule.min > this.data.value || rule.min > this.data.value.length) {
          this.data.error = rule.message
        }
      } else if (rule.eq && this.data.value !== pData[rule.eq]) {
        this.data.error = rule.message
      } else if (rule.different && this.data.value === pData[rule.different]) {
        this.data.error = rule.message
      } else if (rule.RE && !rule.RE.test(this.data.value)) {
        this.data.error = rule.message
      }
      return !this.data.error
    })
    return this.data.error
  }
}
