<template>
  <div class="admin-dashboard">
    <div class="container-fluid px-4">
      <!-- Header -->
      <div class="row">
        <div class="col-12">
          <div class="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h1 class="h3 mb-0 text-gray-800">Dashboard</h1>
              <p class="text-muted">Chào mừng bạn quay trở lại, Admin!</p>
            </div>
            <div class="text-end">
              <small class="text-muted">Cập nhật lần cuối: {{ lastUpdated }}</small>
            </div>
          </div>
        </div>
      </div>

      <!-- Statistics Cards -->
      <div class="row mb-4">
        <div class="col-xl-3 col-md-6 mb-4">
          <div class="card border-left-primary shadow h-100 py-2">
            <div class="card-body">
              <div class="row no-gutters align-items-center">
                <div class="col mr-2">
                  <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                    Doanh thu (Tháng)
                  </div>
                  <div class="h5 mb-0 font-weight-bold text-gray-800">
                    ${{ formatPrice(monthlyRevenue) }}
                  </div>
                </div>
                <div class="col-auto">
                  <i class="fas fa-dollar-sign fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-xl-3 col-md-6 mb-4">
          <div class="card border-left-success shadow h-100 py-2">
            <div class="card-body">
              <div class="row no-gutters align-items-center">
                <div class="col mr-2">
                  <div class="text-xs font-weight-bold text-success text-uppercase mb-1">
                    Đơn hàng (Hôm nay)
                  </div>
                  <div class="h5 mb-0 font-weight-bold text-gray-800">
                    {{ todayOrders }}
                  </div>
                </div>
                <div class="col-auto">
                  <i class="fas fa-shopping-cart fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-xl-3 col-md-6 mb-4">
          <div class="card border-left-info shadow h-100 py-2">
            <div class="card-body">
              <div class="row no-gutters align-items-center">
                <div class="col mr-2">
                  <div class="text-xs font-weight-bold text-info text-uppercase mb-1">
                    Khách hàng mới
                  </div>
                  <div class="h5 mb-0 font-weight-bold text-gray-800">
                    {{ newCustomers }}
                  </div>
                </div>
                <div class="col-auto">
                  <i class="fas fa-users fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-xl-3 col-md-6 mb-4">
          <div class="card border-left-warning shadow h-100 py-2">
            <div class="card-body">
              <div class="row no-gutters align-items-center">
                <div class="col mr-2">
                  <div class="text-xs font-weight-bold text-warning text-uppercase mb-1">
                    Sản phẩm sắp hết
                  </div>
                  <div class="h5 mb-0 font-weight-bold text-gray-800">
                    {{ lowStockProducts }}
                  </div>
                </div>
                <div class="col-auto">
                  <i class="fas fa-exclamation-triangle fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Charts and Recent Activity -->
      <div class="row">
        <!-- Sales Chart -->
        <div class="col-xl-8 col-lg-7">
          <div class="card shadow mb-4">
            <div class="card-header py-3 d-flex justify-content-between align-items-center">
              <h6 class="m-0 font-weight-bold text-primary">Biểu đồ doanh thu</h6>
              <div class="dropdown">
                <button class="btn btn-sm btn-outline-primary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                  {{ selectedPeriod }}
                </button>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="#" @click="selectedPeriod = '7 ngày qua'">7 ngày qua</a></li>
                  <li><a class="dropdown-item" href="#" @click="selectedPeriod = '30 ngày qua'">30 ngày qua</a></li>
                  <li><a class="dropdown-item" href="#" @click="selectedPeriod = '6 tháng qua'">6 tháng qua</a></li>
                </ul>
              </div>
            </div>
            <div class="card-body">
              <div class="chart-area">
                <canvas id="salesChart" width="100%" height="40"></canvas>
              </div>
            </div>
          </div>
        </div>

        <!-- Top Products -->
        <div class="col-xl-4 col-lg-5">
          <div class="card shadow mb-4">
            <div class="card-header py-3">
              <h6 class="m-0 font-weight-bold text-primary">Sản phẩm bán chạy</h6>
            </div>
            <div class="card-body">
              <div class="top-products">
                <div 
                  v-for="(product, index) in topProducts" 
                  :key="product.id"
                  class="product-item d-flex align-items-center mb-3"
                >
                  <div class="rank-badge">
                    {{ index + 1 }}
                  </div>
                  <img :src="product.image" :alt="product.name" class="product-thumb">
                  <div class="product-info flex-grow-1">
                    <h6 class="product-name mb-1">{{ product.name }}</h6>
                    <div class="d-flex justify-content-between">
                      <small class="text-muted">{{ product.sold }} đã bán</small>
                      <strong class="text-success">${{ formatPrice(product.revenue) }}</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Orders and Quick Actions -->
      <div class="row">
        <!-- Recent Orders -->
        <div class="col-xl-8 col-lg-7">
          <div class="card shadow mb-4">
            <div class="card-header py-3 d-flex justify-content-between align-items-center">
              <h6 class="m-0 font-weight-bold text-primary">Đơn hàng gần đây</h6>
              <router-link to="/admin/orders" class="btn btn-sm btn-primary">
                Xem tất cả
              </router-link>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table class="table table-borderless">
                  <thead>
                    <tr>
                      <th>Mã đơn</th>
                      <th>Khách hàng</th>
                      <th>Sản phẩm</th>
                      <th>Tổng tiền</th>
                      <th>Trạng thái</th>
                      <th>Thời gian</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="order in recentOrders" :key="order.id">
                      <td><code>{{ order.code }}</code></td>
                      <td>{{ order.customer }}</td>
                      <td>{{ order.items }} sản phẩm</td>
                      <td><strong>${{ formatPrice(order.total) }}</strong></td>
                      <td>
                        <span 
                          class="badge"
                          :class="getStatusClass(order.status)"
                        >
                          {{ order.status }}
                        </span>
                      </td>
                      <td><small>{{ formatTime(order.time) }}</small></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="col-xl-4 col-lg-5">
          <div class="card shadow mb-4">
            <div class="card-header py-3">
              <h6 class="m-0 font-weight-bold text-primary">Thao tác nhanh</h6>
            </div>
            <div class="card-body">
              <div class="quick-actions">
                <router-link to="/admin/products" class="action-card">
                  <div class="action-icon bg-primary">
                    <i class="fas fa-plus"></i>
                  </div>
                  <div class="action-content">
                    <h6>Thêm sản phẩm</h6>
                    <p>Thêm sản phẩm mới vào cửa hàng</p>
                  </div>
                </router-link>

                <router-link to="/admin/orders" class="action-card">
                  <div class="action-icon bg-success">
                    <i class="fas fa-eye"></i>
                  </div>
                  <div class="action-content">
                    <h6>Xem đơn hàng</h6>
                    <p>Quản lý và xử lý đơn hàng</p>
                  </div>
                </router-link>

                <router-link to="/admin/reports" class="action-card">
                  <div class="action-icon bg-info">
                    <i class="fas fa-chart-bar"></i>
                  </div>
                  <div class="action-content">
                    <h6>Báo cáo</h6>
                    <p>Xem báo cáo doanh thu chi tiết</p>
                  </div>
                </router-link>

                <router-link to="/admin/settings" class="action-card">
                  <div class="action-icon bg-warning">
                    <i class="fas fa-cog"></i>
                  </div>
                  <div class="action-content">
                    <h6>Cài đặt</h6>
                    <p>Cấu hình hệ thống</p>
                  </div>
                </router-link>
              </div>
            </div>
          </div>

          <!-- System Status -->
          <div class="card shadow mb-4">
            <div class="card-header py-3">
              <h6 class="m-0 font-weight-bold text-primary">Trạng thái hệ thống</h6>
            </div>
            <div class="card-body">
              <div class="system-status">
                <div class="status-item">
                  <div class="status-indicator bg-success"></div>
                  <span>Server</span>
                  <small class="text-success">Online</small>
                </div>
                <div class="status-item">
                  <div class="status-indicator bg-success"></div>
                  <span>Database</span>
                  <small class="text-success">Connected</small>
                </div>
                <div class="status-item">
                  <div class="status-indicator bg-warning"></div>
                  <span>Cache</span>
                  <small class="text-warning">75% Full</small>
                </div>
                <div class="status-item">
                  <div class="status-indicator bg-success"></div>
                  <span>Storage</span>
                  <small class="text-success">Available</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// State
