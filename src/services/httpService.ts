import axios, { AxiosInstance } from 'axios';

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
}

const httpService = new HttpService();
export default httpService;
