<template>
  <div class="bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-lg p-6 border-2" :class="tierBorderClass">
    <!-- Current Tier -->
    <div class="text-center mb-6">
      <div class="inline-flex items-center justify-center w-20 h-20 rounded-full mb-3" :class="tierGradient">
        <span class="text-4xl">{{ tierEmoji }}</span>
      </div>
      <h3 class="text-2xl font-bold mb-1" :class="tierTextClass">{{ tierName }}</h3>
      <p class="text-gray-600 text-sm">{{ tierBenefits }}</p>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-3 gap-4 mb-6">
      <div class="text-center p-3 bg-gray-50 rounded-xl">
        <div class="text-2xl font-bold text-blue-600">{{ user.total_orders || 0 }}</div>
        <div class="text-xs text-gray-600 mt-1">Đơn hàng</div>
      </div>
      <div class="text-center p-3 bg-gray-50 rounded-xl">
        <div class="text-2xl font-bold text-green-600">{{ formatPrice(user.total_spent || 0) }}</div>
        <div class="text-xs text-gray-600 mt-1">Đã chi (k)</div>
      </div>
      <div class="text-center p-3 bg-gray-50 rounded-xl">
        <div class="text-2xl font-bold text-purple-600">{{ user.loyalty_points || 0 }}</div>
        <div class="text-xs text-gray-600 mt-1">Điểm</div>
      </div>
    </div>

    <!-- Progress to Next Tier -->
    <div v-if="nextTier" class="space-y-4">
      <div class="flex items-center justify-between">
        <span class="text-sm font-semibold text-gray-700">Thăng hạng lên {{ nextTier.name }}</span>
        <span class="text-xs text-gray-500">{{ Math.round(nextTierProgress) }}%</span>
      </div>

      <!-- Orders Progress -->
      <div>
        <div class="flex justify-between text-xs text-gray-600 mb-1">
          <span>Đơn hàng</span>
          <span>{{ user.total_orders || 0 }}/{{ nextTier.requirements.orders }}</span>
        </div>
        <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            class="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500"
            :style="{ width: `${Math.min(ordersProgress, 100)}%` }"
          ></div>
        </div>
      </div>

      <!-- Spending Progress -->
      <div>
        <div class="flex justify-between text-xs text-gray-600 mb-1">
          <span>Chi tiêu</span>
          <span>{{ formatPrice(user.total_spent || 0) }}/{{ formatPrice(nextTier.requirements.spent) }}</span>
        </div>
        <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            class="h-full bg-gradient-to-r from-green-500 to-green-600 transition-all duration-500"
            :style="{ width: `${Math.min(spentProgress, 100)}%` }"
          ></div>
        </div>
      </div>

      <!-- Remaining Requirements -->
      <div class="bg-blue-50 border border-blue-200 rounded-xl p-3">
        <div class="text-xs font-semibold text-blue-800 mb-2">
          <i class="fas fa-info-circle mr-1"></i>
          Cần thêm để thăng hạng:
        </div>
        <div class="space-y-1 text-xs text-blue-700">
          <div v-if="ordersNeeded > 0">
            <i class="fas fa-shopping-cart mr-1"></i>
            {{ ordersNeeded }} đơn hàng
          </div>
          <div v-if="spentNeeded > 0">
            <i class="fas fa-dollar-sign mr-1"></i>
            {{ formatPrice(spentNeeded) }}đ
          </div>
          <div v-if="ordersNeeded <= 0 && spentNeeded <= 0" class="text-green-600 font-semibold">
            <i class="fas fa-check-circle mr-1"></i>
            Đã đủ điều kiện thăng hạng!
          </div>
        </div>
      </div>
    </div>

    <!-- Max Tier Achieved -->
    <div v-else class="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-xl p-4 text-center">
      <div class="text-3xl mb-2">🎉</div>
      <div class="font-bold text-yellow-800">Chúc mừng!</div>
      <div class="text-sm text-yellow-700">Bạn đã đạt hạng thành viên cao nhất</div>
    </div>

    <!-- Tier Benefits -->
    <div class="mt-6 pt-6 border-t border-gray-200">
      <h4 class="font-bold text-gray-800 mb-3 flex items-center gap-2">
        <i class="fas fa-gift text-purple-600"></i>
        Ưu đãi của bạn
      </h4>
      <div class="space-y-2">
        <div v-for="(benefit, index) in currentTierBenefits" :key="index" class="flex items-start gap-2 text-sm text-gray-700">
          <i class="fas fa-check-circle text-green-500 mt-0.5"></i>
          <span>{{ benefit }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  user: {
    type: Object,
    required: true
  }
})

