<template>
  <div class="orders-page">
    <!-- Page Header -->
    <section class="page-header">
      <div class="container">
        <h1>Đơn hàng của tôi</h1>
        <p>Theo dõi và quản lý các đơn hàng của bạn</p>
      </div>
    </section>

    <!-- Orders Content -->
    <section class="orders-section py-5">
      <div class="container">
        <!-- Order Filters -->
        <div class="orders-filters">
          <div class="filter-tabs">
            <button 
              v-for="status in orderStatuses" 
              :key="status.key"
              @click="activeFilter = status.key"
              :class="{ active: activeFilter === status.key }"
              class="filter-tab"
            >
              {{ status.label }}
              <span v-if="getOrderCount(status.key) > 0" class="count">
                {{ getOrderCount(status.key) }}
              </span>
            </button>
          </div>
          
          <div class="filter-actions">
            <div class="search-box">
              <input 
                type="text" 
                v-model="searchQuery"
                placeholder="Tìm kiếm đơn hàng..."
                class="search-input"
              />
              <i class="fas fa-search"></i>
            </div>
            
            <select v-model="sortBy" class="sort-select">
              <option value="newest">Mới nhất</option>
              <option value="oldest">Cũ nhất</option>
              <option value="highest">Giá trị cao nhất</option>
              <option value="lowest">Giá trị thấp nhất</option>
            </select>
          </div>
        </div>

        <!-- Orders List -->
        <div class="orders-list">
          <div v-if="loading" class="loading-state">
            <div class="spinner"></div>
            <p>Đang tải đơn hàng...</p>
          </div>

          <div v-else-if="filteredOrders.length === 0" class="empty-state">
            <i class="fas fa-shopping-bag"></i>
            <h3>Không có đơn hàng nào</h3>
            <p>{{ getEmptyMessage() }}</p>
            <router-link to="/products" class="btn btn-primary">
              Tiếp tục mua sắm
            </router-link>
          </div>

          <div v-else class="orders-container">
            <div 
              v-for="order in filteredOrders" 
              :key="order.id"
              class="order-card"
              :class="`status-${order.status}`"
            >
              <!-- Order Header -->
              <div class="order-header">
                <div class="order-info">
                  <h3>Đơn hàng #{{ order.orderNumber }}</h3>
                  <div class="order-meta">
                    <span class="order-date">
                      <i class="fas fa-calendar"></i>
                      {{ formatDate(order.createdAt) }}
                    </span>
                    <span class="order-total">
                      <i class="fas fa-dollar-sign"></i>
                      {{ formatPrice(order.total) }}đ
                    </span>
                  </div>
                </div>
                
                <div class="order-status">
                  <span class="status-badge" :class="`status-${order.status}`">
                    {{ getStatusLabel(order.status) }}
                  </span>
                  <button @click="toggleOrderDetails(order)" class="toggle-btn">
                    <i :class="order.showDetails ? 'fas fa-chevron-up' : 'fas fa-chevron-down'"></i>
                  </button>
                </div>
              </div>

              <!-- Order Items Preview -->
              <div class="order-preview">
                <div class="items-preview">
                  <div 
                    v-for="(item, index) in order.items.slice(0, 3)" 
                    :key="item.id"
                    class="preview-item"
                  >
                    <img :src="item.image" :alt="item.name" />
                  </div>
                  <div v-if="order.items.length > 3" class="more-items">
                    +{{ order.items.length - 3 }}
                  </div>
                </div>
                
                <div class="order-summary">
                  <p class="items-count">{{ order.items.length }} sản phẩm</p>
                  <div class="order-actions">
                    <button 
                      v-if="canTrackOrder(order)"
                      @click="trackOrder(order)"
                      class="action-btn track-btn"
                    >
                      <i class="fas fa-truck"></i>
                      Theo dõi
                    </button>
                    <button 
                      v-if="canReorder(order)"
                      @click="reorder(order)"
                      class="action-btn reorder-btn"
                    >
                      <i class="fas fa-redo"></i>
                      Mua lại
                    </button>
                    <button 
                      v-if="canCancel(order)"
                      @click="cancelOrder(order)"
                      class="action-btn cancel-btn"
                    >
                      <i class="fas fa-times"></i>
                      Hủy
                    </button>
                    <button 
                      v-if="canReview(order)"
                      @click="reviewOrder(order)"
                      class="action-btn review-btn"
                    >
                      <i class="fas fa-star"></i>
                      Đánh giá
                    </button>
                  </div>
                </div>
              </div>

              <!-- Order Details (Expanded) -->
              <div v-if="order.showDetails" class="order-details">
                <!-- Shipping Info -->
                <div class="detail-section">
                  <h4>Thông tin giao hàng</h4>
                  <div class="shipping-info">
                    <p><strong>Người nhận:</strong> {{ order.shipping.name }}</p>
                    <p><strong>Số điện thoại:</strong> {{ order.shipping.phone }}</p>
                    <p><strong>Địa chỉ:</strong> {{ order.shipping.address }}</p>
                    <p><strong>Phương thức:</strong> {{ order.shipping.method }}</p>
                  </div>
                </div>

                <!-- Order Timeline -->
                <div class="detail-section">
                  <h4>Trạng thái đơn hàng</h4>
                  <div class="order-timeline">
                    <div 
                      v-for="event in order.timeline" 
                      :key="event.id"
                      class="timeline-item"
                      :class="{ completed: event.completed }"
                    >
                      <div class="timeline-dot"></div>
                      <div class="timeline-content">
                        <div class="timeline-title">{{ event.title }}</div>
                        <div class="timeline-time">{{ formatDateTime(event.time) }}</div>
                        <div v-if="event.note" class="timeline-note">{{ event.note }}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Order Items -->
                <div class="detail-section">
                  <h4>Chi tiết sản phẩm</h4>
                  <div class="order-items">
                    <div 
                      v-for="item in order.items" 
                      :key="item.id"
                      class="order-item"
                    >
                      <div class="item-image">
                        <img :src="item.image" :alt="item.name" />
                      </div>
                      <div class="item-info">
                        <h5>{{ item.name }}</h5>
                        <div class="item-details">
                          <span v-if="item.size">Size: {{ item.size }}</span>
                          <span v-if="item.color">Màu: {{ item.color }}</span>
                        </div>
                        <div class="item-quantity">Số lượng: {{ item.quantity }}</div>
                      </div>
                      <div class="item-price">
                        {{ formatPrice(item.price * item.quantity) }}đ
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Order Totals -->
                <div class="detail-section">
                  <div class="order-totals">
                    <div class="total-row">
                      <span>Tạm tính:</span>
                      <span>{{ formatPrice(order.subtotal) }}đ</span>
                    </div>
                    <div v-if="order.discount > 0" class="total-row">
                      <span>Giảm giá:</span>
                      <span class="discount">-{{ formatPrice(order.discount) }}đ</span>
                    </div>
                    <div class="total-row">
                      <span>Phí vận chuyển:</span>
                      <span>{{ order.shippingFee === 0 ? 'Miễn phí' : formatPrice(order.shippingFee) + 'đ' }}</span>
                    </div>
                    <div class="total-row final-total">
                      <span>Tổng cộng:</span>
                      <span>{{ formatPrice(order.total) }}đ</span>
                    </div>
                  </div>
                </div>

                <!-- Payment Info -->
                <div class="detail-section">
                  <h4>Thông tin thanh toán</h4>
                  <div class="payment-info">
                    <p><strong>Phương thức:</strong> {{ order.payment.method }}</p>
                    <p><strong>Trạng thái:</strong> 
                      <span class="payment-status" :class="`status-${order.payment.status}`">
                        {{ getPaymentStatusLabel(order.payment.status) }}
                      </span>
                    </p>
                    <p v-if="order.payment.transactionId"><strong>Mã giao dịch:</strong> {{ order.payment.transactionId }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <div v-if="totalPages > 1" class="pagination">
          <button 
            @click="currentPage = 1"
            :disabled="currentPage === 1"
            class="page-btn"
          >
            <i class="fas fa-angle-double-left"></i>
          </button>
          <button 
            @click="currentPage--"
            :disabled="currentPage === 1"
            class="page-btn"
          >
            <i class="fas fa-angle-left"></i>
          </button>
          
          <button 
            v-for="page in visiblePages" 
            :key="page"
            @click="currentPage = page"
            :class="{ active: currentPage === page }"
            class="page-btn"
          >
            {{ page }}
          </button>
          
          <button 
            @click="currentPage++"
            :disabled="currentPage === totalPages"
            class="page-btn"
          >
            <i class="fas fa-angle-right"></i>
          </button>
          <button 
            @click="currentPage = totalPages"
            :disabled="currentPage === totalPages"
            class="page-btn"
          >
            <i class="fas fa-angle-double-right"></i>
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Reactive data
const loading = ref(true)
const orders = ref([])
const activeFilter = ref('all')
const searchQuery = ref('')
const sortBy = ref('newest')
const currentPage = ref(1)
const ordersPerPage = 10

const orderStatuses = [
  { key: 'all', label: 'Tất cả' },
  { key: 'pending', label: 'Chờ xác nhận' },
  { key: 'confirmed', label: 'Đã xác nhận' },
  { key: 'shipping', label: 'Đang giao' },
  { key: 'delivered', label: 'Đã giao' },
  { key: 'cancelled', label: 'Đã hủy' }
]

// Computed properties
const filteredOrders = computed(() => {
  let filtered = [...orders.value]

  // Filter by status
  if (activeFilter.value !== 'all') {
    filtered = filtered.filter(order => order.status === activeFilter.value)
  }

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(order => 
      order.orderNumber.toLowerCase().includes(query) ||
      order.items.some(item => item.name.toLowerCase().includes(query))
    )
  }

  // Sort orders
  switch (sortBy.value) {
    case 'newest':
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      break
    case 'oldest':
      filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
      break
    case 'highest':
      filtered.sort((a, b) => b.total - a.total)
      break
    case 'lowest':
      filtered.sort((a, b) => a.total - b.total)
      break
  }

  return filtered
})

