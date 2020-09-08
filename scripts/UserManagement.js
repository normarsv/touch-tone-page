import jsCookie from 'js-cookie'

import { nameSession } from './MainInfoData'

//Save app user in cookie
export const saveAppUser = data => {
  jsCookie.set(nameSession + "_data", data)
}

//Remove app user in cookie
export const removeAppUser = () => {
  jsCookie.remove(nameSession + "_data")
}
