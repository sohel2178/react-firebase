import React, {Component} from 'react';
import axios from 'axios';
import {Grid} from '@material-ui/core';
import MaterialTable from 'material-table';
import {DataTableContext} from '../data-table';
import {Promise} from 'q';
import DeviceForm from './device-form';

class DevicePage extends Component {
  constructor (props) {
    super (props);
    this.state = {
      open: false,
      devices: [],
      columns: [
        {title: 'IMEI', field: 'imei'},
        {title: 'Reg No', field: 'registration_number'},
        {title: 'Center Number', field: 'center_number'},
      ],
    };
  }

  componentDidMount () {
    axios
      .get ('http://118.67.215.190:8880/api/devices')
      .then (response => this.setState ({devices: response.data}))
      .catch (err => console.log (err));
  }

  updateDevice = (newData, oldData, resolve) => {
    let imei = newData.imei;

    axios
      .put ('http://118.67.215.190:8880/api/devices/' + imei, newData)
      .then (response => {
        let devices = [...this.state.devices];
        devices[devices.indexOf (oldData)] = newData;
        this.setState ({...this.state, devices});
        resolve ();
      })
      .catch (err => resolve ());
  };

  deleteDevice = (oldData, resolve) => {
    axios
      .delete ('http://118.67.215.190:8880/api/devices/' + oldData.imei)
      .then (response => {
        let devices = [...this.state.devices].filter (
          value => value.imei !== oldData.imei
        );
        this.setState ({...this.state, devices});
        resolve ();
      })
      .catch (err => resolve ());
  };

  addDevice = (newData, resolve) => {
    axios
      .post ("'http://118.67.215.190:8880/api/devices", newData)
      .then (response => {
        let devices = [...this.state.devices].push (newData);
        this.setState ({...this.state, devices});
        resolve ();
      })
      .catch (err => resolve ());
  };

  handleClose = () => {
    this.setState ({open: false});
  };

  handleSubmit = newData => {
    let devices = this.state.devices;
    devices.push (newData);
    this.setState ({devices, devices});
    this.handleClose ();
  };

  openDialog = () => {
    this.setState ({open: true});
  };

  render () {
    return (
      <Grid container justify="center">
        <Grid item md={10} style={{padding: 20}}>

          <DataTableContext.Consumer>
            {icons => (
              <MaterialTable
                title="Device List"
                icons={icons}
                columns={this.state.columns}
                data={this.state.devices}
                options={{actionsColumnIndex: -1}}
                actions={[
                  {
                    icon: icons.Add,
                    tooltip: 'Add User',
                    isFreeAction: true,
                    onClick: event => this.openDialog (),
                  },
                ]}
                editable={{
                  onRowUpdate: (newData, oldData) => {
                    return new Promise (resolve => {
                      this.updateDevice (newData, oldData, resolve);
                    });
                  },
                  onRowDelete: oldData => {
                    return new Promise (resolve => {
                      this.deleteDevice (oldData, resolve);
                    });
                  },
                }}
              />
            )}
          </DataTableContext.Consumer>

        </Grid>

        <DeviceForm
          open={this.state.open}
          handleClose={this.handleClose}
          handleSubmit={this.handleSubmit}
        />

      </Grid>
    );
  }
}

export default DevicePage;
