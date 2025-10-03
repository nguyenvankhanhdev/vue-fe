<template>
  <div class="admin-products">
    <!-- Header -->
    <div class="container-fluid px-4">
      <div class="row">
        <div class="col-12">
          <div class="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h1 class="h3 mb-0 text-gray-800">Quản lý sản phẩm</h1>
              <p class="text-muted">Thêm, sửa, xóa và quản lý tất cả sản phẩm</p>
            </div>
            <button 
              class="btn btn-primary btn-lg"
              @click="showAddModal = true"
            >
              <i class="fas fa-plus me-2"></i>
              Thêm sản phẩm mới
            </button>
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
                    Tổng sản phẩm
                  </div>
                  <div class="h5 mb-0 font-weight-bold text-gray-800">
                    {{ products.length }}
                  </div>
                </div>
                <div class="col-auto">
                  <i class="fas fa-boxes fa-2x text-gray-300"></i>
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
                    Sản phẩm có sẵn
                  </div>
                  <div class="h5 mb-0 font-weight-bold text-gray-800">
                    {{ availableProducts }}
                  </div>
                </div>
                <div class="col-auto">
                  <i class="fas fa-check-circle fa-2x text-gray-300"></i>
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
                    Sản phẩm hết hàng
                  </div>
                  <div class="h5 mb-0 font-weight-bold text-gray-800">
                    {{ outOfStockProducts }}
                  </div>
                </div>
                <div class="col-auto">
                  <i class="fas fa-exclamation-triangle fa-2x text-gray-300"></i>
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
                    Danh mục
                  </div>
                  <div class="h5 mb-0 font-weight-bold text-gray-800">
                    {{ categories.length }}
                  </div>
                </div>
                <div class="col-auto">
                  <i class="fas fa-tags fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Filters and Search -->
      <div class="card shadow mb-4">
        <div class="card-header py-3">
          <h6 class="m-0 font-weight-bold text-primary">Bộ lọc và tìm kiếm</h6>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-md-4 mb-3">
              <label class="form-label">Tìm kiếm sản phẩm</label>
              <div class="input-group">
                <span class="input-group-text">
                  <i class="fas fa-search"></i>
                </span>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Tìm theo tên, mã sản phẩm..."
                  v-model="searchQuery"
                >
              </div>
            </div>
            <div class="col-md-3 mb-3">
              <label class="form-label">Danh mục</label>
              <select class="form-select" v-model="selectedCategory">
                <option value="">Tất cả danh mục</option>
                <option v-for="category in categories" :key="category" :value="category">
                  {{ category }}
                </option>
              </select>
            </div>
            <div class="col-md-3 mb-3">
              <label class="form-label">Trạng thái</label>
              <select class="form-select" v-model="selectedStatus">
                <option value="">Tất cả trạng thái</option>
                <option value="inStock">Còn hàng</option>
                <option value="outOfStock">Hết hàng</option>
              </select>
            </div>
            <div class="col-md-2 mb-3">
              <label class="form-label">Hiển thị</label>
              <select class="form-select" v-model="itemsPerPage">
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <!-- Products Table -->
      <div class="card shadow mb-4">
        <div class="card-header py-3 d-flex justify-content-between align-items-center">
          <h6 class="m-0 font-weight-bold text-primary">Danh sách sản phẩm</h6>
          <div class="btn-group" role="group">
            <button 
              type="button" 
              class="btn btn-outline-secondary btn-sm"
              @click="selectAll"
            >
              <i class="fas fa-check-square me-1"></i>
              Chọn tất cả
            </button>
            <button 
              type="button" 
              class="btn btn-outline-danger btn-sm"
              @click="deleteSelected"
              :disabled="selectedProducts.length === 0"
            >
              <i class="fas fa-trash me-1"></i>
              Xóa đã chọn ({{ selectedProducts.length }})
            </button>
          </div>
        </div>
        <div class="card-body">
          <div class="table-responsive">
            <table class="table table-bordered table-hover">
              <thead class="table-dark">
                <tr>
                  <th width="50">
                    <input 
                      type="checkbox" 
                      class="form-check-input"
                      @change="toggleSelectAll"
                      :checked="selectedProducts.length === filteredProducts.length"
                    >
                  </th>
                  <th width="80">Hình ảnh</th>
                  <th>Tên sản phẩm</th>
                  <th width="120">Mã SP</th>
                  <th width="100">Danh mục</th>
                  <th width="100">Giá bán</th>
                  <th width="80">Tồn kho</th>
                  <th width="100">Trạng thái</th>
                  <th width="150">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="product in paginatedProducts" :key="product.id">
                  <td>
                    <input 
                      type="checkbox" 
                      class="form-check-input"
                      :value="product.id"
                      v-model="selectedProducts"
                    >
                  </td>
                  <td>
                    <img 
                      :src="product.image" 
                      :alt="product.name"
                      class="product-thumbnail"
                      @error="handleImageError"
                    >
                  </td>
                  <td>
                    <div class="product-info">
                      <strong>{{ product.name }}</strong>
                      <br>
                      <small class="text-muted">{{ truncateText(product.description, 50) }}</small>
                    </div>
                  </td>
                  <td>
                    <code>{{ product.sku || 'N/A' }}</code>
                  </td>
                  <td>
                    <span class="badge bg-info">{{ product.category }}</span>
                  </td>
                  <td>
                    <strong class="text-success">${{ formatPrice(product.price) }}</strong>
                    <div v-if="product.originalPrice && product.originalPrice > product.price">
                      <small class="text-muted text-decoration-line-through">
                        ${{ formatPrice(product.originalPrice) }}
                      </small>
                    </div>
                  </td>
                  <td>
                    <span 
                      class="badge"
                      :class="product.stock > 10 ? 'bg-success' : product.stock > 0 ? 'bg-warning' : 'bg-danger'"
                    >
                      {{ product.stock || 0 }}
                    </span>
                  </td>
                  <td>
                    <span 
                      class="badge"
                      :class="product.inStock ? 'bg-success' : 'bg-danger'"
                    >
                      {{ product.inStock ? 'Còn hàng' : 'Hết hàng' }}
                    </span>
                  </td>
                  <td>
                    <div class="btn-group" role="group">
                      <button 
                        class="btn btn-outline-primary btn-sm"
                        @click="editProduct(product)"
                        title="Chỉnh sửa"
                      >
                        <i class="fas fa-edit"></i>
                      </button>
                      <button 
                        class="btn btn-outline-info btn-sm"
                        @click="viewProduct(product)"
                        title="Xem chi tiết"
                      >
                        <i class="fas fa-eye"></i>
                      </button>
                      <button 
                        class="btn btn-outline-danger btn-sm"
                        @click="deleteProduct(product.id)"
                        title="Xóa"
                      >
                        <i class="fas fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
                <tr v-if="filteredProducts.length === 0">
                  <td colspan="9" class="text-center py-4">
                    <div class="text-muted">
                      <i class="fas fa-inbox fa-3x mb-3"></i>
                      <p>Không tìm thấy sản phẩm nào</p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Pagination -->
          <nav v-if="totalPages > 1" class="mt-4">
            <ul class="pagination justify-content-center">
              <li class="page-item" :class="{ disabled: currentPage === 1 }">
                <button class="page-link" @click="currentPage = 1" :disabled="currentPage === 1">
                  <i class="fas fa-angle-double-left"></i>
                </button>
              </li>
              <li class="page-item" :class="{ disabled: currentPage === 1 }">
                <button class="page-link" @click="currentPage--" :disabled="currentPage === 1">
                  <i class="fas fa-angle-left"></i>
                </button>
              </li>
              
              <li 
                v-for="page in visiblePages" 
                :key="page"
                class="page-item"
                :class="{ active: page === currentPage }"
              >
                <button class="page-link" @click="currentPage = page">
                  {{ page }}
                </button>
              </li>
              
              <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                <button class="page-link" @click="currentPage++" :disabled="currentPage === totalPages">
                  <i class="fas fa-angle-right"></i>
                </button>
              </li>
              <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                <button class="page-link" @click="currentPage = totalPages" :disabled="currentPage === totalPages">
                  <i class="fas fa-angle-double-right"></i>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>

    <!-- Add/Edit Product Modal -->
    <div 
      class="modal fade" 
      id="productModal" 
      tabindex="-1" 
      :class="{ show: showAddModal || showEditModal }"
      :style="{ display: (showAddModal || showEditModal) ? 'block' : 'none' }"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              {{ showEditModal ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới' }}
            </h5>
            <button type="button" class="btn-close" @click="closeModal"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="saveProduct">
              <div class="row">
                <div class="col-md-8">
                  <div class="mb-3">
                    <label class="form-label">Tên sản phẩm <span class="text-danger">*</span></label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="productForm.name"
                      required
                      placeholder="Nhập tên sản phẩm"
                    >
                  </div>

                  <div class="mb-3">
                    <label class="form-label">Mô tả sản phẩm</label>
                    <textarea
                      class="form-control"
                      rows="4"
                      v-model="productForm.description"
                      placeholder="Nhập mô tả chi tiết về sản phẩm"
                    ></textarea>
                  </div>

                  <div class="row">
                    <div class="col-md-6 mb-3">
                      <label class="form-label">Mã sản phẩm</label>
                      <input
                        type="text"
                        class="form-control"
                        v-model="productForm.sku"
                        placeholder="SP001"
                      >
                    </div>
                    <div class="col-md-6 mb-3">
                      <label class="form-label">Danh mục <span class="text-danger">*</span></label>
                      <select class="form-select" v-model="productForm.category" required>
                        <option value="">Chọn danh mục</option>
                        <option v-for="category in categories" :key="category" :value="category">
                          {{ category }}
                        </option>
                      </select>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-4 mb-3">
                      <label class="form-label">Giá bán <span class="text-danger">*</span></label>
                      <div class="input-group">
                        <span class="input-group-text">$</span>
                        <input
                          type="number"
                          class="form-control"
                          v-model="productForm.price"
                          min="0"
                          step="0.01"
                          required
                        >
                      </div>
                    </div>
                    <div class="col-md-4 mb-3">
                      <label class="form-label">Giá gốc</label>
                      <div class="input-group">
                        <span class="input-group-text">$</span>
                        <input
                          type="number"
                          class="form-control"
                          v-model="productForm.originalPrice"
                          min="0"
                          step="0.01"
                        >
                      </div>
                    </div>
                    <div class="col-md-4 mb-3">
                      <label class="form-label">Tồn kho</label>
                      <input
                        type="number"
                        class="form-control"
                        v-model="productForm.stock"
                        min="0"
                      >
                    </div>
                  </div>

                  <div class="mb-3">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        v-model="productForm.inStock"
                        id="inStockCheck"
                      >
                      <label class="form-check-label" for="inStockCheck">
                        Sản phẩm còn hàng
                      </label>
                    </div>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        v-model="productForm.isNew"
                        id="isNewCheck"
                      >
                      <label class="form-check-label" for="isNewCheck">
                        Sản phẩm mới
                      </label>
                    </div>
                  </div>
                </div>

                <div class="col-md-4">
                  <div class="mb-3">
                    <label class="form-label">Hình ảnh sản phẩm</label>
                    <div class="image-upload-area">
                      <div v-if="productForm.image" class="current-image">
                        <img :src="productForm.image" alt="Product Image" class="img-fluid rounded">
                        <button 
                          type="button" 
                          class="btn btn-danger btn-sm mt-2"
                          @click="productForm.image = ''"
                        >
                          <i class="fas fa-trash"></i> Xóa ảnh
                        </button>
                      </div>
                      <div v-else class="upload-placeholder">
                        <i class="fas fa-cloud-upload-alt fa-3x text-muted"></i>
                        <p class="text-muted">Chưa có hình ảnh</p>
                      </div>
                      <input
                        type="url"
                        class="form-control mt-2"
                        v-model="productForm.image"
                        placeholder="Nhập URL hình ảnh"
                      >
                    </div>
                  </div>

                  <div class="mb-3">
                    <label class="form-label">Giảm giá (%)</label>
                    <input
                      type="number"
                      class="form-control"
                      v-model="productForm.discount"
                      min="0"
                      max="100"
                    >
                  </div>

                  <div class="mb-3">
                    <label class="form-label">Đánh giá</label>
                    <select class="form-select" v-model="productForm.rating">
                      <option value="">Chưa có đánh giá</option>
                      <option value="1">1 sao</option>
                      <option value="2">2 sao</option>
                      <option value="3">3 sao</option>
                      <option value="4">4 sao</option>
                      <option value="5">5 sao</option>
                    </select>
                  </div>

                  <div class="mb-3">
                    <label class="form-label">Số lượt đánh giá</label>
                    <input
                      type="number"
                      class="form-control"
                      v-model="productForm.reviewCount"
                      min="0"
                    >
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModal">
              Hủy
            </button>
            <button type="button" class="btn btn-primary" @click="saveProduct" :disabled="saving">
              <span v-if="saving" class="spinner-border spinner-border-sm me-2"></span>
              {{ saving ? 'Đang lưu...' : (showEditModal ? 'Cập nhật' : 'Thêm sản phẩm') }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal backdrop -->
    <div 
      v-if="showAddModal || showEditModal" 
      class="modal-backdrop fade show"
      @click="closeModal"
    ></div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// State
const products = ref([])
const categories = ref(['Điện thoại', 'Laptop', 'Tablet', 'Phụ kiện', 'Âm thanh', 'Đồng hồ'])
const searchQuery = ref('')
const selectedCategory = ref('')
const selectedStatus = ref('')
const itemsPerPage = ref(10)
const currentPage = ref(1)
const selectedProducts = ref([])
const showAddModal = ref(false)
const showEditModal = ref(false)
const saving = ref(false)

// Product form
const productForm = ref({
  id: null,
  name: '',
  description: '',
  sku: '',
  category: '',
  price: 0,
  originalPrice: 0,
  stock: 0,
  image: '',
  inStock: true,
  isNew: false,
  discount: 0,
  rating: null,
  reviewCount: 0
})

// Sample data
const sampleProducts = [
  {
    id: 1,
    name: 'iPhone 15 Pro Max',
    description: 'Flagship smartphone từ Apple với chip A17 Pro mạnh mẽ',
    sku: 'IP15PM001',
    category: 'Điện thoại',
    price: 1199,
    originalPrice: 1299,
    stock: 25,
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300',
    inStock: true,
    isNew: true,
    discount: 8,
    rating: 5,
    reviewCount: 124
  },
  {
    id: 2,
    name: 'MacBook Pro 16"',
    description: 'Laptop chuyên nghiệp với chip M3 Pro',
    sku: 'MBP16001',
    category: 'Laptop',
    price: 2499,
    originalPrice: 2599,
    stock: 15,
    image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=300',
    inStock: true,
    isNew: false,
    discount: 4,
    rating: 5,
    reviewCount: 89
  },
  {
    id: 3,
    name: 'iPad Pro 12.9"',
    description: 'Tablet cao cấp với màn hình Liquid Retina XDR',
    sku: 'IPP129001',
    category: 'Tablet',
    price: 1099,
    originalPrice: 1199,
    stock: 0,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300',
    inStock: false,
    isNew: false,
    discount: 8,
    rating: 4,
    reviewCount: 67
  },
  {
    id: 4,
    name: 'AirPods Pro 2',
    description: 'Tai nghe không dây với khả năng chống ồn chủ động',
    sku: 'APP2001',
    category: 'Âm thanh',
    price: 249,
    originalPrice: 279,
    stock: 50,
    image: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=300',
    inStock: true,
    isNew: true,
    discount: 11,
    rating: 5,
    reviewCount: 203
  },
  {
    id: 5,
    name: 'Apple Watch Ultra 2',
    description: 'Smartwatch cao cấp dành cho các hoạt động thể thao',
    sku: 'AWU2001',
    category: 'Đồng hồ',
    price: 799,
    originalPrice: 849,
    stock: 8,
    image: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=300',
    inStock: true,
    isNew: false,
    discount: 6,
    rating: 4,
    reviewCount: 45
  }
]

// Computed properties
const filteredProducts = computed(() => {
  let filtered = products.value

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(product => 
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query) ||
      (product.sku && product.sku.toLowerCase().includes(query))
    )
  }

  if (selectedCategory.value) {
    filtered = filtered.filter(product => product.category === selectedCategory.value)
  }

  if (selectedStatus.value) {
    filtered = filtered.filter(product => {
      if (selectedStatus.value === 'inStock') return product.inStock
      if (selectedStatus.value === 'outOfStock') return !product.inStock
      return true
    })
  }

  return filtered
})

const totalPages = computed(() => Math.ceil(filteredProducts.value.length / itemsPerPage.value))

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredProducts.value.slice(start, end)
})

