import * as types from 'constants/types';
// 初始数据
let initData = {
  data: null,
  logout: false
};
export default function home(state = initData, action) {
  switch (action.type) {
    case types.FETCH_DATA:
      if (action.payload) {
        return { ...state, data: action.payload };
      }
      break;
    case types.LOGOUT:
      return { ...state, logout: action?.payload };
    default:
      return state;
  }
}