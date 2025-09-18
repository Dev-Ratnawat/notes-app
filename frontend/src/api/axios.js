import axios from 'axios';

const REACT_APP_API_URL= "https://notes-app-2-t08q.onrender.com";

const baseURL = import.meta.env.REACT_APP_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
