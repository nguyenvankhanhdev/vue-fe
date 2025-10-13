<template>
  <div class="admin-products p-6 bg-gray-50 min-h-screen">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-center justify-between mb-8">
      <div class="mb-4 md:mb-0">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Quản lý sản phẩm</h1>
        <p class="text-gray-600">Kiểm soát danh mục, tồn kho và trạng thái sản phẩm của cửa hàng</p>
      </div>
      <div class="flex flex-wrap gap-3">
        <button
          class="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-all duration-200 shadow-sm">
          <i class="fas fa-file-import mr-2"></i>Import CSV
        </button>
        <button
          class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all duration-200 shadow-sm">
          <i class="fas fa-download mr-2"></i>Xuất Excel
        </button>
        <button
          class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          @click="openAdd">
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
            <select
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
              <option value="">Tất cả danh mục</option>
              <option value="electronics">Điện tử</option>
              <option value="fashion">Thời trang</option>
              <option value="home">Gia dụng</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Trạng thái</label>
            <select
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
              <option value="">Tất cả</option>
              <option value="active">Đang bán</option>
              <option value="inactive">Ngừng bán</option>
              <option value="out-of-stock">Hết hàng</option>
            </select>
          </div>
          <div class="flex items-end">
            <button
              class="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors duration-200 mr-2">
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
              {{ pagination.total || products.length }} sản phẩm
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
            <thead style="background: linear-gradient(135deg, #2563eb 0%, #9333ea 100%);">
              <tr>
                <th class="px-6 py-4 text-left">
                  <div class="flex items-center">
                    <input type="checkbox"
                      class="rounded border-white/50 bg-white/20 text-blue-500 focus:ring-0 focus:ring-offset-0 hover:bg-white/30 transition-colors">
                    <span class="ml-3 text-xs font-semibold uppercase tracking-wider" style="color: white;">Chọn tất
                      cả</span>
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
              <!-- Loading State -->
              <tr v-if="loading">
                <td colspan="7" class="px-6 py-16 text-center">
                  <div class="flex flex-col items-center justify-center">
                    <div class="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4">
                    </div>
                    <p class="text-gray-500 font-medium">Đang tải dữ liệu sản phẩm...</p>
                  </div>
                </td>
              </tr>

              <!-- Empty State -->
              <tr v-else-if="products.length === 0">
                <td colspan="7" class="px-6 py-16 text-center">
                  <div class="flex flex-col items-center justify-center">
                    <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      <i class="fas fa-box text-2xl text-gray-400"></i>
                    </div>
                    <p class="text-gray-500 font-medium mb-2">Chưa có sản phẩm nào</p>
                    <p class="text-gray-400 text-sm">Nhấn nút "Thêm sản phẩm" để bắt đầu</p>
                  </div>
                </td>
              </tr>

              <!-- Product Rows -->
              <tr v-else v-for="p in products" :key="p.id"
                class="hover:bg-gradient-to-r hover:from-blue-50/70 hover:to-purple-50/70 transition-all duration-300 group hover:shadow-sm"
                style="border-left: 4px solid transparent;"
                @mouseover="$event.target.style.borderLeftColor = '#3b82f6'; $event.target.style.transform = 'translateX(2px)'"
                @mouseleave="$event.target.style.borderLeftColor = 'transparent'; $event.target.style.transform = 'translateX(0)'">
                <td class="px-6 py-5 whitespace-nowrap">
                  <div class="flex items-center">
                    <input type="checkbox"
                      class="rounded border-gray-300 text-blue-600 focus:ring-0 focus:ring-offset-0 hover:border-blue-400 transition-colors">
                  </div>
                </td>

                <!-- Product Info -->
                <td class="px-6 py-5 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="relative h-14 w-14 flex-shrink-0">
                      <img :src="getImageSrc(p.image)" alt=""
                        class="h-14 w-14 rounded-xl object-cover border-2 border-gray-200 group-hover:border-blue-400 group-hover:shadow-lg transition-all duration-300 group-hover:scale-105"
                        @error="handleImageLoadError($event)" />
                      <div
                        class="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-600/0 to-purple-600/0 group-hover:from-blue-600/15 group-hover:to-purple-600/15 transition-all duration-300">
                      </div>
                    </div>
                    <div class="ml-4">
                      <div
                        class="text-sm font-bold text-gray-900 group-hover:text-blue-700 transition-colors duration-300 group-hover:translate-x-1 transform">
                        {{ p.name }}</div>
                      <div
                        class="text-sm text-gray-500 bg-gray-100 group-hover:bg-blue-100 px-2 py-1 rounded-full inline-block mt-1 transition-all duration-300">
                        <i class="fas fa-layer-group mr-1 group-hover:text-blue-600"></i>{{ p.category }}
                      </div>
                    </div>
                  </div>
                </td>

                <!-- SKU -->
                <td class="px-6 py-5 whitespace-nowrap">
                  <div class="relative">
                    <div
                      class="text-sm font-mono text-gray-900 bg-gradient-to-r from-gray-100 to-gray-200 group-hover:from-blue-100 group-hover:to-purple-100 px-3 py-2 rounded-lg border border-gray-300 group-hover:border-blue-400 group-hover:shadow-md transition-all duration-300 group-hover:scale-105">
                      {{ p.sku }}
                    </div>
                  </div>
                </td>

                <!-- Price -->
                <td class="px-6 py-5 whitespace-nowrap">
                  <div class="flex flex-col">
                    <div v-if="p.has_variants && p.max_price > p.price" class="flex items-center gap-1">
                      <div class="text-sm font-bold"
                        style="background: linear-gradient(135deg, #2563eb, #9333ea); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
                        ₫{{ Number(p.price).toLocaleString('vi-VN') }}
                      </div>
                      <span class="text-xs text-gray-400">-</span>
                      <div class="text-sm font-bold"
                        style="background: linear-gradient(135deg, #2563eb, #9333ea); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
                        ₫{{ Number(p.max_price).toLocaleString('vi-VN') }}
                      </div>
                    </div>
                    <div v-else class="flex items-center">
                      <div class="text-lg font-bold"
                        style="background: linear-gradient(135deg, #2563eb, #9333ea); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
                        ₫{{ Number(p.price).toLocaleString('vi-VN') }}
                      </div>
                    </div>
                    <div v-if="p.has_variants" class="text-xs text-gray-500 mt-1 flex items-center">
                      <i class="fas fa-layer-group mr-1"></i>
                      <span>{{ p.capacities?.length || 0 }} biến thể</span>
                    </div>
                  </div>
                </td>

                <!-- Stock -->
                <td class="px-6 py-5 whitespace-nowrap">
                  <div class="flex flex-col">
                    <div class="flex items-center gap-3 mb-1">
                      <div class="text-sm font-bold text-gray-900">{{ p.stock }}</div>
                      <span v-if="p.stock === 0"
                        class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border-2"
                        style="background: linear-gradient(135deg, #fee2e2, #fed7aa); color: #dc2626; border-color: #fca5a5;">
                        <i class="fas fa-times-circle mr-1" style="color: #ef4444;"></i>Hết hàng
                      </span>
                      <span v-else-if="p.stock <= 10"
                        class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border-2"
                        style="background: linear-gradient(135deg, #fef3c7, #fed7aa); color: #d97706; border-color: #fbbf24;">
                        <i class="fas fa-exclamation-triangle mr-1" style="color: #f59e0b;"></i>Sắp hết
                      </span>
                      <span v-else
                        class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border-2"
                        style="background: linear-gradient(135deg, #dcfce7, #d1fae5); color: #059669; border-color: #6ee7b7;">
                        <i class="fas fa-check-circle mr-1" style="color: #10b981;"></i>Còn hàng
                      </span>
                    </div>
                    <div v-if="p.has_variants && p.capacities?.length > 0" class="text-xs text-gray-500">
                      <i class="fas fa-boxes mr-1"></i>
                      <span v-for="(cap, idx) in p.capacities" :key="cap.id" class="mr-2">
                        {{ cap.name }}: {{ cap.stock || 0 }}
                      </span>
                    </div>
                  </div>
                </td>

                <!-- Status -->
                <td class="px-6 py-5 whitespace-nowrap">
                  <div class="relative">
                    <span
                      class="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold border-2 transition-all duration-200"
                      :style="p.active ? 'background: linear-gradient(135deg, #dcfce7, #d1fae5); color: #047857; border-color: #10b981;' : 'background: linear-gradient(135deg, #fee2e2, #fecaca); color: #dc2626; border-color: #f87171;'">
                      <span class="w-2 h-2 rounded-full mr-2 animate-pulse"
                        :style="p.active ? 'background-color: #10b981;' : 'background-color: #ef4444;'"></span>
                      {{ p.active ? 'Đang bán' : 'Ngừng bán' }}
                    </span>
                  </div>
                </td>

                <!-- Actions -->
                <td class="px-6 py-5 whitespace-nowrap text-right">
                  <div
                    class="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0">
                    <!-- View Detail -->
                    <button
                      class="p-3 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105"
                      style="background: linear-gradient(135deg, #f3f4f6, #e5e7eb); color: #374151;"
                      @mouseover="$event.target.style.background = 'linear-gradient(135deg, #e5e7eb, #d1d5db)'"
                      @mouseleave="$event.target.style.background = 'linear-gradient(135deg, #f3f4f6, #e5e7eb)'"
                      @click="openDetail(p)"
                      title="Xem chi tiết">
                      <i class="fas fa-eye text-sm"></i>
                    </button>

                    <!-- Edit -->
                    <button
                      class="p-3 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105"
                      style="background: linear-gradient(135deg, #dbeafe, #bfdbfe); color: #1d4ed8;"
                      @mouseover="$event.target.style.background = 'linear-gradient(135deg, #bfdbfe, #93c5fd)'"
                      @mouseleave="$event.target.style.background = 'linear-gradient(135deg, #dbeafe, #bfdbfe)'"
                      @click="openEdit(p)" title="Chỉnh sửa">
                      <i class="fas fa-pen text-sm"></i>
                    </button>

                    <!-- Manage Images -->
                    <button
                      class="p-3 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105"
                      style="background: linear-gradient(135deg, #fef3c7, #fed7aa); color: #d97706;"
                      @mouseover="$event.target.style.background = 'linear-gradient(135deg, #fed7aa, #fbbf24)'"
                      @mouseleave="$event.target.style.background = 'linear-gradient(135deg, #fef3c7, #fed7aa)'"
                      @click="openImageManager(p)" title="Quản lý ảnh">
                      <i class="fas fa-images text-sm"></i>
                    </button>

                    <!-- Manage Colors & Capacities -->
                    <button
                      class="p-3 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105"
                      style="background: linear-gradient(135deg, #ede9fe, #ddd6fe); color: #7c3aed;"
                      @mouseover="$event.target.style.background = 'linear-gradient(135deg, #ddd6fe, #c4b5fd)'"
                      @mouseleave="$event.target.style.background = 'linear-gradient(135deg, #ede9fe, #ddd6fe)'"
                      @click="openVariantManager(p)" title="Quản lý màu sắc & dung lượng">
                      <i class="fas fa-palette text-sm"></i>
                    </button>

                    <!-- Copy -->
                    <button
                      class="p-3 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105"
                      style="background: linear-gradient(135deg, #d1fae5, #a7f3d0); color: #047857;"
                      @mouseover="$event.target.style.background = 'linear-gradient(135deg, #a7f3d0, #6ee7b7)'"
                      @mouseleave="$event.target.style.background = 'linear-gradient(135deg, #d1fae5, #a7f3d0)'"
                      title="Sao chép">
                      <i class="fas fa-copy text-sm"></i>
                    </button>

                    <!-- Delete -->
                    <button
                      class="p-3 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105"
                      style="background: linear-gradient(135deg, #fee2e2, #fecaca); color: #dc2626;"
                      @mouseover="$event.target.style.background = 'linear-gradient(135deg, #fecaca, #fca5a5)'"
                      @mouseleave="$event.target.style.background = 'linear-gradient(135deg, #fee2e2, #fecaca)'"
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
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <!-- Pagination Info -->
          <div class="flex items-center gap-4">
            <div class="text-sm text-gray-500">
              Hiển thị <span class="font-medium">{{ pagination.from || 0 }}</span>-<span class="font-medium">{{ pagination.to || 0 }}</span> 
              trong <span class="font-medium">{{ pagination.total || 0 }}</span> sản phẩm
            </div>
            
            <!-- Page Size Selector -->
            <div class="flex items-center gap-2">
              <label class="text-sm text-gray-600">Hiển thị:</label>
              <select v-model="perPage" @change="changePageSize(perPage)" 
                class="text-sm border border-gray-300 rounded-lg px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </div>
          </div>

          <!-- Pagination Controls -->
          <div v-if="pagination.last_page > 1" class="pagination-controls flex items-center space-x-1">
            <!-- Previous Button -->
            <button @click="previousPage" :disabled="currentPage <= 1"
              class="pagination-button px-3 py-2 text-sm border border-gray-300 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              :class="currentPage <= 1 ? 'text-gray-400 bg-gray-100' : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'">
              <i class="fas fa-chevron-left mr-1"></i>Trước
            </button>

            <!-- Page Numbers -->
            <template v-for="(page, idx) in getPageNumbers()" :key="idx">
              <!-- Ellipsis -->
              <span v-if="page === '...'" class="px-3 py-2 text-sm text-gray-400">...</span>
              
              <!-- Page Number -->
              <button v-else @click="goToPage(page)" 
                class="pagination-button"
                :class="page === currentPage 
                  ? 'pagination-active px-3 py-2 text-sm text-white rounded-lg shadow-sm' 
                  : 'px-3 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors'">
                {{ page }}
              </button>
            </template>

            <!-- Next Button -->
            <button @click="nextPage" :disabled="currentPage >= pagination.last_page"
              class="pagination-button px-3 py-2 text-sm border border-gray-300 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              :class="currentPage >= pagination.last_page ? 'text-gray-400 bg-gray-100' : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'">
              Sau<i class="fas fa-chevron-right ml-1"></i>
            </button>

            <!-- Go to Page Input -->
            <div class="hidden md:flex items-center gap-2 ml-4">
              <span class="text-sm text-gray-600">Đến trang:</span>
              <input type="number" v-model.number="goToPageInput" 
                @keyup.enter="goToPage(goToPageInput)" 
                :min="1" :max="pagination.last_page"
                class="w-16 text-sm border border-gray-300 rounded-lg px-2 py-1 text-center focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                :placeholder="currentPage">
              <button @click="goToPage(goToPageInput)"
                class="px-2 py-1 text-xs bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <i class="fas fa-arrow-right"></i>
              </button>
            </div>
          </div>

          <!-- Mobile Page Jump -->
          <div v-if="pagination.last_page > 1" class="md:hidden">
            <div class="flex items-center justify-center gap-2 mt-2">
              <span class="text-sm text-gray-600">Trang:</span>
              <select v-model="currentPage" @change="goToPage(currentPage)"
                class="text-sm border border-gray-300 rounded-lg px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option v-for="page in pagination.last_page" :key="page" :value="page">
                  {{ page }}
                </option>
              </select>
              <span class="text-sm text-gray-600">/ {{ pagination.last_page }}</span>
            </div>
          </div>

          <!-- No Pagination Needed -->
          <div v-else class="text-sm text-gray-500">
            Tất cả sản phẩm đang hiển thị
          </div>
        </div>
      </div>
    </div>

    <!-- Modern Compact Modal -->
    <Transition name="modal" appear>
      <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        @click="closeModal">
        <div
          class="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl max-w-xl w-full max-h-[88vh] overflow-hidden border border-white/20"
          @click.stop>

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
          <form @submit.prevent="save" enctype="multipart/form-data">
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
                  <select v-model="form.category_id"
                    class="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    required>
                    <option value="" disabled>Chọn danh mục</option>
                    <option v-for="category in categories" :key="category.id" :value="category.id">
                      {{ category.name }}
                    </option>

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
                    <span
                      class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm font-medium">₫</span>
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

              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">
                  <i class="fas fa-align-left text-indigo-500 mr-2"></i>Mô tả sản phẩm
                </label>
                <textarea v-model="form.description" rows="4"
                  class="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="Nhập mô tả chi tiết về sản phẩm..."></textarea>
              </div>

              <!-- Image Upload -->
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">
                  <i class="fas fa-image text-pink-500 mr-2"></i>Hình ảnh sản phẩm
                </label>

                <!-- Upload Options -->
                <div class="space-y-3">
                  <!-- File Upload -->
                  <div
                    class="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-blue-400 transition-colors">
                    <div class="text-center">
                      <div class="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                        <i class="fas fa-upload text-gray-400 text-lg"></i>
                      </div>
                      <input ref="fileInput" type="file" accept="image/*" @change="handleFileUpload" class="hidden" />
                      <button type="button" @click="$refs.fileInput.click()"
                        class="text-blue-600 hover:text-blue-800 font-medium text-sm">
                        Chọn ảnh từ máy tính
                      </button>
                      <p class="text-xs text-gray-500 mt-1">PNG, JPG, GIF tối đa 5MB</p>
                    </div>
                  </div>

                  <!-- URL Input Alternative -->
                  <div class="relative">
                    <div class="absolute inset-0 flex items-center">
                      <div class="w-full border-t border-gray-300"></div>
                    </div>
                    <div class="relative flex justify-center text-sm">
                      <span class="px-2 bg-white text-gray-500">hoặc nhập URL</span>
                    </div>
                  </div>

                  <input v-model="imageUrl" type="url" @input="handleUrlInput"
                    class="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="https://example.com/image.jpg" />
                </div>

                <!-- Image Preview -->
                <div v-if="form.image || imagePreview" class="mt-4">
                  <div class="relative w-24 h-24 border-2 border-gray-200 rounded-lg overflow-hidden bg-gray-100">
                    <img :src="getImageSrc(imagePreview || form.image)" alt="Preview" class="w-full h-full object-cover"
                      @error="handleImageError" />
                    <button type="button" @click="removeImage"
                      class="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition-colors">
                      <i class="fas fa-times"></i>
                    </button>
                  </div>
                  <p class="text-xs text-gray-500 mt-2">
                    <i class="fas fa-check-circle text-green-500 mr-1"></i>
                    Ảnh đã được tải lên
                  </p>
                </div>

                <!-- Loading State -->
                <div v-if="uploadingImage" class="mt-4">
                  <div class="flex items-center justify-center p-4 bg-blue-50 rounded-lg">
                    <div class="w-6 h-6 border-2 border-blue-200 border-t-blue-600 rounded-full animate-spin mr-3">
                    </div>
                    <span class="text-blue-600 text-sm font-medium">Đang xử lý ảnh...</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Compact Footer -->
            <div class="flex gap-4 p-7 border-t border-gray-200 bg-gray-50/50">
              <button type="button" @click="closeModal"
                class="flex-1 px-5 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200">
                <i class="fas fa-times mr-2"></i>Hủy bỏ
              </button>
              <button type="submit" :disabled="saving"
                class="flex-1 px-5 py-3 text-sm font-medium text-white rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
                style="background: linear-gradient(135deg, #2563eb, #9333ea);">
                <i v-if="saving" class="fas fa-spinner fa-spin mr-2"></i>
                <i v-else class="fas fa-save mr-2"></i>
                {{ saving ? 'Đang lưu...' : (form.id ? 'Cập nhật' : 'Tạo mới') }}
              </button>
            </div>
          </form>






        </div>
      </div>
    </Transition>

    <!-- Image Manager Modal -->
    <Transition name="modal" appear>
      <div v-if="showImageModal"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        @click="closeImageModal">
        <div
          class="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl max-w-4xl w-full max-h-[85vh] overflow-hidden border border-white/20 flex flex-col"
          @click.stop>

          <!-- Header -->
          <div class="relative" style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);">
            <div class="px-7 py-5">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-4">
                  <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <i class="fas fa-images text-white text-xl"></i>
                  </div>
                  <div>
                    <h3 class="text-xl font-bold text-white">Quản lý ảnh sản phẩm</h3>
                    <p class="text-white/80 text-sm">{{ selectedProduct?.name || 'Tên sản phẩm' }}</p>
                  </div>
                </div>
                <button type="button" @click="closeImageModal"
                  class="text-white/70 hover:text-white p-2.5 rounded-lg hover:bg-white/10 transition-all duration-200">
                  <i class="fas fa-times text-xl"></i>
                </button>
              </div>
            </div>
          </div>

          <!-- Content -->
          <div class="flex-1 p-7 overflow-y-auto">

            <!-- Upload Section -->
            <div class="mb-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
              <h4 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <i class="fas fa-cloud-upload-alt text-blue-600 mr-2"></i>
                Thêm ảnh mới
              </h4>

              <!-- Multiple File Upload -->
              <div
                class="border-2 border-dashed border-blue-300 rounded-lg p-6 hover:border-blue-400 transition-colors">
                <div class="text-center">
                  <div class="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <i class="fas fa-upload text-blue-600 text-2xl"></i>
                  </div>
                  <input ref="multiFileInput" type="file" accept="image/*" multiple @change="handleMultipleFileUpload"
                    class="hidden" />
                  <button type="button" @click="$refs.multiFileInput.click()"
                    class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-medium mb-2">
                    <i class="fas fa-plus mr-2"></i>Chọn nhiều ảnh
                  </button>
                  <p class="text-sm text-gray-600">PNG, JPG, GIF, WebP tối đa 5MB mỗi ảnh</p>
                  <p class="text-xs text-gray-500 mt-1">Có thể chọn nhiều ảnh cùng lúc</p>
                </div>
              </div>

              <!-- Upload Progress -->
              <div v-if="uploadProgress.length > 0" class="mt-4 space-y-2">
                <div v-for="(progress, idx) in uploadProgress" :key="idx"
                  class="flex items-center gap-3 p-3 bg-white rounded-lg border">
                  <div class="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden">
                    <img :src="progress.preview" alt="Preview" class="w-full h-full object-cover" />
                  </div>
                  <div class="flex-1">
                    <div class="text-sm font-medium text-gray-900">{{ progress.name }}</div>
                    <div class="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div class="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        :style="{ width: progress.percent + '%' }"></div>
                    </div>
                    <div class="text-xs text-gray-500 mt-1">{{ progress.percent }}%</div>
                  </div>
                  <div class="text-sm"
                    :class="progress.status === 'success' ? 'text-green-600' : progress.status === 'error' ? 'text-red-600' : 'text-blue-600'">
                    <i v-if="progress.status === 'success'" class="fas fa-check-circle"></i>
                    <i v-else-if="progress.status === 'error'" class="fas fa-exclamation-circle"></i>
                    <i v-else class="fas fa-spinner fa-spin"></i>
                  </div>
                </div>
              </div>
            </div>

            <!-- Images Grid -->
            <div class="mb-6">
              <div class="flex items-center justify-between mb-4">
                <h4 class="text-lg font-semibold text-gray-900 flex items-center">
                  <i class="fas fa-photo-video text-purple-600 mr-2"></i>
                  Ảnh hiện có ({{ productImages.length }})
                </h4>
                <div class="flex items-center gap-2">
                  <button @click="selectAllImages"
                    class="text-sm px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                    {{ allSelected ? 'Bỏ chọn tất cả' : 'Chọn tất cả' }}
                  </button>
                  <button @click="deleteSelectedImages" :disabled="selectedImages.length === 0"
                    class="text-sm px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                    <i class="fas fa-trash mr-1"></i>Xóa đã chọn ({{ selectedImages.length }})
                  </button>
                </div>
              </div>

              <!-- Images Grid -->
              <div v-if="productImages.length === 0" class="text-center py-12 bg-gray-50 rounded-xl">
                <div class="w-16 h-16 mx-auto bg-gray-200 rounded-full flex items-center justify-center mb-4">
                  <i class="fas fa-image text-gray-400 text-2xl"></i>
                </div>
                <p class="text-gray-500 font-medium mb-2">Chưa có ảnh nào</p>
                <p class="text-gray-400 text-sm">Thêm ảnh đầu tiên cho sản phẩm này</p>
              </div>

              <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <div v-for="(image, idx) in productImages" :key="idx"
                  class="relative group bg-white rounded-xl border-2 hover:border-blue-300 transition-all duration-200 overflow-hidden"
                  :class="{ 'border-blue-500 ring-2 ring-blue-200': selectedImages.includes(image.id) }">

                  <!-- Selection Checkbox -->
                  <div class="absolute top-2 left-2 z-10">
                    <input type="checkbox" :value="image.id" v-model="selectedImages"
                      class="w-5 h-5 text-blue-600 bg-white border-2 border-gray-300 rounded focus:ring-blue-500 shadow-lg">
                  </div>

                  <!-- Main Image Badge -->
                  <div v-if="image.is_main" class="absolute top-2 right-2 z-10">
                    <span class="bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                      <i class="fas fa-star mr-1"></i>Chính
                    </span>
                  </div>

                  <!-- Image -->
                  <div class="aspect-square overflow-hidden">
                    <img :src="getImageSrc(image.url)" :alt="image.alt || 'Product image'"
                      class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      @error="handleImageLoadError" />
                  </div>

                  <!-- Overlay Actions -->
                  <div
                    class="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div class="flex items-center gap-2">
                      <!-- Set Main -->
                      <button v-if="!image.is_main" @click="setMainImage(image.id)"
                        class="p-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
                        title="Đặt làm ảnh chính">
                        <i class="fas fa-star text-sm"></i>
                      </button>

                      <!-- Edit -->
                      <button @click="editImage(image)"
                        class="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        title="Chỉnh sửa">
                        <i class="fas fa-pen text-sm"></i>
                      </button>

                      <!-- Delete Single -->
                      <button @click="deleteImage(image.id)"
                        class="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors" title="Xóa">
                        <i class="fas fa-trash text-sm"></i>
                      </button>
                    </div>
                  </div>

                  <!-- Image Info -->
                  <div class="p-3 bg-gray-50">
                    <div class="text-xs font-medium text-gray-900 truncate">{{ image.alt || 'Không có mô tả' }}</div>
                    <div class="text-xs text-gray-500 mt-1">{{ formatFileSize(image.size) }}</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Spacer để đảm bảo có đủ không gian cho footer -->
            <div class="h-4"></div>
          </div>

          <!-- Footer -->
          <div class="flex-shrink-0 flex gap-4 p-7 border-t border-gray-200 bg-gray-50/50">
            <button type="button" @click="closeImageModal"
              class="flex-1 px-5 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200">
              <i class="fas fa-times mr-2"></i>Đóng
            </button>
            <button type="button" @click="saveImageChanges"
              class="flex-1 px-5 py-3 text-sm font-medium text-white rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
              style="background: linear-gradient(135deg, #f59e0b, #d97706);">
              <i class="fas fa-save mr-2"></i>Lưu thay đổi
            </button>
          </div>

        </div>
      </div>
    </Transition>

    <!-- Variant Manager Modal (Colors & Capacities) -->
    <Transition name="modal" appear>
      <div v-if="showVariantModal"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        @click="closeVariantModal">
        <div
          class="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl max-w-5xl w-full max-h-[85vh] overflow-hidden border border-white/20 flex flex-col"
          @click.stop>

          <!-- Header -->
          <div class="relative" style="background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%);">
            <div class="px-7 py-5">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-4">
                  <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <i class="fas fa-palette text-white text-xl"></i>
                  </div>
                  <div>
                    <h3 class="text-xl font-bold text-white">Quản lý màu sắc & dung lượng</h3>
                    <p class="text-white/80 text-sm">{{ selectedVariantProduct?.name || 'Tên sản phẩm' }}</p>
                  </div>
                </div>
                <button type="button" @click="closeVariantModal"
                  class="text-white/70 hover:text-white p-2.5 rounded-lg hover:bg-white/10 transition-all duration-200">
                  <i class="fas fa-times text-xl"></i>
                </button>
              </div>
            </div>
          </div>

          <!-- Content -->
          <div class="flex-1 overflow-y-auto">
            <!-- Tabs Navigation -->
            <div class="px-7 pt-6 pb-2">
              <div class="flex space-x-1 bg-gray-100 rounded-lg p-1">
                <button @click="activeVariantTab = 'colors'"
                  :class="activeVariantTab === 'colors' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'"
                  class="flex-1 py-2 px-4 text-sm font-medium rounded-lg transition-all duration-200">
                  <i class="fas fa-palette mr-2"></i>Màu sắc
                </button>
                <button @click="activeVariantTab = 'capacities'"
                  :class="activeVariantTab === 'capacities' ? 'bg-white text-green-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'"
                  class="flex-1 py-2 px-4 text-sm font-medium rounded-lg transition-all duration-200">
                  <i class="fas fa-hdd mr-2"></i>Dung lượng
                </button>
                <button @click="activeVariantTab = 'variants'"
                  :class="activeVariantTab === 'variants' ? 'bg-white text-purple-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'"
                  class="flex-1 py-2 px-4 text-sm font-medium rounded-lg transition-all duration-200">
                  <i class="fas fa-layer-group mr-2"></i>Variants
                </button>
              </div>
            </div>

            <!-- Tab Content -->
            <div class="px-7 pb-7">

              <!-- Colors Tab -->
              <div v-if="activeVariantTab === 'colors'"
                class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-6">
                <h4 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <i class="fas fa-palette text-blue-600 mr-2"></i>
                  Màu sắc sản phẩm
                </h4>

                <!-- Add New Color -->
                <div class="mb-4 p-4 bg-white rounded-lg border">
                  <h5 class="font-medium text-gray-700 mb-3">Thêm màu mới</h5>
                  <div class="grid grid-cols-2 gap-3">
                    <input v-model="newColor.name" type="text" placeholder="Tên màu (VD: Titan Xanh)"
                      class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm">
                    <input v-model="newColor.color_code" type="color"
                      class="h-10 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                  </div>
                  <button @click="addColor"
                    class="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 text-sm font-medium">
                    <i class="fas fa-plus mr-1"></i>Thêm màu
                  </button>
                </div>

                <!-- Colors List -->
                <div class="space-y-2 max-h-64 overflow-y-auto">
                  <div v-for="(color, idx) in productColors" :key="color.id"
                    class="flex items-center justify-between p-3 bg-white rounded-lg border hover:shadow-sm transition-all">
                    <div class="flex items-center gap-3">
                      <div class="w-8 h-8 rounded-full border-2 border-gray-300 shadow-sm"
                        :style="{ backgroundColor: color.color_code }"></div>
                      <div>
                        <div class="font-medium text-gray-900 text-sm">{{ color.name }}</div>
                        <div class="text-xs text-gray-500">{{ color.color_code }}</div>
                      </div>
                    </div>
                    <div class="flex items-center gap-2">
                      <button @click="editColor(color)"
                        class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-sm">
                        <i class="fas fa-pen"></i>
                      </button>
                      <button @click="deleteColor(color.id)"
                        class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm">
                        <i class="fas fa-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Capacities Tab -->
              <div v-if="activeVariantTab === 'capacities'"
                class="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200 p-6">
                <h4 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <i class="fas fa-hdd text-green-600 mr-2"></i>
                  Dung lượng sản phẩm
                </h4>

                <!-- Add New Capacity -->
                <div class="mb-4 p-4 bg-white rounded-lg border">
                  <h5 class="font-medium text-gray-700 mb-3">Thêm dung lượng mới</h5>
                  <div class="space-y-3">
                    <input v-model="newCapacity.name" type="text" placeholder="Tên (VD: 256GB)"
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 text-sm">
                    <input v-model="newCapacity.display_name" type="text"
                      placeholder="Tên hiển thị (VD: 256GB - Tiêu chuẩn)"
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 text-sm">
                    <div class="grid grid-cols-2 gap-3">
                      <input v-model="newCapacity.price" type="number" placeholder="Giá "
                        class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 text-sm">
                      <input v-model="newCapacity.stock" type="number" placeholder="Tồn kho"
                        class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 text-sm">
                    </div>
                    <input v-model="newCapacity.discount_price" type="number" placeholder="Giá khuyến mãi (tuỳ chọn)"
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 text-sm">
                  </div>
                  <button @click="addCapacity"
                    class="mt-3 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 text-sm font-medium">
                    <i class="fas fa-plus mr-1"></i>Thêm dung lượng
                  </button>
                </div>

                <!-- Capacities List -->
                <div class="space-y-2 max-h-64 overflow-y-auto">
                  <div v-for="(capacity, idx) in productCapacities" :key="capacity.id"
                    class="flex items-center justify-between p-3 bg-white rounded-lg border hover:shadow-sm transition-all">
                    <div class="flex-1">
                      <div class="font-medium text-gray-900 text-sm">{{ capacity.display_name || capacity.name }}</div>
                      <div class="text-xs text-gray-500 mt-1 space-x-3">
                        <span>₫{{ Number(capacity.final_price || capacity.price).toLocaleString('vi-VN') }}</span>
                        <span>Kho: {{ capacity.stock }}</span>
                        <span v-if="capacity.discount_price" class="text-orange-600">KM: ₫{{
                          Number(capacity.discount_price).toLocaleString('vi-VN') }}</span>
                      </div>
                    </div>
                    <div class="flex items-center gap-2">
                      <button @click="editCapacity(capacity)"
                        class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-sm">
                        <i class="fas fa-pen"></i>
                      </button>
                      <button @click="deleteCapacity(capacity.id)"
                        class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm">
                        <i class="fas fa-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Variants Tab -->
            <div v-if="activeVariantTab === 'variants'"
              class="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200 p-6">
              <h4 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <i class="fas fa-layer-group text-purple-600 mr-2"></i>
                Variants sản phẩm (Màu sắc × Dung lượng)
              </h4>

              <!-- Generate Variants Button -->
              <div class="mb-6 p-4 bg-white rounded-lg border">
                <div class="flex items-center justify-between">
                  <div>
                    <h5 class="font-medium text-gray-700 mb-1">Tự động tạo variants</h5>
                    <p class="text-sm text-gray-500">Tạo tất cả combinations từ màu sắc và dung lượng hiện có</p>
                  </div>
                  <button @click="generateVariants"
                    class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm font-medium">
                    <i class="fas fa-magic mr-1"></i>Tạo variants
                  </button>
                </div>
              </div>

              <!-- Add New Variant Manually -->
              <div class="mb-6 p-4 bg-white rounded-lg border">
                <h5 class="font-medium text-gray-700 mb-3">Thêm variant thủ công</h5>
                <div class="grid grid-cols-2 gap-3 mb-3">
                  <select v-model="newVariant.color_id"
                    class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-sm">
                    <option value="">Chọn màu sắc</option>
                    <option v-for="color in productColors" :key="color.id" :value="color.id">
                      {{ color.name }}
                    </option>
                  </select>
                  <select v-model="newVariant.capacity_id"
                    class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-sm">
                    <option value="">Chọn dung lượng</option>
                    <option v-for="capacity in productCapacities" :key="capacity.id" :value="capacity.id">
                      {{ capacity.display_name || capacity.name }}
                    </option>
                  </select>
                </div>
                <div class="grid grid-cols-3 gap-3 mb-3">
                  <input v-model="newVariant.sku" type="text" placeholder="SKU (VD: IP15-256-BLUE)"
                    class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-sm">
                  <input v-model="newVariant.price" type="number" placeholder="Giá (tùy chọn)"
                    class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-sm">
                  <input v-model="newVariant.stock" type="number" placeholder="Tồn kho"
                    class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-sm">
                </div>
                <button @click="addVariant"
                  class="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 text-sm font-medium">
                  <i class="fas fa-plus mr-1"></i>Thêm variant
                </button>
              </div>

              <!-- Variants List -->
              <div class="space-y-2 max-h-96 overflow-y-auto">
                <div v-if="productVariants.length === 0" class="text-center py-8 text-gray-500">
                  <i class="fas fa-layer-group text-4xl mb-3 text-gray-300"></i>
                  <p>Chưa có variant nào</p>
                  <p class="text-sm">Thêm màu sắc và dung lượng trước, sau đó tạo variants</p>
                </div>

                <div v-for="(variant, idx) in productVariants" :key="variant.id"
                  class="flex items-center justify-between p-4 bg-white rounded-lg border hover:shadow-sm transition-all">
                  <div class="flex items-center gap-4 flex-1">
                    <!-- Color Preview -->
                    <div class="flex items-center gap-2">
                      <div class="w-6 h-6 rounded-full border border-gray-300 shadow-sm"
                        :style="{ backgroundColor: getColorCode(variant.color_id) }"></div>
                      <span class="text-sm font-medium text-gray-900">{{ getColorName(variant.color_id) }}</span>
                    </div>

                    <!-- Separator -->
                    <div class="text-gray-400">×</div>

                    <!-- Capacity Info -->
                    <div class="text-sm font-medium text-gray-900">
                      {{ getCapacityName(variant.capacity_id) }}
                    </div>

                    <!-- Variant Details -->
                    <div class="flex-1 text-sm text-gray-600 space-x-4">
                      <span class="font-mono bg-gray-100 px-2 py-1 rounded">{{ variant.sku }}</span>
                      <span v-if="variant.price">₫{{ Number(variant.price).toLocaleString('vi-VN') }}</span>
                      <span>Kho: {{ variant.stock || 0 }}</span>
                    </div>
                  </div>

                  <!-- Actions -->
                  <div class="flex items-center gap-2">
                    <button @click="editVariant(variant)"
                      class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-sm">
                      <i class="fas fa-pen"></i>
                    </button>
                    <button @click="deleteVariant(variant.id)"
                      class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm">
                      <i class="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        <!-- Footer -->
        <div class="flex-shrink-0 flex gap-4 p-7 border-t border-gray-200 bg-gray-50/50">
          <button type="button" @click="closeVariantModal"
            class="flex-1 px-5 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200">
            <i class="fas fa-times mr-2"></i>Đóng
          </button>
          <button type="button" @click="saveVariantChanges"
            class="flex-1 px-5 py-3 text-sm font-medium text-white rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
            style="background: linear-gradient(135deg, #7c3aed, #a855f7);">
            <i class="fas fa-save mr-2"></i>Lưu thay đổi
          </button>
        </div>

      </div>
    </Transition>

    <!-- Product Detail Modal -->
    <Transition name="modal" appear>
      <div v-if="showDetailModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" @click="closeDetailModal">
        <div class="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-white/20 flex flex-col" @click.stop>
          
          <!-- Header -->
          <div class="relative" style="background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);">
            <div class="px-7 py-5">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-4">
                  <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <i class="fas fa-info-circle text-white text-xl"></i>
                  </div>
                  <div>
                    <h3 class="text-xl font-bold text-white">Chi tiết sản phẩm</h3>
                    <p class="text-white/80 text-sm">{{ selectedDetailProduct?.name || 'Tên sản phẩm' }}</p>
                  </div>
                </div>
                <button type="button" @click="closeDetailModal" 
                  class="text-white/70 hover:text-white p-2.5 rounded-lg hover:bg-white/10 transition-all duration-200">
                  <i class="fas fa-times text-xl"></i>
                </button>
              </div>
            </div>
          </div>

          <!-- Content -->
          <div class="flex-1 overflow-y-auto p-7">
            <div v-if="selectedDetailProduct" class="space-y-6">
              
              <!-- Product Image & Basic Info -->
              <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <!-- Main Image -->
                <div class="lg:col-span-1">
                  <div class="aspect-square bg-gray-100 rounded-xl overflow-hidden border border-gray-200">
                    <img :src="getImageSrc(selectedDetailProduct.image)" :alt="selectedDetailProduct.name" 
                      class="w-full h-full object-cover" @error="handleImageLoadError">
                  </div>
                  
                  <!-- Additional Images -->
                  <div v-if="selectedDetailProduct.product_images?.length > 0" class="mt-4">
                    <h4 class="font-medium text-gray-900 mb-2">Ảnh khác ({{ selectedDetailProduct.product_images.length }})</h4>
                    <div class="grid grid-cols-3 gap-2">
                      <div v-for="(img, idx) in selectedDetailProduct.product_images.slice(0, 6)" :key="idx" 
                        class="aspect-square bg-gray-100 rounded-lg overflow-hidden border">
                        <img :src="getImageSrc(img.url)" :alt="img.alt || 'Product image'" 
                          class="w-full h-full object-cover">
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Basic Information -->
                <div class="lg:col-span-2 space-y-4">
                  <!-- Product Name & Status -->
                  <div class="flex items-start justify-between">
                    <div>
                      <h2 class="text-2xl font-bold text-gray-900">{{ selectedDetailProduct.name }}</h2>
                      <p class="text-gray-600 mt-1">SKU: <span class="font-mono bg-gray-100 px-2 py-1 rounded text-sm">{{ selectedDetailProduct.sku }}</span></p>
                    </div>
                    <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold" 
                      :class="selectedDetailProduct.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'">
                      <span class="w-2 h-2 rounded-full mr-2" 
                        :class="selectedDetailProduct.active ? 'bg-green-500' : 'bg-red-500'"></span>
                      {{ selectedDetailProduct.active ? 'Đang bán' : 'Ngừng bán' }}
                    </span>
                  </div>

                  <!-- Price & Stock -->
                  <div class="grid grid-cols-2 gap-4">
                    <div class="bg-blue-50 rounded-lg p-4">
                      <div class="flex items-center gap-2 mb-2">
                        <i class="fas fa-dollar-sign text-blue-600"></i>
                        <h4 class="font-semibold text-gray-900">Giá bán</h4>
                      </div>
                      <div v-if="selectedDetailProduct.has_variants && selectedDetailProduct.max_price > selectedDetailProduct.price">
                        <div class="text-lg font-bold text-blue-600">
                          ₫{{ Number(selectedDetailProduct.price).toLocaleString('vi-VN') }} - ₫{{ Number(selectedDetailProduct.max_price).toLocaleString('vi-VN') }}
                        </div>
                        <div class="text-sm text-gray-600">Có {{ selectedDetailProduct.capacities?.length || 0 }} biến thể</div>
                      </div>
                      <div v-else class="text-lg font-bold text-blue-600">
                        ₫{{ Number(selectedDetailProduct.price).toLocaleString('vi-VN') }}
                      </div>
                    </div>

                    <div class="bg-green-50 rounded-lg p-4">
                      <div class="flex items-center gap-2 mb-2">
                        <i class="fas fa-warehouse text-green-600"></i>
                        <h4 class="font-semibold text-gray-900">Tồn kho</h4>
                      </div>
                      <div class="text-lg font-bold text-green-600">{{ selectedDetailProduct.stock }}</div>
                      <div class="text-sm text-gray-600">
                        <span v-if="selectedDetailProduct.stock === 0" class="text-red-600">Hết hàng</span>
                        <span v-else-if="selectedDetailProduct.stock <= 10" class="text-yellow-600">Sắp hết</span>
                        <span v-else class="text-green-600">Còn hàng</span>
                      </div>
                    </div>
                  </div>

                  <!-- Category -->
                  <div class="bg-purple-50 rounded-lg p-4">
                    <div class="flex items-center gap-2 mb-2">
                      <i class="fas fa-layer-group text-purple-600"></i>
                      <h4 class="font-semibold text-gray-900">Danh mục</h4>
                    </div>
                    <div class="text-lg font-medium text-purple-600">{{ selectedDetailProduct.category }}</div>
                  </div>

                  <!-- Description -->
                  <div class="bg-gray-50 rounded-lg p-4">
                    <div class="flex items-center gap-2 mb-2">
                      <i class="fas fa-align-left text-gray-600"></i>
                      <h4 class="font-semibold text-gray-900">Mô tả sản phẩm</h4>
                    </div>
                    <div class="text-gray-700 whitespace-pre-line">{{ selectedDetailProduct.description || 'Không có mô tả' }}</div>
                  </div>
                </div>
              </div>

              <!-- Colors & Capacities -->
              <div v-if="selectedDetailProduct.colors?.length > 0 || selectedDetailProduct.capacities?.length > 0" class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                <!-- Colors -->
                <div v-if="selectedDetailProduct.colors?.length > 0" class="bg-white border border-gray-200 rounded-xl p-6">
                  <h4 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <i class="fas fa-palette text-blue-600 mr-2"></i>
                    Màu sắc ({{ selectedDetailProduct.colors.length }})
                  </h4>
                  <div class="grid grid-cols-2 gap-3">
                    <div v-for="color in selectedDetailProduct.colors" :key="color.id" 
                      class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div class="w-6 h-6 rounded-full border-2 border-gray-300 shadow-sm" 
                        :style="{ backgroundColor: color.color_code }"></div>
                      <div>
                        <div class="font-medium text-gray-900 text-sm">{{ color.name }}</div>
                        <div class="text-xs text-gray-500">{{ color.color_code }}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Capacities -->
                <div v-if="selectedDetailProduct.capacities?.length > 0" class="bg-white border border-gray-200 rounded-xl p-6">
                  <h4 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <i class="fas fa-hdd text-green-600 mr-2"></i>
                    Dung lượng ({{ selectedDetailProduct.capacities.length }})
                  </h4>
                  <div class="space-y-3">
                    <div v-for="capacity in selectedDetailProduct.capacities" :key="capacity.id" 
                      class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div class="font-medium text-gray-900 text-sm">{{ capacity.display_name || capacity.name }}</div>
                        <div class="text-xs text-gray-500">Kho: {{ capacity.stock }}</div>
                      </div>
                      <div class="text-right">
                        <div class="font-semibold text-green-600">₫{{ Number(capacity.final_price || capacity.price).toLocaleString('vi-VN') }}</div>
                        <div v-if="capacity.discount_price" class="text-xs text-orange-600">
                          KM: ₫{{ Number(capacity.discount_price).toLocaleString('vi-VN') }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Variants -->
              <div v-if="selectedDetailProduct.variants?.length > 0" class="bg-white border border-gray-200 rounded-xl p-6">
                <h4 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <i class="fas fa-layer-group text-purple-600 mr-2"></i>
                  Variants ({{ selectedDetailProduct.variants.length }})
                </h4>
                <div class="space-y-2 max-h-64 overflow-y-auto">
                  <div v-for="variant in selectedDetailProduct.variants" :key="variant.id" 
                    class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div class="flex items-center gap-3">
                      <div class="w-4 h-4 rounded-full border border-gray-300" 
                        :style="{ backgroundColor: getVariantColorCode(variant.color_id) }"></div>
                      <div class="text-sm">
                        <span class="font-medium">{{ getVariantColorName(variant.color_id) }}</span>
                        <span class="text-gray-400 mx-1">×</span>
                        <span class="font-medium">{{ getVariantCapacityName(variant.capacity_id) }}</span>
                      </div>
                      <span class="text-xs bg-gray-200 px-2 py-1 rounded font-mono">{{ variant.sku }}</span>
                    </div>
                    <div class="text-right">
                      <div class="text-sm font-semibold">₫{{ Number(variant.price || 0).toLocaleString('vi-VN') }}</div>
                      <div class="text-xs text-gray-500">Kho: {{ variant.stock || 0 }}</div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Metadata -->
              <div class="bg-gray-50 rounded-xl p-6">
                <h4 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <i class="fas fa-info-circle text-gray-600 mr-2"></i>
                  Thông tin hệ thống
                </h4>
                <div class="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span class="text-gray-600">Ngày tạo:</span>
                    <span class="font-medium ml-2">{{ formatDate(selectedDetailProduct.created_at) }}</span>
                  </div>
                  <div>
                    <span class="text-gray-600">Cập nhật:</span>
                    <span class="font-medium ml-2">{{ formatDate(selectedDetailProduct.updated_at) }}</span>
                  </div>
                  <div>
                    <span class="text-gray-600">ID:</span>
                    <span class="font-mono ml-2">#{{ selectedDetailProduct.id }}</span>
                  </div>
                  <div>
                    <span class="text-gray-600">Slug:</span>
                    <span class="font-mono ml-2">{{ selectedDetailProduct.slug || 'N/A' }}</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <!-- Footer -->
          <div class="flex-shrink-0 flex gap-4 p-7 border-t border-gray-200 bg-gray-50/50">
            <button type="button" @click="closeDetailModal" 
              class="flex-1 px-5 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200">
              <i class="fas fa-times mr-2"></i>Đóng
            </button>
            <button type="button" @click="openEdit(selectedDetailProduct)"
              class="px-5 py-3 text-sm font-medium text-white rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
              style="background: linear-gradient(135deg, #2563eb, #3b82f6);">
              <i class="fas fa-pen mr-2"></i>Chỉnh sửa
            </button>
            <button type="button" @click="openImageManager(selectedDetailProduct)"
              class="px-5 py-3 text-sm font-medium text-white rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
              style="background: linear-gradient(135deg, #f59e0b, #d97706);">
              <i class="fas fa-images mr-2"></i>Quản lý ảnh
            </button>
          </div>

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
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
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
.max-h-\[90vh\]::-webkit-scrollbar,
.max-h-\[85vh\]::-webkit-scrollbar {
  width: 6px;
}

.max-h-\[90vh\]::-webkit-scrollbar-track,
.max-h-\[85vh\]::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.max-h-\[90vh\]::-webkit-scrollbar-thumb,
.max-h-\[85vh\]::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 10px;
}

