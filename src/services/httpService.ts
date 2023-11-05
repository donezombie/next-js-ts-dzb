import axios, { AxiosInstance } from 'axios';
import { parseAuthFromCookie } from "helpers/common";

class HttpService {
  axios: AxiosInstance;

  constructor() {
    this.axios = axios.create();

    this.axios.interceptors.request.use(
      (config) => {
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  attachTokenToHeader() {
    const token = parseAuthFromCookie().token;
    this.axios.interceptors.request.use(
      function (config) {
        // Do something before request is sent
        config.headers['Authorization'] = token;
        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );
  }
}

const httpService = new HttpService();
export default httpService;
