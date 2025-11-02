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
                v-model="searchQuery"
                @input="searchProducts"
                class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center">
                <i class="fas fa-search text-gray-400"></i>
              </div>
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Danh mục</label>
            <select
              v-model="selectedCategory"
              @change="searchProducts"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
              <option value="">Tất cả danh mục</option>
              <option v-for="category in categories" :key="category.id" :value="category.id">
                {{ category.name }}
              </option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Trạng thái</label>
            <select
              v-model="selectedStatus"
              @change="searchProducts"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
              <option value="">Tất cả</option>
              <option value="active">Đang bán</option>
              <option value="inactive">Ngừng bán</option>
              <option value="out-of-stock">Hết hàng</option>
            </select>
          </div>
          <div class="flex items-end">
            <button
              @click="searchProducts"
              class="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors duration-200 mr-2">
              <i class="fas fa-filter mr-2"></i>Lọc
            </button>
            <button 
              @click="clearFilters"
              class="text-gray-500 hover:text-gray-700 px-4 py-2 rounded-lg transition-colors duration-200">
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

      <!-- Table Content -->
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead style="background: linear-gradient(135deg, #2563eb 0%, #9333ea 100%);">
            <tr>
              <th class="px-6 py-4 text-left">
                <div class="flex items-center">
                  <input type="checkbox"
                    class="rounded border-white/50 bg-white/20 text-blue-500 focus:ring-0 focus:ring-offset-0 hover:bg-white/30 transition-colors">
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

          <tbody class="bg-white divide-y divide-gray-100">
            <!-- Loading State -->
            <tr v-if="loading">
              <td colspan="7" class="px-6 py-16 text-center">
                <div class="flex flex-col items-center justify-center">
                  <div class="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
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
              class="hover:bg-gradient-to-r hover:from-blue-50/70 hover:to-purple-50/70 transition-all duration-300 group hover:shadow-sm">
              
              <td class="px-6 py-5 whitespace-nowrap">
                <div class="flex items-center">
                  <input type="checkbox"
                    class="rounded border-gray-300 text-blue-600 focus:ring-0 focus:ring-offset-0 hover:border-blue-400 transition-colors">
                </div>
              </td>

              <!-- Product Info -->
              <td class="px-6 py-5 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="relative h-16 w-16 flex-shrink-0">
                    <img :src="getImageSrc(p.image)" alt=""
                      class="h-16 w-16 rounded-xl object-cover border-2 border-gray-200 group-hover:border-blue-400 group-hover:shadow-lg transition-all duration-300 group-hover:scale-105"
                      @error="handleImageLoadError($event)" />
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-bold text-gray-900 group-hover:text-blue-700 transition-colors duration-300">
                      {{ p.name }}
                    </div>
                    <div class="text-sm text-gray-500 bg-gray-100 group-hover:bg-blue-100 px-2 py-1 rounded-full inline-block mt-1 transition-all duration-300">
                      <i class="fas fa-layer-group mr-1 group-hover:text-blue-600"></i>{{ p.category?.name || p.category || 'Chưa phân loại' }}
                    </div>
                  </div>
                </div>
              </td>

              <!-- SKU -->
              <td class="px-6 py-5 whitespace-nowrap">
                <div class="text-sm font-mono text-gray-900 bg-gradient-to-r from-gray-100 to-gray-200 group-hover:from-blue-100 group-hover:to-purple-100 px-3 py-2 rounded-lg border border-gray-300 group-hover:border-blue-400 transition-all duration-300">
                  {{ p.sku || 'N/A' }}
                </div>
              </td>

              <!-- Price -->
              <td class="px-6 py-5 whitespace-nowrap">
                <div class="flex flex-col">
                  <div v-if="p.price_range?.has_variants && p.price_range.max_price > p.price_range.min_price" class="flex items-center gap-1">
                    <div class="text-sm font-bold"
                      style="background: linear-gradient(135deg, #2563eb, #9333ea); background-clip: text; -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
                      ₫{{ Number(p.price_range?.min_price || 0).toLocaleString('vi-VN') }}
                    </div>
                    <span class="text-xs text-gray-400">-</span>
                    <div class="text-sm font-bold"
                      style="background: linear-gradient(135deg, #2563eb, #9333ea); background-clip: text; -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
                      ₫{{ Number(p.price_range?.max_price || 0).toLocaleString('vi-VN') }}
                    </div>
                  </div>
                  <div v-else class="flex items-center">
                    <div class="text-lg font-bold"
                      style="background: linear-gradient(135deg, #2563eb, #9333ea); background-clip: text; -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
                      ₫{{ Number(p.price_range?.min_price || 0).toLocaleString('vi-VN') }}
                    </div>
                  </div>
                  <div v-if="p.price_range?.has_variants" class="text-xs text-gray-500 mt-1 flex items-center">
                    <i class="fas fa-layer-group mr-1"></i>
                    <span>{{ p.capacities?.length || 0 }} biến thể</span>
                  </div>
                </div>
              </td>

              <!-- Stock -->
              <td class="px-6 py-5 whitespace-nowrap">
                <div class="flex flex-col">
                  <div class="flex items-center gap-3 mb-1">
                    <div class="text-sm font-bold text-gray-900">{{ Number(p.stock || 0) }}</div>
                    <span v-if="Number(p.stock || 0) === 0"
                      class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border-2"
                      style="background: linear-gradient(135deg, #fee2e2, #fed7aa); color: #dc2626; border-color: #fca5a5;">
                      <i class="fas fa-times-circle mr-1" style="color: #ef4444;"></i>Hết hàng
                    </span>
                    <span v-else-if="Number(p.stock || 0) <= 10"
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
                </div>
              </td>

              <!-- Status -->
              <td class="px-6 py-5 whitespace-nowrap">
                <span
                  class="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold border-2 transition-all duration-200"
                  :style="p.status ? 'background: linear-gradient(135deg, #dcfce7, #d1fae5); color: #047857; border-color: #10b981;' : 'background: linear-gradient(135deg, #fee2e2, #fecaca); color: #dc2626; border-color: #f87171;'">
                  <span class="w-2 h-2 rounded-full mr-2 animate-pulse"
                    :style="p.status ? 'background-color: #10b981;' : 'background-color: #ef4444;'"></span>
                  {{ p.status ? 'Hoạt động' : 'Không hoạt động' }}
                </span>
              </td>

              <!-- Actions -->
              <td class="px-6 py-5 whitespace-nowrap text-right">
                <div class="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <!-- View Detail -->
                  <button
                    class="p-3 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:from-gray-200 hover:to-gray-300"
                    @click="openDetail(p)"
                    title="Xem chi tiết">
                    <i class="fas fa-eye text-sm"></i>
                  </button>

                  <!-- Edit -->
                  <button
                    class="p-3 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 hover:from-blue-200 hover:to-blue-300"
                    @click="openEdit(p)" title="Chỉnh sửa">
                    <i class="fas fa-pen text-sm"></i>
                  </button>

                  <!-- Manage Images -->
                  <button
                    class="p-3 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105 bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-700 hover:from-yellow-200 hover:to-yellow-300"
                    @click="openImageManager(p)" title="Quản lý ảnh">
                    <i class="fas fa-images text-sm"></i>
                  </button>

                  <!-- Manage Variants -->
                  <button
                    class="p-3 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105 bg-gradient-to-r from-purple-100 to-purple-200 text-purple-700 hover:from-purple-200 hover:to-purple-300"
                    @click="openVariantManager(p)" title="Quản lý biến thể">
                    <i class="fas fa-palette text-sm"></i>
                  </button>

                  <!-- Delete -->
                  <button
                    class="p-3 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105 bg-gradient-to-r from-red-100 to-red-200 text-red-700 hover:from-red-200 hover:to-red-300"
                    @click="remove(p)" title="Xóa">
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
          </div>
        </div>
      </div>
    </div>

    <!-- Product Form Modal -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0">
      <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center p-4" @click="closeModal">
        <!-- Backdrop with blur -->
        <div class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
        
        <!-- Modal Content -->
        <Transition
          enter-active-class="transition-all duration-300 ease-out"
          enter-from-class="opacity-0 scale-95 translate-y-4"
          enter-to-class="opacity-100 scale-100 translate-y-0"
          leave-active-class="transition-all duration-200 ease-in"
          leave-from-class="opacity-100 scale-100 translate-y-0"
          leave-to-class="opacity-0 scale-95 translate-y-4">
          <div
            class="relative bg-white rounded-2xl shadow-2xl max-w-xl w-full max-h-[88vh] overflow-hidden"
            @click.stop>

          <!-- Header -->
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

          <!-- Form -->
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
                    <option v-for="category in categories" :key="category.id" :value="Number(category.id)">
                      {{ category.name }}
                    </option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">
                    <i class="fas fa-toggle-on text-orange-500 mr-2"></i>Trạng thái
                  </label>
                  <div class="flex items-center h-12 px-4 py-3 border border-gray-300 rounded-lg bg-gray-50">
                    <input v-model="form.status" type="checkbox" 
                      :true-value="1" 
                      :false-value="0"
                      class="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500" id="pStatus">
                    <label for="pStatus" class="ml-3 text-sm font-medium text-gray-700 flex items-center">
                      <span class="w-2.5 h-2.5 rounded-full mr-2"
                        :style="form.status === 1 ? 'background-color: #10b981;' : 'background-color: #ef4444;'"></span>
                      {{ form.status === 1 ? 'Hoạt động' : 'Không hoạt động' }}
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
                  <div class="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-blue-400 transition-colors">
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
                    <div class="w-6 h-6 border-2 border-blue-200 border-t-blue-600 rounded-full animate-spin mr-3"></div>
                    <span class="text-blue-600 text-sm font-medium">Đang xử lý ảnh...</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Footer -->
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
        </Transition>
      </div>
    </Transition>

    <!-- Include Image Manager Modal -->
    <ImageManagerModal 
      :selectedProduct="selectedProductForImages"
      :showImageModal="showImageModal"
      @close="closeImageManager" />

    <!-- Include Variant Manager Modal -->
    <VariantManagerModal 
      :selectedProduct="selectedProductForVariants"
      :showVariantModal="showVariantModal"
      @close="closeVariantManager" />

    <!-- Include Product Detail Modal -->
    <ProductDetailModal 
      :selectedProduct="selectedProduct"
      :showDetailModal="showDetailModal"
      @close="closeDetailModal" />
  </div>