const totalPages = computed(() => Math.ceil(filteredOrders.value.length / ordersPerPage))

const visiblePages = computed(() => {
  const pages = []
  const start = Math.max(1, currentPage.value - 2)
  const end = Math.min(totalPages.value, currentPage.value + 2)
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  
  return pages
})

// Methods
const formatPrice = (price) => {
  return new Intl.NumberFormat('vi-VN').format(price)
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('vi-VN')
}

const formatDateTime = (date) => {
  return new Date(date).toLocaleString('vi-VN')
}

const getOrderCount = (status) => {
  if (status === 'all') return orders.value.length
  return orders.value.filter(order => order.status === status).length
}

const getStatusLabel = (status) => {
  const statusMap = {
    'pending': 'Chờ xác nhận',
    'confirmed': 'Đã xác nhận',
    'shipping': 'Đang giao',
    'delivered': 'Đã giao',
    'cancelled': 'Đã hủy'
  }
  return statusMap[status] || status
}

const getPaymentStatusLabel = (status) => {
  const statusMap = {
    'pending': 'Chờ thanh toán',
    'paid': 'Đã thanh toán',
    'failed': 'Thanh toán thất bại',
    'refunded': 'Đã hoàn tiền'
  }
  return statusMap[status] || status
}

const getEmptyMessage = () => {
  const messages = {
    'all': 'Bạn chưa có đơn hàng nào. Hãy bắt đầu mua sắm ngay!',
    'pending': 'Không có đơn hàng nào đang chờ xác nhận.',
    'confirmed': 'Không có đơn hàng nào đã được xác nhận.',
    'shipping': 'Không có đơn hàng nào đang được giao.',
    'delivered': 'Không có đơn hàng nào đã được giao.',
    'cancelled': 'Không có đơn hàng nào đã bị hủy.'
  }
  return messages[activeFilter.value] || 'Không có đơn hàng nào.'
}

