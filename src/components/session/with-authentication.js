import React from "react";
import AuthUserContext from "./context";
import { withFirebase } from "../firebase";
import axios from "axios";

const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        authUser: null,
        user: null
      };
    }

    componentWillMount() {}

    componentDidMount() {
      this.props.firebase.auth.onAuthStateChanged(authUser => {
        if (authUser) {
          axios
            .get("http://118.67.215.190:8880/api/users/" + authUser.email)
            .then(response => {
              let user = response.data;
              this.setState({ authUser: authUser, user: user });
            });
        } else {
          this.setState({ authUser: null, user: null });
        }
      });
    }

    render() {
      return (
        <AuthUserContext.Provider value={this.state.authUser}>
          <Component
            {...this.props}
            user={this.state.user}
            authUser={this.state.authUser}
          />
        </AuthUserContext.Provider>
      );
    }
  }

  return withFirebase(WithAuthentication);
};

export default withAuthentication;
