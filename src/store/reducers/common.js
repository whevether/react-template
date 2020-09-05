import * as types from 'constants/types';
// 初始数据
let initData = {
  data: null,
  hidden: false
};
// 获取主页数据
export default function getHomeData(state=initData,action){
  switch(action.type){
    case types.FETCH_DATA:
      if(action.payload){
        return {...state,data:action.payload};
      }
      break;
    default: 
      return state;
  }
}

