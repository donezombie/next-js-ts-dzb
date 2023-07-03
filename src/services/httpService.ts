import axios, { AxiosInstance } from "axios";

class HttpService {
  axios: AxiosInstance;

  constructor() {
    this.axios = axios.create();
  }

  attachTokenToHeader(token: string) {
    this.axios.interceptors.request.use(
      (config) => {
        //: TODO - Add token to header request
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }
}

const httpService = new HttpService();
export default httpService;
