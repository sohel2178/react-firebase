import React, { Component } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
  Select,
  InputLabel
} from "@material-ui/core";

const initialState = {
  id: "",
  registration_number: "",
  device_sim_number: "",
  center_number: "",
  device_model: "GT06",
  vehicle_type: 0
};

class DeviceForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...initialState };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = e => {
    this.props.handleSubmit(this.state);
    // axios
    //   .post ('http://118.67.215.190:8880/api/devices', this.state)
    //   .then (response => {
    //     this.props.handleSubmit (this.state);
    //     this.setState({...initialState})
    //   })
    //   .catch (err => console.log (err));
  };
  render() {
    const { open, handleClose } = this.props;
    return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth={450}
      >
        <DialogTitle id="form-dialog-title">Device Entry Form</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill up the form to add a new Device
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="id"
            value={this.state.imei}
            label="ID"
            type="text"
            onChange={this.handleChange}
            fullWidth
          />

          <TextField
            margin="dense"
            name="registration_number"
            value={this.state.registration_number}
            label="Registration Number"
            type="text"
            onChange={this.handleChange}
            fullWidth
          />

          <TextField
            margin="dense"
            name="device_sim_number"
            value={this.state.device_sim_number}
            label="Device SIM Number"
            type="text"
            onChange={this.handleChange}
            fullWidth
          />

          <TextField
            margin="dense"
            name="center_number"
            value={this.state.center_number}
            label="Center Number"
            type="text"
            onChange={this.handleChange}
            fullWidth
          />

          <InputLabel htmlFor="device_model" style={{ marginTop: 16 }}>
            Device Model
          </InputLabel>
          <Select
            style={{ marginTop: 10 }}
            native
            value={this.state.device_model}
            onChange={this.handleChange}
            inputProps={{
              name: "device_model",
              id: "device_model"
            }}
            fullWidth
          >
            <option value={"GT06"}>GT06</option>
            <option value={"WeTrack Two"}>WeTrack Two</option>
            <option value={"SinoTrack"}>SinoTrack</option>
          </Select>

          <InputLabel htmlFor="vehicle_type" style={{ marginTop: 16 }}>
            Vehicle Type
          </InputLabel>
          <Select
            style={{ marginTop: 10 }}
            native
            value={this.state.vehicle_type}
            onChange={this.handleChange}
            inputProps={{
              name: "vehicle_type",
              id: "vehicle_type"
            }}
            fullWidth
          >
            <option value={0}>Car</option>
            <option value={1}>Bike</option>
            <option value={2}>Bus</option>
            <option value={3}>Truck</option>
            <option value={4}>CNG</option>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default DeviceForm;
