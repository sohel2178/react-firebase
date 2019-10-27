import {
  FETCH_USERS,
  UPDATE_USER,
  FETCH_DEVICES,
  ADD_DEVICE,
  UPDATE_DEVICE,
  DELETE_DEVICE,
  ASSIGN_DEVICE,
  UNASSIGN_DEVICE,
  GET_USER
} from "./types";
import axios from "axios";

const baseUrl = "http://167.71.227.221:2255/api/";
const usersUrl = baseUrl + "users/";
const devicesURl = baseUrl + "devices/";

const fetchUsersAction = data => {
  return { type: FETCH_USERS, payload: data };
};

const fetchDevicesAction = data => {
  return { type: FETCH_DEVICES, payload: data };
};

const updateUserAction = (newData, oldData) => {
  return { type: UPDATE_USER, payload: { newData: newData, oldData: oldData } };
};

const addDeviceAction = data => {
  return { type: ADD_DEVICE, payload: data };
};

const getUserAction = user => {
  return { type: GET_USER, payload: user };
};

const updateDeviceAction = (newData, oldData) => {
  return {
    type: UPDATE_DEVICE,
    payload: { newData: newData, oldData: oldData }
  };
};

const deleteDeviceAction = oldData => {
  return { type: DELETE_DEVICE, payload: oldData };
};

const assignDeviceAction = (newData, oldData) => {
  return {
    type: ASSIGN_DEVICE,
    payload: { newData: newData, oldData: oldData }
  };
};

const unAssignDeviceAction = (newData, oldData) => {
  return {
    type: UNASSIGN_DEVICE,
    payload: { newData: newData, oldData: oldData }
  };
};

export const fetchAllUsers = () => {
  return dispatch => {
    return axios
      .get(usersUrl)
      .then(response => {
        dispatch(fetchUsersAction(response.data));
      })
      .catch(err => {
        throw err;
      });
  };
};

export const getUser = email => {
  return dispatch => {
    return axios
      .get(usersUrl + email)
      .then(response => {
        dispatch(getUserAction(response.data));
      })
      .catch(err => {
        throw err;
      });
  };
};

export const updateUser = (newData, oldData, resolve) => {
  return dispatch => {
    let id = newData._id;
    axios
      .put(usersUrl + id, newData)
      .then(response => {
        dispatch(updateUserAction(newData, oldData));
        resolve();
      })
      .catch(err => {
        resolve();
        throw err;
      });
  };
};

export const addDevice = (newData, resolve) => {
  return dispatch => {
    return axios
      .post(devicesURl, newData)
      .then(response => {
        dispatch(addDeviceAction(newData));
        //   let devices = [...this.state.devices].push (newData);
        //   this.setState ({...this.state, devices});

        resolve();
      })
      .catch(err => {
        resolve();
        throw err;
      });
  };
};

export const fetchAllDevices = () => {
  return dispatch => {
    return axios
      .get(devicesURl)
      .then(response => {
        dispatch(fetchDevicesAction(response.data));
      })
      .catch(err => {
        throw err;
      });
  };
};

export const updateDevice = (newData, oldData, resolve) => {
  return dispatch => {
    let id = newData.id;

    axios
      .put(devicesURl + id, newData)
      .then(response => {
        dispatch(updateDeviceAction(newData, oldData));
        resolve();
      })
      .catch(err => {
        resolve();
        throw err;
      });
  };
};

export const deleteDevice = (oldData, resolve) => {
  return dispatch => {
    axios
      .delete(devicesURl + oldData.id)
      .then(response => {
        dispatch(deleteDeviceAction(oldData));
        resolve();
      })
      .catch(err => {
        resolve();
        throw err;
      });
  };
};

export const assignDevice = (oldData, data, resolve) => {
  return dispatch => {
    return axios
      .post(devicesURl + "assign", data)
      .then(response => {
        let newData = response.data;
        newData["imei"] = oldData.imei;
        dispatch(assignDeviceAction(newData, oldData));
        resolve();
      })
      .catch(err => {
        resolve();
        throw err;
      });
  };
};

export const unAssignDevice = device => {
  return dispatch => {
    const data = { id: device.id };
    axios
      .post(devicesURl + "unassign", data)
      .then(response => {
        let newDevice = response.data;
        //newDevice["imei"] = device.imei;
        dispatch(unAssignDeviceAction(newDevice, device));
      })
      .catch(err => {
        throw err;
      });
  };
};
