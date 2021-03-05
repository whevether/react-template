import {combineReducers} from 'redux';
import home from './home';
import { connectRouter } from 'connected-react-router';
const rootReducer = (history) => combineReducers({
    home: home,
    router: connectRouter(history)
});
export default rootReducer;