import { notificationRefID } from './data'
import error                 from './error'
import success               from './success'
import './index.scss'

class Notification {
  ref       = notificationRefID
  className = 'notification'
  constructor () {}
  error (message) {
    error(message)
  }
  success (message) {
    success(message)
  }
}

export const notification = new Notification()
