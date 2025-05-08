import prod from "./configureStore.prod.js";
import dev from "./configureStore.dev.js";
export const configureStore = (initialState)=>{
  if (process.env.NODE_ENV === "production") {
    return prod(initialState);
  } else {
    return dev(initialState);
  }
};
