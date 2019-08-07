import React  from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom'
import * as ROUTES from './components/constant/router'
import Navigation from './components/navigation'
import LangingPage from './components/landing'
import SignUpPage from './components/signup'
import LoginPage from './components/login'
import PasswordForgetPage from './components/password-forget'
import HomePage from './components/home'
import AccountPage from './components/account'
import AdminPage from './components/admin'
import './App.css';
import {withAuthentication} from './components/session'

// class App extends Component {

//   constructor(props) {
//     super(props);

//     this.state = {
//       authUser: null,
//     };
//   }

//   componentWillMount(){
    
//   }

//   componentDidMount(){
//      this.props.firebase.auth.onAuthStateChanged(authUser => {
//        //console.log(authUser)
//       authUser
//         ? this.setState({ authUser })
//         : this.setState({ authUser: null });
//     });
//   }

//   render() { 

//     return ( 
//       <AuthUserContext.Provider value={this.state.authUser}>
//         <Router>
//           <div>
//             <Navigation />

//             <hr />

//             <Route exact path={ROUTES.LANDING} component={LangingPage} />
//             <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
//             <Route path={ROUTES.SIGN_IN} component={LoginPage} />
//             <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
//             <Route path={ROUTES.HOME} component={HomePage} />
//             <Route path={ROUTES.ACCOUNT} component={AccountPage} />
//             <Route path={ROUTES.ADMIN} component={AdminPage} />
//           </div>
//         </Router>
//       </AuthUserContext.Provider>
//      );
//   }
// }

const App = (props) =>{
  console.log("HHHH",props.user)

  return (
  
    <Router>
      <div>
        <Navigation user={props.user} />
  
  
        <Route exact path={ROUTES.LANDING} component={LangingPage} />
        <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
        <Route path={ROUTES.SIGN_IN} component={LoginPage} />
        <Route
          path={ROUTES.PASSWORD_FORGET}
          component={PasswordForgetPage}
        />
        <Route path={ROUTES.HOME} render={ ()=> <HomePage user={props.user}/>} />
        <Route path={ROUTES.ACCOUNT} component={AccountPage} />
        <Route path={ROUTES.ADMIN} component={AdminPage} />
      </div>
    </Router>
  );
} 

export default withAuthentication(App);