const toggleOrderDetails = (order) => {
  order.showDetails = !order.showDetails
}

const canTrackOrder = (order) => {
  return ['confirmed', 'shipping'].includes(order.status)
}

const canReorder = (order) => {
  return ['delivered', 'cancelled'].includes(order.status)
}

const canCancel = (order) => {
  return ['pending', 'confirmed'].includes(order.status)
}

const canReview = (order) => {
  return order.status === 'delivered' && !order.reviewed
}

const trackOrder = (order) => {
  alert(`Theo dõi đơn hàng #${order.orderNumber}`)
  // Implement order tracking functionality
}

const reorder = (order) => {
  // Add all items from this order to cart
  console.log('Reorder:', order)
  alert('Đã thêm sản phẩm vào giỏ hàng!')
  router.push('/cart')
}

const cancelOrder = (order) => {
  if (confirm(`Bạn có chắc muốn hủy đơn hàng #${order.orderNumber}?`)) {
    order.status = 'cancelled'
    
    // Add cancelled event to timeline
    order.timeline.unshift({
      id: Date.now(),
      title: 'Đơn hàng đã bị hủy',
      time: new Date().toISOString(),
      completed: true,
      note: 'Đơn hàng đã được hủy theo yêu cầu của khách hàng'
    })
    
    alert('Đơn hàng đã được hủy thành công!')
  }
}

