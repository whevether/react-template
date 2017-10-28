import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import home from './home';
const rootReducer = combineReducers({
    home: home,
    router: routerReducer // react-router-redux 钩子
});
export default rootReducer;