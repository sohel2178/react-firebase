import React, { Component } from "react";
import { Grid, Paper, Typography } from "@material-ui/core";
import Device from "./device";
import DeviceForm from "./device-form";

// import { updateDevice } from "../../actions";
// import { connect } from "react-redux";

class UserDevice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      devices: [],
      open: false,
      device: null
    };

    this.deviceRef = this.props.firebase.devices(this.props.user._id);
  }

  editDevice = device => {
    this.setState({ device: device, open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSubmit = newData => {};

  componentDidMount() {
    this.deviceRef.on("child_added", snapshot => {
      let devices = [...this.state.devices, snapshot.val()];
      this.setState({ devices });
    });

    this.deviceRef.on("child_changed", snapshot => {
      let devices = [...this.state.devices];
      let index = devices.map(device => device.id).indexOf(snapshot.val().id);
      devices[index] = snapshot.val();
      this.setState({ devices });
    });
  }
  render() {
    return (
      <Grid container justify="center" style={{ margin: 10 }}>
        <Grid md={10} sm={12} xs={12} item>
          <Grid container direction="column">
            <Typography variant="h6">My Vehicles</Typography>

            <Grid container>
              {this.state.devices.map(device => (
                <Device
                  key={device.id}
                  device={device}
                  editDevice={this.editDevice}
                />
              ))}
            </Grid>
          </Grid>
        </Grid>

        {this.state.device ? (
          <DeviceForm
            open={this.state.open}
            handleClose={this.handleClose}
            device={this.state.device}
          />
        ) : null}
      </Grid>
    );
  }
}

export default UserDevice;