const reviewOrder = (order) => {
  alert(`Đánh giá đơn hàng #${order.orderNumber}`)
  // Implement review functionality
}

// Load data on mount
onMounted(async () => {
  try {
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Mock orders data
    orders.value = [
      {
        id: 1,
        orderNumber: 'VH001234',
        status: 'delivered',
        createdAt: '2024-01-20T10:30:00Z',
        subtotal: 2590000,
        discount: 259000,
        shippingFee: 0,
        total: 2331000,
        reviewed: false,
        showDetails: false,
        shipping: {
          name: 'Nguyễn Văn A',
          phone: '0123456789',
          address: '123 Đường ABC, Phường 1, Quận 1, TP.HCM',
          method: 'Giao hàng tiêu chuẩn'
        },
        payment: {
          method: 'Thanh toán khi nhận hàng',
          status: 'paid',
          transactionId: 'TXN123456789'
        },
        items: [
          {
            id: 1,
            name: 'Smartphone XYZ Pro',
            image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=100',
            price: 1299000,
            quantity: 2,
            size: '256GB',
            color: 'Đen'
          }
        ],
        timeline: [
          {
            id: 1,
            title: 'Đơn hàng đã được giao thành công',
            time: '2024-01-22T14:30:00Z',
            completed: true,
            note: 'Giao hàng thành công, khách hàng đã ký nhận'
          },
          {
            id: 2,
            title: 'Đơn hàng đang được giao',
            time: '2024-01-22T08:00:00Z',
            completed: true
          },
          {
            id: 3,
            title: 'Đơn hàng đã được xác nhận',
            time: '2024-01-20T11:00:00Z',
            completed: true
          },
          {
            id: 4,
            title: 'Đơn hàng đã được đặt',
            time: '2024-01-20T10:30:00Z',
            completed: true
          }
        ]
      },
      {
        id: 2,
        orderNumber: 'VH001235',
        status: 'shipping',
        createdAt: '2024-01-25T15:20:00Z',
        subtotal: 890000,
        discount: 0,
        shippingFee: 30000,
        total: 920000,
        reviewed: false,
        showDetails: false,
        shipping: {
          name: 'Trần Thị B',
          phone: '0987654321',
          address: '456 Đường DEF, Phường 2, Quận 3, TP.HCM',
          method: 'Giao hàng nhanh'
        },
        payment: {
          method: 'Thẻ tín dụng',
          status: 'paid'
        },
        items: [
          {
            id: 2,
            name: 'Giày sneaker thể thao',
            image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=100',
            price: 890000,
            quantity: 1,
            size: '42',
            color: 'Trắng'
          }
        ],
        timeline: [
          {
            id: 1,
            title: 'Đơn hàng đang được giao',
            time: '2024-01-26T09:00:00Z',
            completed: true,
            note: 'Đơn hàng đang trên đường giao đến địa chỉ của bạn'
          },
          {
            id: 2,
            title: 'Đơn hàng đã được xác nhận',
            time: '2024-01-25T16:00:00Z',
            completed: true
          },
          {
            id: 3,
            title: 'Đơn hàng đã được đặt',
            time: '2024-01-25T15:20:00Z',
            completed: true
          }
        ]
      },
      {
        id: 3,
        orderNumber: 'VH001236',
        status: 'pending',
        createdAt: '2024-01-26T09:15:00Z',
        subtotal: 1599000,
        discount: 0,
        shippingFee: 0,
        total: 1599000,
        reviewed: false,
        showDetails: false,
        shipping: {
          name: 'Lê Văn C',
          phone: '0369852147',
          address: '789 Đường GHI, Phường 3, Quận 7, TP.HCM',
          method: 'Giao hàng tiêu chuẩn'
        },
        payment: {
          method: 'Chuyển khoản ngân hàng',
          status: 'pending'
        },
        items: [
          {
            id: 3,
            name: 'Túi xách cao cấp',
            image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=100',
            price: 1599000,
            quantity: 1
          }
        ],
        timeline: [
          {
            id: 1,
            title: 'Đơn hàng đã được đặt',
            time: '2024-01-26T09:15:00Z',
            completed: true,
            note: 'Đơn hàng đang chờ xác nhận từ cửa hàng'
          }
        ]
      }
    ]
    
    loading.value = false
  } catch (error) {
    console.error('Failed to load orders:', error)
    loading.value = false
  }
})
</script>

