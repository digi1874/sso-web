import { createData } from 'digi'
import digiRouter     from  'digi-router'

export const redirect = createData()
export const getRedirect = () => {
  const { params }   = digiRouter.currentLocation
  const redirectHref = params.redirect && decodeURIComponent(params.redirect) || 'https://www.ys1994.nl'

  if (redirect.href === redirectHref) return redirect.location

  redirect.href     = redirectHref
  redirect.location = new digiRouter.Location({ href: redirectHref })
}
