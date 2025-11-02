import apiClient from './apiClient'

export const userService = {
  /**
   * Lấy thông tin user hiện tại (auth/me)
   */
  async getMe() {
    const response = await apiClient.get('/auth/me')
    return response
  },

  /**
   * Cập nhật thông tin user hiện tại (users/me)
   */
  async updateMe(userData) {
    const response = await apiClient.patch('/users/me', userData)
    return response
  },

  /**
   * Đổi mật khẩu user hiện tại (users/me/password)
   */
  async changePassword(passwordData) {
    const response = await apiClient.patch('/users/me/password', passwordData)
    return response
  },

  /**
   * Lấy danh sách tất cả người dùng (Admin)
   * GET /api/users
   */
  async getAll(params = {}) {
    const response = await apiClient.get('/users', { params })
    return response
  },

  /**
   * Lấy thông tin chi tiết một người dùng (Admin)
   * GET /api/users/{id}
   */
  async getById(id) {
    const response = await apiClient.get(`/users/${id}`)
    return response
  },

  /**
   * Tạo người dùng mới (Admin)
   * POST /api/users
   */
  async create(userData) {
    const response = await apiClient.post('/users', userData)
    return response
  },

  /**
   * Cập nhật thông tin người dùng (Admin)
   * PUT /api/users/{id}
   */
  async update(id, userData) {
    const response = await apiClient.put(`/users/${id}`, userData)
    return response
  },

  /**
   * Xóa người dùng (Admin)
   * DELETE /api/users/{id}
   */
  async delete(id) {
    const response = await apiClient.delete(`/users/${id}`)
    return response
  },

  /**
   * Thống kê người dùng (tính toán từ client nếu backend chưa có endpoint)
   */
  async getStats() {
    try {
      // Thử gọi endpoint stats nếu có
      const response = await apiClient.get('/users/stats')
      return response
    } catch (error) {
      // Nếu không có, lấy tất cả users và tính toán
      const users = await this.getAll()
      const data = Array.isArray(users) ? users : (users.data || [])
      
      return {
        total: data.length,
        active: data.filter(u => u.status === 1 || u.status === 'active').length,
        inactive: data.filter(u => u.status === 0 || u.status === 'inactive').length,
        admin: data.filter(u => u.role === 'admin').length,
        manager: data.filter(u => u.role === 'manager').length,
        newThisMonth: data.filter(u => {
          const created = new Date(u.created_at)
          const now = new Date()
          return created.getMonth() === now.getMonth() && 
                 created.getFullYear() === now.getFullYear()
        }).length
      }
    }
  },

  /**
   * Xuất danh sách người dùng ra Excel (nếu backend hỗ trợ)
   */
  async export(params = {}) {
    const response = await apiClient.get('/users/export', {
      params,
      responseType: 'blob'
    })
    return response
  }
}
