import dev from './configureStore.prod';
import prod from './configureStore.dev';
export const configureStore = (history,initialState)=>{
  if (process.env.NODE_ENV === 'production') {
    return prod(history,initialState);
  } else {
    return dev(history,initialState);
  }
};
