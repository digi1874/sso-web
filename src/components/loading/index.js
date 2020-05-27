import { createData } from 'digi'

const data = createData()
let count  = 0
const shapes = []

for (let i = 1; i < 5; i ++) {
  shapes.push({
    className: 'shape shape' + i
  })
}

class Loading {
  id = 'loading'
  style = {
    display: data.$tp('display')
  }
  child = {
    className: 'container',
    child: shapes
  }

  constructor (visible) {
    visible !== false ? this.show() : this.hide()
  }

  show () {
    count ++
    data.display = ''
  }

  hide () {
    count --
    if (count <= 0) {
      count = 0
      data.display = 'none'
    }
  }
}

export const loading = new Loading(false)
