import React, { Component } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField
} from "@material-ui/core";

import { connect } from "react-redux";
import { updateDevice } from "../../actions";
import axios from "axios";

const DeviceForm = props => {
  console.log(props);
  const [values, setValues] = React.useState({ ...props.device });

  React.useEffect(() => {
    setValues(props.device);
  }, [props.device]);

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSubmit = () => {
    //props.updateDevice(values, props.device, props.handleClose);
    let imei = values.id;
    console.log(imei);
    axios
      .put("http://118.67.215.190:8880/api/devices/" + imei, values)
      .then(response => {
        props.handleClose();
      })
      .catch(err => {
        console.log(err);
        props.handleClose();
        throw err;
      });
  };

  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="form-dialog-title"
      fullWidth={true}
    >
      <DialogTitle id="form-dialog-title">Device Update Form</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Edit Field and send Submit to Update Device
        </DialogContentText>

        <TextField
          autoFocus
          margin="dense"
          name="driver_name"
          value={values.driver_name}
          label="Driver Name"
          type="text"
          onChange={handleChange("driver_name")}
          fullWidth
        />

        <TextField
          margin="dense"
          name="driver_phone"
          value={values.driver_phone}
          label="Driver Phone"
          type="text"
          onChange={handleChange("driver_phone")}
          fullWidth
        />

        <TextField
          margin="dense"
          name="device_sim_number"
          value={values.device_sim_number}
          label="Device SIM Number"
          type="text"
          onChange={handleChange("device_sim_number")}
          fullWidth
        />

        <TextField
          margin="dense"
          name="registration_number"
          value={values.registration_number}
          label="Registration Number"
          type="text"
          onChange={handleChange("registration_number")}
          fullWidth
        />

        <TextField
          margin="dense"
          name="mileage"
          value={values.mileage}
          label="Mileage"
          type="text"
          onChange={handleChange("mileage")}
          fullWidth
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={props.handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const mapStateToProps = state => {
  return {
    ...state
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateDevice: (newData, OldData, resolve) =>
      updateDevice(newData, OldData, resolve)
  };
};

export default connect(
  null,
  mapDispatchToProps
)(DeviceForm);
