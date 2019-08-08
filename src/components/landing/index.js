import React,{Component} from 'react';
import {Tabs,Tab} from '@material-ui/core'
import TabPanel from '../devices/tab-panel'

class LandingPage extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            value:0
         }
    }

    handleChange= (e,value)=>{
        this.setState({value:value})
    }

    a11yProps = (index)=>{
        return {
            id: 'simple-tab-$'+index,
            'aria-controls': 'simple-tabpanel-$'+index,
          };
    }
    render() { 
        return ( 
        <div>
            <Tabs value={this.state.value} onChange={this.handleChange} aria-label="simple tabs example" indicatorColor="primary"
        textColor="primary" centered>
        <Tab label="Item One" {...this.a11yProps(0)} />
        <Tab label="Item Two" {...this.a11yProps(1)} />
        <Tab label="Item Three" {...this.a11yProps(2)} />
      </Tabs> 

            <TabPanel value={this.state.value} index={0}>
            All
            </TabPanel>
            <TabPanel value={this.state.value} index={1}>
            Assigned
            </TabPanel>
            <TabPanel value={this.state.value} index={2}>
            UnAssigned
            </TabPanel>
        </div>
      
      );
    }
}



 
export default LandingPage;