import * as types from 'constants/types';
export const fetch_data = ()=> async (dispatch,getState,api)=>{
  const res = await api.get('/User/GetPubKey');
  dispatch({
    type: types.FETCH_DATA,
    payload: res
  });
};