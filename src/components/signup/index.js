import React, { Component } from 'react';
import {Link,withRouter} from 'react-router-dom'
import * as ROUTES from '../constant/router'
import {withFirebase} from '../firebase'
import { SignInLink } from '../login';
import {compose} from 'recompose'
import { Grid,Paper, Button ,TextField} from '@material-ui/core';

const SignupPage = () => {
    return (

      <Grid container justify="center">

        <Grid md={6} item>
          <Paper>

            <Grid container direction="column" style={{padding:16}}>

              <h1 style={{textAlign:"center"}}>Sign Up</h1>
                  <SignUpForm/>
                  <SignInLink/>

            </Grid>

          </Paper>
            
        </Grid>

      </Grid>
        
     );
}

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
  };

class SignUpFormBase extends Component{
    constructor(props){
        super(props)
        this.state = {...INITIAL_STATE}
    }

    onSubmit = event=>{
        event.preventDefault();

        const { username, email, passwordOne } = this.state;

        // console.log(this.props.firebase.createUserWithEmailAndPassword)

        this.props.firebase
            .createUserWithEmailAndPassword(email,passwordOne)
          .then(authUser => {
            this.setState({ ...INITIAL_STATE });
            this.props.history.push(ROUTES.HOME)
          })
          .catch(error => {
            this.setState({ error });
          });
    
       

    }

    onChange = event=>{
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {
        const {
            username,
            email,
            passwordOne,
            passwordTwo,
            error,
          } = this.state;

        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            email === '' ||
            username === '';
        return (

          <Grid container direction="column" justify="flex-start"
          alignItems="stretch" style={{padding:16}}>

          <TextField
              required
              label="Email"
              style={{margin:8}}
              variant="outlined"
              name="username"
              value={username}
              onChange={this.onChange}
              type="text"/>
            <TextField
                required
                label="Email"
                style={{margin:8}}
                variant="outlined"
                name="email"
                type="email"
                value = {email}
                onChange={this.onChange}/>

<TextField
                required
                label="Password One"
                style={{margin:8}}
                variant="outlined"
                name="passwordOne"
                type="password"
                value = {passwordOne}
                onChange={this.onChange}/>

<TextField
                required
                label="Password Two"
                style={{margin:8}}
                variant="outlined"
                name="passwordTwo"
                type="password"
                value = {passwordTwo}
                onChange={this.onChange}/>

                <Button onClick={this.onSubmit} variant="contained" color="primary">Sign Up</Button>


{error && <p>{error.message}</p>}
          </Grid>
        );
      }


}

const SignUpForm = compose(withRouter,withFirebase) (SignUpFormBase)

const SignUpLink = () => (
    <p>
      Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
    </p>
  );
 
export default SignupPage;

export {SignUpForm,SignUpLink}