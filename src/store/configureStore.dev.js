import { createStore, compose, applyMiddleware } from "redux";
import { withExtraArgument } from "redux-thunk";
import rootReducer from "./reducers/index.js";
import { request, axiosInstance } from "utils/request";
export default function configureStore(initialState) {
  const middlewares = [
    withExtraArgument(axiosInstance),
  ];
  const store = createStore(rootReducer(), initialState, compose(applyMiddleware(...middlewares),),);
  if (typeof __BUILD_TYPE__ !== "undefined" && __BUILD_TYPE__) {
    const { webpackHot } = import.meta;
    if (webpackHot) {
      webpackHot?.accept("./reducers", () => {
        // const nextReducer = require("./reducers").default;  
        store.replaceReducer(rootReducer());
      });
    }

  } else {
    const { hot } = import.meta;
    if (hot) {
      // Enable Webpack hot module replacement for reducers
      hot?.accept("./reducers", () => {
        // const nextReducer = require("./reducers").default;  
        store.replaceReducer(rootReducer());
      });
    }
  }


  request();
  return {
    store
  };
}