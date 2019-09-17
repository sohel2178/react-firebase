import {combineReducers} from 'redux'
import userReducer from './user-reducer'
import devicesReducer from './device-reducer'
import user from './user'


export default combineReducers({
    users:userReducer,
    devices:devicesReducer,
    user:user
})