import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const login = async (inputValues) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/auth/login`, inputValues, {
      withCredentials: true
    });
    localStorage.setItem('token', data?.token);
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
    localStorage.setItem('token', data?.token);
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const createPost = async (formData) => {
  const token = localStorage.getItem('token') || '';

  try {
    const { data } = await axios.post(`${BASE_URL}/post/create`, formData, {
      headers: {
        authorization: token
      }
    });
    return data;
  } catch (err) {
    console.log('Error creating post:', err);
  }
};

export const getPosts = async () => {
  try {
    const { data } = await axios.get(`${BASE_URL}/post`);
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

export const editPost = async (formData, id) => {
  const token = localStorage.getItem('token') || '';

  try {
    const { data } = await axios.put(`${BASE_URL}/post/edit/${id}`, formData, {
      headers: {
        authorization: token
      }
    });
    return data;
  } catch (err) {
    console.log('Error creating post:', err);
  }
};

export const getUserPosts = async (id) => {
  const token = localStorage.getItem('token') || '';

  try {
    const { data } = await axios.get(`${BASE_URL}/post/my-posts/${id}`, {
      headers: {
        authorization: token
      }
    });
    console.log('data:', data);
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
  getUser,
  getSinglePost,
  editPost,
  getUserPosts
};

export default BASE_URL;