const monthlyRevenue = ref(40000)
const todayOrders = ref(25)
const newCustomers = ref(12)
const lowStockProducts = ref(8)
const selectedPeriod = ref('30 ngày qua')
const lastUpdated = ref('')

// Sample data
const topProducts = ref([
  {
    id: 1,
    name: 'iPhone 15 Pro Max',
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=50',
    sold: 45,
    revenue: 53955
  },
  {
    id: 2,
    name: 'MacBook Pro 16"',
    image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=50',
    sold: 23,
    revenue: 57477
  },
  {
    id: 3,
    name: 'AirPods Pro 2',
    image: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=50',
    sold: 67,
    revenue: 16683
  },
  {
    id: 4,
    name: 'iPad Pro 12.9"',
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=50',
    sold: 34,
    revenue: 37366
  }
])

const recentOrders = ref([
  {
    id: 1,
    code: 'ORD-2024-001',
    customer: 'Nguyễn Văn A',
    items: 3,
    total: 1299.99,
    status: 'Đang xử lý',
    time: new Date(Date.now() - 10 * 60 * 1000)
  },
  {
    id: 2,
    code: 'ORD-2024-002',
    customer: 'Trần Thị B',
    items: 1,
    total: 2499.99,
    status: 'Đã thanh toán',
    time: new Date(Date.now() - 25 * 60 * 1000)
  },
  {
    id: 3,
    code: 'ORD-2024-003',
    customer: 'Lê Minh C',
    items: 2,
    total: 549.98,
    status: 'Đang vận chuyển',
    time: new Date(Date.now() - 45 * 60 * 1000)
  },
  {
    id: 4,
    code: 'ORD-2024-004',
    customer: 'Phạm Thị D',
    items: 1,
    total: 799.99,
    status: 'Hoàn thành',
    time: new Date(Date.now() - 2 * 60 * 60 * 1000)
  }
])

