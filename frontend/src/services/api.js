import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  }
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);



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
    const data = res?.data || res;
    if (data?.user?.email) {
      localStorage.setItem("pendingVerifyEmail", data.user.email);
    }
    return data;
  }

  async login(credentials) {
    try {
      const res = await this.post("/auth/login", credentials);
      const payload = res?.data || res; // fallback if API not wrapped
      const token = payload?.token;
      let user = payload?.user;

      if (!token || !user) {
        throw new ApiError(500, "Invalid response format from server", {
          raw: res,
        });
      }

      // Chuẩn hoá field xác thực trước khi kiểm tra
      if (user && user.verified && !user.email_verified_at) {
        // Backend chỉ trả verified: true => tạo email_verified_at giả lập để đồng bộ giao diện
        user = { ...user, email_verified_at: new Date().toISOString() };
      }
      if (user?.email_verified_at && user.verified === undefined) {
        user.verified = true;
      }

      // Kiểm tra trạng thái xác thực (chấp nhận một trong hai dấu hiệu)
      const isVerified = !!(user?.email_verified_at || user?.verified === true);
      if (!isVerified) {
        localStorage.setItem("pendingVerifyEmail", user.email);
        throw new ApiError(
          403,
          "Tài khoản chưa xác thực. Vui lòng kiểm tra email.",
          { unverified: true, rawUser: user }
        );
      }

      return { token, user };
    } catch (err) {
      if (err instanceof ApiError) {
        // Nếu BE trả 403 (unverified)
        if (err.status === 403) {
          // Cố gắng lưu email người dùng đã nhập để trang verify có thể dùng
          if (credentials?.email) {
            localStorage.setItem("pendingVerifyEmail", credentials.email);
          }
        }
        throw err;
      }
      throw new ApiError(0, "Lỗi không xác định khi đăng nhập", {
        originalError: err,
      });
    }
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

  async resendVerificationEmail(email) {
    return this.post("/email/verification-notification", { email });
  }

  // Kiểm tra trạng thái xác minh email từ server (chỉ khi có token và user đã đăng nhập)
  async checkEmailVerificationFromServer() {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return { verified: false, method: "no_token" };
      }

      // Kiểm tra xem có đang trong trạng thái pending verification không
      const pendingEmail = localStorage.getItem("pendingVerifyEmail");
      if (pendingEmail) {
        // Nếu đang pending, chỉ check localStorage, không gọi API
        const userStr = localStorage.getItem("user");
        if (userStr) {
          const user = JSON.parse(userStr);
          const isVerified = !!(
            user?.email_verified_at || user?.verified === true
          );
          return {
            verified: isVerified,
            user,
            method: "local_storage_check",
          };
        }
        return { verified: false, method: "pending_verification" };
      }

      // Chỉ gọi API khi không có pending verification
      const user = await this.reloadUser();
      return {
        verified: !!(user?.email_verified_at || user?.verified === true),
        user,
        method: "server_check",
      };
    } catch (error) {
      console.error("Error checking verification from server:", error);
      // Nếu API fail, fallback sang localStorage
      const userStr = localStorage.getItem("user");
      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          return {
            verified: !!(user?.email_verified_at || user?.verified === true),
            user,
            method: "fallback_local_storage",
          };
        } catch (parseError) {
          console.error("Error parsing user from localStorage:", parseError);
        }
      }
      return { verified: false, method: "server_error", error };
    }
  }

  // Kiểm tra trạng thái xác minh email thông qua URL query hoặc localStorage
  checkEmailVerificationStatus() {
    ``;
    // Kiểm tra URL query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const verified = urlParams.get("verified");

    if (verified === "1") {
      return { verified: true, method: "url_redirect" };
    } else if (verified === "0") {
      const reason = urlParams.get("reason");
      return { verified: false, method: "url_redirect", reason };
    }

    // Kiểm tra localStorage để xem có thông tin user đã verified không
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        if (user.email_verified_at || user.verified === true) {
          return { verified: true, method: "local_storage" };
        }
      } catch (e) {
        console.error("Error parsing user from localStorage:", e);
      }
    }

    return { verified: false, method: "unknown" };
  }

  // Đánh dấu email đã được xác minh trong localStorage
  markEmailAsVerified(email) {
    try {
      // Cập nhật localStorage để các tab khác biết
      localStorage.setItem(
        "email_verification_status",
        JSON.stringify({
          email: email,
          verified: true,
          timestamp: new Date().toISOString(),
        })
      );

      // Trigger storage event cho các tab khác
      window.dispatchEvent(
        new StorageEvent("storage", {
          key: "email_verification_status",
          newValue: JSON.stringify({
            email: email,
            verified: true,
            timestamp: new Date().toISOString(),
          }),
        })
      );
    } catch (error) {
      console.error("Error marking email as verified:", error);
    }
  }

  // Tải lại thông tin người dùng để kiểm tra trạng thái xác minh email
  async reloadUser() {
    const res = await this.get("/auth/me");
    // Chuẩn hóa định dạng trả về nếu BE bọc trong data
    const user = res?.data?.user || res?.user || res?.data || res;
    if (user) {
      const existing = localStorage.getItem("user");
      const parsed = existing ? JSON.parse(existing) : {};
      const merged = { ...parsed, ...user };
      localStorage.setItem("user", JSON.stringify(merged));

      // Nếu email đã được verify, đánh dấu trong localStorage
      if (user.email_verified_at || user.verified === true) {
        this.markEmailAsVerified(user.email);
      }

      return merged;
    }
    return user;
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
