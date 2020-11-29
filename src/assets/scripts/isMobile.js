import { breakpoints } from './variables'

export default () => {
  if (window.innerWidth < breakpoints.wd) return true
  if (window.innerHeight < breakpoints.hg) return true

  return false
}
