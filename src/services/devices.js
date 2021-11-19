import axios from 'axios';

const port = '3000';
const baseURL = `${window.location.protocol}//${window.location.hostname}:${port}`;
const headers = {
  'Content-Type': 'application/json'
}

export const getDevices = async () => {
  let data;
  try {
    data = await axios.get('devices', { baseURL });
    return data.data;
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const addDevice = async (payload) => {
  let data;
  try {
    data = await axios.post('devices', payload, { headers, baseURL });
    return data.data;
  } catch (e) {
    console.error(e);
    return;
  }
};

export const getDevice = async (deviceId) => {
  let data;
  try {
    data = await axios.get(`devices/${deviceId}`, { baseURL });
    return data.data;
  } catch (e) {
    console.error(e);
    return;
  }
};

export const updateDevice = async (deviceId, payload) => {
  let data;
  try {
    data = await axios.put(`devices/${deviceId}`, payload, { headers, baseURL });
    return data.data;
  } catch (e) {
    console.error(e);
    return;
  }
};

export const deleteDevice = async (deviceId) => {
  let data;
  try {
    data = await axios.delete(`devices/${deviceId}`, { baseURL });
    return data.data;
  } catch (e) {
    console.error(e);
    return;
  }
};
