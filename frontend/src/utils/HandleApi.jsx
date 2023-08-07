import axios from 'axios';

const BASE_URL = 'http://localhost:4000';

export const login = async (inputValues) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/login`, inputValues, {
      withCredentials: true
    });
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const register = async (inputValues) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/register`, inputValues, {
      withCredentials: true
    });
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const createPost = async (formData) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/create`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const apiHandlers = {
  login,
  register,
  createPost
};
