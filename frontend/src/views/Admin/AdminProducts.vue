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
      
      <div class="overflow-hidden rounded-xl border border-gray-200">
        <div class="overflow-x-auto">
          <table class="w-full">
            <!-- Modern Header with Strong Colors -->
            <thead style="background: linear-gradient(135deg, #2563eb 0%, #9333ea 100%);">
              <tr>
                <th class="px-6 py-4 text-left">
                  <div class="flex items-center">
                    <input type="checkbox" class="rounded border-white text-blue-500 focus:ring-blue-500 focus:ring-2">
                    <span class="ml-3 text-xs font-semibold uppercase tracking-wider" style="color: white;">Chọn tất cả</span>
                  </div>
                </th>
                <th class="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider" style="color: white;">
                  <div class="flex items-center gap-2">
                    <i class="fas fa-box" style="color: rgba(255,255,255,0.9);"></i>
                    Sản phẩm
                  </div>
                </th>
                <th class="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider" style="color: white;">
                  <div class="flex items-center gap-2">
                    <i class="fas fa-barcode" style="color: rgba(255,255,255,0.9);"></i>
                    SKU
                  </div>
                </th>
                <th class="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider" style="color: white;">
                  <div class="flex items-center gap-2">
                    <i class="fas fa-tag" style="color: rgba(255,255,255,0.9);"></i>
                    Giá bán
                  </div>
                </th>
                <th class="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider" style="color: white;">
                  <div class="flex items-center gap-2">
                    <i class="fas fa-warehouse" style="color: rgba(255,255,255,0.9);"></i>
                    Tồn kho
                  </div>
                </th>
                <th class="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider" style="color: white;">
                  <div class="flex items-center gap-2">
                    <i class="fas fa-toggle-on" style="color: rgba(255,255,255,0.9);"></i>
                    Trạng thái
                  </div>
                </th>
                <th class="px-6 py-4 text-right text-sm font-semibold uppercase tracking-wider" style="color: white;">
                  <div class="flex items-center justify-end gap-2">
                    <i class="fas fa-cogs" style="color: rgba(255,255,255,0.9);"></i>
                    Thao tác
                  </div>
                </th>
              </tr>
            </thead>
            
            <!-- Modern Body -->
            <tbody class="bg-white divide-y divide-gray-100">
              <tr v-for="p in products" :key="p.id" class="transition-all duration-200 group" 
                @mouseover="$event.target.style.background='linear-gradient(135deg, rgba(37, 99, 235, 0.05), rgba(147, 51, 234, 0.05))'" 
                @mouseleave="$event.target.style.background='white'">
                <td class="px-6 py-5 whitespace-nowrap">
                  <div class="flex items-center">
                    <input type="checkbox" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-2">
                  </div>
                </td>
                
                <!-- Product Info -->
                <td class="px-6 py-5 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="relative h-14 w-14 flex-shrink-0">
                      <img :src="p.image" alt="" class="h-14 w-14 rounded-xl object-cover border-2 border-gray-200 group-hover:border-blue-300 transition-colors duration-200" />
                      <div class="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-600/0 to-purple-600/0 group-hover:from-blue-600/10 group-hover:to-purple-600/10 transition-all duration-200"></div>
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-bold text-gray-900 group-hover:text-blue-700 transition-colors duration-200">{{ p.name }}</div>
                      <div class="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full inline-block mt-1">
                        <i class="fas fa-layer-group mr-1"></i>{{ p.category }}
                      </div>
                    </div>
                  </div>
                </td>
                
                <!-- SKU -->
                <td class="px-6 py-5 whitespace-nowrap">
                  <div class="relative">
                    <div class="text-sm font-mono text-gray-900 bg-gradient-to-r from-gray-100 to-gray-200 px-3 py-2 rounded-lg border border-gray-300 group-hover:from-blue-100 group-hover:to-purple-100 group-hover:border-blue-300 transition-all duration-200">
                      {{ p.sku }}
                    </div>
                  </div>
                </td>
                
                <!-- Price -->
                <td class="px-6 py-5 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="text-lg font-bold" style="background: linear-gradient(135deg, #2563eb, #9333ea); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
                      ₫{{ Number(p.price).toLocaleString('vi-VN') }}
                    </div>
                  </div>
                </td>
                
                <!-- Stock -->
                <td class="px-6 py-5 whitespace-nowrap">
                  <div class="flex items-center gap-3">
                    <div class="text-sm font-bold text-gray-900">{{ p.stock }}</div>
                    <span v-if="p.stock < 10" class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border-2" 
                      style="background: linear-gradient(135deg, #fee2e2, #fed7aa); color: #dc2626; border-color: #fca5a5;">
                      <i class="fas fa-exclamation-triangle mr-1" style="color: #ef4444;"></i>Sắp hết
                    </span>
                    <span v-else-if="p.stock < 50" class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border-2" 
                      style="background: linear-gradient(135deg, #fef3c7, #fed7aa); color: #d97706; border-color: #fbbf24;">
                      <i class="fas fa-info-circle mr-1" style="color: #f59e0b;"></i>Ít
                    </span>
                    <span v-else class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border-2" 
                      style="background: linear-gradient(135deg, #dcfce7, #d1fae5); color: #059669; border-color: #6ee7b7;">
                      <i class="fas fa-check-circle mr-1" style="color: #10b981;"></i>Đủ
                    </span>
                  </div>
                </td>
                
                <!-- Status -->
                <td class="px-6 py-5 whitespace-nowrap">
                  <div class="relative">
                    <span class="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold border-2 transition-all duration-200" 
                      :style="p.active ? 'background: linear-gradient(135deg, #dcfce7, #d1fae5); color: #047857; border-color: #10b981;' : 'background: linear-gradient(135deg, #fee2e2, #fecaca); color: #dc2626; border-color: #f87171;'">
                      <span class="w-2 h-2 rounded-full mr-2 animate-pulse" 
                        :style="p.active ? 'background-color: #10b981;' : 'background-color: #ef4444;'"></span>
                      {{ p.active ? 'Đang bán' : 'Ngừng bán' }}
                    </span>
                  </div>
                </td>
                
                <!-- Actions -->
                <td class="px-6 py-5 whitespace-nowrap text-right">
                  <div class="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                    <!-- View Detail -->
                    <button class="p-3 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105" 
                      style="background: linear-gradient(135deg, #f3f4f6, #e5e7eb); color: #374151;" 
                      @mouseover="$event.target.style.background='linear-gradient(135deg, #e5e7eb, #d1d5db)'" 
                      @mouseleave="$event.target.style.background='linear-gradient(135deg, #f3f4f6, #e5e7eb)'" 
                      title="Xem chi tiết">
                      <i class="fas fa-eye text-sm"></i>
                    </button>
                    
                    <!-- Edit -->
                    <button class="p-3 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105" 
                      style="background: linear-gradient(135deg, #dbeafe, #bfdbfe); color: #1d4ed8;" 
                      @mouseover="$event.target.style.background='linear-gradient(135deg, #bfdbfe, #93c5fd)'" 
                      @mouseleave="$event.target.style.background='linear-gradient(135deg, #dbeafe, #bfdbfe)'" 
                      @click="openEdit(p)" title="Chỉnh sửa">
                      <i class="fas fa-pen text-sm"></i>
                    </button>
                    
                    <!-- Copy -->
                    <button class="p-3 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105" 
                      style="background: linear-gradient(135deg, #d1fae5, #a7f3d0); color: #047857;" 
                      @mouseover="$event.target.style.background='linear-gradient(135deg, #a7f3d0, #6ee7b7)'" 
                      @mouseleave="$event.target.style.background='linear-gradient(135deg, #d1fae5, #a7f3d0)'" 
                      title="Sao chép">
                      <i class="fas fa-copy text-sm"></i>
                    </button>
                    
                    <!-- Delete -->
                    <button class="p-3 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105" 
                      style="background: linear-gradient(135deg, #fee2e2, #fecaca); color: #dc2626;" 
                      @mouseover="$event.target.style.background='linear-gradient(135deg, #fecaca, #fca5a5)'" 
                      @mouseleave="$event.target.style.background='linear-gradient(135deg, #fee2e2, #fecaca)'" 
                      @click="remove(p)" title="Xóa">
                      <i class="fas fa-trash text-sm"></i>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
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

    <!-- Modern Compact Modal -->
    <Transition name="modal" appear>
      <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" @click="closeModal">
        <div class="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl max-w-xl w-full max-h-[88vh] overflow-hidden border border-white/20" @click.stop>
          
          <!-- Compact Header -->
          <div class="relative" style="background: linear-gradient(135deg, #2563eb 0%, #9333ea 100%);">
            <div class="px-7 py-5">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-4">
                  <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <i class="fas fa-box text-white text-xl"></i>
                  </div>
                  <div>
                    <h3 class="text-xl font-bold text-white">{{ form.id ? 'Sửa sản phẩm' : 'Thêm sản phẩm mới' }}</h3>
                    <p class="text-white/80 text-sm">{{ form.id ? 'Cập nhật thông tin sản phẩm' : 'Tạo sản phẩm mới trong hệ thống' }}</p>
                  </div>
                </div>
                <button type="button" @click="closeModal" 
                  class="text-white/70 hover:text-white p-2.5 rounded-lg hover:bg-white/10 transition-all duration-200">
                  <i class="fas fa-times text-xl"></i>
                </button>
              </div>
            </div>
          </div>

          <!-- Compact Form -->
          <form @submit.prevent="save">
            <div class="p-7 space-y-5 max-h-[62vh] overflow-y-auto">
              
              <!-- Row 1: Name & SKU -->
              <div class="grid grid-cols-2 gap-5">
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">
                    <i class="fas fa-tag text-blue-500 mr-2"></i>Tên sản phẩm *
                  </label>
                  <input v-model="form.name" type="text" 
                    class="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" 
                    placeholder="Nhập tên sản phẩm..." required />
                </div>
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">
                    <i class="fas fa-barcode text-purple-500 mr-2"></i>Mã SKU *
                  </label>
                  <input v-model="form.sku" type="text" 
                    class="w-full px-4 py-3 text-sm font-mono border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-gray-50" 
                    placeholder="VD: SP001" required />
                </div>
              </div>

              <!-- Row 2: Category & Status -->
              <div class="grid grid-cols-2 gap-5">
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">
                    <i class="fas fa-layer-group text-green-500 mr-2"></i>Danh mục *
                  </label>
                  <select v-model="form.category" 
                    class="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" required>
                    <option value="">Chọn danh mục</option>
                    <option value="Điện thoại">📱 Điện thoại</option>
                    <option value="Laptop">💻 Laptop</option>
                    <option value="Phụ kiện">🎧 Phụ kiện</option>
                    <option value="Tablet">📟 Tablet</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">
                    <i class="fas fa-toggle-on text-orange-500 mr-2"></i>Trạng thái
                  </label>
                  <div class="flex items-center h-12 px-4 py-3 border border-gray-300 rounded-lg bg-gray-50">
                    <input v-model="form.active" type="checkbox" 
                      class="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500" id="pActive">
                    <label for="pActive" class="ml-3 text-sm font-medium text-gray-700 flex items-center">
                      <span class="w-2.5 h-2.5 rounded-full mr-2" 
                        :style="form.active ? 'background-color: #10b981;' : 'background-color: #ef4444;'"></span>
                      {{ form.active ? 'Đang bán' : 'Tạm ngừng' }}
                    </label>
                  </div>
                </div>
              </div>

              <!-- Row 3: Price & Stock -->
              <div class="grid grid-cols-2 gap-5">
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">
                    <i class="fas fa-dollar-sign text-emerald-500 mr-2"></i>Giá bán (VND) *
                  </label>
                  <div class="relative">
                    <span class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm font-medium">₫</span>
                    <input v-model="form.price" type="number" 
                      class="w-full pl-9 pr-4 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" 
                      placeholder="0" min="0" required />
                  </div>
                </div>
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">
                    <i class="fas fa-warehouse text-yellow-500 mr-2"></i>Tồn kho *
                  </label>
                  <input v-model="form.stock" type="number" 
                    class="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" 
                    placeholder="0" min="0" required />
                </div>
              </div>

              <!-- Image URL -->
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">
                  <i class="fas fa-image text-pink-500 mr-2"></i>URL hình ảnh
                </label>
                <div class="flex gap-4">
                  <input v-model="form.image" type="url" 
                    class="flex-1 px-4 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" 
                    placeholder="https://example.com/image.jpg" />
                  <div v-if="form.image" class="w-14 h-14 border-2 border-gray-200 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                    <img :src="form.image" alt="Preview" class="w-full h-full object-cover" 
                      @error="$event.target.style.display='none'">
                  </div>
                </div>
                <p class="text-xs text-gray-500 mt-2">
                  <i class="fas fa-info-circle mr-1"></i>
                  Để trống để sử dụng hình ảnh mặc định
                </p>
              </div>
            </div>

            <!-- Compact Footer -->
            <div class="flex gap-4 p-7 border-t border-gray-200 bg-gray-50/50">
              <button type="button" @click="closeModal" 
                class="flex-1 px-5 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200">
                <i class="fas fa-times mr-2"></i>Hủy bỏ
              </button>
              <button type="submit" 
                class="flex-1 px-5 py-3 text-sm font-medium text-white rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                style="background: linear-gradient(135deg, #2563eb, #9333ea);">
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