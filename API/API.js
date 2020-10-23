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
    this.extraHeader = extraHeader;
  }

  getToken() {
    return this.authToken;
  }

  async doVerifyUserBulkImport(formDataUpload) {
    const url = mainIp + "/api/Tools/verify-csv";
    const res = await fetch(url, {
      method: "POST",
      body: formDataUpload,
      headers: {
        Authorization: "Bearer " + this.authToken,
        // ...this.extraHeader,
      },
    });
    const body = await res.json();
    return body;
  }

  async doUploadUserBulkImport(formDataUpload) {
    const url = mainIp + "/api/Tools/bulk-users";
    const res = await fetch(url, {
      method: "POST",
      body: formDataUpload,
      headers: {
        Authorization: "Bearer " + this.authToken,
        ...this.extraHeader,
      },
    });
    const body = await res.json();
    return body;
  }
}