// Methods
const formatPrice = (price) => {
  return new Intl.NumberFormat('vi-VN').format(price)
}

const formatTime = (time) => {
  const now = new Date()
  const diff = now - time
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  
  if (days > 0) return `${days} ngày trước`
  if (hours > 0) return `${hours} giờ trước`
  return `${minutes} phút trước`
}

const getStatusClass = (status) => {
  const statusClasses = {
    'Đang xử lý': 'bg-warning',
    'Đã thanh toán': 'bg-info',
    'Đang vận chuyển': 'bg-primary',
    'Hoàn thành': 'bg-success',
    'Đã hủy': 'bg-danger'
  }
  return statusClasses[status] || 'bg-secondary'
}

const updateLastUpdated = () => {
  lastUpdated.value = new Date().toLocaleString('vi-VN')
}

// Initialize chart (mock implementation)
const initChart = () => {
  // This would integrate with Chart.js or similar library
  console.log('Chart initialized')
}

onMounted(() => {
  updateLastUpdated()
  initChart()
  
  // Update time every minute
  setInterval(updateLastUpdated, 60000)
})
</script>

<style scoped>
.admin-dashboard {
  background-color: #f8f9fc;
  min-height: 100vh;
  padding: 2rem 0;
}

.border-left-primary {
  border-left: 4px solid #4e73df !important;
}

.border-left-success {
  border-left: 4px solid #1cc88a !important;
}

.border-left-info {
  border-left: 4px solid #36b9cc !important;
}

.border-left-warning {
  border-left: 4px solid #f6c23e !important;
}

.chart-area {
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f9fc;
  border-radius: 8px;
  color: #5a5c69;
}

.top-products .product-item {
  padding: 0.5rem 0;
  border-bottom: 1px solid #e3e6f0;
}

.top-products .product-item:last-child {
  border-bottom: none;
}

.rank-badge {
  width: 30px;
  height: 30px;
  background: #4e73df;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 0.875rem;
  margin-right: 0.75rem;
}

.product-thumb {
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 8px;
  margin-right: 0.75rem;
}

.product-info .product-name {
  font-size: 0.875rem;
  font-weight: 600;
}

.quick-actions .action-card {
  display: flex;
  align-items: center;
  padding: 1rem;
  border: 1px solid #e3e6f0;
  border-radius: 8px;
  margin-bottom: 1rem;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
}

.quick-actions .action-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
  text-decoration: none;
  color: inherit;
}

.action-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  color: white;
}

.action-content h6 {
  margin-bottom: 0.25rem;
  font-size: 0.9rem;
  font-weight: 600;
}

.action-content p {
  margin: 0;
  font-size: 0.8rem;
  color: #5a5c69;
}

.system-status .status-item {
  display: flex;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid #e3e6f0;
}

.system-status .status-item:last-child {
  border-bottom: none;
}

.status-indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 0.75rem;
}

.system-status span {
  flex: 1;
  font-weight: 500;
}

.system-status small {
  font-size: 0.75rem;
}

@media (max-width: 768px) {
  .admin-dashboard {
    padding: 1rem 0;
  }
  
  .card-body {
    padding: 1rem;
  }
  
  .action-card {
    padding: 0.75rem !important;
  }
  
  .action-icon {
    width: 40px !important;
    height: 40px !important;
  }
}
</style>