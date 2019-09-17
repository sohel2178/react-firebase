import React, { Component } from "react";
import { connect } from "react-redux";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List
} from "@material-ui/core";
import UserItem from "./item-user";
import { fetchAllUsers } from "../../actions";

class UserDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    if (this.props.users.length === 0) {
      this.props.getUsers();
    }
  }

  handleSubmit = () => {};
  render() {
    const { userDialogOpen, handleUserDialogClose, itemClick } = this.props;
    return (
      <Dialog
        open={userDialogOpen}
        onClose={handleUserDialogClose}
        aria-labelledby="form-dialog-title"
        fullWidth={450}
      >
        <DialogTitle id="form-dialog-title">User List</DialogTitle>
        <DialogContent>
          <List>
            {this.props.users.map(user => (
              <UserItem key={user._id} user={user} itemClick={itemClick} />
            ))}
          </List>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleUserDialogClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUsers: () => dispatch(fetchAllUsers())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserDialog);
