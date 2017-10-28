import * as types from '../constants/types';
// 初始数据
let initData = {
  indexData: null
};
export default function home(state=initData,action){
  switch(action.type){
    case types.FETCH_DATA:
      if(action.payload){
        return Object.assign(...state,{indexData:action.payload.data.data});
      }
      break;
    default: 
      return state;
  }
}