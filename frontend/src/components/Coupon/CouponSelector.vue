<template>
  <div class="coupon-selector">
    <!-- Applied Coupon Display -->
    <div v-if="appliedCoupon" class="applied-coupon">
      <div class="applied-header">
        <div class="flex items-center gap-2">
          <i class="fas fa-check-circle text-green-600"></i>
          <span class="font-bold text-green-800">{{ appliedCoupon.code }}</span>
        </div>
        <button @click="removeCoupon" class="remove-btn">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="applied-body">
        <div class="discount-info">
          <span class="label">Giảm giá:</span>
          <span class="value">{{ appliedCoupon.discount_type === 'percentage' 
            ? `${appliedCoupon.discount_value}%` 
            : `${formatPrice(appliedCoupon.discount_value)}đ` }}</span>
        </div>
        <div v-if="discountAmount" class="discount-amount">
          -{{ formatPrice(discountAmount) }}đ
        </div>
      </div>
    </div>

    <!-- Apply Coupon Form -->
    <div v-else class="apply-form">
      <div class="input-group">
        <input
          v-model="couponCode"
          type="text"
          placeholder="Nhập mã giảm giá"
          class="coupon-input"
          @keyup.enter="applyCoupon"
        />
        <button
          @click="applyCoupon"
          :disabled="!couponCode || applying"
          class="apply-btn"
        >
          <i v-if="applying" class="fas fa-spinner fa-spin"></i>
          <span v-else>Áp dụng</span>
        </button>
      </div>

      <!-- Toggle Available Coupons -->
      <button
        @click="showAvailableCoupons = !showAvailableCoupons"
        class="toggle-coupons-btn"
      >
        <i class="fas" :class="showAvailableCoupons ? 'fa-chevron-up' : 'fa-chevron-down'"></i>
        <span>{{ showAvailableCoupons ? 'Ẩn' : 'Xem' }} mã giảm giá</span>
      </button>

      <!-- Available Coupons List -->
      <Transition name="slide-fade">
        <div v-if="showAvailableCoupons" class="coupons-list">
          <!-- Loading -->
          <div v-if="loadingCoupons" class="loading-state">
            <div class="spinner"></div>
            <span>Đang tải...</span>
          </div>

          <!-- Empty -->
          <div v-else-if="eligibleCoupons.length === 0" class="empty-state">
            <i class="fas fa-inbox"></i>
            <p>Không có mã giảm giá</p>
          </div>

          <!-- Coupons -->
          <div v-else class="coupon-items">
            <div
              v-for="coupon in eligibleCoupons"
              :key="coupon.id"
              class="coupon-card"
              @click="selectCoupon(coupon.code)"
            >
              <div class="coupon-header">
                <div class="coupon-code">{{ coupon.code }}</div>
                <button class="quick-apply-btn">
                  Áp dụng
                </button>
              </div>
              
              <div class="coupon-value">
                {{ coupon.discount_type === 'percentage' 
                  ? `Giảm ${coupon.discount_value}%` 
                  : `Giảm ${formatPrice(coupon.discount_value)}đ` }}
              </div>

              <!-- Badges -->
              <div class="coupon-badges">
                <span v-if="coupon.is_first_order_only" class="badge badge-blue">
                  <i class="fas fa-gift"></i> Đơn đầu
                </span>
                <span v-if="coupon.user_tier_required" class="badge badge-gold">
                  <i class="fas fa-crown"></i> {{ getTierLabel(coupon.user_tier_required) }}
                </span>
                <span v-if="coupon.required_points" class="badge badge-pink">
                  <i class="fas fa-coins"></i> {{ coupon.required_points }} điểm
                </span>
              </div>

              <!-- Conditions -->
              <div class="coupon-conditions">
                <div v-if="coupon.min_order_value" class="condition">
                  <i class="fas fa-shopping-cart"></i>
                  Đơn từ {{ formatPrice(coupon.min_order_value) }}đ
                </div>
                <div v-if="coupon.max_discount_value" class="condition">
                  <i class="fas fa-arrow-down"></i>
                  Giảm tối đa {{ formatPrice(coupon.max_discount_value) }}đ
                </div>
                <div v-if="coupon.usage_limit" class="condition">
                  <i class="fas fa-users"></i>
                  Còn {{ coupon.remaining_usage || 0 }} lượt
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import couponService from '@/services/couponService'
import toast from '@/services/toast'

const props = defineProps({
  orderTotal: {
    type: Number,
    required: true
  },
  userId: {
    type: Number,
    default: null
  }
})

const emit = defineEmits(['coupon-applied', 'coupon-removed'])

const couponCode = ref('')
const appliedCoupon = ref(null)
const discountAmount = ref(0)
const applying = ref(false)
const showAvailableCoupons = ref(false)
const loadingCoupons = ref(false)
const eligibleCoupons = ref([])

const formatPrice = (price) => {
  return new Intl.NumberFormat('vi-VN').format(price)
}

const getTierLabel = (tier) => {
  const tiers = {
    'bronze': 'Bronze',
    'silver': 'Silver',
    'gold': 'Gold',
    'vip': 'VIP'
  }
  return tiers[tier] || tier
}

