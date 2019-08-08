import React, {Component} from 'react';
import axios from 'axios';

import {Tabs,Tab} from '@material-ui/core'
import TabPanel from './tab-panel'

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
      value:0
    };
  }

  handleTabChange= (e,value)=>{
    this.setState({value:value})
  }


  a11yProps = (index)=>{
      return {
          id: 'simple-tab-$'+index,
          'aria-controls': 'simple-tabpanel-$'+index,
        };
  }

  componentDidMount (){
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

  

  handleSubmit = newData => {
    let devices = this.state.devices;
    devices.push (newData);
    this.setState ({devices, devices});
  };

  

  render () {
    return (
      <div>
        <Tabs value={this.state.value} onChange={this.handleTabChange} aria-label="simple tabs example" indicatorColor="primary"
        textColor="primary" centered>
        <Tab label="ALL" {...this.a11yProps(0)} />
        <Tab label="ASSIGNED" {...this.a11yProps(1)} />
        <Tab label="UN-ASSIGNED" {...this.a11yProps(2)} />
      </Tabs> 

        <TabPanel value={this.state.value} index={0} 
          data={this.state.devices} 
          updateDevice={this.updateDevice}
          deleteDevice={this.deleteDevice}
          handleSubmit={this.handleSubmit}>
          All
        </TabPanel>

        <TabPanel value={this.state.value} index={1} 
        data={this.state.devices.filter(device=>device.uid!=null)}
        updateDevice={this.updateDevice}
        deleteDevice={this.deleteDevice}
        handleSubmit={this.handleSubmit}>
          ASSIGNED
        </TabPanel>
        <TabPanel value={this.state.value} index={2} 
          data={this.state.devices.filter(device=>device.uid==null)}
          updateDevice={this.updateDevice}
          deleteDevice={this.deleteDevice}
          handleSubmit={this.handleSubmit}
        >
          UN-ASSIGNED
        </TabPanel>
        </div>
    )
  }
}

export default DevicePage;