const formatPrice = (price) => {
  return new Intl.NumberFormat('vi-VN').format(Math.round(price / 1000))
}

const tierConfig = {
  bronze: {
    name: 'Bronze',
    emoji: '🥉',
    gradient: 'bg-gradient-to-br from-orange-400 to-orange-600',
    textClass: 'text-orange-600',
    borderClass: 'border-orange-300',
    benefits: [
      'Mã giảm giá chào mừng',
      'Hỗ trợ khách hàng cơ bản',
      'Thông báo sản phẩm mới'
    ]
  },
  silver: {
    name: 'Silver',
    emoji: '🥈',
    gradient: 'bg-gradient-to-br from-gray-400 to-gray-600',
    textClass: 'text-gray-600',
    borderClass: 'border-gray-300',
    requirements: { orders: 5, spent: 2000000 },
    benefits: [
      'Giảm 10% cho đơn hàng',
      'Hỗ trợ ưu tiên',
      'Tích điểm x1.2',
      'Miễn phí vận chuyển (đơn > 300k)'
    ]
  },
  gold: {
    name: 'Gold',
    emoji: '🥇',
    gradient: 'bg-gradient-to-br from-yellow-400 to-yellow-600',
    textClass: 'text-yellow-600',
    borderClass: 'border-yellow-300',
    requirements: { orders: 10, spent: 5000000 },
    benefits: [
      'Giảm 20% cho đơn hàng',
      'Miễn phí vận chuyển (đơn > 200k)',
      'Tích điểm x1.5',
      'Quà sinh nhật đặc biệt',
      'Xem trước sản phẩm mới'
    ]
  },
  vip: {
    name: 'VIP',
    emoji: '💎',
    gradient: 'bg-gradient-to-br from-purple-500 to-pink-600',
    textClass: 'text-purple-600',
    borderClass: 'border-purple-300',
    requirements: { orders: 20, spent: 10000000 },
    benefits: [
      'Giảm 30% cho đơn hàng',
      'Miễn phí vận chuyển toàn bộ',
      'Tích điểm x2',
      'Hỗ trợ VIP 24/7',
      'Coupon độc quyền',
      'Sự kiện riêng cho VIP',
      'Quà tặng cao cấp'
    ]
  }
}

const currentTier = computed(() => props.user.tier || 'bronze')

const tierEmoji = computed(() => tierConfig[currentTier.value].emoji)
const tierName = computed(() => tierConfig[currentTier.value].name)
const tierGradient = computed(() => tierConfig[currentTier.value].gradient)
const tierTextClass = computed(() => tierConfig[currentTier.value].textClass)
const tierBorderClass = computed(() => tierConfig[currentTier.value].borderClass)
const tierBenefits = computed(() => {
  const benefits = {
    bronze: 'Thành viên mới',
    silver: 'Khách hàng thân thiết',
    gold: 'Khách hàng VIP',
    vip: 'Khách hàng đặc biệt'
  }
  return benefits[currentTier.value]
})

const currentTierBenefits = computed(() => tierConfig[currentTier.value].benefits)

const nextTier = computed(() => {
  const tiers = ['bronze', 'silver', 'gold', 'vip']
  const currentIndex = tiers.indexOf(currentTier.value)
  
  if (currentIndex === -1 || currentIndex === tiers.length - 1) {
    return null
  }
  
  const nextTierKey = tiers[currentIndex + 1]
  return {
    key: nextTierKey,
    name: tierConfig[nextTierKey].name,
    requirements: tierConfig[nextTierKey].requirements
  }
})

const ordersProgress = computed(() => {
  if (!nextTier.value) return 100
  return ((props.user.total_orders || 0) / nextTier.value.requirements.orders) * 100
})

const spentProgress = computed(() => {
  if (!nextTier.value) return 100
  return ((props.user.total_spent || 0) / nextTier.value.requirements.spent) * 100
})

const nextTierProgress = computed(() => {
  if (!nextTier.value) return 100
  return (ordersProgress.value + spentProgress.value) / 2
})

const ordersNeeded = computed(() => {
  if (!nextTier.value) return 0
  return Math.max(0, nextTier.value.requirements.orders - (props.user.total_orders || 0))
})

const spentNeeded = computed(() => {
  if (!nextTier.value) return 0
  return Math.max(0, nextTier.value.requirements.spent - (props.user.total_spent || 0))
})
</script>

<style scoped>
/* Smooth animations */
@keyframes shimmer {
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
}
</style>
