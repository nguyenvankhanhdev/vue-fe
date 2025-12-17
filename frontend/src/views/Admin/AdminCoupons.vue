<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h1 class="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <div class="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                <i class="fas fa-ticket-alt text-white text-xl"></i>
              </div>
              Quản lý mã giảm giá
            </h1>
            <p class="text-gray-600 mt-2">Quản lý các mã giảm giá cho đơn hàng</p>
          </div>
          <button
            @click="openCreateModal"
            class="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <i class="fas fa-plus"></i>
            Tạo mã mới
          </button>
        </div>

        <!-- Filters -->
        <div class="bg-white rounded-xl shadow-md p-4">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <input
                v-model="filters.search"
                type="text"
                placeholder="Tìm kiếm mã..."
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
              />
            </div>
            <div>
              <select
                v-model="filters.status"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
              >
                <option value="">Tất cả trạng thái</option>
                <option value="1">Kích hoạt</option>
                <option value="0">Vô hiệu hóa</option>
              </select>
            </div>
            <div>
              <select
                v-model="filters.discount_type"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
              >
                <option value="">Tất cả loại</option>
                <option value="percentage">Phần trăm</option>
                <option value="fixed">Cố định</option>
              </select>
            </div>
            <div>
              <button
                @click="loadCoupons"
                class="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
              >
                <i class="fas fa-search mr-2"></i>
                Tìm kiếm
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="flex justify-center items-center py-20">
        <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-600"></div>
      </div>

      <!-- Coupons Table -->
      <div v-else class="bg-white rounded-xl shadow-lg overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gradient-to-r from-green-50 to-emerald-50">
              <tr>
                <th class="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Mã giảm giá
                </th>
                <th class="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Loại / Giá trị
                </th>
                <th class="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Điều kiện
                </th>
                <th class="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Thời gian
                </th>
                <th class="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th class="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="coupon in coupons" :key="coupon.id" class="hover:bg-gray-50 transition-colors">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg flex items-center justify-center">
                      <i class="fas fa-ticket-alt text-green-600"></i>
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-bold text-gray-900">{{ coupon.code }}</div>
                      <div class="text-xs text-gray-500">ID: {{ coupon.id }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm">
                    <div class="font-semibold text-gray-900">
                      <span v-if="coupon.discount_type === 'percentage'" class="text-orange-600">
                        {{ coupon.discount_value }}%
                      </span>
                      <span v-else class="text-green-600">
                        {{ formatPrice(coupon.discount_value) }}đ
                      </span>
                    </div>
                    <div class="text-xs text-gray-500">
                      {{ coupon.discount_type === 'percentage' ? 'Phần trăm' : 'Cố định' }}
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div class="text-sm space-y-1">
                    <!-- Order conditions -->
                    <div v-if="coupon.min_order_value" class="text-gray-600">
                      <i class="fas fa-dollar-sign text-xs text-gray-400 mr-1"></i>
                      Đơn tối thiểu: <span class="font-semibold">{{ formatPrice(coupon.min_order_value) }}đ</span>
                    </div>
                    <div v-if="coupon.max_discount_value" class="text-gray-600">
                      <i class="fas fa-arrow-down text-xs text-gray-400 mr-1"></i>
                      Giảm tối đa: <span class="font-semibold">{{ formatPrice(coupon.max_discount_value) }}đ</span>
                    </div>
                    
                    <!-- Membership conditions -->
                    <div v-if="coupon.is_first_order_only" class="text-blue-600">
                      <i class="fas fa-gift text-xs mr-1"></i>
                      Chỉ đơn đầu tiên
                    </div>
                    <div v-if="coupon.min_user_orders" class="text-purple-600">
                      <i class="fas fa-shopping-bag text-xs mr-1"></i>
                      Tối thiểu {{ coupon.min_user_orders }} đơn
                    </div>
                    <div v-if="coupon.min_total_spent" class="text-indigo-600">
                      <i class="fas fa-wallet text-xs mr-1"></i>
                      Chi {{ formatPrice(coupon.min_total_spent) }}đ
                    </div>
                    <div v-if="coupon.user_tier_required" class="text-yellow-600">
                      <i class="fas fa-crown text-xs mr-1"></i>
                      {{ getTierLabel(coupon.user_tier_required) }}
                    </div>
                    <div v-if="coupon.required_points" class="text-pink-600">
                      <i class="fas fa-coins text-xs mr-1"></i>
                      {{ coupon.required_points }} điểm
                    </div>
                    
                    <!-- Usage limits -->
                    <div v-if="coupon.usage_limit" class="text-orange-600">
                      <i class="fas fa-users text-xs mr-1"></i>
                      Giới hạn: {{ coupon.usage_count || 0 }}/{{ coupon.usage_limit }}
                    </div>
                    <div v-if="coupon.usage_limit_per_user" class="text-red-600">
                      <i class="fas fa-user text-xs mr-1"></i>
                      Max {{ coupon.usage_limit_per_user }} lần/người
                    </div>
                    
                    <div v-if="!hasAnyCondition(coupon)" class="text-gray-400 text-xs italic">
                      Không có điều kiện
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">
                  <div class="space-y-1">
                    <div v-if="coupon.start_date" class="text-gray-600">
                      <i class="fas fa-calendar-alt text-xs text-green-500 mr-1"></i>
                      {{ formatDate(coupon.start_date) }}
                    </div>
                    <div v-if="coupon.end_date" class="text-gray-600">
                      <i class="fas fa-calendar-times text-xs text-red-500 mr-1"></i>
                      {{ formatDate(coupon.end_date) }}
                    </div>
                    <div v-if="!coupon.start_date && !coupon.end_date" class="text-gray-400 text-xs italic">
                      Vô thời hạn
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="space-y-1">
                    <span
                      class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold"
                      :class="coupon.status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'"
                    >
                      <i class="fas mr-1" :class="coupon.status ? 'fa-check-circle' : 'fa-times-circle'"></i>
                      {{ coupon.status ? 'Kích hoạt' : 'Vô hiệu' }}
                    </span>
                    <span
                      v-if="coupon.is_active"
                      class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800"
                    >
                      <i class="fas fa-bolt mr-1"></i>
                      Đang hoạt động
                    </span>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div class="flex items-center justify-end gap-2">
                    <button
                      @click="toggleStatus(coupon)"
                      :class="coupon.status ? 'bg-orange-100 hover:bg-orange-200 text-orange-700' : 'bg-green-100 hover:bg-green-200 text-green-700'"
                      class="p-2 rounded-lg transition-colors"
                      :title="coupon.status ? 'Vô hiệu hóa' : 'Kích hoạt'"
                    >
                      <i class="fas" :class="coupon.status ? 'fa-toggle-on' : 'fa-toggle-off'"></i>
                    </button>
                    <button
                      @click="openEditModal(coupon)"
                      class="p-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors"
                      title="Chỉnh sửa"
                    >
                      <i class="fas fa-edit"></i>
                    </button>
                    <button
                      @click="deleteCoupon(coupon)"
                      class="p-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors"
                      title="Xóa"
                    >
                      <i class="fas fa-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Empty State -->
        <div v-if="coupons.length === 0" class="text-center py-12">
          <i class="fas fa-ticket-alt text-gray-300 text-6xl mb-4"></i>
          <p class="text-gray-500 text-lg">Chưa có mã giảm giá nào</p>
        </div>
      </div>
    </div>

    <!-- Create/Edit Modal -->
    <Transition name="modal">
      <div v-if="showModal" class="fixed inset-0 z-50 overflow-y-auto">
        <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <div class="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" @click="closeModal"></div>

          <div class="inline-block w-full max-w-2xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-2xl rounded-2xl">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-2xl font-bold text-gray-900 flex items-center gap-3">
                <div class="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                  <i class="fas fa-ticket-alt text-white"></i>
                </div>
                {{ isEditMode ? 'Chỉnh sửa mã giảm giá' : 'Tạo mã giảm giá mới' }}
              </h3>
              <button @click="closeModal" class="text-gray-400 hover:text-gray-600 transition-colors">
                <i class="fas fa-times text-2xl"></i>
              </button>
            </div>

            <form @submit.prevent="saveCoupon" class="space-y-4">
              <!-- Code -->
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">
                  Mã giảm giá *
                </label>
                <input
                  v-model="form.code"
                  type="text"
                  placeholder="VD: SUMMER2024"
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-green-500 uppercase"
                  required
                />
              </div>

              <!-- Discount Type & Value -->
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">
                    Loại giảm giá *
                  </label>
                  <select
                    v-model="form.discount_type"
                    class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-green-500"
                    required
                  >
                    <option value="percentage">Phần trăm (%)</option>
                    <option value="fixed">Số tiền cố định (VNĐ)</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">
                    Giá trị *
                  </label>
                  <input
                    v-model.number="form.discount_value"
                    type="number"
                    min="0"
                    step="0.01"
                    :placeholder="form.discount_type === 'percentage' ? 'VD: 10' : 'VD: 50000'"
                    class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-green-500"
                    required
                  />
                </div>
              </div>

              <!-- Date Range -->
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">
                    Ngày bắt đầu
                  </label>
                  <input
                    v-model="form.start_date"
                    type="date"
                    class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-green-500"
                  />
                </div>
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">
                    Ngày kết thúc
                  </label>
                  <input
                    v-model="form.end_date"
                    type="date"
                    class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-green-500"
                  />
                </div>
              </div>

              <!-- Order Conditions -->
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">
                    Giá trị đơn hàng tối thiểu
                  </label>
                  <input
                    v-model.number="form.min_order_value"
                    type="number"
                    min="0"
                    placeholder="VD: 100000"
                    class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-green-500"
                  />
                </div>
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">
                    Giảm giá tối đa
                  </label>
                  <input
                    v-model.number="form.max_discount_value"
                    type="number"
                    min="0"
                    placeholder="VD: 200000"
                    class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-green-500"
                  />
                </div>
              </div>

              <!-- Membership Requirements -->
              <div class="border-t pt-4">
                <h4 class="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <i class="fas fa-crown text-yellow-500"></i>
                  Điều kiện thành viên
                </h4>

                <!-- First Order Only -->
                <div class="mb-4">
                  <div class="flex items-center">
                    <input
                      v-model="form.is_first_order_only"
                      type="checkbox"
                      id="is_first_order_only"
                      class="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    />
                    <label for="is_first_order_only" class="ml-3 text-sm font-semibold text-gray-700">
                      Chỉ áp dụng cho đơn hàng đầu tiên
                    </label>
                  </div>
                </div>

                <div class="grid grid-cols-2 gap-4">
                  <!-- Min User Orders -->
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                      Số đơn tối thiểu
                    </label>
                    <input
                      v-model.number="form.min_user_orders"
                      type="number"
                      min="0"
                      placeholder="VD: 5"
                      class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-green-500"
                    />
                  </div>

                  <!-- Min Total Spent -->
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                      Tổng chi tiêu tối thiểu
                    </label>
                    <input
                      v-model.number="form.min_total_spent"
                      type="number"
                      min="0"
                      placeholder="VD: 2000000"
                      class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-green-500"
                    />
                  </div>

                  <!-- User Tier Required -->
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                      Tier yêu cầu
                    </label>
                    <select
                      v-model="form.user_tier_required"
                      class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-green-500"
                    >
                      <option :value="null">Không yêu cầu</option>
                      <option value="bronze">🥉 Bronze</option>
                      <option value="silver">🥈 Silver</option>
                      <option value="gold">🥇 Gold</option>
                      <option value="vip">💎 VIP</option>
                    </select>
                  </div>

                  <!-- Required Points -->
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                      Điểm loyalty yêu cầu
                    </label>
                    <input
                      v-model.number="form.required_points"
                      type="number"
                      min="0"
                      placeholder="VD: 500"
                      class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-green-500"
                    />
                  </div>
                </div>
              </div>

              <!-- Usage Limits -->
              <div class="border-t pt-4">
                <h4 class="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <i class="fas fa-chart-line text-blue-500"></i>
                  Giới hạn sử dụng
                </h4>

                <div class="grid grid-cols-2 gap-4">
                  <!-- Total Usage Limit -->
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                      Giới hạn tổng số lần sử dụng
                    </label>
                    <input
                      v-model.number="form.usage_limit"
                      type="number"
                      min="0"
                      placeholder="VD: 1000"
                      class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-green-500"
                    />
                  </div>

                  <!-- Per User Usage Limit -->
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                      Giới hạn mỗi người dùng
                    </label>
                    <input
                      v-model.number="form.usage_limit_per_user"
                      type="number"
                      min="0"
                      placeholder="VD: 1"
                      class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-green-500"
                    />
                  </div>
                </div>
              </div>

              <!-- Status -->
              <div class="flex items-center border-t pt-4">
                <input
                  v-model="form.status"
                  type="checkbox"
                  id="status"
                  class="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
                />
                <label for="status" class="ml-3 text-sm font-semibold text-gray-700">
                  Kích hoạt ngay
                </label>
              </div>

              <!-- Actions -->
              <div class="flex justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  @click="closeModal"
                  class="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  :disabled="saving"
                  class="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50"
                >
                  <i class="fas fa-save mr-2"></i>
                  {{ saving ? 'Đang lưu...' : 'Lưu' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import couponService from '@/services/couponService'
import toast from '@/services/toast'
import Swal from 'sweetalert2'

const loading = ref(false)
const saving = ref(false)
const coupons = ref([])
const showModal = ref(false)
const isEditMode = ref(false)
const filters = ref({
  search: '',
  status: '',
  discount_type: ''
})

const form = ref({
  id: null,
  code: '',
  discount_type: 'percentage',
  discount_value: 0,
  start_date: '',
  end_date: '',
  min_order_value: null,
  max_discount_value: null,
  status: true,
  // Membership fields
  is_first_order_only: false,
  min_user_orders: null,
  min_total_spent: null,
  user_tier_required: null,
  required_points: null,
  // Usage limits
  usage_limit: null,
  usage_limit_per_user: null
})

const formatPrice = (price) => {
  return new Intl.NumberFormat('vi-VN').format(price)
}

const formatDate = (date) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString('vi-VN')
}

const getTierLabel = (tier) => {
  const tiers = {
    'bronze': '🥉 Bronze',
    'silver': '🥈 Silver',
    'gold': '🥇 Gold',
    'vip': '💎 VIP'
  }
  return tiers[tier] || tier
}

const hasAnyCondition = (coupon) => {
  return !!(
    coupon.min_order_value ||
    coupon.max_discount_value ||
    coupon.is_first_order_only ||
    coupon.min_user_orders ||
    coupon.min_total_spent ||
    coupon.user_tier_required ||
    coupon.required_points ||
    coupon.usage_limit ||
    coupon.usage_limit_per_user
  )
}

const loadCoupons = async () => {
  loading.value = true
  try {
    const response = await couponService.getAllCoupons(filters.value)
    console.log('Coupon response:', response)
    
    // Check different response structures
    if (response.data) {
      coupons.value = response.data
    } else if (Array.isArray(response)) {
      coupons.value = response
    } else {
      coupons.value = []
    }
  } catch (error) {
    console.error('Load coupons error:', error)
    toast.error('Không thể tải danh sách mã giảm giá')
  } finally {
    loading.value = false
  }
}

const openCreateModal = () => {
  isEditMode.value = false
  form.value = {
    id: null,
    code: '',
    discount_type: 'percentage',
    discount_value: 0,
    start_date: '',
    end_date: '',
    min_order_value: null,
    max_discount_value: null,
    status: true,
    // Membership fields
    is_first_order_only: false,
    min_user_orders: null,
    min_total_spent: null,
    user_tier_required: null,
    required_points: null,
    // Usage limits
    usage_limit: null,
    usage_limit_per_user: null
  }
  showModal.value = true
}

const openEditModal = (coupon) => {
  isEditMode.value = true
  form.value = {
    id: coupon.id,
    code: coupon.code,
    discount_type: coupon.discount_type,
    discount_value: coupon.discount_value,
    start_date: coupon.start_date,
    end_date: coupon.end_date,
    min_order_value: coupon.min_order_value,
    max_discount_value: coupon.max_discount_value,
    status: coupon.status,
    // Membership fields
    is_first_order_only: coupon.is_first_order_only || false,
    min_user_orders: coupon.min_user_orders,
    min_total_spent: coupon.min_total_spent,
    user_tier_required: coupon.user_tier_required,
    required_points: coupon.required_points,
    // Usage limits
    usage_limit: coupon.usage_limit,
    usage_limit_per_user: coupon.usage_limit_per_user
  }
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}

const saveCoupon = async () => {
  saving.value = true
  try {
    const data = { ...form.value }
    delete data.id

    let response
    if (isEditMode.value) {
      response = await couponService.updateCoupon(form.value.id, data)
    } else {
      response = await couponService.createCoupon(data)
    }

    console.log('Save response:', response)
    toast.success(isEditMode.value ? 'Cập nhật thành công' : 'Tạo mã thành công')
    closeModal()
    loadCoupons()
  } catch (error) {
    console.error('Save error:', error)
    toast.error(error.response?.data?.message || 'Có lỗi xảy ra')
  } finally {
    saving.value = false
  }
}

const toggleStatus = async (coupon) => {
  try {
    const response = await couponService.toggleStatus(coupon.id)
    console.log('Toggle response:', response)
    toast.success('Cập nhật trạng thái thành công')
    loadCoupons()
  } catch (error) {
    console.error('Toggle error:', error)
    toast.error('Không thể cập nhật trạng thái')
  }
}

const deleteCoupon = async (coupon) => {
  const result = await Swal.fire({
    title: 'Xác nhận xóa?',
    text: `Bạn có chắc muốn xóa mã "${coupon.code}"?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#ef4444',
    cancelButtonColor: '#6b7280',
    confirmButtonText: 'Xóa',
    cancelButtonText: 'Hủy'
  })

  if (result.isConfirmed) {
    try {
      const response = await couponService.deleteCoupon(coupon.id)
      console.log('Delete response:', response)
      toast.success('Xóa mã thành công')
      loadCoupons()
    } catch (error) {
      console.error('Delete error:', error)
      toast.error('Không thể xóa mã giảm giá')
    }
  }
}

onMounted(() => {
  loadCoupons()
})
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
