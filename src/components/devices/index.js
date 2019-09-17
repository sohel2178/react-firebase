import React, {Component} from 'react';
import axios from 'axios';

import {Tabs,Tab} from '@material-ui/core'
import TabPanel from './tab-panel'
import {connect} from 'react-redux'

import {fetchAllDevices,updateDevice,deleteDevice,addDevice,assignDevice,unAssignDevice} from '../../actions'

class DevicePage extends Component {
  constructor (props) {
    super (props);
    this.state = {
      open: false,
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
    if(this.props.devices.length===0){
      this.props.getAllDevices();
    }
  }



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
          data={this.props.devices} 
          updateDevice={this.props.updateDevice}
          deleteDevice={this.props.deleteDevice}
          handleSubmit={this.props.addDevice}
          assignDevice={ this.props.assignDevice}
          unAssignDevice={this.props.unAssignDevice}>
          All
        </TabPanel>

        <TabPanel value={this.state.value} index={1} 
        data={this.props.devices.filter(device=>device.uid!=null)}
        updateDevice={this.props.updateDevice}
        deleteDevice={this.props.deleteDevice}
        handleSubmit={this.props.addDevice}
        assignDevice={ this.props.assignDevice}
          unAssignDevice={this.props.unAssignDevice}>
          ASSIGNED
        </TabPanel>
        <TabPanel value={this.state.value} index={2} 
          data={this.props.devices.filter(device=>device.uid==null)}
          updateDevice={this.props.updateDevice}
          deleteDevice={this.props.deleteDevice}
          handleSubmit={this.props.addDevice}
          assignDevice={ this.props.assignDevice}
          unAssignDevice={this.props.unAssignDevice}
        >
          UN-ASSIGNED
        </TabPanel>
        </div>
    )
  }
}

const mapStateToProps = (state)=>{
  return {
    ...state
  }
}

const mapDispatchToProps = (dispatch)=>{
  return{
    getAllDevices:()=>dispatch(fetchAllDevices()),
    updateDevice:(newData, oldData, resolve)=>dispatch(updateDevice(newData, oldData, resolve)),
    deleteDevice:(oldData,resolve)=>dispatch(deleteDevice(oldData,resolve)),
    addDevice:(newData,resolve)=>dispatch(addDevice(newData,resolve)),
    assignDevice:(oldData,data,resolve)=>dispatch(assignDevice(oldData,data,resolve)),
    unAssignDevice:(device)=> dispatch(unAssignDevice(device))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(DevicePage);