.max-h-\[90vh\]::-webkit-scrollbar-thumb:hover,
.max-h-\[85vh\]::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* Pagination styles */
.pagination-button {
  transition: all 0.2s ease-in-out;
}

.pagination-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.pagination-active {
  background: linear-gradient(135deg, #2563eb, #3b82f6);
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
}

/* Responsive pagination adjustments */
@media (max-width: 768px) {
  .pagination-controls {
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .pagination-button {
    min-width: 36px;
    padding: 8px 12px;
  }
}

/* Image Manager Modal Flexbox Layout */
.flex-col {
  display: flex;
  flex-direction: column;
}

.flex-1 {
  flex: 1;
  min-height: 0;
  /* Important for proper scrolling */
}

.flex-shrink-0 {
  flex-shrink: 0;
}
</style>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import Swal from 'sweetalert2'

// API Base URL
const API_BASE_URL = 'http://localhost:8000/api'

// Reactive data
const categories = ref([])
const products = ref([])
const loading = ref(false)
const pagination = ref({
  current_page: 1,
  per_page: 10,
  total: 0,
  last_page: 1,
  from: 0,
  to: 0
})
const currentPage = ref(1)
const perPage = ref(10)
const goToPageInput = ref('')

// Dynamic stats computed from products data
const stats = computed(() => {
  const totalProducts = products.value.length
  const activeProducts = products.value.filter(p => p.active).length
  const lowStockProducts = products.value.filter(p => p.stock > 0 && p.stock <= 10).length
  const outOfStockProducts = products.value.filter(p => p.stock === 0).length

  // Calculate total value considering variants
  const totalValue = products.value.reduce((sum, p) => {
    if (p.has_variants && p.capacities?.length > 0) {
      // Sum all capacity prices * stocks
      return sum + p.capacities.reduce((capSum, cap) =>
        capSum + (parseFloat(cap.final_price || cap.price || 0) * (cap.stock || 0)), 0)
    } else {
      // Single product
      return sum + (p.price * p.stock)
    }
  }, 0)

  return [
    {
      icon: 'fas fa-box',
      iconClass: 'text-blue-600',
      value: totalProducts,
      label: 'Tổng sản phẩm'
    },
    {
      icon: 'fas fa-check-circle',
      iconClass: 'text-green-600',
      value: activeProducts,
      label: 'Đang bán'
    },
    {
      icon: 'fas fa-exclamation-triangle',
      iconClass: 'text-yellow-600',
      value: lowStockProducts,
      label: 'Sắp hết hàng'
    },
    {
      icon: 'fas fa-dollar-sign',
      iconClass: 'text-purple-600',
      value: formatCurrency(totalValue),
      label: 'Giá trị kho'
    },
  ]
})

async function fetchCategories() {
  try {
    const token = localStorage.getItem('token')
    const response = await fetch(`${API_BASE_URL}/categories`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    categories.value = data.data.map(cat => ({
      id: cat.id,
      name: cat.name
    }))



  } catch (error) {
    console.error('Error fetching categories:', error)
    Swal.fire({
      icon: 'error',
      title: 'Lỗi tải dữ liệu',
      text: 'Không thể tải danh sách danh mục. Vui lòng thử lại.',
      confirmButtonColor: '#3B82F6'
    })
  }
}

// API Functions
async function fetchProducts(page = 1) {
  if (loading.value) {
    console.log('Already loading, skipping fetchProducts')
    return
  }

  loading.value = true
  try {
    const token = localStorage.getItem('token')
    const response = await fetch(`${API_BASE_URL}/products?page=${page}&per_page=${perPage.value}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    products.value = data.data.map(product => {
      // Calculate actual stock status based on variants/capacities
      const capacities = product.capacities || []
      const totalVariantStock = capacities.reduce((sum, cap) => sum + parseInt(cap.stock || 0), 0)
      const actualStock = capacities.length > 0 ? totalVariantStock : parseInt(product.stock || 0)

      // Determine stock status
      const isOutOfStock = actualStock === 0
      const isLowStock = actualStock > 0 && actualStock <= 10
      const isInStock = actualStock > 10

      return {
        id: product.id,
        name: product.name,
        sku: product.sku,
        price: parseFloat(product.price_range?.min_price || 0),
        max_price: parseFloat(product.price_range?.max_price || 0),
        has_variants: product.price_range?.has_variants || false,
        stock: actualStock,
        active: product.status,
        category: product.category?.name || 'N/A',
        category_id: product.category_id,
        image: product.image_url || product.image || 'https://via.placeholder.com/50',
        description: product.description,
        slug: product.slug,
        is_featured: product.is_featured,
        // Override API stock status with calculated values
        in_stock: isInStock,
        low_stock: isLowStock,
        out_of_stock: isOutOfStock,
        product_images: product.product_images || [],
        colors: product.colors || [],
        capacities: capacities,
        variants: product.variants || [],
        average_rating: product.average_rating || 0,
        created_at: product.created_at,
        updated_at: product.updated_at
      }
    })

    // Update pagination info
    pagination.value = {
      current_page: data.current_page || 1,
      per_page: data.per_page || 10,
      total: data.total || 0,
      last_page: data.last_page || 1,
      from: data.from || 0,
      to: data.to || 0
    }
    currentPage.value = pagination.value.current_page

  } catch (error) {
    console.error('Error fetching products:', error)
    Swal.fire({
      icon: 'error',
      title: 'Lỗi tải dữ liệu',
      text: 'Không thể tải danh sách sản phẩm. Vui lòng thử lại.',
      confirmButtonColor: '#3B82F6'
    })
  } finally {
    loading.value = false
    console.log('fetchProducts finally block, loading set to false')
  }
}

// Utility functions
function formatCurrency(amount) {
  if (amount >= 1000000000) {
    return (amount / 1000000000).toFixed(1) + '₫' + 'B'
  } else if (amount >= 1000000) {
    return (amount / 1000000).toFixed(1) + '₫' + 'M'
  } else if (amount >= 1000) {
    return (amount / 1000).toFixed(1) + '₫' + 'K'
  }
  return amount.toLocaleString('vi-VN') + '₫'
}

// Pagination functions
async function goToPage(page) {
  if (page >= 1 && page <= pagination.value.last_page && page !== currentPage.value) {
    await fetchProducts(page)
  }
}

async function previousPage() {
  if (currentPage.value > 1) {
    await goToPage(currentPage.value - 1)
  }
}

async function nextPage() {
  if (currentPage.value < pagination.value.last_page) {
    await goToPage(currentPage.value + 1)
  }
}

async function changePageSize(newSize) {
  perPage.value = newSize
  await fetchProducts(1) // Reset to first page when changing page size
}

// Generate page numbers for pagination display
function getPageNumbers() {
  const total = pagination.value.last_page
  const current = currentPage.value
  const pages = []

  if (total <= 7) {
    // Show all pages if total <= 7
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    // Always show first page
    pages.push(1)

    if (current <= 4) {
      // Show 1, 2, 3, 4, 5, ..., last
      for (let i = 2; i <= 5; i++) {
        pages.push(i)
      }
      pages.push('...')
      pages.push(total)
    } else if (current >= total - 3) {
      // Show 1, ..., last-4, last-3, last-2, last-1, last
      pages.push('...')
      for (let i = total - 4; i <= total; i++) {
        pages.push(i)
      }
    } else {
      // Show 1, ..., current-1, current, current+1, ..., last
      pages.push('...')
      for (let i = current - 1; i <= current + 1; i++) {
        pages.push(i)
      }
      pages.push('...')
      pages.push(total)
    }
  }

  return pages
}

// Form management
const empty = {
  id: null,
  name: '',
  sku: '',
  price: 0,
  stock: 0,
  active: true,
  image: '',
  category_id: '',
  description: ''
}
const form = ref({ ...empty })
const showModal = ref(false)
const saving = ref(false)

// ảnh người dùng đang thao tác
const imageFile = ref(null)    // File | null
const imagePreview = ref('')
const imageUrl = ref('')
const uploadingImage = ref(false)

// Image Manager Modal
const showImageModal = ref(false)
const selectedProduct = ref(null)
const productImages = ref([])
const selectedImages = ref([])
const uploadProgress = ref([])
const allSelected = computed(() =>
  productImages.value.length > 0 && selectedImages.value.length === productImages.value.length
)

// Detail View Modal
const showDetailModal = ref(false)
const selectedDetailProduct = ref(null)

// Variant Manager Modal (Colors & Capacities)
const showVariantModal = ref(false)
const selectedVariantProduct = ref(null)
const activeVariantTab = ref('colors')
const productColors = ref([])
const productCapacities = ref([])
const productVariants = ref([])
const newColor = ref({
  name: '',
  color_code: '#000000'
})
const newCapacity = ref({
  name: '',
  display_name: '',
  price: 0,
  discount_price: null,
  stock: 0
})
const newVariant = ref({
  color_id: '',
  capacity_id: '',
  sku: '',
  price: 0,
  stock: 0,
  discount_price: null
})

function openAdd() {
  reset()
  showModal.value = true
}

// Detail Modal Functions
function openDetail(product) {
  selectedDetailProduct.value = product
  showDetailModal.value = true
}

function closeDetailModal() {
  showDetailModal.value = false
  selectedDetailProduct.value = null
}

// Helper functions for detail modal
function getVariantColorName(colorId) {
  const color = selectedDetailProduct.value?.colors?.find(c => c.id == colorId)
  return color?.name || 'Unknown'
}

function getVariantColorCode(colorId) {
  const color = selectedDetailProduct.value?.colors?.find(c => c.id == colorId)
  return color?.color_code || '#cccccc'
}

function getVariantCapacityName(capacityId) {
  const capacity = selectedDetailProduct.value?.capacities?.find(c => c.id == capacityId)
  return capacity?.display_name || capacity?.name || 'Unknown'
}

function formatDate(dateString) {
  if (!dateString) return 'N/A'
  const date = new Date(dateString)
  return date.toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

function getCategoryIdByName(categoryName) {
  if (!categoryName || !categories.value.length) return ''
  const category = categories.value.find(cat =>
    cat.name.toLowerCase() === categoryName.toLowerCase()
  )

  return category ? category.id : ''
}
async function openEdit(p) {
  // set form
  form.value = {
    id: p.id ?? null,
    name: p.name ?? '',
    sku: p.sku ?? '',
    price: Number(p.price ?? 0),
    stock: Number(p.stock ?? 0),
    active: !!(p.active ?? true),
    description: p.description ?? '',
    category_id: p.category_id || getCategoryIdByName(p.category) || '',
    image: p.image ?? '' // đường dẫn/URL hiện có
  }

  // hiển thị preview từ ảnh hiện có
  imageFile.value = null
  imageUrl.value = ''
  imagePreview.value = form.value.image ? getImageSrc(form.value.image) : ''

  // Mở modal
  showModal.value = true
}

function closeModal() {
  showModal.value = false
  reset()
}

function reset() {
  // Cleanup blob URL to prevent memory leaks
  if (imagePreview.value && imagePreview.value.startsWith('blob:')) {
    URL.revokeObjectURL(imagePreview.value)
  }

  form.value = { ...empty }
  imageFile.value = null
  imagePreview.value = ''
  imageUrl.value = ''
}

async function save() {
  saving.value = true
  try {
    const token = localStorage.getItem('token')
    if (!token) throw new Error('Thiếu token đăng nhập')

    const isUpdate = !!form.value.id
    const url = isUpdate
      ? `${API_BASE_URL}/products/${form.value.id}`
      : `${API_BASE_URL}/products`

    const fd = new FormData()
    fd.append('name', form.value.name)
    fd.append('sku', form.value.sku)
    fd.append('price', String(Number(form.value.price ?? 0)))
    fd.append('stock', String(parseInt(form.value.stock ?? 0, 10)))
    fd.append('status', form.value.active ? '1' : '0')
    fd.append('description', form.value.description || 'No description')
    if (form.value.category_id != null) fd.append('category_id', String(form.value.category_id))

    // ẢNH:
    // - Nếu user chọn file mới -> gửi field 'image' (File)
    // - Else nếu user nhập URL mới khác với image_path cũ -> gửi 'image_url'
    // - Else không gửi gì (BE giữ nguyên ảnh cũ)
    // Cách 1: Dùng field names khác nhau cho file vs URL
    if (imageFile.value) {
      console.log('Uploading file:', imageFile.value.name, 'Size:', imageFile.value.size, 'Type:', imageFile.value.type)
      // Gửi file dưới field name khác (image_file, product_image, etc.)
      fd.append('image_file', imageFile.value, `product-${Date.now()}.${(imageFile.value.type.split('/')[1] || 'png')}`)
    } else if (imageUrl.value && imageUrl.value !== form.value.image_path) {
      console.log('Uploading URL:', imageUrl.value)
      fd.append('image', imageUrl.value) // URL string vào field image
    } else {
      console.log('No image changes, keeping existing image')
    }

    // Update: dùng method override để tránh set Content-Type thủ công
    if (isUpdate) fd.append('_method', 'PUT')

    const res = await fetch(url, {
      method: 'POST', // luôn POST, Update dùng _method=PUT
      mode: 'cors',
      credentials: 'omit',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
        // KHÔNG đặt 'Content-Type' ở đây để browser tự set boundary cho FormData
      },
      body: fd
    })

    if (!res.ok) {
      let detail = `${res.status} ${res.statusText}`
      try {
        const ct = res.headers.get('content-type') || ''
        if (ct.includes('application/json')) {
          const payload = await res.json()
          if (res.status === 422 && payload?.errors) {
            const first = Object.values(payload.errors)[0]
            detail = Array.isArray(first) ? first[0] : (first || payload.message || detail)
          } else {
            detail = payload?.message || detail
          }
        }
      } catch { }
      throw new Error(detail)
    }

    Swal.fire({
      icon: 'success',
      title: isUpdate ? 'Đã cập nhật sản phẩm' : 'Đã thêm sản phẩm mới',
      timer: 1200,
      showConfirmButton: false
    })

    // Reload product list and close modal
    await fetchProducts(currentPage.value)
    closeModal()
  } catch (err) {
    console.error('Error saving product:', err)
    Swal.fire({
      icon: 'error',
      title: 'Lỗi lưu dữ liệu',
      text: err.message || 'Không thể lưu sản phẩm. Vui lòng thử lại.',
      confirmButtonColor: '#3B82F6'
    })
  } finally {
    saving.value = false
  }
}


async function remove(p) {
  const result = await Swal.fire({
    title: 'Xác nhận xóa?',
    text: `Bạn có chắc muốn xóa sản phẩm "${p.name}"?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#DC2626',
    cancelButtonColor: '#6B7280',
    confirmButtonText: 'Có, xóa!',
    cancelButtonText: 'Hủy'
  })

  if (result.isConfirmed) {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${API_BASE_URL}/products/${p.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      })

      if (!response.ok) {
        throw new Error('Delete failed')
      }

      Swal.fire({
        icon: 'success',
        title: 'Đã xóa!',
        text: 'Sản phẩm đã được xóa.',
        timer: 1500,
        showConfirmButton: false
      })

      // Refresh products list
      await fetchProducts(currentPage.value)

    } catch (error) {
      console.error('Error deleting product:', error)
      Swal.fire({
        icon: 'error',
        title: 'Lỗi xóa dữ liệu',
        text: 'Không thể xóa sản phẩm. Vui lòng thử lại.',
        confirmButtonColor: '#3B82F6'
      })
    }
  }
}

// Image upload functions
function handleFileUpload(event) {
  const file = event.target.files?.[0]
  if (!file) return

  // Validate file type
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
  if (!validTypes.includes(file.type)) {
    Swal.fire({
      icon: 'error',
      title: 'Định dạng không hỗ trợ',
      text: 'Vui lòng chọn file ảnh (JPG, PNG, GIF, WebP)',
      confirmButtonColor: '#3B82F6'
    })
    return
  }

  // Validate file size (5MB)
  const maxSize = 5 * 1024 * 1024 // 5MB
  if (file.size > maxSize) {
    Swal.fire({
      icon: 'error',
      title: 'File quá lớn',
      text: 'Vui lòng chọn ảnh có kích thước nhỏ hơn 5MB',
      confirmButtonColor: '#3B82F6'
    })
    return
  }

  // Store file for FormData upload
  imageFile.value = file

  // Create preview using blob URL
  uploadingImage.value = true
  const blobUrl = URL.createObjectURL(file)
  imagePreview.value = blobUrl
  imageUrl.value = '' // Clear URL input

  uploadingImage.value = false

  // Show success message
  Swal.fire({
    icon: 'success',
    title: 'Tải ảnh thành công',
    text: 'Ảnh đã sẵn sàng để upload',
    timer: 1500,
    showConfirmButton: false
  })
}

function handleUrlInput() {
  // user gõ URL → ưu tiên URL, bỏ file
  if (imageUrl.value) {
    imageFile.value = null
    imagePreview.value = imageUrl.value
  } else if (!form.value.image) {
    imagePreview.value = ''
  }
}

function removeImage() {
  // Cleanup blob URL to prevent memory leaks
  if (imagePreview.value && imagePreview.value.startsWith('blob:')) {
    URL.revokeObjectURL(imagePreview.value)
  }

  imageFile.value = null
  imageUrl.value = ''
  imagePreview.value = ''
  form.value.image = ''
}

function handleImageError(event) {
  event.target.style.display = 'none'
  Swal.fire({
    icon: 'warning',
    title: 'Không thể tải ảnh',
    text: 'URL ảnh không hợp lệ hoặc không tồn tại',
    confirmButtonColor: '#3B82F6'
  })
}

// Helper function to get proper image source
function getImageSrc(src) {
  if (!src) return ''

  // Already full URL (data:, blob:, http:, https:)
  if (src.startsWith('data:image') || src.startsWith('blob:') || src.startsWith('http')) {
    return src
  }

  // Laravel relative URL path (starts with /storage/)
  if (src.startsWith('/storage/')) {
    return 'http://localhost:8000' + src
  }

  // Laravel storage path without /storage/ prefix
  if (src.includes('images/products/') || src.startsWith('products/')) {
    return 'http://localhost:8000/storage/' + src
  }

  // Fallback cho các path khác
  return src
}
// Handle image load errors in table
function handleImageLoadError(event) {
  // Prevent infinite loop by checking if already using fallback
  if (event.target.dataset.fallbackUsed) {
    // If fallback also fails, hide image completely
    event.target.style.display = 'none'
    return
  }

  // Mark as fallback used and use data URI (never fails)
  event.target.dataset.fallbackUsed = 'true'
  // Simple gray placeholder using data URI
  event.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCA1MCA1MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjUwIiBoZWlnaHQ9IjUwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yNSAxNUMyMC44NTc5IDE1IDE3LjUgMTguMzU3OSAxNy41IDIyLjVDMTcuNSAyNi42NDIxIDIwLjg1NzkgMzAgMjUgMzBDMjkuMTQyMSAzMCAzMi41IDI2LjY0MjEgMzIuNSAyMi41QzMyLjUgMTguMzU3OSAyOS4xNDIxIDE1IDI1IDE1WiIgZmlsbD0iIzlDQTNBRiIvPgo8cGF0aCBkPSJNMzUgMzVIMTVWMzNDMTUgMjkuNjg2MyAxNy42ODYzIDI3IDIxIDI3SDI5QzMyLjMxMzcgMjcgMzUgMjkuNjg2MyAzNSAzM1YzNVoiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+Cg=='
}

// ======================== IMAGE MANAGER FUNCTIONS ========================

// Open Image Manager Modal
function openImageManager(product) {
  selectedProduct.value = product
  productImages.value = [] // Will be loaded from API
  selectedImages.value = []
  uploadProgress.value = []
  showImageModal.value = true

  // Load product images from API
  loadProductImages(product.id)
}

// Close Image Manager Modal
function closeImageModal() {
  showImageModal.value = false
  selectedProduct.value = null
  productImages.value = []
  selectedImages.value = []
  uploadProgress.value = []
}

// Load Product Images from product data
function loadProductImages(productId) {
  // Lấy từ product_images array đã có sẵn trong API response
  const product = products.value.find(p => p.id === productId)

  if (product && product.product_images && product.product_images.length > 0) {
    // Map product_images thành format cần thiết
    productImages.value = product.product_images.map((img, index) => ({
      id: img.id || index + 1,
      url: img.url || img.image_url || img.path,
      alt: img.alt || `${product.name} - Ảnh ${index + 1}`,
      is_main: index === 0, // Ảnh đầu tiên là ảnh chính
      size: img.size || 125834
    }))
  } else {
    // Fallback sử dụng ảnh chính của sản phẩm
    productImages.value = product?.image ? [{
      id: 1,
      url: product.image,
      alt: 'Ảnh chính sản phẩm',
      is_main: true,
      size: 125834
    }] : []
  }

  console.log('Product images loaded:', productImages.value)
}

// Handle Multiple File Upload
function handleMultipleFileUpload(event) {
  const files = Array.from(event.target.files || [])
  if (files.length === 0) return

  uploadProgress.value = []

  files.forEach((file, index) => {
    // Validate file
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
    if (!validTypes.includes(file.type)) {
      Swal.fire({
        icon: 'error',
        title: 'Định dạng không hỗ trợ',
        text: `File ${file.name} không được hỗ trợ. Vui lòng chọn file ảnh.`,
        confirmButtonColor: '#3B82F6'
      })
      return
    }

    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      Swal.fire({
        icon: 'error',
        title: 'File quá lớn',
        text: `File ${file.name} có kích thước lớn hơn 5MB.`,
        confirmButtonColor: '#3B82F6'
      })
      return
    }

    // Create preview
    const preview = URL.createObjectURL(file)

    // Add to progress tracking
    const progressItem = {
      id: Date.now() + index,
      name: file.name,
      preview: preview,
      percent: 0,
      status: 'uploading', // uploading, success, error
      file: file
    }

    uploadProgress.value.push(progressItem)

    // Simulate upload progress
    uploadImageWithProgress(progressItem)
  })

  // Clear input
  event.target.value = ''
}

