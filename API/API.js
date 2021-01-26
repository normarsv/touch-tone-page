import { mainIp } from '../scripts/MainInfoData';
import RestClient from './RestClient';

export default class API extends RestClient {
  constructor(authToken, userId) {
    super(mainIp + '/api', {
      authToken: authToken,
      userId: userId,
      headers: {
        // Include as many custom headers as you need
        Authorization: 'Bearer ' + authToken,
      },
    });
    this.authToken = authToken;
    this.userId = userId;
  }

  getToken() {
    return this.authToken;
  }

  async doVerifyUserBulkImport(formDataUpload) {
    const url = mainIp + '/api/Tools/verify-csv';
    const res = await fetch(url, {
      method: 'POST',
      body: formDataUpload,
      headers: {
        Authorization: 'Bearer ' + this.authToken,
      },
    });
    const body = await res.json();
    console.log(res);
    return body;
  }

  async doUploadUserBulkImport(formDataUpload) {
    const url = mainIp + '/api/Tools/bulk-users';
    const res = await fetch(url, {
      method: 'POST',
      body: formDataUpload,
      headers: {
        Authorization: 'Bearer ' + this.authToken,
      },
    });
    const body = await res.json();
    return body;
  }

  async getCurrentUserMyFindMe() {
    const url = mainIp + '/api/Services/find-me';
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + this.authToken,
      },
    });
    const body = await res.json();
    return body;
  }
}
