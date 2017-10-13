import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
const rootReducer = combineReducers({
    router: routerReducer // react-router-redux 钩子
});
export default rootReducer;