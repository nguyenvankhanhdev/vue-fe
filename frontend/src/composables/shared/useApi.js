import { ref } from 'vue'
import axios from 'axios'
import Swal from 'sweetalert2'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

// Add auth token to requests
apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Handle response errors
apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export function useApi(endpoint) {
  const loading = ref(false)
  const error = ref(null)
  const data = ref([])

  // GET all items
  const fetchAll = async (params = {}) => {
    loading.value = true
    error.value = null
    try {
      const response = await apiClient.get(endpoint, { params })
      data.value = response.data.data || response.data
      return response.data
    } catch (err) {
      error.value = err.response?.data?.message || 'Có lỗi xảy ra'
      throw err
    } finally {
      loading.value = false
    }
  }

  // GET single item
  const fetchOne = async (id) => {
    loading.value = true
    error.value = null
    try {
      const response = await apiClient.get(`${endpoint}/${id}`)
      return response.data.data || response.data
    } catch (err) {
      error.value = err.response?.data?.message || 'Có lỗi xảy ra'
      throw err
    } finally {
      loading.value = false
    }
  }

  // POST create item
  const create = async (formData) => {
    loading.value = true
    error.value = null
    try {
      const response = await apiClient.post(endpoint, formData)
      const newItem = response.data.data || response.data
      data.value.unshift(newItem)
      Swal.fire({
        icon: 'success',
        title: 'Thành công',
        text: 'Đã tạo mới thành công',
        timer: 1500,
        showConfirmButton: false
      })
      return newItem
    } catch (err) {
      error.value = err.response?.data?.message || 'Có lỗi xảy ra'
      Swal.fire({
        icon: 'error',
        title: 'Lỗi',
        text: error.value
      })
      throw err
    } finally {
      loading.value = false
    }
  }

  // PUT/PATCH update item
  const update = async (id, formData) => {
    loading.value = true
    error.value = null
    try {
      const response = await apiClient.put(`${endpoint}/${id}`, formData)
      const updatedItem = response.data.data || response.data
      
      const index = data.value.findIndex(item => item.id === id)
      if (index > -1) {
        data.value[index] = updatedItem
      }
      
      Swal.fire({
        icon: 'success',
        title: 'Thành công',
        text: 'Đã cập nhật thành công',
        timer: 1500,
        showConfirmButton: false
      })
      return updatedItem
    } catch (err) {
      error.value = err.response?.data?.message || 'Có lỗi xảy ra'
      Swal.fire({
        icon: 'error',
        title: 'Lỗi',
        text: error.value
      })
      throw err
    } finally {
      loading.value = false
    }
  }

  // DELETE item
  const remove = async (id) => {
    const result = await Swal.fire({
      title: 'Xác nhận xóa?',
      text: 'Hành động này không thể hoàn tác!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy',
      confirmButtonColor: '#dc3545'
    })

    if (!result.isConfirmed) return false

    loading.value = true
    error.value = null
    try {
      await apiClient.delete(`${endpoint}/${id}`)
      
      const index = data.value.findIndex(item => item.id === id)
      if (index > -1) {
        data.value.splice(index, 1)
      }
      
      Swal.fire({
        icon: 'success',
        title: 'Đã xóa',
        text: 'Đã xóa thành công',
        timer: 1500,
        showConfirmButton: false
      })
      return true
    } catch (err) {
      error.value = err.response?.data?.message || 'Có lỗi xảy ra'
      Swal.fire({
        icon: 'error',
        title: 'Lỗi',
        text: error.value
      })
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    data,
    fetchAll,
    fetchOne,
    create,
    update,
    remove
  }
}

export default apiClient