import React,{Component,forwardRef} from 'react';
import {withAuthorization, AuthUserContext} from '../session'
import axios from 'axios'
import MatrialTable from 'material-table'


import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import { Grid } from '@material-ui/core';
import { Promise } from 'q';
import { resolve } from 'url';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            columns:[
                {title:'Name',field:'name'},
                {title:'Email',field:'email'},
                {title:'Contact',field:'contact'},
                {title:'Address',field:'address'},
                {title:'Organization',field:'organization_name'},
            ],
            users:[]
         }
    }

    componentDidMount(){
        console.log(this.props.user)
        axios.get("http://118.67.215.190:8880/api/users")
            .then(response=>{

                let users = response.data;
                //console.log(users)
                this.setState({users:users})
            })
    }

    updateUser =(newData,oldData,resolve)=>{
        console.log(newData)
        let id = newData._id
        axios.put("http://118.67.215.190:8880/api/users/"+id,newData)
        .then(response=>{
            console.log(response.data)
            let users = [...this.state.users]
            users[users.indexOf(oldData)] = newData;
            this.setState({ ...this.state, users });
            resolve()
        })
        .catch(err=>{
            console.log(err)
            resolve()
        })

    }


    render() { 
        return ( 
            <Grid container justify="center" style={{padding:20}}>

                    <Grid item md={10} sm={10}>
                    <MatrialTable
                        icons={tableIcons}
                        title="User List"
                        columns={this.state.columns}
                        data={this.state.users}

                        options={{actionsColumnIndex:-1}}

                        editable={{
                            onRowUpdate:(newData,oldData)=> {
                                return new Promise(resolve=>{
                                    this.updateUser(newData,oldData,resolve)
                                })
                            }
                                
                        }}

                        />
                    </Grid>
                
            </Grid>

         );
    }
}

const condition = authUser => authUser != null;
 
export default withAuthorization(condition)(HomePage);