import {combineReducers} from 'redux';
import home from './home';
const rootReducer = () => combineReducers({
    home: home
});
export default rootReducer;