// Upload Image with Progress Simulation
async function uploadImageWithProgress(progressItem) {
  try {
    // Simulate progress
    const progressInterval = setInterval(() => {
      if (progressItem.percent < 90) {
        progressItem.percent += Math.random() * 30
        if (progressItem.percent > 90) progressItem.percent = 90
      }
    }, 200)

    // Upload to server
    const token = localStorage.getItem('token')
    const formData = new FormData()
    formData.append('image', progressItem.file)
    formData.append('alt', progressItem.name.split('.')[0])
    formData.append('product_id', selectedProduct.value.id)

    const url = `${API_BASE_URL}/products/${selectedProduct.value.id}/images`
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'

      },
      body: formData
    })

    clearInterval(progressInterval)
    progressItem.percent = 100

    if (response.ok) {
      const result = await response.json()
      progressItem.status = 'success'

      // Add to product images
      productImages.value.push(result.data)

      // Cập nhật products.value để có data mới nhất
      await updateProductInList(selectedProduct.value.id)

      setTimeout(() => {
        // Remove from progress after 2 seconds
        const index = uploadProgress.value.findIndex(p => p.id === progressItem.id)
        if (index > -1) {
          URL.revokeObjectURL(progressItem.preview) // Cleanup
          uploadProgress.value.splice(index, 1)
        }
      }, 2000)

    } else {
      progressItem.status = 'error'
      Swal.fire({
        icon: 'error',
        title: 'Lỗi upload',
        text: `Không thể tải lên ${progressItem.name}`,
        confirmButtonColor: '#3B82F6'
      })
    }

  } catch (error) {
    progressItem.status = 'error'
    console.error('Upload error:', error)
  }
}

