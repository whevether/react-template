import Cookies from 'js-cookie';
/**
 * 
 */
export const isGranted = (permission)=>{
  let mock = ['dash','redbull','snacks','keep','snacks.one','snacks.two'];
  // console.log(permission);
  // console.log(mock.indexOf(permission) !== -1);
  return mock.indexOf(permission) !== -1;
};

/*
获取/设置cookie/移除coolkie
*/
export const getCookie = (name)=>{
  try{
    if (typeof name === 'string') {
      return Cookies.get(name);
    }
  }catch(err){
    alert('获取cookie失败');
  }
};
//设置cookie
export const setCookie = (name, value, domain='localhost')=>{
  try{
    if(typeof name === 'string' && value){
      return Cookies.set(name,value,{path: '/', domain: domain});
    }
  }catch(err){
    alert('设置cookie失败');
  }
};
// 移除 cookie
export const removeCookie = (arr, domain='localhost')=>{
  try{
    if (Array.isArray(arr)) {
      for(let value of arr.values()){
        Cookies.remove(value,{domain: domain});
      }
    }
  }catch(err){
    alert('删除cookie失败');
  }
};