</template>

<script>
import { ref, computed, onMounted, nextTick } from 'vue'
import { useProducts } from '@/composables/useProducts'
import { useImageManager } from '@/composables/useImageManager'
import { useVariantManager } from '@/composables/useVariantManager'
import { productService } from '@/services/productService'
import toast from '@/services/toast'
import Swal from 'sweetalert2'

// Import Modal Components
import ImageManagerModal from '@/components/Product/ImageManagerModal.vue'
import VariantManagerModal from '@/components/Product/VariantManagerModal.vue'  
import ProductDetailModal from '@/components/Product/ProductDetailModal.vue'

export default {
  name: 'AdminProducts',
  components: {
    ImageManagerModal,
    VariantManagerModal,
    ProductDetailModal
  },
  
  setup() {
    // Use composables
    const {
      products,
      categories,
      loading,
      currentPage,
      perPage,
      pagination,
      searchQuery,
      selectedCategory,
      selectedStatus,
      loadProducts,
      loadCategories,
      previousPage,
      nextPage,
      goToPage,
      changePageSize,
      searchProducts
    } = useProducts()

    const {
      showImageModal,
      selectedProduct: selectedProductForImages,
      openImageManager,
      closeImageModal: closeImageManager
    } = useImageManager()

    const {
      showVariantModal,
      selectedVariantProduct: selectedProductForVariants,
      openVariantManager,
      closeVariantModal: closeVariantManager
    } = useVariantManager()

    // Local state
    const showModal = ref(false)
    const showDetailModal = ref(false)
    const selectedProduct = ref(null)
    const saving = ref(false)
    const uploadingImage = ref(false)
    const imagePreview = ref(null)
    const imageUrl = ref('')

    // Form data
    const form = ref({
      id: null,
      name: '',
      sku: '',
      price: null,
      stock: null,
      description: '',
      category_id: null,
      status: 1, // 1 = active, 0 = inactive (tinyint)
      image: null
    })

    // Stats data
    const stats = ref([
      {
        label: 'Tổng sản phẩm',
        value: '0',
        icon: 'fas fa-box',
        iconClass: 'text-blue-600 bg-blue-600'
      },
      {
        label: 'Đang bán',
        value: '0',
        icon: 'fas fa-check-circle',
        iconClass: 'text-green-600 bg-green-600'
      },
      {
        label: 'Hết hàng',
        value: '0',
        icon: 'fas fa-exclamation-triangle',
        iconClass: 'text-red-600 bg-red-600'
      },
      {
        label: 'Tạm ngừng',
        value: '0',
        icon: 'fas fa-pause-circle',
        iconClass: 'text-orange-600 bg-orange-600'
      }
    ])

    // Computed properties
    const getPageNumbers = () => {
      const totalPages = pagination.value.last_page || 1
      const current = currentPage.value
      const numbers = []
      
      if (totalPages <= 7) {
        for (let i = 1; i <= totalPages; i++) {
          numbers.push(i)
        }
      } else {
        if (current <= 4) {
          for (let i = 1; i <= 5; i++) numbers.push(i)
          numbers.push('...')
          numbers.push(totalPages)
        } else if (current >= totalPages - 3) {
          numbers.push(1)
          numbers.push('...')
          for (let i = totalPages - 4; i <= totalPages; i++) numbers.push(i)
        } else {
          numbers.push(1)
          numbers.push('...')
          for (let i = current - 1; i <= current + 1; i++) numbers.push(i)
          numbers.push('...')
          numbers.push(totalPages)
        }
      }
      
      return numbers
    }

    // Methods
    const resetForm = () => {
      form.value = {
        id: null,
        name: '',
        sku: '',
        price: null,
        stock: null,
        description: '',
        category_id: null,
        status: 1, // 1 = active, 0 = inactive (tinyint)
        image: null
      }
      imagePreview.value = null
      imageUrl.value = ''
    }

    const openAdd = () => {
      resetForm()
      showModal.value = true
    }

    const openEdit = async (product) => {
      try {

        loading.value = true
        const response = await productService.getProduct(product.id)
        const productData = response.data || product
        
        // Lấy category_id từ nhiều nguồn có thể và convert sang number
        let categoryId = null
        if (productData.category_id) {
          categoryId = Number(productData.category_id)
        } else if (productData.category && typeof productData.category === 'object') {
          categoryId = Number(productData.category.id)
        } else if (typeof productData.category === 'number') {
          categoryId = productData.category
        }
        
        // Convert status to number: handle "1", 1, true, "true"
        let statusValue = 1 // default active
        if (productData.status !== undefined) {
          if (typeof productData.status === 'string') {
            statusValue = productData.status === '1' || productData.status === 'true' ? 1 : 0
          } else if (typeof productData.status === 'boolean') {
            statusValue = productData.status ? 1 : 0
          } else {
            statusValue = Number(productData.status)
          }
        }
        
        form.value = {
          id: productData.id,
          name: productData.name,
          sku: productData.sku,
          price: productData.price_range?.min_price || 0,
          stock: productData.stock,
          description: productData.description || '',
          category_id: categoryId,
          status: statusValue,
          image: productData.image_path || productData.image || productData.image_url
        }
        
        imagePreview.value = null
        imageUrl.value = ''
        showModal.value = true
        imagePreview.value = null
        imageUrl.value = ''
        showModal.value = true
      } catch (error) {
        console.error('Load product detail error:', error)
        toast.error('Không thể tải thông tin sản phẩm')
      } finally {
        loading.value = false
      }
    }

    const openDetail = async (product) => {
      try {
        loading.value = true
        // Lấy chi tiết sản phẩm đầy đủ từ API
        const response = await productService.getProduct(product.id)
        selectedProduct.value = response.data || product
        showDetailModal.value = true
      } catch (error) {
        console.error('Load product detail error:', error)
        toast.error('Không thể tải chi tiết sản phẩm')
      } finally {
        loading.value = false
      }
    }

    const closeModal = () => {
      showModal.value = false
      resetForm()
    }

    const closeDetailModal = () => {
      showDetailModal.value = false
      selectedProduct.value = null
    }

    const clearFilters = () => {
      searchQuery.value = ''
      selectedCategory.value = ''
      selectedStatus.value = ''
      searchProducts()
    }

    const handleFileUpload = (event) => {
      const file = event.target.files[0]
      if (!file) return

      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Kích thước file không được vượt quá 5MB')
        return
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Chỉ chấp nhận file ảnh')
        return
      }

      uploadingImage.value = true
      form.value.image = file

      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        imagePreview.value = e.target.result
        uploadingImage.value = false
      }
      reader.readAsDataURL(file)
    }

    const handleUrlInput = () => {
      if (imageUrl.value) {
        imagePreview.value = imageUrl.value
        form.value.image = imageUrl.value
      }
    }

    const removeImage = () => {
      form.value.image = null
      imagePreview.value = null
      imageUrl.value = ''
    }

    const handleImageError = (event) => {
      event.target.src = '/img/placeholder.jpg'
    }

    const handleImageLoadError = (event) => {
      event.target.src = '/img/placeholder.jpg'
    }

      const getImageSrc = (image) => {
        if (!image) return '/img/placeholder.jpg'
        if (typeof image === 'string') {
          if (image.startsWith('http')) return image
          if (image.startsWith('data:')) return image
          return `http://127.0.0.1:8000/storage/${image}`
        }
        return '/img/placeholder.jpg'
      }

      const save = async () => {
      try {
        saving.value = true

        const formData = new FormData()
        formData.append('name', form.value.name)
        formData.append('sku', form.value.sku)
        formData.append('price', form.value.price)
        formData.append('stock', form.value.stock)
        formData.append('description', form.value.description || '')
        formData.append('category_id', form.value.category_id)
        formData.append('status', form.value.status) // Đã là 1 hoặc 0 từ checkbox

        if (form.value.image && typeof form.value.image === 'object') {
          formData.append('image', form.value.image)
        } else if (typeof form.value.image === 'string' && form.value.image.startsWith('http')) {
          formData.append('image_url', form.value.image)
        }

        let response
        if (form.value.id) {
          formData.append('_method', 'PUT')
          response = await productService.updateProduct(form.value.id, formData)
        } else {
          response = await productService.createProduct(formData)
        }

        // Backend Laravel trả về response.data trực tiếp từ apiClient interceptor
        // Check nếu có lỗi thì sẽ throw ở catch, nếu đến đây = success
        toast.success(form.value.id ? 'Cập nhật sản phẩm thành công!' : 'Tạo sản phẩm thành công!')
        closeModal()
        await loadProducts(currentPage.value, true) // Reset products để refresh toàn bộ
        updateStats()
      } catch (error) {
        console.error('Save product error:', error)
        toast.error(error.response?.data?.message || error.message || 'Có lỗi xảy ra khi lưu sản phẩm')
      } finally {
        saving.value = false
      }
    }

    const remove = async (product) => {
      try {
        const result = await Swal.fire({
          title: 'Xác nhận xóa',
          text: `Bạn có chắc chắn muốn xóa sản phẩm "${product.name}"?`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#dc2626',
          cancelButtonColor: '#6b7280',
          confirmButtonText: 'Xóa',
          cancelButtonText: 'Hủy',
          reverseButtons: true
        })

        if (result.isConfirmed) {
          const response = await productService.deleteProduct(product.id)
          // Nếu đến đây = success (lỗi sẽ throw ở catch)
          toast.success('Xóa sản phẩm thành công!')
          await loadProducts(currentPage.value, true) // Reset products để refresh toàn bộ
          updateStats()
        }
      } catch (error) {
        console.error('Delete product error:', error)
        toast.error(error.response?.data?.message || error.message || 'Có lỗi xảy ra khi xóa sản phẩm')
      }
    }

    const updateStats = () => {
      const totalProducts = products.value.length
      const activeProducts = products.value.filter(p => p.status === 1).length
      const outOfStock = products.value.filter(p => Number(p.stock || 0) === 0).length
      const inactiveProducts = products.value.filter(p => p.status === 0).length

      stats.value[0].value = totalProducts.toString()
      stats.value[1].value = activeProducts.toString()
      stats.value[2].value = outOfStock.toString()
      stats.value[3].value = inactiveProducts.toString()
    }

    const handleRefresh = async () => {
      await loadProducts(currentPage.value, true) // Reset để load fresh data
      updateStats()
    }

    // Initialize
    onMounted(async () => {
      await Promise.all([
        loadProducts(),
        loadCategories()
      ])
    
      updateStats()
    })

    return {
      // Composable state
      products,
      categories,
      loading,
      currentPage,
      perPage,
      pagination,
      searchQuery,
      selectedCategory,
      selectedStatus,
      
      // Composable methods
      loadProducts,
      previousPage,
      nextPage,
      goToPage,
      changePageSize,
      searchProducts,
      
      // Image manager
      showImageModal,
      selectedProductForImages,
      openImageManager,
      closeImageManager,
      
      // Variant manager
      showVariantModal,
      selectedProductForVariants,
      openVariantManager,
      closeVariantManager,
      
      // Local state
      showModal,
      showDetailModal,
      selectedProduct,
      saving,
      uploadingImage,
      imagePreview,
      imageUrl,
      form,
      stats,
      
      // Methods
      getPageNumbers,
      resetForm,
      openAdd,
      openEdit,
      openDetail,
      closeModal,
      closeDetailModal,
      clearFilters,
      handleFileUpload,
      handleUrlInput,
      removeImage,
      handleImageError,
      handleImageLoadError,
      getImageSrc,
      save,
      remove,
      updateStats,
      handleRefresh
    }
  }
}
</script>

<style scoped>
.pagination-active {
  background: linear-gradient(135deg, #2563eb, #9333ea);
}
</style>