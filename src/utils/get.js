import { forEach, pathSplit, isArray } from 'digi'

export const get = (object, path) => {
  let result = object
  if (!result) return result

  if (!isArray(path)) {
    path = pathSplit(path)
  }

  forEach(path, key => {
    result = result[key]
    return !!result
  })

  return result
}
