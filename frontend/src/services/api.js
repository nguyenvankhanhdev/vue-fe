// API Service để quản lý tất cả các cuộc gọi API
const API_BASE_URL = "http://127.0.0.1:8000/api"; // Laravel backend URL

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Helper method để tạo request với các options mặc định
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-Requested-With": "XMLHttpRequest",
        ...options.headers,
      },
      ...options,
    };

    // Thêm Authorization header nếu có token
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, config);

      // Kiểm tra response status
      if (!response.ok) {
        const errorData = await response
          .json()
          .catch(() => ({ message: "Network error" }));
        throw new ApiError(
          response.status,
          errorData.message || "Request failed",
          errorData
        );
      }

      return await response.json();
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }

      // Network or other errors
      throw new ApiError(0, "Lỗi kết nối mạng. Vui lòng thử lại.", {
        originalError: error,
      });
    }
  }

  // GET request
  async get(endpoint, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const url = queryString ? `${endpoint}?${queryString}` : endpoint;

    return this.request(url, { method: "GET" });
  }

  // POST request
  async post(endpoint, data = {}) {
    return this.request(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  // PUT request
  async put(endpoint, data = {}) {
    return this.request(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  // DELETE request
  async delete(endpoint) {
    return this.request(endpoint, { method: "DELETE" });
  }

  // Upload file
  async upload(endpoint, formData) {
    const token = localStorage.getItem("token");
    const headers = {};

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: "POST",
      headers,
      body: formData, // Không set Content-Type cho FormData
    });

    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ message: "Upload failed" }));
      throw new ApiError(response.status, errorData.message, errorData);
    }

    return await response.json();
  }
}

// Custom error class cho API errors
class ApiError extends Error {
  constructor(status, message, data = {}) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }

  // Kiểm tra loại lỗi
  isValidationError() {
    return this.status === 422;
  }

  isUnauthorized() {
    return this.status === 401;
  }

  isForbidden() {
    return this.status === 403;
  }

  isNotFound() {
    return this.status === 404;
  }

  isServerError() {
    return this.status >= 500;
  }

  // Lấy validation errors
  getValidationErrors() {
    return this.data.errors || {};
  }
}

// Auth API methods
class AuthService extends ApiService {
  
  async register(userData) {
    const res = await this.post("/auth/register", userData);
    if (res.token) {
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));
    }
    return res;
  }

  async login(credentials) {
    const res = await this.post("/auth/login", credentials);
    const token = res.data?.token;
    const user = res.data?.user;
    
    if (!token || !user) {
      throw new ApiError(500, 'Invalid response format from server');
    }
    
    return { token, user };
  }

  async logout() {
    try {
      await this.post("/auth/logout");
    } catch {}
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  async getCurrentUser() {
    return this.get("/auth/me");
  }
  async refreshToken() {
    const res = await this.post("/auth/refresh");
    if (res.token) localStorage.setItem("token", res.token);
    return res;
  }
}

// Product API methods
class ProductService extends ApiService {
  // Lấy danh sách sản phẩm
  async getProducts(params = {}) {
    return this.get("/products", params);
  }

  // Lấy chi tiết sản phẩm
  async getProduct(id) {
    return this.get(`/products/${id}`);
  }

  // Tạo sản phẩm mới (Admin)
  async createProduct(productData) {
    return this.post("/products", productData);
  }

  // Cập nhật sản phẩm (Admin)
  async updateProduct(id, productData) {
    return this.put(`/products/${id}`, productData);
  }

  // Xóa sản phẩm (Admin)
  async deleteProduct(id) {
    return this.delete(`/products/${id}`);
  }

  // Upload hình ảnh sản phẩm
  async uploadProductImage(productId, imageFile) {
    const formData = new FormData();
    formData.append("image", imageFile);

    return this.upload(`/products/${productId}/image`, formData);
  }
}

// User API methods
class UserService extends ApiService {
  // Lấy profile user
  async getProfile() {
    return this.get("/user/profile");
  }

  // Cập nhật profile
  async updateProfile(userData) {
    return this.put("/user/profile", userData);
  }

  // Đổi mật khẩu
  async changePassword(currentPassword, newPassword, confirmPassword) {
    return this.post("/user/change-password", {
      current_password: currentPassword,
      new_password: newPassword,
      new_password_confirmation: confirmPassword,
    });
  }

  // Upload avatar
  async uploadAvatar(avatarFile) {
    const formData = new FormData();
    formData.append("avatar", avatarFile);

    return this.upload("/user/avatar", formData);
  }
}

// Order API methods
class OrderService extends ApiService {
  // Lấy danh sách đơn hàng
  async getOrders(params = {}) {
    return this.get("/orders", params);
  }

  // Lấy chi tiết đơn hàng
  async getOrder(id) {
    return this.get(`/orders/${id}`);
  }

  // Tạo đơn hàng mới
  async createOrder(orderData) {
    return this.post("/orders", orderData);
  }

  // Hủy đơn hàng
  async cancelOrder(id, reason) {
    return this.post(`/orders/${id}/cancel`, { reason });
  }
}

// Export instances
export const apiService = new ApiService();
export const authService = new AuthService();
export const productService = new ProductService();
export const userService = new UserService();
export const orderService = new OrderService();

// Export classes
export { ApiError };

// Export default
export default apiService;
