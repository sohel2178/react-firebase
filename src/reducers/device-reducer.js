import {
  FETCH_DEVICES,
  UPDATE_DEVICE,
  DELETE_DEVICE,
  ADD_DEVICE,
  ASSIGN_DEVICE,
  UNASSIGN_DEVICE
} from "../actions/types";

const devicesReducer = (state = [], action) => {
  if (action.type === FETCH_DEVICES) {
    return action.payload;
  } else if (action.type === UPDATE_DEVICE) {
    let devices = [...state];
    devices[devices.indexOf(action.payload.oldData)] = action.payload.newData;
    return devices;
  } else if (action.type === DELETE_DEVICE) {
    let devices = [...state].filter(device => device.id != action.payload.id);
    return devices;
  } else if (action.type === ADD_DEVICE) {
    return [...state, action.payload];
  } else if (action.type === ASSIGN_DEVICE) {
    let devices = [...state];
    devices[devices.indexOf(action.payload.oldData)] = action.payload.newData;
    return devices;
  } else if (action.type === UNASSIGN_DEVICE) {
    let devices = [...state];
    devices[devices.indexOf(action.payload.oldData)] = action.payload.newData;
    return devices;
  } else {
    return state;
  }
};

export default devicesReducer;
