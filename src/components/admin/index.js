import React from 'react';
import {withAuthorization} from '../session'
import * as ROLES from '../constant/roles'


const AdminPage = () => {
    return ( <h2>Admin Page</h2> );
}

const condition = authUser =>
  authUser && authUser.email ==='sohel.ahmed2178@gmail.com';
 
export default withAuthorization(condition)(AdminPage);