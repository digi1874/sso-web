import { createData, cloneDeep, isUndefined, isObject, isArray } from 'digi'

export class Base {
  data      = createData()
  className = []
  child     = []

  constructor (params = {}) {
    if (!isUndefined(params) && !isObject(params)) {
      params = {}
    }

    this.init(params)
  }

  init (params) {
    // 深拷贝，因为下面的操作会更改params原数据
    params = cloneDeep(params)

    this.handleClassName(params)
    this.handleChild(params)

    this.tagName = params.tagName
    delete params.tagName

    this.params = params
  }

  handleClassName (params) {
    if (!isUndefined(params.class)) {
      this.className.push(params.class)
      delete params.class
    }

    if (!isUndefined(params.className)) {
      if (isArray(params.className)) {
        this.className = [
          ...this.className,
          ...params.className
        ]
      } else {
        this.className.push(params.className)
      }
      delete params.className
    }
  }

  handleChild (params) {
    if (!isUndefined(params.child)) {
      if (isArray(params.child)) {
        this.child = params.child
      } else {
        this.child.push(params.child)
      }
      delete params.child
    }
  }
}

export default Base
