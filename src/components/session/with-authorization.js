import React from 'react';
import * as ROUTES from '../constant/router'
import {withRouter} from 'react-router-dom'
import {withFirebase} from '../firebase'
import {compose} from 'recompose'
import AuthUserContext from './context'

const withAuthorization =(condition)=> Component=>{

    class WithAuthorization extends React.Component{

        componentDidMount(){
            this.props.firebase.auth.onAuthStateChanged(authUser=>{
                if(!condition(authUser)){
                    this.props.history.push(ROUTES.SIGN_IN)
                }
            })
        }

        render(){
            return(
                <AuthUserContext.Consumer>
                    {authUser=>authUser?<Component {...this.props}/>:null}
                </AuthUserContext.Consumer>
            )
            
            
        }
    }

    return compose(withRouter,withFirebase) (WithAuthorization)
}

export default withAuthorization;