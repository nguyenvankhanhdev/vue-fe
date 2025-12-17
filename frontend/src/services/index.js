// src/services/index.js
// API Client
export { default as apiClient } from './apiClient';

// Error handling
export { ApiError } from './apiError';

// Services
export { default as productService } from './productService';
export { default as categoryService } from './categoryService';
export { default as cartService } from './cartService';
export { userService } from './userService';
export { default as addressService } from './addressService';
export { default as couponService } from './couponService';
export { default as orderService } from './orderService';

// Legacy API (keep for backward compatibility)
export * from './api';