import * as types from '../constants/types';
export const fetch_data = ()=> async (dispatch,getState,api)=>{
  const res = await api.get('/index/index');
  dispatch({
    type: types.FETCH_DATA,
    payload: res
  });
};