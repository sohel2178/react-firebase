import {combineReducers} from 'redux'
import userReducer from './user-reducer'
import devicesReducer from './device-reducer'


export default combineReducers({
    users:userReducer,
    devices:devicesReducer
})