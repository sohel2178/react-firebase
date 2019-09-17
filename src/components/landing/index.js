import React,{Component} from 'react';
import {Tabs,Tab} from '@material-ui/core'
import TabPanel from '../devices/tab-panel'
import UserDevice from './user-device';
// import {connect} from 'react-redux'
// import {getUser} from '../../actions'

class LandingPage extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            value:0
         }
    }




    componentDidMount(){

        // if(!this.props.user){
        //     this.props.firebase.auth.onAuthStateChanged(authUser=>{
        //         if(authUser){
        //             this.props.getUser(authUser.email)
        //             console.log(this.props.user)
        //         }else{

        //         }
        //     })
        // }
        
    }

    componentWillReceiveProps(){
        
    }

    componentWillMount(){
       
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
        console.log(this.props.user,"In Render")

    //    if(this.props.user){
    //        this.props.firebase.devices(this.props.user._id).on('value',snapshot=>console.log(snapshot.val()))
    //    }
        
        
        return ( 
           <div>
               {this.props.user?<UserDevice user={this.props.user} firebase={this.props.firebase}/>:null}
           </div>
    //     <div>
    //         <Tabs value={this.state.value} onChange={this.handleChange} aria-label="simple tabs example" indicatorColor="primary"
    //     textColor="primary" centered>
    //     <Tab label="Item One" {...this.a11yProps(0)} />
    //     <Tab label="Item Two" {...this.a11yProps(1)} />
    //     <Tab label="Item Three" {...this.a11yProps(2)} />
    //   </Tabs> 

    //         <TabPanel value={this.state.value} index={0}>
    //         All
    //         </TabPanel>
    //         <TabPanel value={this.state.value} index={1}>
    //         Assigned
    //         </TabPanel>
    //         <TabPanel value={this.state.value} index={2}>
    //         UnAssigned
    //         </TabPanel>
    //     </div>
      
      );
    }
}


// const mapStateToProps = state=>{
//     return{
//         ...state
//     }
// }

// const mapDispatchToProps=(dispatch)=>{
//     return{
//         getUser:email=>dispatch(getUser(email))
//     }
// }



 
export default LandingPage;