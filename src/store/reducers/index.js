import {combineReducers} from 'redux';
import home from './home';
const rootReducer = (history) => combineReducers({
    home: home,
    router: history
});
export default rootReducer;