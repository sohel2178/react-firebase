import React from 'react';

import {PasswordForgetForm} from '../password-forget'
import PasswordChangeForm from '../password-change'

import {withAuthorization,AuthUserContext} from '../session'

const AccountPage = () => {
    return ( 
        <AuthUserContext.Consumer>
            {authUser=><div>
    <h1>Account Page</h1>
    <h1>Account: {authUser.email}</h1>
    <PasswordForgetForm />
    <PasswordChangeForm />
  </div>}
        </AuthUserContext.Consumer>
     );
}

const condition = authUser => authUser != null;
 
export default withAuthorization(condition)(AccountPage);