// Select/Deselect All Images
function selectAllImages() {
  if (allSelected.value) {
    selectedImages.value = []
  } else {
    selectedImages.value = productImages.value.map(img => img.id)
  }
}

// Delete Selected Images
async function deleteSelectedImages() {
  if (selectedImages.value.length === 0) return

  const result = await Swal.fire({
    title: 'Xác nhận xóa?',
    text: `Bạn có chắc muốn xóa ${selectedImages.value.length} ảnh đã chọn?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#DC2626',
    cancelButtonColor: '#6B7280',
    confirmButtonText: 'Có, xóa!',
    cancelButtonText: 'Hủy'
  })

  if (result.isConfirmed) {
    try {
      const token = localStorage.getItem('token')

      // Delete each selected image
      const deletePromises = selectedImages.value.map(imageId =>
        fetch(`${API_BASE_URL}/products/${selectedProduct.value.id}/images/${imageId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        })
      )

      await Promise.all(deletePromises)

      // Remove from local array
      productImages.value = productImages.value.filter(img => !selectedImages.value.includes(img.id))
      selectedImages.value = []

      // Cập nhật products list
      await updateProductInList(selectedProduct.value.id)

      Swal.fire({
        icon: 'success',
        title: 'Đã xóa!',
        text: 'Các ảnh đã được xóa thành công.',
        timer: 1500,
        showConfirmButton: false
      })

    } catch (error) {
      console.error('Error deleting images:', error)
      Swal.fire({
        icon: 'error',
        title: 'Lỗi xóa ảnh',
        text: 'Không thể xóa ảnh. Vui lòng thử lại.',
        confirmButtonColor: '#3B82F6'
      })
    }
  }
}

