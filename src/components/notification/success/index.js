import digi, { createData }  from 'digi'
import refs, { allotId }     from 'digi-refs'
import { iconCheck }         from '@/components/icon'
import { notificationRefID } from '../data'
import 'animate.css/source/bouncing_entrances/bounceInRight.css'
import 'animate.css/source/bouncing_exits/bounceOutRight.css'
import './index.scss'


export default message => {
  const refID = allotId()
  const data  = createData({ in: true })

  digi({
    ref: refID,
    child: [
      iconCheck,
      { text: message }
    ],
    className: [
      'notification-item',
      'notification-success',
      {
        'bounceInRight animated'  : data.$tp('in'),
        'bounceOutRight animated' : data.$tp('out'),
      }
    ],
    onanimationend: () => {
      !data.in && refs[refID].remove()
      data.in  = false
      data.out = false
    }
  }, refs[notificationRefID])

  setTimeout(() => {
    data.out = true
  }, 5000)
}
