import userReducer from './user';
import { combineReducers } from 'redux';

const reducer = combineReducers({
    user:userReducer
})

export default reducer;