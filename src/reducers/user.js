import {GET_USER} from '../actions/types'

const user = (state=null,action)=>{
    if(action.type===GET_USER){
        return action.payload
    }else{
        return state;
    }
}

export default user;