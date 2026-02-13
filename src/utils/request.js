import axios from "axios";
import { removeCookie, getCookie } from "utils/storage";
import { router } from "router/app";
export const axiosInstance = axios.create({
  baseURL: "http://ip-api.com/json"
});
export const request = () => {
  axiosInstance.interceptors.request.use((config) => {
    const token = getCookie("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
  });
  axiosInstance.interceptors.response.use((response) => {
    if (response.status === 200) {
      return response?.data;
    }
  }, (err) => {
    const { response } = err;
    if ([400].indexOf(response.status) > -1) {
      alert("参数错误");
    }
    if ([401, 403].indexOf(response.status) > -1) {
      removeCookie(["token"]);
      router.navigate("/login", { replace: true });
      alert("没有权限");
    }
    if ([500].indexOf(response.status) > -1) {
      alert("500,服务器错误");
    }
    if ([404].indexOf(response.status) > -1) {
      alert("没有这个接口");
    }
    if (response.data) {
      alert("接口错误");
    }
    return Promise.reject(err);
  });
};