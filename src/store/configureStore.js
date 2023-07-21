import prod from './configureStore.prod';
import dev from './configureStore.dev';
export const configureStore = (history,initialState)=>{
  if (process.env.NODE_ENV === 'production') {
    return prod(history,initialState);
  } else {
    return dev(history,initialState);
  }
};
