import React from "react";
import {
  Grid,
  Paper,
  Avatar,
  Typography,
  Divider,
  IconButton
} from "@material-ui/core";
import { Add, Edit, PanoramaFishEye } from "@material-ui/icons";

const myStyle = {
  paper: {
    padding: 10
  },
  avater: {
    width: 60,
    height: 60
  },
  divider: {
    marginTop: 8
  },
  border: {
    border: "1px solid #80333333",
    borderRadius: 4,
    padding: 8,
    marginTop: 10
  },
  typography: {
    padding: 4
  }
};

const Device = ({ device, editDevice }) => {
  return (
    <Grid md={4} item>
      <div style={{ margin: 6 }}>
        <Paper style={myStyle.paper}>
          <Grid container direction="column">
            <Grid container justify="space-between" alignItems="center">
              <Avatar src={device.driver_photo} style={myStyle.avater} />
              <Typography variant="h6">{device.id}</Typography>
            </Grid>

            <Grid container direction="column" style={myStyle.border}>
              <Grid container justify="space-between" alignItems="center">
                <Typography variant="caption" style={myStyle.typography}>
                  Driver Name
                </Typography>
                <Typography variant="caption" style={myStyle.typography}>
                  {device.driver_name}
                </Typography>
              </Grid>

              <Grid container justify="space-between" alignItems="center">
                <Typography variant="caption" style={myStyle.typography}>
                  Driver Phone
                </Typography>
                <Typography variant="caption" style={myStyle.typography}>
                  {device.driver_phone}
                </Typography>
              </Grid>
              <Grid container justify="space-between" alignItems="center">
                <Typography variant="caption" style={myStyle.typography}>
                  Device SIM Number
                </Typography>
                <Typography variant="caption" style={myStyle.typography}>
                  {device.device_sim_number}
                </Typography>
              </Grid>

              <Grid container justify="space-between" alignItems="center">
                <Typography variant="caption" style={myStyle.typography}>
                  Registration Number
                </Typography>
                <Typography variant="caption" style={myStyle.typography}>
                  {device.registration_number}
                </Typography>
              </Grid>

              <Grid container justify="space-between" alignItems="center">
                <Typography variant="caption" style={myStyle.typography}>
                  Milage
                </Typography>
                <Typography variant="caption" style={myStyle.typography}>
                  {device.mileage}
                </Typography>
              </Grid>
            </Grid>

            <Grid
              container
              justify="center"
              alignItems="center"
              style={{ marginTop: 8 }}
            >
              <IconButton>
                <PanoramaFishEye fontSize="small" />
              </IconButton>

              <IconButton>
                <Edit fontSize="small" onClick={() => editDevice(device)} />
              </IconButton>
            </Grid>
          </Grid>
        </Paper>
      </div>
    </Grid>
  );
};

export default Device;
