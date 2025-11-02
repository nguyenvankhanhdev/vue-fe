// src/services/index.js
// API Client
export { default as apiClient } from './apiClient';

// Error handling
export { ApiError } from './apiError';

// Services
export { default as productService } from './productService';
export { default as categoryService } from './categoryService';
export { userService } from './userService';

// Legacy API (keep for backward compatibility)
export * from './api';