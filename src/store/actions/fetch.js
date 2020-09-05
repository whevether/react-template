import * as types from 'constants/types';
export const fetchPublicKey = ()=> async (dispatch,getState,api)=>{
  const res = await api.get('/user/getPubKey');
  dispatch({
    type: types.FETCH_DATA,
    payload: res
  });
};