// Delete Single Image
async function deleteImage(imageId) {
  const result = await Swal.fire({
    title: 'Xác nhận xóa?',
    text: 'Bạn có chắc muốn xóa ảnh này?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#DC2626',
    cancelButtonColor: '#6B7280',
    confirmButtonText: 'Có, xóa!',
    cancelButtonText: 'Hủy'
  })

  if (result.isConfirmed) {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${API_BASE_URL}/products/${selectedProduct.value.id}/images/${imageId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      })

      if (response.ok) {
        // Remove from local array
        productImages.value = productImages.value.filter(img => img.id !== imageId)

        // Cập nhật products list
        await updateProductInList(selectedProduct.value.id)

        Swal.fire({
          icon: 'success',
          title: 'Đã xóa!',
          text: 'Ảnh đã được xóa thành công.',
          timer: 1500,
          showConfirmButton: false
        })
      }

    } catch (error) {
      console.error('Error deleting image:', error)
      Swal.fire({
        icon: 'error',
        title: 'Lỗi xóa ảnh',
        text: 'Không thể xóa ảnh. Vui lòng thử lại.',
        confirmButtonColor: '#3B82F6'
      })
    }
  }
}

// Set Main Image
async function setMainImage(imageId) {
  try {
    const token = localStorage.getItem('token')
    const response = await fetch(`${API_BASE_URL}/products/${selectedProduct.value.id}/images/${imageId}/set-main`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    })

    if (response.ok) {
      // Update local state
      productImages.value = productImages.value.map(img => ({
        ...img,
        is_main: img.id === imageId
      }))

      // Cập nhật products list
      await updateProductInList(selectedProduct.value.id)

      Swal.fire({
        icon: 'success',
        title: 'Đã cập nhật!',
        text: 'Đã đặt làm ảnh chính.',
        timer: 1500,
        showConfirmButton: false
      })
    }

  } catch (error) {
    console.error('Error setting main image:', error)
    Swal.fire({
      icon: 'error',
      title: 'Lỗi cập nhật',
      text: 'Không thể đặt ảnh chính. Vui lòng thử lại.',
      confirmButtonColor: '#3B82F6'
    })
  }
}

