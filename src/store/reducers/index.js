import {combineReducers} from 'redux';
import home from './home';
import {  } from "redux-first-history";
const rootReducer = (history) => combineReducers({
    home: home,
    router: history
});
export default rootReducer;