import { ref, computed } from 'vue'
import { userService } from '@/services/userService'
import { toastService } from '@/services/toast'

const users = ref([])
const loading = ref(false)
const currentPage = ref(1)
const lastPage = ref(1)
const total = ref(0)
const perPage = ref(10)
const stats = ref({
  total: 0,
  active: 0,
  inactive: 0,
  admin: 0,
  newThisMonth: 0
})

export function useUsers() {
  /**
   * Load danh sách người dùng
   */
  const loadUsers = async (page = 1, filters = {}) => {
    loading.value = true
    try {
      const params = {
        page,
        per_page: perPage.value,
        ...filters
      }
      
      const response = await userService.getAll(params)
      
      // Xử lý response dựa trên cấu trúc API của bạn
      if (response.data) {
        users.value = response.data
        currentPage.value = response.current_page || page
        lastPage.value = response.last_page || 1
        total.value = response.total || response.data.length
      } else {
        users.value = Array.isArray(response) ? response : []
      }
      
      return users.value
    } catch (error) {
      console.error('Error loading users:', error)
      toastService.error('Không thể tải danh sách người dùng')
      users.value = []
      return []
    } finally {
      loading.value = false
    }
  }

  /**
   * Load thống kê người dùng
   */
  const loadStats = async () => {
    try {
      const response = await userService.getStats()
      stats.value = response
      return response
    } catch (error) {
      console.error('Error loading stats:', error)
      // Tính toán stats từ users hiện tại nếu API không có
      if (users.value.length > 0) {
        stats.value = {
          total: users.value.length,
          active: users.value.filter(u => u.status === 1).length,
          inactive: users.value.filter(u => u.status === 0).length,
          admin: users.value.filter(u => u.role === 'admin').length,
          newThisMonth: users.value.filter(u => {
            const created = new Date(u.created_at)
            const now = new Date()
            return created.getMonth() === now.getMonth() && 
                   created.getFullYear() === now.getFullYear()
          }).length
        }
      }
      return stats.value
    }
  }

  /**
   * Tạo người dùng mới
   */
  const createUser = async (userData) => {
    loading.value = true
    try {
      const response = await userService.create(userData)
      toastService.success('Tạo người dùng thành công!')
      
      // Reload users để cập nhật danh sách
      await loadUsers(currentPage.value)
      
      return response
    } catch (error) {
      console.error('Error creating user:', error)
      
      // Xử lý lỗi validation
      if (error.response?.data?.errors) {
        const errors = error.response.data.errors
        const firstError = Object.values(errors)[0][0]
        toastService.error(firstError || 'Không thể tạo người dùng')
      } else {
        toastService.error(error.response?.data?.message || 'Không thể tạo người dùng')
      }
      
      throw error
    } finally {
      loading.value = false
    }
  }

  /**
   * Cập nhật thông tin người dùng
   */
  const updateUser = async (id, userData) => {
    loading.value = true
    try {
      const response = await userService.update(id, userData)
      toastService.success('Cập nhật người dùng thành công!')
      
      // Cập nhật user trong danh sách hiện tại
      const index = users.value.findIndex(u => u.id === id)
      if (index !== -1) {
        users.value[index] = { ...users.value[index], ...response }
      }
      
      return response
    } catch (error) {
      console.error('Error updating user:', error)
      
      if (error.response?.data?.errors) {
        const errors = error.response.data.errors
        const firstError = Object.values(errors)[0][0]
        toastService.error(firstError || 'Không thể cập nhật người dùng')
      } else {
        toastService.error(error.response?.data?.message || 'Không thể cập nhật người dùng')
      }
      
      throw error
    } finally {
      loading.value = false
    }
  }

  /**
   * Xóa người dùng
   */
  const deleteUser = async (id) => {
    loading.value = true
    try {
      await userService.delete(id)
      toastService.success('Xóa người dùng thành công!')
      
      // Xóa user khỏi danh sách
      const index = users.value.findIndex(u => u.id === id)
      if (index !== -1) {
        users.value.splice(index, 1)
        total.value--
      }
      
      // Nếu trang hiện tại rỗng và không phải trang đầu, chuyển về trang trước
      if (users.value.length === 0 && currentPage.value > 1) {
        await loadUsers(currentPage.value - 1)
      }
    } catch (error) {
      console.error('Error deleting user:', error)
      toastService.error(error.response?.data?.message || 'Không thể xóa người dùng')
      throw error
    } finally {
      loading.value = false
    }
  }

  /**
   * Toggle trạng thái người dùng (kích hoạt/khóa)
   * Sử dụng PUT /users/{id} để cập nhật status
   */
  const toggleUserStatus = async (id) => {
    loading.value = true
    try {
      // Tìm user hiện tại
      const user = users.value.find(u => u.id === id)
      if (!user) {
        throw new Error('User not found')
      }

      // Toggle status: 1 -> 0 hoặc 0 -> 1
      const newStatus = user.status === 1 ? 0 : 1
      
      // Gọi API update với status mới
      const response = await userService.update(id, { status: newStatus })
      
      // Cập nhật status trong danh sách
      const index = users.value.findIndex(u => u.id === id)
      if (index !== -1) {
        users.value[index].status = newStatus
      }
      
      const statusText = newStatus === 1 ? 'kích hoạt' : 'khóa'
      toastService.success(`Đã ${statusText} tài khoản thành công!`)
      
      return response
    } catch (error) {
      console.error('Error toggling user status:', error)
      toastService.error('Không thể thay đổi trạng thái người dùng')
      throw error
    } finally {
      loading.value = false
    }
  }

  /**
   * Cập nhật vai trò người dùng
   * Sử dụng PUT /users/{id} để cập nhật role
   */
  const updateUserRole = async (id, role) => {
    loading.value = true
    try {
      const response = await userService.update(id, { role })
      
      // Cập nhật role trong danh sách
      const index = users.value.findIndex(u => u.id === id)
      if (index !== -1) {
        users.value[index].role = role
      }
      
      toastService.success('Cập nhật vai trò thành công!')
      
      return response
    } catch (error) {
      console.error('Error updating user role:', error)
      toastService.error('Không thể cập nhật vai trò người dùng')
      throw error
    } finally {
      loading.value = false
    }
  }

  /**
   * Đổi mật khẩu user hiện tại
   */
  const changeMyPassword = async (passwordData) => {
    loading.value = true
    try {
      const response = await userService.changePassword(passwordData)
      toastService.success('Đổi mật khẩu thành công!')
      return response
    } catch (error) {
      console.error('Error changing password:', error)
      
      if (error.response?.data?.errors) {
        const errors = error.response.data.errors
        const firstError = Object.values(errors)[0][0]
        toastService.error(firstError || 'Không thể đổi mật khẩu')
      } else {
        toastService.error(error.response?.data?.message || 'Không thể đổi mật khẩu')
      }
      
      throw error
    } finally {
      loading.value = false
    }
  }

  /**
   * Xuất danh sách người dùng
   */
  const exportUsers = async (filters = {}) => {
    loading.value = true
    try {
      const response = await userService.export(filters)
      
      // Tạo URL để download file
      const url = window.URL.createObjectURL(new Blob([response]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `users_${new Date().getTime()}.xlsx`)
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(url)
      
      toastService.success('Xuất file thành công!')
    } catch (error) {
      console.error('Error exporting users:', error)
      toastService.error('Không thể xuất danh sách người dùng')
      throw error
    } finally {
      loading.value = false
    }
  }

  // Computed
  const hasUsers = computed(() => users.value.length > 0)
  const isEmpty = computed(() => !loading.value && users.value.length === 0)

  return {
    // State
    users,
    loading,
    currentPage,
    lastPage,
    total,
    perPage,
    stats,
    
    // Computed
    hasUsers,
    isEmpty,
    
    // Methods
    loadUsers,
    loadStats,
    createUser,
    updateUser,
    deleteUser,
    toggleUserStatus,
    updateUserRole,
    exportUsers,
    changeMyPassword
  }
}
