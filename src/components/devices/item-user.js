import React, { Fragment } from 'react';
import {ListItem, ListItemAvatar, Avatar, ListItemText, Divider} from '@material-ui/core';


const UserItem = ({user,itemClick}) => {
    return ( 
        <Fragment>
            <ListItem button
            onClick={()=>itemClick(user)}>
            <ListItemAvatar>
                <Avatar
                alt={user.name}
                src={user.image}
                />
            </ListItemAvatar>

            <ListItemText
            primary={user.name}
            secondary={user.address}
            />
        </ListItem>
        <Divider variant="inset" component="li"/>
        </Fragment>
     );
}
 
export default UserItem;