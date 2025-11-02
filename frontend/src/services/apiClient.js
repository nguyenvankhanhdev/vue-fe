// src/api/apiClient.js
import axios from 'axios';
import { ApiError } from './apiError';

const apiClient = axios.create({
  baseURL: "http://127.0.0.1:8000/api", // Chuẩn hóa với api.js
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  }
});

// Interceptor để tự động thêm token vào mỗi request
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor để chuẩn hóa lỗi trả về thành ApiError
apiClient.interceptors.response.use(
  (response) => response.data, // Trả về thẳng data từ response
  (error) => {
    if (error.response) {
      const { status, data } = error.response;
      return Promise.reject(new ApiError(status, data.message || 'Lỗi từ server', data));
    } else if (error.request) {
      return Promise.reject(new ApiError(0, 'Lỗi kết nối mạng. Vui lòng thử lại.'));
    } else {
      return Promise.reject(new ApiError(-1, error.message));
    }
  }
);

export default apiClient;