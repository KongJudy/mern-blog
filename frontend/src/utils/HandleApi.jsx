import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const login = async (inputValues) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/auth/login`, inputValues, {
      withCredentials: true
    });
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const register = async (inputValues) => {
  try {
    const { data } = await axios.post(
      `${BASE_URL}/auth/register`,
      inputValues,
      {
        withCredentials: true
      }
    );
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const createPost = async (formData) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/posts/create`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      withCredentials: true
    });
    return data;
  } catch (err) {
    console.log('Error creating post:', err);
  }
};

export const getPosts = async () => {
  try {
    const { data } = await axios.get(`${BASE_URL}/posts`);
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getUser = async () => {
  try {
    const { data } = await axios.post(
      `${BASE_URL}/auth`,
      {},
      { withCredentials: true }
    );
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getSinglePost = async (id) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/post/${id}`);
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const apiHandlers = {
  login,
  register,
  createPost,
  getPosts,
  getUser
};

export default BASE_URL;