const visiblePages = computed(() => {
  const pages = []
  const total = totalPages.value
  const current = currentPage.value
  
  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    if (current <= 4) {
      for (let i = 1; i <= 5; i++) pages.push(i)
      pages.push('...')
      pages.push(total)
    } else if (current >= total - 3) {
      pages.push(1)
      pages.push('...')
      for (let i = total - 4; i <= total; i++) pages.push(i)
    } else {
      pages.push(1)
      pages.push('...')
      for (let i = current - 1; i <= current + 1; i++) pages.push(i)
      pages.push('...')
      pages.push(total)
    }
  }
  
  return pages
})

const availableProducts = computed(() => 
  products.value.filter(p => p.inStock).length
)

const outOfStockProducts = computed(() => 
  products.value.filter(p => !p.inStock).length
)

// Methods
const formatPrice = (price) => {
  return new Intl.NumberFormat('vi-VN').format(price)
}

const truncateText = (text, length) => {
  if (!text) return ''
  return text.length > length ? text.substring(0, length) + '...' : text
}

const handleImageError = (event) => {
  event.target.src = 'https://via.placeholder.com/100x100?text=No+Image'
}

const resetForm = () => {
  productForm.value = {
    id: null,
    name: '',
    description: '',
    sku: '',
    category: '',
    price: 0,
    originalPrice: 0,
    stock: 0,
    image: '',
    inStock: true,
    isNew: false,
    discount: 0,
    rating: null,
    reviewCount: 0
  }
}