<style scoped>
.orders-page {
  min-height: 100vh;
  background: #f8f9fa;
}

.page-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 60px 0;
  text-align: center;
}

.page-header h1 {
  font-size: 2.5rem;
  margin-bottom: 10px;
}

.page-header p {
  font-size: 1.1rem;
  opacity: 0.9;
}

.orders-filters {
  background: white;
  border-radius: 15px;
  padding: 25px;
  margin-bottom: 30px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
}

.filter-tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.filter-tab {
  padding: 12px 20px;
  border: 2px solid #e1e5e9;
  background: white;
  border-radius: 25px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

.filter-tab:hover,
.filter-tab.active {
  border-color: #e74c3c;
  background: #e74c3c;
  color: white;
}

.filter-tab .count {
  background: rgba(255, 255, 255, 0.2);
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
}

.filter-tab.active .count {
  background: rgba(255, 255, 255, 0.3);
}

.filter-actions {
  display: flex;
  gap: 20px;
  align-items: center;
  flex-wrap: wrap;
}

.search-box {
  position: relative;
  flex: 1;
  max-width: 300px;
}

.search-input {
  width: 100%;
  padding: 12px 40px 12px 15px;
  border: 2px solid #e1e5e9;
  border-radius: 25px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.3s ease;
}

.search-input:focus {
  border-color: #e74c3c;
}

.search-box i {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
}

.sort-select {
  padding: 12px 15px;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  background: white;
  cursor: pointer;
}

.loading-state,
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
  background: white;
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #e74c3c;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.empty-state i {
  font-size: 64px;
  color: #ccc;
  margin-bottom: 20px;
}

.empty-state h3 {
  font-size: 24px;
  color: #666;
  margin-bottom: 10px;
}

.empty-state p {
  color: #999;
  margin-bottom: 30px;
  line-height: 1.6;
}

.orders-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.order-card {
  background: white;
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  border-left: 5px solid #e1e5e9;
  overflow: hidden;
  transition: all 0.3s ease;
}

.order-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}

.order-card.status-pending {
  border-left-color: #ffc107;
}

.order-card.status-confirmed {
  border-left-color: #17a2b8;
}

.order-card.status-shipping {
  border-left-color: #6f42c1;
}

.order-card.status-delivered {
  border-left-color: #28a745;
}

.order-card.status-cancelled {
  border-left-color: #dc3545;
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 25px 30px;
  border-bottom: 1px solid #eee;
}

.order-info h3 {
  margin: 0 0 10px 0;
  color: #333;
  font-size: 18px;
}

.order-meta {
  display: flex;
  gap: 20px;
  color: #666;
  font-size: 14px;
}

.order-meta span {
  display: flex;
  align-items: center;
  gap: 5px;
}

.order-meta i {
  color: #e74c3c;
}

.order-status {
  display: flex;
  align-items: center;
  gap: 15px;
}

.status-badge {
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  color: white;
}

.status-badge.status-pending {
  background: #ffc107;
}

.status-badge.status-confirmed {
  background: #17a2b8;
}

.status-badge.status-shipping {
  background: #6f42c1;
}

.status-badge.status-delivered {
  background: #28a745;
}

.status-badge.status-cancelled {
  background: #dc3545;
}

