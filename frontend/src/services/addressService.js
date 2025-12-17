import apiClient from './apiClient'

const addressService = {
  /**
   * Lấy danh sách tất cả tỉnh/thành phố
   * @returns {Promise} Response chứa danh sách provinces (id, name)
   */
  async getProvinces() {
    try {
      const response = await apiClient.get('/address/provinces')
      return response.data
    } catch (error) {
      console.error('❌ Get provinces error:', error.response?.data || error.message)
      throw error
    }
  },

  /**
   * Lấy danh sách quận/huyện theo tỉnh
   * @param {number} provinceId - ID của tỉnh/thành phố
   * @returns {Promise} Response chứa danh sách districts (id, name)
   */
  async getDistricts(provinceId) {
    try {
      const response = await apiClient.get('/address/districts', {
        params: { province_id: provinceId }
      })
      return response.data
    } catch (error) {
      console.error('❌ Get districts error:', error.response?.data || error.message)
      throw error
    }
  },

  /**
   * Lấy danh sách phường/xã theo quận/huyện
   * @param {number} districtId - ID của quận/huyện
   * @returns {Promise} Response chứa danh sách wards (id, name)
   */
  async getWards(districtId) {
    try {
      const response = await apiClient.get('/address/wards', {
        params: { district_id: districtId }
      })
      return response.data
    } catch (error) {
      console.error('❌ Get wards error:', error.response?.data || error.message)
      throw error
    }
  },

  /**
   * Lấy địa chỉ đầy đủ theo province_id, district_id, ward_id
   * @param {number} provinceId - ID tỉnh/thành phố
   * @param {number} districtId - ID quận/huyện
   * @param {number} wardId - ID phường/xã
   * @returns {Promise} Response chứa địa chỉ đầy đủ
   */
  async getFullAddress(provinceId, districtId, wardId) {
    try {
      const response = await apiClient.get('/address/full', {
        params: {
          province_id: provinceId,
          district_id: districtId,
          ward_id: wardId
        }
      })
      return response.data
    } catch (error) {
      console.error('Get full address error:', error)
      throw error
    }
  }
}

export default addressService