const loadEligibleCoupons = async () => {
  if (!props.userId) return
  
  loadingCoupons.value = true
  try {
    const response = await couponService.getMyEligibleCoupons(props.orderTotal)
    
    if (response.data) {
      eligibleCoupons.value = response.data
    } else if (Array.isArray(response)) {
      eligibleCoupons.value = response
    }
  } catch (error) {
    console.error('Load eligible coupons error:', error)
  } finally {
    loadingCoupons.value = false
  }
}

const selectCoupon = (code) => {
  couponCode.value = code
  applyCoupon()
}

const applyCoupon = async () => {
  if (!couponCode.value) {
    toast.warning('Vui lòng nhập mã giảm giá')
    return
  }

  applying.value = true
  try {
    const response = await couponService.validateCoupon(
      couponCode.value.toUpperCase(),
      props.orderTotal,
      props.userId
    )

    // Handle different response structures
    let data = null
    if (response.success && response.data) {
      data = response.data
    } else if (response.data && response.data.coupon) {
      data = response.data
    } else if (response.coupon) {
      data = response
    }

    if (data && data.coupon) {
      appliedCoupon.value = data.coupon
      discountAmount.value = data.discount_amount || 0
      
      toast.success('Áp dụng mã giảm giá thành công!')
      
      emit('coupon-applied', {
        coupon: data.coupon,
        discount_amount: data.discount_amount,
        final_total: data.final_total
      })
      
      showAvailableCoupons.value = false
    } else {
      toast.error('Không thể áp dụng mã giảm giá')
    }
  } catch (error) {
    console.error('Apply coupon error:', error)
    const message = error.response?.data?.message || 'Mã giảm giá không hợp lệ'
    toast.error(message)
  } finally {
    applying.value = false
  }
}

const removeCoupon = () => {
  appliedCoupon.value = null
  discountAmount.value = 0
  couponCode.value = ''
  
  toast.info('Đã xóa mã giảm giá')
  emit('coupon-removed')
}

// Watch for order total changes
watch(() => props.orderTotal, () => {
  if (appliedCoupon.value) {
    // Re-validate coupon when order total changes
    applyCoupon()
  }
})

onMounted(() => {
  if (props.userId) {
    loadEligibleCoupons()
  }
})
</script>

<style scoped>
.coupon-selector {
  margin-bottom: 1.5rem;
}

/* Applied Coupon */
.applied-coupon {
  background: linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%);
  border: 2px solid #28a745;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(40, 167, 69, 0.15);
}

.applied-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.75rem;
}

.remove-btn {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(220, 53, 69, 0.1);
  border: none;
  border-radius: 50%;
  color: #dc3545;
  cursor: pointer;
  transition: all 0.2s;
}

.remove-btn:hover {
  background: #dc3545;
  color: white;
  transform: scale(1.1);
}

.applied-body {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.discount-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.discount-info .label {
  font-size: 0.75rem;
  color: #155724;
}

.discount-info .value {
  font-size: 0.875rem;
  font-weight: 600;
  color: #155724;
}

.discount-amount {
  font-size: 1.25rem;
  font-weight: 700;
  color: #28a745;
}

/* Apply Form */
.apply-form {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.input-group {
  display: flex;
  gap: 0.5rem;
}

.coupon-input {
  flex: 1;
  padding: 0.75rem 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.875rem;
  text-transform: uppercase;
  transition: all 0.2s;
}

.coupon-input:focus {
  outline: none;
  border-color: #10b981;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
}

.apply-btn {
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
  min-width: 90px;
}

.apply-btn:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
}

.apply-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.toggle-coupons-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem;
  background: none;
  border: none;
  color: #10b981;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.toggle-coupons-btn:hover {
  color: #059669;
}

/* Coupons List */
.coupons-list {
  margin-top: 1rem;
  max-height: 400px;
  overflow-y: auto;
}

.loading-state,
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  color: #94a3b8;
}

.spinner {
  width: 32px;
  height: 32px;
  border: 3px solid #e2e8f0;
  border-top-color: #10b981;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.empty-state i {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.coupon-items {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.coupon-card {
  padding: 1rem;
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s;
}

.coupon-card:hover {
  border-color: #10b981;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.1);
  transform: translateY(-2px);
}

.coupon-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.coupon-code {
  font-size: 1rem;
  font-weight: 700;
  color: #1e293b;
  letter-spacing: 0.5px;
}

.quick-apply-btn {
  padding: 0.375rem 0.875rem;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.quick-apply-btn:hover {
  transform: scale(1.05);
}

.coupon-value {
  font-size: 0.875rem;
  font-weight: 600;
  color: #059669;
  margin-bottom: 0.5rem;
}

.coupon-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
  margin-bottom: 0.5rem;
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.6875rem;
  font-weight: 600;
}

.badge-blue {
  background: #dbeafe;
  color: #1e40af;
}

.badge-gold {
  background: #fef3c7;
  color: #b45309;
}

.badge-pink {
  background: #fce7f3;
  color: #be185d;
}

.coupon-conditions {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.condition {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.75rem;
  color: #64748b;
}

.condition i {
  width: 12px;
  font-size: 0.6875rem;
}

/* Transitions */
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}

/* Scrollbar */
.coupons-list::-webkit-scrollbar {
  width: 6px;
}

.coupons-list::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 3px;
}

.coupons-list::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

.coupons-list::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>
