<template>
  <div class="admin-categories p-6 bg-gray-50 min-h-screen">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-center justify-between mb-8">
      <div class="mb-4 md:mb-0">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Quản lý danh mục</h1>
        <p class="text-gray-600">Tổ chức và phân loại sản phẩm theo danh mục</p>
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
          @click="openAddModal">
          <i class="fas fa-plus mr-2"></i>Thêm danh mục
        </button>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
      <div v-for="(stat, idx) in statsCards" :key="idx"
        class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200 group">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-500 text-sm font-medium mb-1">{{ stat.label }}</p>
            <p class="text-2xl font-bold text-gray-900">{{ stat.value }}</p>
            <div class="flex items-center mt-2">
              <i class="fas fa-arrow-up text-xs text-green-500 mr-1"></i>
              <span class="text-xs text-green-600">+8% từ tháng trước</span>
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
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Tìm kiếm</label>
            <div class="relative">
              <input type="text" placeholder="Tìm theo tên danh mục..."
                class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center">
                <i class="fas fa-search text-gray-400"></i>
              </div>
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Trạng thái</label>
            <select
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
              <option value="">Tất cả</option>
              <option value="active">Đang hiển thị</option>
              <option value="inactive">Đã ẩn</option>
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

    <!-- Categories Table -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div class="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <div class="flex justify-between items-center">
          <div>
            <h3 class="text-lg font-semibold text-gray-900">Danh sách danh mục</h3>
            <p class="text-sm text-gray-500 mt-1">Quản lý và theo dõi tất cả danh mục trong hệ thống</p>
          </div>
          <div class="flex items-center space-x-3">
            <span class="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
              {{ categories.length }} danh mục
            </span>
            <div class="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
              <button @click="viewMode = 'table'" 
                class="p-2 rounded-lg transition-all duration-200"
                :class="viewMode === 'table' ? 'bg-white text-gray-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'">
                <i class="fas fa-list"></i>
              </button>
              <button @click="viewMode = 'tree'" 
                class="p-2 rounded-lg transition-all duration-200"
                :class="viewMode === 'tree' ? 'bg-white text-gray-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'">
                <i class="fas fa-sitemap"></i>
              </button>
              <button @click="viewMode = 'cards'" 
                class="p-2 rounded-lg transition-all duration-200"
                :class="viewMode === 'cards' ? 'bg-white text-gray-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'">
                <i class="fas fa-th"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Table View -->
      <div v-if="viewMode === 'table'" class="overflow-hidden rounded-xl border border-gray-200">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gradient-to-r from-blue-600 to-purple-600">
              <tr>
                <th class="px-6 py-4 text-left">
                  <div class="flex items-center">
                    <input type="checkbox"
                      class="rounded border-white/50 bg-white/20 text-blue-500 focus:ring-0 focus:ring-offset-0 hover:bg-white/30 transition-colors">
                    <span class="ml-3 text-xs font-semibold uppercase tracking-wider text-white">Chọn tất
                      cả</span>
                  </div>
                </th>
                <th class="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider text-white">
                  <div class="flex items-center gap-2">
                    <i class="fas fa-tags text-white/90"></i>
                    Danh mục
                  </div>
                </th>
                <th class="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider text-white">
                  <div class="flex items-center gap-2">
                    <i class="fas fa-link text-white/90"></i>
                    Slug
                  </div>
                </th>
                <th class="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider text-white">
                  <div class="flex items-center gap-2">
                    <i class="fas fa-box text-white/90"></i>
                    Sản phẩm
                  </div>
                </th>
                <th class="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider text-white">
                  <div class="flex items-center gap-2">
                    <i class="fas fa-toggle-on text-white/90"></i>
                    Trạng thái
                  </div>
                </th>
                <th class="px-6 py-4 text-right text-sm font-semibold uppercase tracking-wider text-white">
                  <div class="flex items-center justify-end gap-2">
                    <i class="fas fa-cogs text-white/90"></i>
                    Thao tác
                  </div>
                </th>
              </tr>
            </thead>

            <!-- Modern Body -->
            <tbody class="bg-white divide-y divide-gray-100">
              <!-- Loading State -->
              <tr v-if="loading">
                <td colspan="6" class="px-6 py-16 text-center">
                  <div class="flex flex-col items-center justify-center">
                    <div class="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4">
                    </div>
                    <p class="text-gray-500 font-medium">Đang tải dữ liệu danh mục...</p>
                  </div>
                </td>
              </tr>

              <!-- Empty State -->
              <tr v-else-if="categories.length === 0">
                <td colspan="6" class="px-6 py-16 text-center">
                  <div class="flex flex-col items-center justify-center">
                    <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      <i class="fas fa-tags text-2xl text-gray-400"></i>
                    </div>
                    <p class="text-gray-500 font-medium mb-2">Chưa có danh mục nào</p>
                    <p class="text-gray-400 text-sm">Nhấn nút "Thêm danh mục" để bắt đầu</p>
                  </div>
                </td>
              </tr>

              <!-- Category Rows -->
              <tr v-else v-for="category in categories" :key="category.id"
                class="hover:bg-gradient-to-r hover:from-blue-50/70 hover:to-purple-50/70 transition-all duration-300 group hover:shadow-sm border-l-4 border-l-transparent hover:border-l-blue-500 hover:translate-x-0.5">

                <td class="px-6 py-5 whitespace-nowrap">
                  <div class="flex items-center">
                    <input type="checkbox"
                      class="rounded border-gray-300 text-blue-600 focus:ring-0 focus:ring-offset-0 hover:border-blue-400 transition-colors">
                  </div>
                </td>

                <!-- Category Info -->
                <td class="px-6 py-5 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="relative h-14 w-14 flex-shrink-0">
                      <div
                        class="h-14 w-14 rounded-xl flex items-center justify-center border-2 border-gray-200 group-hover:border-blue-400 group-hover:shadow-lg transition-all duration-300 group-hover:scale-105 bg-gradient-to-br from-blue-50 to-indigo-100">
                        <i class="fas fa-tags text-2xl text-blue-600"></i>
                      </div>
                      <div
                        class="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-600/0 to-purple-600/0 group-hover:from-blue-600/15 group-hover:to-purple-600/15 transition-all duration-300">
                      </div>
                    </div>
                    <div class="ml-4">
                      <div class="flex items-center gap-2">
                        <div
                          class="text-sm font-bold text-gray-900 group-hover:text-blue-700 transition-colors duration-300 group-hover:translate-x-1 transform">
                          {{ category.name }}
                        </div>
                        <span v-if="category.parent_id" 
                          class="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">
                          <i class="fas fa-arrow-up mr-1"></i>{{ getParentName(category.parent_id) }}
                        </span>
                      </div>
                      <div v-if="category.description" class="text-xs text-gray-600 mt-1 max-w-xs truncate">
                        {{ category.description }}
                      </div>
                      <div
                        class="text-sm text-gray-500 bg-gray-100 group-hover:bg-blue-100 px-2 py-1 rounded-full inline-block mt-1 transition-all duration-300">
                        <i class="fas fa-calendar mr-1 group-hover:text-blue-600"></i>{{ formatDate(category.created_at) }}
                      </div>
                    </div>
                  </div>
                </td>

                <!-- Slug -->
                <td class="px-6 py-5 whitespace-nowrap">
                  <div class="relative">
                    <div
                      class="text-sm font-mono text-gray-900 bg-gradient-to-r from-gray-100 to-gray-200 group-hover:from-blue-100 group-hover:to-purple-100 px-3 py-2 rounded-lg border border-gray-300 group-hover:border-blue-400 group-hover:shadow-md transition-all duration-300 group-hover:scale-105">
                      {{ category.slug }}
                    </div>
                  </div>
                </td>

                <!-- Product Count -->
                <td class="px-6 py-5 whitespace-nowrap">
                  <div class="flex flex-col">
                    <div class="flex items-center gap-3 mb-1">
                      <div class="text-sm font-bold text-gray-900">{{ category.product_count }}</div>
                      <span v-if="category.product_count === 0"
                        class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border-2 bg-gradient-to-r from-red-100 to-orange-100 text-red-700 border-red-300">
                        <i class="fas fa-inbox mr-1 text-red-500"></i>Trống
                      </span>
                      <span v-else-if="category.product_count <= 5"
                        class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border-2 bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-700 border-yellow-400">
                        <i class="fas fa-exclamation-triangle mr-1 text-yellow-600"></i>Ít
                      </span>
                      <span v-else
                        class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border-2 bg-gradient-to-r from-green-100 to-emerald-100 text-emerald-700 border-emerald-400">
                        <i class="fas fa-check-circle mr-1 text-emerald-600"></i>Tốt
                      </span>
                    </div>
                  </div>
                </td>

                <!-- Status -->
                <td class="px-6 py-5 whitespace-nowrap">
                  <div class="relative">
                    <span
                      class="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold border-2 transition-all duration-200"
                      :class="category.status ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-emerald-800 border-emerald-500' : 'bg-gradient-to-r from-red-100 to-pink-100 text-red-700 border-red-400'">
                      <span class="w-2 h-2 rounded-full mr-2 animate-pulse"
                        :class="category.status ? 'bg-emerald-500' : 'bg-red-500'"></span>
                      {{ category.status ? 'Hiển thị' : 'Đã ẩn' }}
                    </span>
                  </div>
                </td>

                <!-- Actions -->
                <td class="px-6 py-5 whitespace-nowrap text-right">
                  <div
                    class="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0">
                    <!-- View Detail -->
                    <button
                      class="p-3 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:from-gray-200 hover:to-gray-300"
                      title="Xem chi tiết">
                      <i class="fas fa-eye text-sm"></i>
                    </button>

                    <!-- Edit -->
                    <button
                      class="p-3 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 hover:from-blue-200 hover:to-blue-300"
                      @click="openEdit(category)" title="Chỉnh sửa">
                      <i class="fas fa-pen text-sm"></i>
                    </button>

                    <!-- Toggle Status -->
                    <button
                      class="p-3 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105 bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-700 hover:from-yellow-200 hover:to-orange-200"
                      @click="toggleStatus(category)" :title="category.status ? 'Ẩn danh mục' : 'Hiện danh mục'">
                      <i :class="category.status ? 'fas fa-eye-slash' : 'fas fa-eye'" class="text-sm"></i>
                    </button>

                    <!-- Delete -->
                    <button
                      class="p-3 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105 bg-gradient-to-r from-red-100 to-pink-100 text-red-700 hover:from-red-200 hover:to-pink-200"
                      @click="remove(category)" title="Xóa">
                      <i class="fas fa-trash text-sm"></i>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Tree View -->
      <div v-else-if="viewMode === 'tree'" class="p-6">
        <div class="space-y-4">
          <div v-for="rootCategory in rootCategories" :key="rootCategory.id" class="tree-item">
            <!-- Root Category -->
            <div class="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div class="flex items-center space-x-4">
                <button @click="toggleExpand(rootCategory.id)" class="text-gray-500 hover:text-gray-700">
                  <i :class="expandedCategories.includes(rootCategory.id) ? 'fas fa-chevron-down' : 'fas fa-chevron-right'"></i>
                </button>
                <div class="w-12 h-12 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg flex items-center justify-center">
                  <i class="fas fa-folder-open text-blue-600 text-xl"></i>
                </div>
                <div>
                  <h4 class="text-lg font-semibold text-gray-900">{{ rootCategory.name }}</h4>
                  <p class="text-sm text-gray-500">{{ rootCategory.product_count || 0 }} sản phẩm</p>
                </div>
              </div>
              <div class="flex items-center space-x-2">
                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium" 
                  :class="rootCategory.status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'">
                  {{ rootCategory.status ? 'Hiện' : 'Ẩn' }}
                </span>
                <div class="flex space-x-1">
                  <button @click="openEdit(rootCategory)" class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                    <i class="fas fa-pen text-sm"></i>
                  </button>
                  <button @click="remove(rootCategory)" class="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                    <i class="fas fa-trash text-sm"></i>
                  </button>
                </div>
              </div>
            </div>

            <!-- Child Categories -->
            <div v-if="expandedCategories.includes(rootCategory.id)" class="ml-8 mt-3 space-y-2">
              <div v-for="child in getChildCategories(rootCategory.id)" :key="child.id" 
                class="flex items-center justify-between p-3 bg-gray-50 border border-gray-100 rounded-lg">
                <div class="flex items-center space-x-3">
                  <div class="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center">
                    <i class="fas fa-tag text-gray-600 text-sm"></i>
                  </div>
                  <div>
                    <h5 class="font-medium text-gray-800">{{ child.name }}</h5>
                    <p class="text-xs text-gray-500">{{ child.product_count || 0 }} sản phẩm</p>
                  </div>
                </div>
                <div class="flex items-center space-x-2">
                  <span class="inline-flex items-center px-2 py-1 rounded-full text-xs" 
                    :class="child.status ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'">
                    {{ child.status ? 'Hiện' : 'Ẩn' }}
                  </span>
                  <div class="flex space-x-1">
                    <button @click="openEdit(child)" class="p-1.5 text-blue-600 hover:bg-blue-50 rounded">
                      <i class="fas fa-pen text-xs"></i>
                    </button>
                    <button @click="remove(child)" class="p-1.5 text-red-600 hover:bg-red-50 rounded">
                      <i class="fas fa-trash text-xs"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Orphan Categories (categories without parent) -->
          <div v-if="orphanCategories.length > 0" class="mt-8">
            <h4 class="text-lg font-semibold text-gray-700 mb-4 flex items-center">
              <i class="fas fa-unlink text-gray-400 mr-2"></i>
              Danh mục độc lập
            </h4>
            <div class="grid gap-3">
              <div v-for="category in orphanCategories" :key="category.id" 
                class="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div class="flex items-center space-x-3">
                  <div class="w-8 h-8 bg-yellow-200 rounded-lg flex items-center justify-center">
                    <i class="fas fa-tag text-yellow-700 text-sm"></i>
                  </div>
                  <div>
                    <h5 class="font-medium text-gray-800">{{ category.name }}</h5>
                    <p class="text-xs text-gray-500">{{ category.product_count || 0 }} sản phẩm</p>
                  </div>
                </div>
                <div class="flex items-center space-x-2">
                  <span class="inline-flex items-center px-2 py-1 rounded-full text-xs" 
                    :class="category.status ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'">
                    {{ category.status ? 'Hiện' : 'Ẩn' }}
                  </span>
                  <div class="flex space-x-1">
                    <button @click="openEdit(category)" class="p-1.5 text-blue-600 hover:bg-blue-50 rounded">
                      <i class="fas fa-pen text-xs"></i>
                    </button>
                    <button @click="remove(category)" class="p-1.5 text-red-600 hover:bg-red-50 rounded">
                      <i class="fas fa-trash text-xs"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Cards View -->
      <div v-else-if="viewMode === 'cards'" class="p-6">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div v-for="category in categories" :key="category.id" 
            class="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 group overflow-hidden">
            <!-- Card Header -->
            <div class="bg-gradient-to-br from-blue-50 to-purple-50 p-4">
              <div class="flex items-center justify-between mb-3">
                <div class="w-12 h-12 bg-white rounded-lg shadow-sm flex items-center justify-center">
                  <i class="fas fa-tags text-blue-600 text-xl"></i>
                </div>
                <div class="flex space-x-1">
                  <button @click="openEdit(category)" 
                    class="p-2 text-blue-600 hover:bg-white/70 rounded-lg opacity-0 group-hover:opacity-100 transition-all">
                    <i class="fas fa-pen text-sm"></i>
                  </button>
                  <button @click="remove(category)" 
                    class="p-2 text-red-600 hover:bg-white/70 rounded-lg opacity-0 group-hover:opacity-100 transition-all">
                    <i class="fas fa-trash text-sm"></i>
                  </button>
                </div>
              </div>
              <h4 class="font-semibold text-gray-900 text-lg mb-1">{{ category.name }}</h4>
              <p class="text-sm text-gray-600">{{ category.slug }}</p>
            </div>

            <!-- Card Body -->
            <div class="p-4">
              <!-- Parent Category -->
              <div v-if="category.parent_id" class="mb-3">
                <span class="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                  <i class="fas fa-link mr-1"></i>
                  {{ getParentName(category.parent_id) }}
                </span>
              </div>

              <!-- Description -->
              <p v-if="category.description" class="text-sm text-gray-600 mb-3 line-clamp-2">
                {{ category.description }}
              </p>

              <!-- Stats -->
              <div class="flex items-center justify-between mb-3">
                <div class="text-center">
                  <div class="text-lg font-bold text-blue-600">{{ category.product_count || 0 }}</div>
                  <div class="text-xs text-gray-500">Sản phẩm</div>
                </div>
                <div class="text-center">
                  <div class="text-lg font-bold text-green-600">{{ formatCurrency(category.revenue || 0) }}</div>
                  <div class="text-xs text-gray-500">Doanh thu</div>
                </div>
              </div>

              <!-- Status -->
              <div class="flex items-center justify-center">
                <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium w-full justify-center" 
                  :class="category.status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'">
                  <span class="w-2 h-2 rounded-full mr-2" 
                    :class="category.status ? 'bg-green-500' : 'bg-red-500'"></span>
                  {{ category.status ? 'Đang hiển thị' : 'Đã ẩn' }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination (if needed in future) -->
      <div class="px-6 py-4 border-t border-gray-200 bg-gray-50">
        <div class="flex items-center justify-between">
          <div class="text-sm text-gray-500">
            Hiển thị <span class="font-medium">{{ categories.length }}</span> danh mục
          </div>
          <div class="text-sm text-gray-500">
            Tất cả danh mục đang hiển thị
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
          <div class="relative bg-gradient-to-r from-blue-600 to-purple-600">
            <div class="px-7 py-5">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-4">
                  <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <i class="fas fa-tags text-white text-xl"></i>
                  </div>
                  <div>
                    <h3 class="text-xl font-bold text-white">{{ form.id ? 'Sửa danh mục' : 'Thêm danh mục mới' }}</h3>
                    <p class="text-white/80 text-sm">{{ form.id ? 'Cập nhật thông tin danh mục' : 'Tạo danh mục mới trong hệ thống' }}</p>
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

              <!-- Row 1: Name & Parent -->
              <div class="grid grid-cols-2 gap-5">
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">
                    <i class="fas fa-tags text-blue-500 mr-2"></i>Tên danh mục *
                  </label>
                  <input v-model="form.name" @input="updateSlug" type="text"
                    class="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="Nhập tên danh mục..." required />
                </div>
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">
                    <i class="fas fa-layer-group text-purple-500 mr-2"></i>Danh mục cha
                  </label>
                  <select v-model="form.parent_id"
                    class="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all">
                    <option value="">-- Không có danh mục cha --</option>
                    <option v-for="category in localParentCategories" :key="category.id" :value="category.id">
                      {{ category.name }}
                    </option>
                  </select>
                </div>
              </div>

              <!-- Row 2: Description -->
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">
                  <i class="fas fa-align-left text-indigo-500 mr-2"></i>Mô tả danh mục
                </label>
                <textarea v-model="form.description" rows="4"
                  class="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="Nhập mô tả chi tiết về danh mục..."></textarea>
              </div>

              <!-- Row 3: Status -->
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">
                  <i class="fas fa-toggle-on text-orange-500 mr-2"></i>Trạng thái
                </label>
                <div class="flex items-center h-12 px-4 py-3 border border-gray-300 rounded-lg bg-gray-50">
                  <input v-model="form.active" type="checkbox"
                    class="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500" id="cActive">
                  <label for="cActive" class="ml-3 text-sm font-medium text-gray-700 flex items-center">
                    <span class="w-2.5 h-2.5 rounded-full mr-2"
                      :class="form.active ? 'bg-emerald-500' : 'bg-red-500'"></span>
                    {{ form.active ? 'Đang hiển thị' : 'Đã ẩn' }}
                  </label>
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
                class="flex-1 px-5 py-3 text-sm font-medium text-white rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <i v-if="saving" class="fas fa-spinner fa-spin mr-2"></i>
                <i v-else class="fas fa-save mr-2"></i>
                {{ saving ? 'Đang lưu...' : (form.id ? 'Cập nhật' : 'Tạo mới') }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useCategories } from '@/composables/useCategories'
import Swal from 'sweetalert2'

// Use Categories Composable
const {
  // State
  categories,
  loading,
  saving,
  error,
  selectedCategories,
  expandedCategories,
  viewMode,
  
  // Computed
  rootCategories,
  orphanCategories,
  stats,
  
  // Methods
  loadCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  setViewMode,
  selectCategory,
  selectAllCategories,
  bulkDelete,
  bulkUpdateStatus,
  formatCurrency,
  refreshCategories
} = useCategories()

// Local state for modal
const empty = { id: null, name: '', slug: '', description: '', active: true, parent_id: null }
const form = ref({ ...empty })
const showModal = ref(false)

// Local computed that depends on form state
const localParentCategories = computed(() => {
  return categories.value.filter(cat => 
    !cat.parent_id && // Only root level categories can be parents
    cat.id !== form.value.id // Can't be parent of itself
  )
})

// Stats cards formatted for display
const statsCards = computed(() => [
  {
    icon: 'fas fa-tags',
    iconClass: 'text-blue-600',
    value: stats.value.total,
    label: 'Tổng danh mục'
  },
  {
    icon: 'fas fa-eye',
    iconClass: 'text-green-600',
    value: stats.value.active,
    label: 'Đang hiển thị'
  },
  {
    icon: 'fas fa-box',
    iconClass: 'text-purple-600',
    value: stats.value.totalProducts,
    label: 'Tổng sản phẩm'
  },
  {
    icon: 'fas fa-inbox',
    iconClass: 'text-orange-600',
    value: stats.value.empty,
    label: 'Danh mục trống'
  }
])



// Utility functions
function slugify(text) {
  if (!text) return ''
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function formatDate(dateString) {
  if (!dateString) return 'N/A'
  const date = new Date(dateString)
  return date.toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

function updateSlug() {
  form.value.slug = slugify(form.value.name)
}

function openAddModal() {
  form.value = { ...empty }
  showModal.value = true
  console.log('Modal opened - Add mode')
}

function openEdit(category) {
  form.value = {
    id: category.id,
    name: category.name,
    slug: category.slug,
    description: category.description || '',
    active: category.status,
    parent_id: category.parent_id
  }
  showModal.value = true
  console.log('Modal opened - Edit mode', form.value)
}

function closeModal() {
  showModal.value = false
  form.value = { ...empty }
}

async function toggleStatus(category) {
  const result = await Swal.fire({
    title: category.status ? 'Ẩn danh mục?' : 'Hiện danh mục?',
    text: `Bạn có muốn ${category.status ? 'ẩn' : 'hiện'} danh mục "${category.name}"?`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: category.status ? 'Ẩn' : 'Hiện',
    cancelButtonText: 'Hủy',
    confirmButtonColor: category.status ? '#dc2626' : '#059669'
  })

  if (result.isConfirmed) {
    try {
      const categoryData = {
        name: category.name,
        slug: category.slug,
        description: category.description || '',
        status: !category.status,
        parent_id: category.parent_id
      }
      
      await updateCategory(category.id, categoryData)
      
      Swal.fire({
        icon: 'success',
        title: `Đã ${!category.status ? 'hiện' : 'ẩn'} danh mục`,
        timer: 1000,
        showConfirmButton: false
      })

    } catch (error) {
      console.error('Error toggling category status:', error)
      Swal.fire({
        icon: 'error',
        title: 'Lỗi cập nhật',
        text: error.message || 'Không thể thay đổi trạng thái danh mục. Vui lòng thử lại.',
        confirmButtonColor: '#3B82F6'
      })
    }
  }
}

async function save() {
  try {
    if (!form.value.name.trim()) {
      Swal.fire({ icon: 'warning', title: 'Vui lòng nhập tên danh mục', timer: 1500 })
      return
    }

    const categoryData = {
      name: form.value.name.trim(),
      slug: slugify(form.value.name),
      description: form.value.description || '',
      status: form.value.active,
      parent_id: form.value.parent_id || null
    }

    const isUpdate = !!form.value.id

    if (isUpdate) {
      await updateCategory(form.value.id, categoryData)
    } else {
      await createCategory(categoryData)
    }

    Swal.fire({
      icon: 'success',
      title: isUpdate ? 'Đã cập nhật danh mục' : 'Đã thêm danh mục',
      timer: 1200,
      showConfirmButton: false
    })

    closeModal()

  } catch (error) {
    console.error('Error saving category:', error)
    Swal.fire({
      icon: 'error',
      title: 'Lỗi lưu dữ liệu',
      text: error.message || 'Không thể lưu danh mục. Vui lòng thử lại.',
      confirmButtonColor: '#3B82F6'
    })
  } finally {
    saving.value = false
  }
}

async function remove(category) {
  const result = await Swal.fire({
    title: 'Xác nhận xóa?',
    text: `Bạn có chắc muốn xóa danh mục "${category.name}"?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#DC2626',
    cancelButtonColor: '#6B7280',
    confirmButtonText: 'Có, xóa!',
    cancelButtonText: 'Hủy'
  })

  if (result.isConfirmed) {
    try {
      await deleteCategory(category.id)
      
      Swal.fire({
        icon: 'success',
        title: 'Đã xóa!',
        text: 'Danh mục đã được xóa.',
        timer: 1500,
        showConfirmButton: false
      })
    } catch (error) {
      console.error('Error deleting category:', error)
      Swal.fire({
        icon: 'error',
        title: 'Lỗi xóa dữ liệu',
        text: error.message || 'Không thể xóa danh mục. Vui lòng thử lại.',
        confirmButtonColor: '#3B82F6'
      })
    }
  }
}



// Helper functions
function getParentName(parentId) {
  if (!parentId) return ''
  const parent = categories.value.find(cat => cat.id === parentId)
  return parent ? parent.name : 'Unknown'
}

function getChildCategories(parentId) {
  return categories.value.filter(cat => cat.parent_id === parentId)
}

function toggleExpand(categoryId) {
  const index = expandedCategories.value.indexOf(categoryId)
  if (index > -1) {
    expandedCategories.value.splice(index, 1)
  } else {
    expandedCategories.value.push(categoryId)
  }
}

// Initialize
onMounted(async () => {
  await loadCategories()
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.tree-item {
  position: relative;
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

.modal-enter-active > div,
.modal-leave-active > div {
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.modal-enter-from > div,
.modal-leave-to > div {
  transform: scale(0.9) translateY(-20px);
  opacity: 0;
}



/* Responsive adjustments using Tailwind responsive prefixes in HTML */
</style>