const closeModal = () => {
  showAddModal.value = false
  showEditModal.value = false
  resetForm()
}

const editProduct = (product) => {
  productForm.value = { ...product }
  showEditModal.value = true
}

const viewProduct = (product) => {
  // Implement product detail view
  alert(`Xem chi tiết sản phẩm: ${product.name}`)
}

const deleteProduct = (productId) => {
  if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
    products.value = products.value.filter(p => p.id !== productId)
    selectedProducts.value = selectedProducts.value.filter(id => id !== productId)
  }
}

const saveProduct = async () => {
  saving.value = true
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  if (showEditModal.value) {
    // Update existing product
    const index = products.value.findIndex(p => p.id === productForm.value.id)
    if (index !== -1) {
      products.value[index] = { ...productForm.value }
    }
  } else {
    // Add new product
    const newProduct = {
      ...productForm.value,
      id: Math.max(...products.value.map(p => p.id)) + 1
    }
    products.value.push(newProduct)
  }
  
  saving.value = false
  closeModal()
}

const selectAll = () => {
  selectedProducts.value = paginatedProducts.value.map(p => p.id)
}

const toggleSelectAll = () => {
  if (selectedProducts.value.length === filteredProducts.value.length) {
    selectedProducts.value = []
  } else {
    selectedProducts.value = filteredProducts.value.map(p => p.id)
  }
}

