import prod from "./configureStore.prod";
import dev from "./configureStore.dev";
export const configureStore = (initialState)=>{
  if (process.env.NODE_ENV === "production") {
    return prod(initialState);
  } else {
    return dev(initialState);
  }
};