.toggle-btn {
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.toggle-btn:hover {
  background: #f8f9fa;
  color: #e74c3c;
}

.order-preview {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 30px;
}

.items-preview {
  display: flex;
  align-items: center;
  gap: 10px;
}

.preview-item {
  width: 50px;
  height: 50px;
  border-radius: 8px;
  overflow: hidden;
}

.preview-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.more-items {
  width: 50px;
  height: 50px;
  background: #f8f9fa;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  color: #666;
}

.order-summary {
  display: flex;
  align-items: center;
  gap: 20px;
}

.items-count {
  color: #666;
  font-size: 14px;
  margin: 0;
}

.order-actions {
  display: flex;
  gap: 10px;
}

.action-btn {
  padding: 8px 12px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: all 0.3s ease;
}

.action-btn:hover {
  background: #f8f9fa;
}

.track-btn:hover {
  border-color: #6f42c1;
  color: #6f42c1;
}

.reorder-btn:hover {
  border-color: #28a745;
  color: #28a745;
}

.cancel-btn:hover {
  border-color: #dc3545;
  color: #dc3545;
}

.review-btn:hover {
  border-color: #ffc107;
  color: #ffc107;
}

.order-details {
  padding: 30px;
  background: #fafbfc;
  border-top: 1px solid #eee;
}

.detail-section {
  margin-bottom: 30px;
}

.detail-section:last-child {
  margin-bottom: 0;
}

.detail-section h4 {
  margin: 0 0 15px 0;
  color: #333;
  font-size: 16px;
}

.shipping-info,
.payment-info {
  background: white;
  padding: 20px;
  border-radius: 10px;
  border: 1px solid #eee;
}

.shipping-info p,
.payment-info p {
  margin: 8px 0;
  color: #666;
}

.payment-status {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
}

.payment-status.status-paid {
  background: #d4edda;
  color: #155724;
}

.payment-status.status-pending {
  background: #fff3cd;
  color: #856404;
}

.order-timeline {
  position: relative;
}

.timeline-item {
  position: relative;
  padding-left: 40px;
  margin-bottom: 20px;
}

.timeline-item:last-child {
  margin-bottom: 0;
}

.timeline-item::before {
  content: '';
  position: absolute;
  left: 15px;
  top: 15px;
  bottom: -20px;
  width: 2px;
  background: #e1e5e9;
}

.timeline-item:last-child::before {
  display: none;
}

.timeline-dot {
  position: absolute;
  left: 10px;
  top: 0;
  width: 12px;
  height: 12px;
  background: #e1e5e9;
  border-radius: 50%;
  border: 3px solid white;
  box-shadow: 0 0 0 2px #e1e5e9;
}

.timeline-item.completed .timeline-dot {
  background: #28a745;
  box-shadow: 0 0 0 2px #28a745;
}

.timeline-content {
  background: white;
  padding: 15px;
  border-radius: 8px;
  border: 1px solid #eee;
}

.timeline-title {
  font-weight: 600;
  color: #333;
  margin-bottom: 5px;
}

.timeline-time {
  font-size: 12px;
  color: #999;
  margin-bottom: 8px;
}

.timeline-note {
  font-size: 14px;
  color: #666;
  font-style: italic;
}

.order-items {
  background: white;
  border-radius: 10px;
  border: 1px solid #eee;
  overflow: hidden;
}

.order-item {
  display: flex;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #eee;
}

.order-item:last-child {
  border-bottom: none;
}

.item-image {
  width: 60px;
  height: 60px;
  border-radius: 8px;
  overflow: hidden;
  margin-right: 15px;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-info {
  flex: 1;
}

.item-info h5 {
  margin: 0 0 8px 0;
  color: #333;
  font-size: 14px;
}

.item-details {
  display: flex;
  gap: 15px;
  margin-bottom: 5px;
  font-size: 12px;
  color: #666;
}

.item-quantity {
  font-size: 12px;
  color: #666;
}

.item-price {
  font-weight: 600;
  color: #e74c3c;
}

.order-totals {
  background: white;
  padding: 20px;
  border-radius: 10px;
  border: 1px solid #eee;
}

.total-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  font-size: 14px;
}

.total-row:last-child {
  margin-bottom: 0;
}

.discount {
  color: #28a745;
  font-weight: 600;
}

.final-total {
  font-size: 16px;
  font-weight: 700;
  padding-top: 15px;
  border-top: 2px solid #e74c3c;
  color: #e74c3c;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 40px;
}

.page-btn {
  padding: 8px 12px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.page-btn:hover:not(:disabled) {
  background: #e74c3c;
  color: white;
  border-color: #e74c3c;
}

.page-btn.active {
  background: #e74c3c;
  color: white;
  border-color: #e74c3c;
}

.page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
}

.btn-primary {
  background: #e74c3c;
  color: white;
}

.btn-primary:hover {
  background: #c0392b;
}

@media (max-width: 768px) {
  .page-header {
    padding: 40px 0;
  }
  
  .page-header h1 {
    font-size: 2rem;
  }
  
  .orders-filters {
    padding: 20px;
  }
  
  .filter-actions {
    flex-direction: column;
    align-items: stretch;
  }
  
  .search-box {
    max-width: none;
  }
  
  .order-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
    padding: 20px;
  }
  
  .order-preview {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
    padding: 20px;
  }
  
  .order-actions {
    align-self: stretch;
    justify-content: space-between;
  }
  
  .order-details {
    padding: 20px;
  }
  
  .order-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
  
  .item-info {
    width: 100%;
  }
  
  .item-price {
    align-self: flex-end;
  }
}
</style>