const deleteSelected = () => {
  if (selectedProducts.value.length === 0) return
  
  if (confirm(`Bạn có chắc chắn muốn xóa ${selectedProducts.value.length} sản phẩm đã chọn?`)) {
    products.value = products.value.filter(p => !selectedProducts.value.includes(p.id))
    selectedProducts.value = []
  }
}

// Initialize
onMounted(() => {
  products.value = [...sampleProducts]
})
</script>

<style scoped>
.admin-products {
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

.border-left-warning {
  border-left: 4px solid #f6c23e !important;
}

.border-left-info {
  border-left: 4px solid #36b9cc !important;
}

.product-thumbnail {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 8px;
}

.product-info strong {
  display: block;
  margin-bottom: 4px;
}

.image-upload-area {
  border: 2px dashed #dee2e6;
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.current-image img {
  max-height: 150px;
  width: auto;
}

.upload-placeholder {
  color: #6c757d;
}

.modal.show {
  background-color: rgba(0, 0, 0, 0.5);
}

.btn-group .btn {
  white-space: nowrap;
}

.table th {
  font-weight: 600;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.pagination .page-link {
  color: #4e73df;
  border-color: #4e73df;
}

.pagination .page-item.active .page-link {
  background-color: #4e73df;
  border-color: #4e73df;
}

@media (max-width: 768px) {
  .admin-products {
    padding: 1rem 0;
  }
  
  .table-responsive {
    font-size: 0.875rem;
  }
  
  .btn-group .btn {
    padding: 0.25rem 0.5rem;
  }
}
</style>