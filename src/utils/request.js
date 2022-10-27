import axios from 'axios';
export const request = (history) => {
  const axiosInstance = axios.create({
    baseURL: 'https://api.zytravel.shop/api'
  });
  axiosInstance.interceptors.request.use((config) => {
    return config;
  },(error) =>{
    return Promise.reject(error);
  });
  axiosInstance.interceptors.response.use((response)=>{
    if(response.status === 200 && (response.data.code === 200 || response.data.code === 0)){
      // history.push('/404');
      return response?.data?.data;
    }
  },(err)=>{
    const {response} = err;
    if([401,400,403].indexOf(response.status) > -1){
      alert('没有权限');
    }
    if([500].indexOf(response.status) > -1){
      alert('500,服务器错误');
    }
    if([404].indexOf(response.status) > -1){
      history.push('/404');
      alert('没有这个接口');
    }
    if(response.data){
      alert('接口错误');
    }
    return Promise.reject(err);
  });
  return axiosInstance;
};