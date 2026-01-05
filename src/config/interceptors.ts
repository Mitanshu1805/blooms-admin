import axios from "axios";

const Api = axios.create({
  // baseURL: "https://api.blooms.sg/api/",
  // baseURL: 'http://192.168.23.7:3002/api/',
  // baseURL: "http://192.168.23.23:3002/api/",
  // baseURL: "http://0.0.0.0:3000/api/",
  // baseURL: "http://192.168.23.23:3002/api/",
  // baseURL: "https://dev.api.blooms.sg/api/",
  // baseURL: "https://dev.admin.blooms.sg/api/",
  baseURL: "http://192.168.23.8:3002/api/",
  // baseURL: "http://192.168.23.16:3002/api/",
});

Api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

Api.interceptors.response.use(
  (response: any) => response,
  (error: any) => {
    if (error.response) {
      if (error.response.status === 403) {
        return Promise.reject(error.response);
      } else {
        return Promise.reject(error.response);
      }
    }
    return Promise.reject(error);
  }
);

export default Api;
