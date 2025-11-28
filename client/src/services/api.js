import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const registerUser = (userData) => api.post("/auth/register", userData);
export const loginUser = (credentials) => api.post("/auth/login", credentials);

export default api;
export const getRequests = () => api.get("/requests");
export const createRequest = (data) => api.post("/requests", data);

export const getAllRequests = () => api.get("/requests/admin/all");
export const updateRequestStatus = (id, status) =>
  api.put(`/requests/${id}`, { status });

export const getUserProfile = () => api.get("/auth/profile");
export const updateUserProfile = (data) => api.put("/auth/profile", data);

export const forgotPassword = (email) =>
  api.post("/auth/forgot-password", { email });
export const resetPassword = (token, password) =>
  api.post(`/auth/reset-password/${token}`, { password });
