import axios from 'axios';

// Use correct env var based on bundler (Vite vs CRA)
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Set auth token globally
export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};



// Auth
export const login = async (username, password) => {
  try {
    const res = await axios.post(`${API_URL}/auth/login`, { username, password });
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

export const register = async (username, password) => {
  try {
    const res = await axios.post(`${API_URL}/auth/register`, { username, password });
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

// Tasks
export const fetchTasks = async (page = 1) => {
  try {
    const res = await axios.get(`${API_URL}/tasks?page=${page}`);
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

export const fetchTask = async (id) => {
  try {
    const res = await axios.get(`${API_URL}/tasks/${id}`);
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

export const createTask = async (taskData) => {
  try {
    const res = await axios.post(`${API_URL}/tasks`, taskData);
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

export const updateTask = async (id, taskData) => {
  try {
    const res = await axios.put(`${API_URL}/tasks/${id}`, taskData);
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

export const deleteTask = async (id) => {
  try {
    const res = await axios.delete(`${API_URL}/tasks/${id}`);
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

export const getDashboardData = async () => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No auth token found');

  const res = await axios.get(`${API_URL}/tasks/dashboard`, {
    headers: {
      'x-auth-token': token,
    },
  });

  return res.data;
};