import React, {Component} from 'react';
import {withAuthorization, AuthUserContext} from '../session';
import axios from 'axios';
import MatrialTable from 'material-table';
import {DataTableContext} from '../data-table';
import {Grid} from '@material-ui/core';

class HomePage extends Component {
  constructor (props) {
    super (props);
    this.state = {
      columns: [
        {title: 'Name', field: 'name'},
        {title: 'Email', field: 'email'},
        {title: 'Contact', field: 'contact'},
        {title: 'Address', field: 'address'},
        {title: 'Organization', field: 'organization_name'},
      ],
      users: [],
    };
  }

  componentDidMount () {
    console.log (this.props.user);
    axios.get ('http://118.67.215.190:8880/api/users').then (response => {
      let users = response.data;
      //console.log(users)
      this.setState ({users: users});
    });
  }

  updateUser = (newData, oldData, resolve) => {
    console.log (newData);
    let id = newData._id;
    axios
      .put ('http://118.67.215.190:8880/api/users/' + id, newData)
      .then (response => {
        console.log (response.data);
        let users = [...this.state.users];
        users[users.indexOf (oldData)] = newData;
        this.setState ({...this.state, users});
        resolve ();
      })
      .catch (err => {
        console.log (err);
        resolve ();
      });
  };

  render () {
    return (
      <DataTableContext.Consumer>
        {tableIcons => (
          <Grid container justify="center" style={{padding: 20}}>
            <Grid item md={10} sm={10}>
              <MatrialTable
                icons={tableIcons}
                title="User List"
                columns={this.state.columns}
                data={this.state.users}
                options={{actionsColumnIndex: -1}}
                editable={{
                  onRowUpdate: (newData, oldData) => {
                    return new Promise (resolve => {
                      this.updateUser (newData, oldData, resolve);
                    });
                  },
                }}
              />
            </Grid>

          </Grid>
        )}
      </DataTableContext.Consumer>
    );
  }
}

const condition = authUser => authUser != null;

export default withAuthorization (condition) (HomePage);