// Edit Image (Alt text, etc.)
function editImage(image) {
  Swal.fire({
    title: 'Chỉnh sửa thông tin ảnh',
    html: `
      <div class="text-left">
        <label class="block text-sm font-medium text-gray-700 mb-2">Mô tả ảnh (Alt text)</label>
        <input id="alt-input" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" 
               value="${image.alt || ''}" placeholder="Nhập mô tả cho ảnh...">
      </div>
    `,
    showCancelButton: true,
    confirmButtonText: 'Cập nhật',
    cancelButtonText: 'Hủy',
    confirmButtonColor: '#3B82F6',
    preConfirm: () => {
      const altText = document.getElementById('alt-input').value
      return { alt: altText }
    }
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const token = localStorage.getItem('token')
        const response = await fetch(`${API_BASE_URL}/products/${selectedProduct.value.id}/images/${image.id}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            alt: result.value.alt
          })
        })

        if (response.ok) {
          // Update local state
          const index = productImages.value.findIndex(img => img.id === image.id)
          if (index > -1) {
            productImages.value[index].alt = result.value.alt
          }

          // Cập nhật products list
          await updateProductInList(selectedProduct.value.id)

          Swal.fire({
            icon: 'success',
            title: 'Đã cập nhật!',
            timer: 1500,
            showConfirmButton: false
          })
        }

      } catch (error) {
        console.error('Error updating image:', error)
        Swal.fire({
          icon: 'error',
          title: 'Lỗi cập nhật',
          text: 'Không thể cập nhật thông tin ảnh.',
          confirmButtonColor: '#3B82F6'
        })
      }
    }
  })
}

// Save Image Changes (if needed)
function saveImageChanges() {
  Swal.fire({
    icon: 'success',
    title: 'Đã lưu!',
    text: 'Các thay đổi đã được lưu thành công.',
    timer: 1500,
    showConfirmButton: false
  })
  closeImageModal()
}

// Format File Size
function formatFileSize(bytes) {
  if (!bytes) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// Update Product in List after image changes
async function updateProductInList(productId) {
  try {
    const token = localStorage.getItem('token')
    const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    })

    if (response.ok) {
      const data = await response.json()
      const updatedProduct = {
        id: data.data.id,
        name: data.data.name,
        sku: data.data.sku,
        price: parseFloat(data.data.final_price),
        stock: data.data.stock,
        active: data.data.status,
        category: data.data.category?.name || 'N/A',
        image: data.data.image_url || data.data.image || 'https://via.placeholder.com/50',
        description: data.data.description,
        discount_price: parseFloat(data.data.discount_price || 0),
        original_price: parseFloat(data.data.price),
        in_stock: data.data.in_stock,
        low_stock: data.data.low_stock,
        out_of_stock: data.data.out_of_stock,
        product_images: data.data.product_images || []
      }

      // Cập nhật product trong danh sách
      const index = products.value.findIndex(p => p.id === productId)
      if (index > -1) {
        products.value[index] = updatedProduct
        selectedProduct.value = updatedProduct // Cập nhật selectedProduct
        console.log('Product updated in list:', updatedProduct)
      }
    }
  } catch (error) {
    console.error('Error updating product in list:', error)
  }
}

// ======================== VARIANT MANAGER FUNCTIONS ========================

// Open Variant Manager Modal
function openVariantManager(product) {
  selectedVariantProduct.value = product
  productColors.value = [...(product.colors || [])]
  productCapacities.value = [...(product.capacities || [])]
  productVariants.value = [...(product.variants || [])]
  activeVariantTab.value = 'colors'

  // Reset new forms
  newColor.value = {
    name: '',
    color_code: '#000000'
  }

  newCapacity.value = {
    name: '',
    display_name: '',
    price: 0,
    discount_price: null,
    stock: 0
  }

  newVariant.value = {
    color_id: '',
    capacity_id: '',
    sku: '',
    price: 0,
    stock: 0,
    discount_price: null
  }

  showVariantModal.value = true
}

// Close Variant Manager Modal
function closeVariantModal() {
  showVariantModal.value = false
  selectedVariantProduct.value = null
  productColors.value = []
  productCapacities.value = []
}

// Add Color
async function addColor() {
  if (!newColor.value.name.trim()) {
    Swal.fire({
      icon: 'warning',
      title: 'Thiếu thông tin',
      text: 'Vui lòng nhập tên màu',
      confirmButtonColor: '#3B82F6'
    })
    return
  }

  try {
    const token = localStorage.getItem('token')
    const response = await fetch(`${API_BASE_URL}/products/${selectedVariantProduct.value.id}/colors`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: newColor.value.name,
        color_code: newColor.value.color_code,
        sort_order: productColors.value.length + 1
      })
    })

    if (response.ok) {
      const result = await response.json()
      productColors.value.push(result.data)

      // Reset form
      newColor.value = {
        name: '',
        color_code: '#000000'
      }

      Swal.fire({
        icon: 'success',
        title: 'Đã thêm màu!',
        timer: 1500,
        showConfirmButton: false
      })
    }
  } catch (error) {
    console.error('Error adding color:', error)
    Swal.fire({
      icon: 'error',
      title: 'Lỗi thêm màu',
      text: 'Không thể thêm màu. Vui lòng thử lại.',
      confirmButtonColor: '#3B82F6'
    })
  }
}

// Edit Color
function editColor(color) {
  Swal.fire({
    title: 'Chỉnh sửa màu sắc',
    html: `
      <div class="text-left space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Tên màu</label>
          <input id="color-name" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" 
                 value="${color.name}" placeholder="Tên màu">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Mã màu</label>
          <input id="color-code" type="color" class="w-full h-10 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" 
                 value="${color.color_code}">
        </div>
      </div>
    `,
    showCancelButton: true,
    confirmButtonText: 'Cập nhật',
    cancelButtonText: 'Hủy',
    confirmButtonColor: '#3B82F6',
    preConfirm: () => {
      const name = document.getElementById('color-name').value
      const colorCode = document.getElementById('color-code').value
      if (!name.trim()) {
        Swal.showValidationMessage('Vui lòng nhập tên màu')
        return false
      }
      return { name: name.trim(), color_code: colorCode }
    }
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const token = localStorage.getItem('token')
        const response = await fetch(`${API_BASE_URL}/products/${selectedVariantProduct.value.id}/colors/${color.id}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(result.value)
        })

        if (response.ok) {
          // Update local array
          const index = productColors.value.findIndex(c => c.id === color.id)
          if (index > -1) {
            productColors.value[index] = { ...productColors.value[index], ...result.value }
          }

          Swal.fire({
            icon: 'success',
            title: 'Đã cập nhật!',
            timer: 1500,
            showConfirmButton: false
          })
        }
      } catch (error) {
        console.error('Error updating color:', error)
        Swal.fire({
          icon: 'error',
          title: 'Lỗi cập nhật',
          text: 'Không thể cập nhật màu. Vui lòng thử lại.',
          confirmButtonColor: '#3B82F6'
        })
      }
    }
  })
}

