<template>
  <div class="admin-products p-6 bg-gray-50 min-h-screen">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-center justify-between mb-8">
      <div class="mb-4 md:mb-0">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Quản lý sản phẩm</h1>
        <p class="text-gray-600">Kiểm soát danh mục, tồn kho và trạng thái sản phẩm của cửa hàng</p>
      </div>
      <div class="flex flex-wrap gap-3">
        <button class="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-all duration-200 shadow-sm">
          <i class="fas fa-file-import mr-2"></i>Import CSV
        </button>
        <button class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all duration-200 shadow-sm">
          <i class="fas fa-download mr-2"></i>Xuất Excel
        </button>
        <button class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5" @click="openAdd">
          <i class="fas fa-plus mr-2"></i>Thêm sản phẩm
        </button>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
      <div v-for="(stat, idx) in stats" :key="idx" 
        class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200 group">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-500 text-sm font-medium mb-1">{{ stat.label }}</p>
            <p class="text-2xl font-bold text-gray-900">{{ stat.value }}</p>
            <div class="flex items-center mt-2">
              <i class="fas fa-arrow-up text-xs text-green-500 mr-1"></i>
              <span class="text-xs text-green-600">+12% từ tháng trước</span>
            </div>
          </div>
          <div :class="stat.iconClass + ' rounded-lg p-3 bg-opacity-10'">
            <i :class="stat.icon + ' text-2xl'"></i>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters & Search -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
      <div class="p-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Tìm kiếm</label>
            <div class="relative">
              <input type="text" placeholder="Tìm theo tên, SKU..." 
                class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center">
                <i class="fas fa-search text-gray-400"></i>
              </div>
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Danh mục</label>
            <select class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
              <option value="">Tất cả danh mục</option>
              <option value="electronics">Điện tử</option>
              <option value="fashion">Thời trang</option>
              <option value="home">Gia dụng</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Trạng thái</label>
            <select class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
              <option value="">Tất cả</option>
              <option value="active">Đang bán</option>
              <option value="inactive">Ngừng bán</option>
              <option value="out-of-stock">Hết hàng</option>
            </select>
          </div>
          <div class="flex items-end">
            <button class="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors duration-200 mr-2">
              <i class="fas fa-filter mr-2"></i>Lọc
            </button>
            <button class="text-gray-500 hover:text-gray-700 px-4 py-2 rounded-lg transition-colors duration-200">
              <i class="fas fa-times mr-2"></i>Xóa bộ lọc
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Products Table -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div class="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <div class="flex justify-between items-center">
          <div>
            <h3 class="text-lg font-semibold text-gray-900">Danh sách sản phẩm</h3>
            <p class="text-sm text-gray-500 mt-1">Quản lý và theo dõi tất cả sản phẩm trong hệ thống</p>
          </div>
          <div class="flex items-center space-x-3">
            <span class="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
              {{ products.length }} sản phẩm
            </span>
            <div class="flex items-center space-x-1">
              <button class="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                <i class="fas fa-th"></i>
              </button>
              <button class="p-2 text-gray-600 bg-gray-100 rounded-lg">
                <i class="fas fa-list"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <input type="checkbox" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500">
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sản phẩm</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Giá bán</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tồn kho</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="p in products" :key="p.id" class="hover:bg-gray-50 transition-colors duration-150 group">
              <td class="px-6 py-4 whitespace-nowrap">
                <input type="checkbox" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500">
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="h-12 w-12 flex-shrink-0">
                    <img :src="p.image" alt="" class="h-12 w-12 rounded-lg object-cover border border-gray-200" />
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-semibold text-gray-900">{{ p.name }}</div>
                    <div class="text-sm text-gray-500">{{ p.category }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-mono text-gray-900 bg-gray-100 px-2 py-1 rounded">{{ p.sku }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-semibold text-gray-900">₫{{ Number(p.price).toLocaleString('vi-VN') }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="text-sm font-semibold text-gray-900">{{ p.stock }}</div>
                  <span v-if="p.stock < 10" class="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    <i class="fas fa-exclamation-triangle mr-1"></i>Sắp hết
                  </span>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" 
                  :class="p.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'">
                  <span class="w-1.5 h-1.5 rounded-full mr-1.5" 
                    :class="p.active ? 'bg-green-400' : 'bg-red-400'"></span>
                  {{ p.active ? 'Đang bán' : 'Ngừng bán' }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right">
                <div class="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                  <button class="bg-blue-100 hover:bg-blue-200 text-blue-700 p-2 rounded-lg transition-colors duration-200" @click="openEdit(p)" title="Chỉnh sửa">
                    <i class="fas fa-pen text-sm"></i>
                  </button>
                  <button class="bg-green-100 hover:bg-green-200 text-green-700 p-2 rounded-lg transition-colors duration-200" title="Sao chép">
                    <i class="fas fa-copy text-sm"></i>
                  </button>
                  <button class="bg-red-100 hover:bg-red-200 text-red-700 p-2 rounded-lg transition-colors duration-200" @click="remove(p)" title="Xóa">
                    <i class="fas fa-trash text-sm"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- Pagination -->
      <div class="px-6 py-4 border-t border-gray-200 bg-gray-50">
        <div class="flex items-center justify-between">
          <div class="text-sm text-gray-500">
            Hiển thị <span class="font-medium">1-10</span> trong <span class="font-medium">{{ products.length }}</span> sản phẩm
          </div>
          <div class="flex items-center space-x-2">
            <button class="px-3 py-2 text-sm text-gray-500 hover:text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              Trước
            </button>
            <button class="px-3 py-2 text-sm bg-blue-600 text-white rounded-lg">1</button>
            <button class="px-3 py-2 text-sm text-gray-500 hover:text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">2</button>
            <button class="px-3 py-2 text-sm text-gray-500 hover:text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">3</button>
            <button class="px-3 py-2 text-sm text-gray-500 hover:text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              Sau
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Create/Edit Modal -->
    <Transition name="modal" appear>
      <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center p-4" @click="closeModal">
        <div class="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" @click.stop>
          <div class="flex justify-between items-center p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div>
              <h3 class="text-xl font-bold text-gray-900">{{ form.id ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới' }}</h3>
              <p class="text-sm text-gray-600 mt-1">{{ form.id ? 'Cập nhật thông tin sản phẩm' : 'Điền đầy đủ thông tin sản phẩm mới' }}</p>
            </div>
            <button type="button" @click="closeModal" 
              class="text-gray-400 hover:text-gray-600 p-2 rounded-lg hover:bg-white transition-all duration-200">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
                    <form @submit.prevent="save">
            <div class="p-6 space-y-6">
              <!-- Basic Information -->
              <div class="bg-gray-50 rounded-lg p-4">
                <h4 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <i class="fas fa-info-circle text-blue-500 mr-2"></i>
                  Thông tin cơ bản
                </h4>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Tên sản phẩm *</label>
                    <input v-model="form.name" type="text" 
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" 
                      placeholder="Nhập tên sản phẩm..." required />
                  </div>
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Mã SKU *</label>
                    <input v-model="form.sku" type="text" 
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 font-mono bg-gray-50" 
                      placeholder="VD: SP001" required />
                  </div>
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Danh mục *</label>
                    <select v-model="form.category" 
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" required>
                      <option value="">Chọn danh mục</option>
                      <option value="Điện thoại">📱 Điện thoại</option>
                      <option value="Laptop">💻 Laptop</option>
                      <option value="Phụ kiện">🎧 Phụ kiện</option>
                      <option value="Tablet">📟 Tablet</option>
                    </select>
                  </div>
                  <div class="flex items-center">
                    <div class="flex items-center h-full">
                      <input v-model="form.active" type="checkbox" 
                        class="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" id="pActive">
                      <label for="pActive" class="ml-3 text-sm font-medium text-gray-700 flex items-center">
                        <span class="w-3 h-3 bg-green-400 rounded-full mr-2"></span>
                        Sản phẩm đang bán
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Pricing & Stock -->
              <div class="bg-blue-50 rounded-lg p-4">
                <h4 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <i class="fas fa-dollar-sign text-green-500 mr-2"></i>
                  Giá cả & Kho hàng
                </h4>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Giá bán (VND) *</label>
                    <div class="relative">
                      <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₫</span>
                      <input v-model="form.price" type="number" 
                        class="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" 
                        placeholder="0" min="0" required />
                    </div>
                  </div>
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Số lượng tồn kho *</label>
                    <div class="relative">
                      <input v-model="form.stock" type="number" 
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" 
                        placeholder="0" min="0" required />
                      <span class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">sản phẩm</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Product Image -->
              <div class="bg-purple-50 rounded-lg p-4">
                <h4 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <i class="fas fa-image text-purple-500 mr-2"></i>
                  Hình ảnh sản phẩm
                </h4>
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">URL hình ảnh</label>
                  <input v-model="form.image" type="url" 
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" 
                    placeholder="https://example.com/image.jpg" />
                  <p class="text-xs text-gray-500 mt-1">
                    <i class="fas fa-info-circle mr-1"></i>
                    Để trống sẽ sử dụng hình ảnh mặc định
                  </p>
                  <!-- Image Preview -->
                  <div v-if="form.image" class="mt-3">
                    <div class="w-20 h-20 border-2 border-gray-200 rounded-lg overflow-hidden bg-white">
                      <img :src="form.image" alt="Preview" class="w-full h-full object-cover" 
                        @error="$event.target.src='/src/assets/img/placeholder.jpg'">
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50">
              <button type="button" @click="closeModal" 
                class="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <i class="fas fa-times mr-2"></i>Hủy
              </button>
              <button type="submit" 
                class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl">
                <i class="fas fa-save mr-2"></i>{{ form.id ? 'Cập nhật' : 'Tạo mới' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.badge-soft-success {
  background-color: rgba(25, 135, 84, 0.12);
  color: #198754;
}

.badge-soft-danger {
  background-color: rgba(220, 53, 69, 0.12);
  color: #dc3545;
}

.card-shadow {
  box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.06);
}

.table th {
  font-weight: 600;
  color: #495057;
}

.table td {
  vertical-align: middle;
}

.btn-group-sm .btn {
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
}

/* Modal transitions */
.modal-enter-active, .modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from, .modal-leave-to {
  opacity: 0;
  backdrop-filter: blur(0px);
}

.modal-enter-active .bg-white,
.modal-leave-active .bg-white {
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.modal-enter-from .bg-white,
.modal-leave-to .bg-white {
  transform: scale(0.9) translateY(-20px);
  opacity: 0;
}

/* Enhanced styles */
.group:hover .opacity-0 {
  opacity: 1;
}

.bg-gradient-to-r {
  background: linear-gradient(135deg, #f0f9ff 0%, #e0e7ff 100%);
}

/* Custom scrollbar for modal */
.max-h-\[90vh\]::-webkit-scrollbar {
  width: 6px;
}

.max-h-\[90vh\]::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.max-h-\[90vh\]::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 10px;
}

.max-h-\[90vh\]::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>

<script setup>
import { ref } from 'vue'
import Swal from 'sweetalert2'

const stats = [
  { icon:'fas fa-box', iconClass:'text-primary', value: 234, label:'Tổng sản phẩm' },
  { icon:'fas fa-check-circle', iconClass:'text-success', value: 189, label:'Đang bán' },
  { icon:'fas fa-exclamation-triangle', iconClass:'text-warning', value: 12, label:'Sắp hết hàng' },
  { icon:'fas fa-dollar-sign', iconClass:'text-info', value: '₫128.5M', label:'Doanh thu' },
]

const products = ref([
  { id:1, name:'iPhone 15 Pro Max', sku:'IP15PM-256BL', price:32990000, stock:12, active:true, category:'Điện thoại', image:'https://via.placeholder.com/50' },
  { id:2, name:'MacBook Air M2', sku:'MBA-M2-13', price:25990000, stock:7, active:true, category:'Laptop', image:'https://via.placeholder.com/50' },
  { id:3, name:'AirPods Pro 2', sku:'APP2', price:4990000, stock:0, active:false, category:'Phụ kiện', image:'https://via.placeholder.com/50' },
])

const empty = { id:null, name:'', sku:'', price:0, stock:0, active:true, image:'', category:'' }
const form = ref({ ...empty })
const showModal = ref(false)

function openAdd(){
  reset()
  showModal.value = true
}

function openEdit(p){
  form.value = { ...p }
  showModal.value = true
}

function closeModal(){
  showModal.value = false
  reset()
}

function reset(){
  form.value = { ...empty }
}

function save(){
  if(form.value.id){
    const idx = products.value.findIndex(x=>x.id===form.value.id)
    if(idx>-1) products.value[idx] = { ...form.value }
    Swal.fire({ icon:'success', title:'Đã cập nhật sản phẩm', timer:1200, showConfirmButton:false })
  } else {
    form.value.id = Math.max(0, ...products.value.map(x=>x.id)) + 1
    if(!form.value.category) form.value.category = 'Điện thoại' // Default category
    products.value.unshift({ ...form.value })
    Swal.fire({ icon:'success', title:'Đã thêm sản phẩm', timer:1200, showConfirmButton:false })
  }
  closeModal()
}

function remove(p){
  Swal.fire({
    title:'Xóa sản phẩm?',
    text:p.name,
    icon:'warning',
    showCancelButton:true,
    confirmButtonText:'Xóa',
    cancelButtonText:'Hủy'
  }).then(res=>{
    if(res.isConfirmed){
      const idx = products.value.findIndex(x=>x.id===p.id)
      if(idx>-1) products.value.splice(idx,1)
      Swal.fire({ icon:'success', title:'Đã xóa', timer:1000, showConfirmButton:false })
    }
  })
}
</script>