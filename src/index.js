import digi                      from 'digi'
import className                 from 'digi-classname'
import digiRouter                from 'digi-router'
import refs                      from 'digi-refs'
import pages                     from '@/pages'
import errorPage                 from '@/pages/error'
import { fetchRsaPubKey }        from '@/data'
import { notification, loading } from '@/components'
import 'animate.css/source/_base.css'
import 'animate.css/source/_vars.css'
import './index.scss'

const { params } = digiRouter.currentLocation
const title = params.title && decodeURIComponent(params.title)
const bgImg = params.bgImg && decodeURIComponent(params.bgImg)
document.body.style.backgroundImage = bgImg
if (title) {
  document.title = title
}

digi.plugins([ ...digiRouter, className, refs ])
digi([ notification, loading, errorPage ])

fetchRsaPubKey().then(() => {
  digi([
    {
      tagName: 'h1',
      className: 'app-title',
      text: title,
      style: {
        display: !title && 'none',
        color: bgImg && '#fff'
      }
    },
    ...pages
  ])
})
