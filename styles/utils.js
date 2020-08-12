import * as vars from '!!./_variables.js!./_variables.less'

export const variables = vars

export const getVar = varName => {
  return vars["@" + varName]
}
