import { mainIp } from '../scripts/MainInfoData'
import RestClient from './RestClient'

export default class API extends RestClient {
  constructor(authToken, extraHeader) {
    super(mainIp + "/api", {
      headers: {
        // Include as many custom headers as you need
        Authorization: "Bearer " + authToken,
        ...extraHeader,
      },
    })
    this.authToken = authToken
  }

  getToken() {
    return this.authToken
  }

  doGetFrom(url, query) {
    return this.GET("/" + url, query)
  }

  doGetPassValueFrom(url, query) {
    return this.GETPASSVALUE("/" + url, query)
  }

  doPostFrom(url, body) {
    return this.POST("/" + url, body)
  }

  doPatchFrom(url, body) {
    return this.PATCH("/" + url, body)
  }

  doDeleteFrom(url, query) {
    return this.DELETE("/" + url, query)
  }

  doGetTable(dbModelName, dbRelationToInclude, dbFilterToSet = {}) {
    let filter = dbFilterToSet
    if (dbRelationToInclude !== undefined && dbRelationToInclude.length > 0) {
      filter.include = dbRelationToInclude
    }

    return this.GET("/" + dbModelName, filter)
  }

  doGetTableId(dbModelName, dbRelationToInclude, id, dbFilterToSet = {}) {
    let filter = dbFilterToSet
    if (dbRelationToInclude !== undefined && dbRelationToInclude.length > 0) {
      filter.include = dbRelationToInclude
    }
    return this.GET("/" + dbModelName + "/" + id, filter)
  }

  async doUploadFile(formDataUpload) {
    const res = await fetch(mainIp + "/api/files", {
      method: "POST",
      body: formDataUpload,
      headers: {
        Authorization: "Bearer " + this.authToken,
      },
    })
    const body = await res.json()
    return body
  }

  async doUploadContentForSection(sectionId, formDataUpload) {
    const url = mainIp + "/api/files/module_bunddle/" + sectionId
    const res = await fetch(url, {
      method: "POST",
      body: formDataUpload,
      headers: {
        Authorization: "Bearer " + this.authToken,
      },
    })
    const body = await res.json()
    return body
  }
}