// Delete Color
async function deleteColor(colorId) {
  const result = await Swal.fire({
    title: 'Xác nhận xóa?',
    text: 'Bạn có chắc muốn xóa màu này?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#DC2626',
    cancelButtonColor: '#6B7280',
    confirmButtonText: 'Có, xóa!',
    cancelButtonText: 'Hủy'
  })

  if (result.isConfirmed) {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${API_BASE_URL}/products/${selectedVariantProduct.value.id}/colors/${colorId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      })

      if (response.ok) {
        productColors.value = productColors.value.filter(c => c.id !== colorId)

        Swal.fire({
          icon: 'success',
          title: 'Đã xóa!',
          timer: 1500,
          showConfirmButton: false
        })
      }
    } catch (error) {
      console.error('Error deleting color:', error)
      Swal.fire({
        icon: 'error',
        title: 'Lỗi xóa màu',
        text: 'Không thể xóa màu. Vui lòng thử lại.',
        confirmButtonColor: '#3B82F6'
      })
    }
  }
}

// Add Capacity
async function addCapacity() {
  if (!newCapacity.value.name.trim() || !newCapacity.value.price) {
    Swal.fire({
      icon: 'warning',
      title: 'Thiếu thông tin',
      text: 'Vui lòng nhập đầy đủ tên và giá',
      confirmButtonColor: '#3B82F6'
    })
    return
  }

  try {
    const token = localStorage.getItem('token')
    const response = await fetch(`${API_BASE_URL}/products/${selectedVariantProduct.value.id}/capacities`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: newCapacity.value.name,
        display_name: newCapacity.value.display_name || newCapacity.value.name,
        price: newCapacity.value.price,
        discount_price: newCapacity.value.discount_price || null,
        stock: newCapacity.value.stock || 0,
        sort_order: productCapacities.value.length + 1
      })
    })

    if (response.ok) {
      const result = await response.json()
      productCapacities.value.push(result.data)

      // Reset form
      newCapacity.value = {
        name: '',
        display_name: '',
        price: 0,
        discount_price: null,
        stock: 0
      }

      Swal.fire({
        icon: 'success',
        title: 'Đã thêm dung lượng!',
        timer: 1500,
        showConfirmButton: false
      })
    }
  } catch (error) {
    console.error('Error adding capacity:', error)
    Swal.fire({
      icon: 'error',
      title: 'Lỗi thêm dung lượng',
      text: 'Không thể thêm dung lượng. Vui lòng thử lại.',
      confirmButtonColor: '#3B82F6'
    })
  }
}

