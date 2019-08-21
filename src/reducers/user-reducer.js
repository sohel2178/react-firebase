
import {FETCH_USERS,UPDATE_USER} from '../actions/types'

const userReducer = (state=[],action)=>{

    if(action.type===FETCH_USERS){
        return action.payload;
    }else if(action.type===UPDATE_USER){
        let users = [...state]
        users[users.indexOf (action.payload.oldData)] = action.payload.newData;
        return users;
    }
    else{
        return state;
    }
}

export default userReducer;