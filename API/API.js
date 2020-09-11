import { mainIp } from '../scripts/MainInfoData';
import RestClient from './RestClient';

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
}
