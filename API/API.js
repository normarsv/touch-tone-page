import { mainIp } from "../scripts/MainInfoData";
import RestClient from "./RestClient";

export default class API extends RestClient {
  constructor(authToken, extraHeader) {
    super(mainIp + "/api", {
      headers: {
        // Include as many custom headers as you need
        Authorization: "Bearer " + authToken,
        ...extraHeader,
      },
    });
    this.authToken = authToken;
  }

  getToken() {
    return this.authToken;
  }

  doGetFrom(url, query) {
    return this.GET("/" + url, query);
  }

  doGetPassValueFrom(url, query) {
    return this.GETPASSVALUE("/" + url, query);
  }

  doPostFrom(url, body) {
    return this.POST("/" + url, body);
  }

  doPatchFrom(url, body) {
    return this.PATCH("/" + url, body);
  }

  doDeleteFrom(url, query) {
    return this.DELETE("/" + url, query);
  }
}
