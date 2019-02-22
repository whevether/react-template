import * as types from 'constants/types';
export const fetch_data = ()=> async (dispatch,getState,api)=>{
  const res = await api.get('/movie/in_theaters');
  dispatch({
    type: types.FETCH_DATA,
    payload: res.data
  });
};