// Edit Capacity
function editCapacity(capacity) {
  Swal.fire({
    title: 'Chỉnh sửa dung lượng',
    html: `
      <div class="text-left space-y-3">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Tên</label>
          <input id="cap-name" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" 
                 value="${capacity.name}" placeholder="VD: 256GB">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Tên hiển thị</label>
          <input id="cap-display" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" 
                 value="${capacity.display_name || ''}" placeholder="VD: 256GB - Tiêu chuẩn">
        </div>
        <div class="grid grid-cols-2 gap-2">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Giá</label>
            <input id="cap-price" type="number" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" 
                   value="${capacity.price}" placeholder="0">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Tồn kho</label>
            <input id="cap-stock" type="number" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" 
                   value="${capacity.stock}" placeholder="0">
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Giá khuyến mãi</label>
          <input id="cap-discount" type="number" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" 
                 value="${capacity.discount_price || ''}" placeholder="Tuỳ chọn">
        </div>
      </div>
    `,
    showCancelButton: true,
    confirmButtonText: 'Cập nhật',
    cancelButtonText: 'Hủy',
    confirmButtonColor: '#3B82F6',
    preConfirm: () => {
      const name = document.getElementById('cap-name').value
      const displayName = document.getElementById('cap-display').value
      const price = document.getElementById('cap-price').value
      const stock = document.getElementById('cap-stock').value
      const discountPrice = document.getElementById('cap-discount').value

      if (!name.trim() || !price) {
        Swal.showValidationMessage('Vui lòng nhập tên và giá')
        return false
      }

      return {
        name: name.trim(),
        display_name: displayName.trim() || name.trim(),
        price: parseFloat(price),
        stock: parseInt(stock) || 0,
        discount_price: discountPrice ? parseFloat(discountPrice) : null
      }
    }
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const token = localStorage.getItem('token')
        const response = await fetch(`${API_BASE_URL}/products/${selectedVariantProduct.value.id}/capacities/${capacity.id}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(result.value)
        })

        if (response.ok) {
          // Update local array
          const index = productCapacities.value.findIndex(c => c.id === capacity.id)
          if (index > -1) {
            productCapacities.value[index] = { ...productCapacities.value[index], ...result.value }
          }

          Swal.fire({
            icon: 'success',
            title: 'Đã cập nhật!',
            timer: 1500,
            showConfirmButton: false
          })
        }
      } catch (error) {
        console.error('Error updating capacity:', error)
        Swal.fire({
          icon: 'error',
          title: 'Lỗi cập nhật',
          text: 'Không thể cập nhật dung lượng. Vui lòng thử lại.',
          confirmButtonColor: '#3B82F6'
        })
      }
    }
  })
}

// Delete Capacity
async function deleteCapacity(capacityId) {
  const result = await Swal.fire({
    title: 'Xác nhận xóa?',
    text: 'Bạn có chắc muốn xóa dung lượng này?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#DC2626',
    cancelButtonColor: '#6B7280',
    confirmButtonText: 'Có, xóa!',
    cancelButtonText: 'Hủy'
  })

  if (result.isConfirmed) {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${API_BASE_URL}/products/${selectedVariantProduct.value.id}/capacities/${capacityId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      })

      if (response.ok) {
        productCapacities.value = productCapacities.value.filter(c => c.id !== capacityId)

        Swal.fire({
          icon: 'success',
          title: 'Đã xóa!',
          timer: 1500,
          showConfirmButton: false
        })
      }
    } catch (error) {
      console.error('Error deleting capacity:', error)
      Swal.fire({
        icon: 'error',
        title: 'Lỗi xóa dung lượng',
        text: 'Không thể xóa dung lượng. Vui lòng thử lại.',
        confirmButtonColor: '#3B82F6'
      })
    }
  }
}

// Helper functions for variants
function getColorName(colorId) {
  const color = productColors.value.find(c => c.id == colorId)
  return color?.name || 'Unknown Color'
}

function getColorCode(colorId) {
  const color = productColors.value.find(c => c.id == colorId)
  return color?.color_code || '#cccccc'
}

function getCapacityName(capacityId) {
  const capacity = productCapacities.value.find(c => c.id == capacityId)
  return capacity?.display_name || capacity?.name || 'Unknown Capacity'
}

// Generate all possible variants from colors × capacities
async function generateVariants() {
  if (productColors.value.length === 0 || productCapacities.value.length === 0) {
    Swal.fire({
      icon: 'warning',
      title: 'Thiếu dữ liệu',
      text: 'Vui lòng thêm ít nhất 1 màu sắc và 1 dung lượng trước.',
      confirmButtonColor: '#3B82F6'
    })
    return
  }

  const result = await Swal.fire({
    title: 'Tạo variants tự động?',
    text: `Sẽ tạo ${productColors.value.length} × ${productCapacities.value.length} = ${productColors.value.length * productCapacities.value.length} variants`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#7C3AED',
    cancelButtonColor: '#6B7280',
    confirmButtonText: 'Có, tạo!',
    cancelButtonText: 'Hủy'
  })

  if (result.isConfirmed) {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${API_BASE_URL}/products/${selectedVariantProduct.value.id}/generate-variants`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      })

      if (response.ok) {
        const result = await response.json()
        productVariants.value = result.data

        Swal.fire({
          icon: 'success',
          title: 'Đã tạo variants!',
          text: `Đã tạo thành công ${result.data.length} variants.`,
          timer: 2000,
          showConfirmButton: false
        })
      }
    } catch (error) {
      console.error('Error generating variants:', error)
      Swal.fire({
        icon: 'error',
        title: 'Lỗi tạo variants',
        text: 'Không thể tạo variants. Vui lòng thử lại.',
        confirmButtonColor: '#3B82F6'
      })
    }
  }
}

// Add single variant
async function addVariant() {
  if (!newVariant.value.color_id || !newVariant.value.capacity_id) {
    Swal.fire({
      icon: 'warning',
      title: 'Thiếu thông tin',
      text: 'Vui lòng chọn màu sắc và dung lượng',
      confirmButtonColor: '#3B82F6'
    })
    return
  }

  // Check if variant already exists
  const existing = productVariants.value.find(v =>
    v.color_id == newVariant.value.color_id && v.capacity_id == newVariant.value.capacity_id
  )

  if (existing) {
    Swal.fire({
      icon: 'warning',
      title: 'Variant đã tồn tại',
      text: 'Combination màu sắc và dung lượng này đã có.',
      confirmButtonColor: '#3B82F6'
    })
    return
  }

  try {
    const token = localStorage.getItem('token')
    const response = await fetch(`${API_BASE_URL}/products/${selectedVariantProduct.value.id}/variants`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        color_id: newVariant.value.color_id,
        capacity_id: newVariant.value.capacity_id,
        sku: newVariant.value.sku || null,
        price: newVariant.value.price || null,
        stock: newVariant.value.stock || 0,
        discount_price: newVariant.value.discount_price || null
      })
    })

    if (response.ok) {
      const result = await response.json()
      productVariants.value.push(result.data)

      // Reset form
      newVariant.value = {
        color_id: '',
        capacity_id: '',
        sku: '',
        price: 0,
        stock: 0,
        discount_price: null
      }

      Swal.fire({
        icon: 'success',
        title: 'Đã thêm variant!',
        timer: 1500,
        showConfirmButton: false
      })
    }
  } catch (error) {
    console.error('Error adding variant:', error)
    Swal.fire({
      icon: 'error',
      title: 'Lỗi thêm variant',
      text: 'Không thể thêm variant. Vui lòng thử lại.',
      confirmButtonColor: '#3B82F6'
    })
  }
}

// Edit Variant
function editVariant(variant) {
  const colorName = getColorName(variant.color_id)
  const capacityName = getCapacityName(variant.capacity_id)

  Swal.fire({
    title: `Chỉnh sửa variant: ${colorName} × ${capacityName}`,
    html: `
      <div class="text-left space-y-3">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">SKU</label>
          <input id="var-sku" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" 
                 value="${variant.sku || ''}" placeholder="VD: IP15-256-BLUE">
        </div>
        <div class="grid grid-cols-2 gap-2">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Giá (tùy chọn)</label>
            <input id="var-price" type="number" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" 
                   value="${variant.price || ''}" placeholder="Để trống = dùng giá capacity">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Tồn kho</label>
            <input id="var-stock" type="number" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" 
                   value="${variant.stock || 0}" placeholder="0">
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Giá khuyến mãi</label>
          <input id="var-discount" type="number" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" 
                 value="${variant.discount_price || ''}" placeholder="Tuỳ chọn">
        </div>
      </div>
    `,
    showCancelButton: true,
    confirmButtonText: 'Cập nhật',
    cancelButtonText: 'Hủy',
    confirmButtonColor: '#7C3AED',
    preConfirm: () => {
      const sku = document.getElementById('var-sku').value
      const price = document.getElementById('var-price').value
      const stock = document.getElementById('var-stock').value
      const discountPrice = document.getElementById('var-discount').value

      return {
        sku: sku.trim() || null,
        price: price ? parseFloat(price) : null,
        stock: parseInt(stock) || 0,
        discount_price: discountPrice ? parseFloat(discountPrice) : null
      }
    }
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const token = localStorage.getItem('token')
        const response = await fetch(`${API_BASE_URL}/products/${selectedVariantProduct.value.id}/variants/${variant.id}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(result.value)
        })

        if (response.ok) {
          // Update local array
          const index = productVariants.value.findIndex(v => v.id === variant.id)
          if (index > -1) {
            productVariants.value[index] = { ...productVariants.value[index], ...result.value }
          }

          Swal.fire({
            icon: 'success',
            title: 'Đã cập nhật!',
            timer: 1500,
            showConfirmButton: false
          })
        }
      } catch (error) {
        console.error('Error updating variant:', error)
        Swal.fire({
          icon: 'error',
          title: 'Lỗi cập nhật',
          text: 'Không thể cập nhật variant. Vui lòng thử lại.',
          confirmButtonColor: '#3B82F6'
        })
      }
    }
  })
}

// Delete Variant
async function deleteVariant(variantId) {
  const result = await Swal.fire({
    title: 'Xác nhận xóa?',
    text: 'Bạn có chắc muốn xóa variant này?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#DC2626',
    cancelButtonColor: '#6B7280',
    confirmButtonText: 'Có, xóa!',
    cancelButtonText: 'Hủy'
  })

  if (result.isConfirmed) {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${API_BASE_URL}/products/${selectedVariantProduct.value.id}/variants/${variantId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      })

      if (response.ok) {
        productVariants.value = productVariants.value.filter(v => v.id !== variantId)

        Swal.fire({
          icon: 'success',
          title: 'Đã xóa!',
          timer: 1500,
          showConfirmButton: false
        })
      }
    } catch (error) {
      console.error('Error deleting variant:', error)
      Swal.fire({
        icon: 'error',
        title: 'Lỗi xóa variant',
        text: 'Không thể xóa variant. Vui lòng thử lại.',
        confirmButtonColor: '#3B82F6'
      })
    }
  }
}

// Save Variant Changes
async function saveVariantChanges() {
  try {
    // Update product in list to reflect changes
    await updateProductInList(selectedVariantProduct.value.id)

    Swal.fire({
      icon: 'success',
      title: 'Đã lưu!',
      text: 'Các thay đổi đã được lưu thành công.',
      timer: 1500,
      showConfirmButton: false
    })

    closeVariantModal()
  } catch (error) {
    console.error('Error saving variant changes:', error)
    Swal.fire({
      icon: 'error',
      title: 'Lỗi lưu thay đổi',
      text: 'Không thể lưu thay đổi. Vui lòng thử lại.',
      confirmButtonColor: '#3B82F6'
    })
  }
}

// Handle ESC key to close modals
function handleEscKey(event) {
  if (event.key === 'Escape') {
    // Close modals in priority order
    if (showVariantModal.value) {
      closeVariantModal()
    } else if (showImageModal.value) {
      closeImageModal()
    } else if (showDetailModal.value) {
      closeDetailModal()
    } else if (showModal.value) {
      closeModal()
    }
  }
}

onMounted(() => {
  fetchProducts()
  fetchCategories()
  
  // Add ESC key listener
  document.addEventListener('keydown', handleEscKey)
})

onUnmounted(() => {
  // Remove ESC key listener to prevent memory leaks
  document.removeEventListener('keydown', handleEscKey)
})
</script>