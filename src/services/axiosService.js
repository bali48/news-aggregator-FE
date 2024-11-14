import axios from 'axios';

// Create an Axios instance with default configuration
const axiosInstance = axios.create({
  baseURL:process.env.REACT_APP_BACKENDURL,
  timeout: 50000, 
  headers: {
    'Content-Type': 'application/json',
  },
});
// Add Authorization token to headers dynamically using an interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');  // Assuming 'token' is stored in localStorage
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;  // Set Authorization header if token exists
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptors for handling responses and errors (optional)
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      console.error('Error response:', error.response);
    } else if (error.request) {
      console.error('Error request:', error.request);
    } else {
      console.error('General Error:', error.message);
    }
    return Promise.reject(error);
  }
);

// GET request function
export const get = async (url, params = {}, config = {}) => {
  try {
    const response = await axiosInstance.get(url, {
      params,
      ...config,
    });
    return response.data;
  } catch (error) {
    console.error('GET request error:', error);
    throw error;
  }
};

// POST request function
export const post = async (url, data = {}, config = {}) => {
  try {
    const response = await axiosInstance.post(url, data, config);
    return response.data;
  } catch (error) {
    console.error('POST request error:', error);
    throw error;
  }
};

export default axiosInstance;
