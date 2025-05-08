import {combineReducers} from "redux";
import home from "./home.js";
const rootReducer = () => combineReducers({
    home: home
});
export default rootReducer;