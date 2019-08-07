import React, { Component } from 'react';
import * as ROUTES from '../constant/router'
import { withFirebase } from '../firebase';
import {withRouter,Link} from 'react-router-dom'
import {SignUpLink} from '../signup'
import {compose} from 'recompose'
import {PasswordForgetLink} from '../password-forget'
import { TextField, Grid, Paper,Typography, Button } from '@material-ui/core';

const LoginPage = () => {
    return ( 
      <Grid container justify="center" style={{marginTop:20}}>

        <Grid item md={6} >

          <Paper>

            <Grid container spacing={3}  direction="column" style={{padding:10}}>
              <Grid item style={{textAlign:"center"}}>
                <Typography variant="h4">Sign In</Typography>
                <hr/>
              </Grid>

              <Grid item>
                <SignInForm />
              </Grid>

              <Grid item >
                <Grid container justify="space-between" style={{padding:10}}>
                  <PasswordForgetLink/>
                  <SignUpLink />
                </Grid>
                
              </Grid>
              
            </Grid>


          </Paper>

        

        </Grid>
      

      </Grid>
     );
}


const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
  };

class LoginBaseForm extends Component{

    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }
    

    onSubmit = event=>{
        const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
    }

    onChange= event=>{
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {
        const { email, password, error } = this.state;
    
        const isInvalid = password === '' || email === '';
    
        return (

          <Grid container
            direction="column"
            justify="flex-start"
            alignItems="stretch" >

            <TextField
                required
                label="Email"
                style={{margin:8}}
                variant="outlined"
                name="email"
                value = {email}
                onChange={this.onChange}/>

<TextField
                required
                label="Password"
                name="password"
                value = {password}
                onChange={this.onChange}
                style={{margin:8}}
                variant="outlined"
                type="password"
                InputLabelProps={{
                  shrink: true,
                }}/>

            <Button variant="contained" color="primary" disabled={isInvalid} onClick={this.onSubmit}> Sign In</Button>

            {error && <p>{error.message}</p>}


          </Grid>

        );
      }
}

const SignInForm = compose(withRouter,withFirebase) (LoginBaseForm)

const SignInLink = () => (
    <p style={{marginLeft:16}}>
      Already have an account? <Link to={ROUTES.SIGN_IN}>Sign In</Link>
    </p>
  );
 
export default LoginPage;

export {SignInForm,SignInLink}