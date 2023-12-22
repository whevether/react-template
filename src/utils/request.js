import axios from 'axios';
import {removeCookie} from 'utils/storage'; 
export const axiosInstance = axios.create({
  baseURL: 'https://api.zytravel.shop/api'
});
export const request = (store) => {
  axiosInstance.interceptors.request.use((config) => {
    return config;
  },(error) =>{
    return Promise.reject(error);
  });
  axiosInstance.interceptors.response.use((response)=>{
    if(response.status === 200 && (response.data.code === 200 || response.data.code === 0)){
      return response?.data?.data;
    }
  },(err)=>{
    const {response} = err;
    if([400].indexOf(response.status) > -1){
      alert('参数错误');
    }
    if([401,403].indexOf(response.status) > -1){
      removeCookie(['token']);
      store.dispatch({
        type: 'LOGOUT',
        payload: true
      });
      alert('没有权限');
    }
    if([500].indexOf(response.status) > -1){
      alert('500,服务器错误');
    }
    if([404].indexOf(response.status) > -1){
      alert('没有这个接口');
    }
    if(response.data){
      alert('接口错误');
    }
    return Promise.reject(err);
  });
};