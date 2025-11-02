<template>
  <div class="admin-users p-6 bg-gray-50 min-h-screen">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-center justify-between mb-8">
      <div class="mb-4 md:mb-0">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Quản lý người dùng</h1>
        <p class="text-gray-600">Quản lý tài khoản và phân quyền người dùng hệ thống</p>
      </div>
      <div class="flex flex-wrap gap-3">
        <button
          class="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-all duration-200 shadow-sm">
          <i class="fas fa-file-import mr-2"></i>Import CSV
        </button>
        <button
          @click="exportUsers"
          class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all duration-200 shadow-sm">
          <i class="fas fa-download mr-2"></i>Xuất Excel
        </button>
        <button
          class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          @click="openAddUser">
          <i class="fas fa-plus mr-2"></i>Thêm người dùng
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
            <p class="text-2xl font-bold text-gray-900">{{ stat.value.toLocaleString() }}</p>
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
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Tìm kiếm</label>
            <div class="relative">
              <input v-model="filter.search" type="text" placeholder="Tìm theo tên, email..." 
                class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center">
                <i class="fas fa-search text-gray-400"></i>
              </div>
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Vai trò</label>
            <select v-model="filter.role" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
              <option value="">Tất cả vai trò</option>
              <option value="admin">Quản trị viên</option>
              <option value="user">Khách hàng</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Trạng thái</label>
            <select v-model="filter.status" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
              <option value="">Tất cả trạng thái</option>
              <option value="active">Hoạt động</option>
              <option value="inactive">Không hoạt động</option>
            </select>
          </div>
          
          <div class="flex items-end">
            <button
              @click="resetFilter"
              class="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors duration-200 mr-2">
              <i class="fas fa-filter mr-2"></i>Lọc
            </button>
            <button 
              @click="resetFilter"
              class="text-gray-500 hover:text-gray-700 px-4 py-2 rounded-lg transition-colors duration-200">
              <i class="fas fa-times mr-2"></i>Xóa bộ lọc
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Users Table -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div class="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <div class="flex justify-between items-center">
          <div>
            <h3 class="text-lg font-semibold text-gray-900">Danh sách người dùng</h3>
            <p class="text-sm text-gray-500 mt-1">Quản lý và theo dõi tất cả tài khoản trong hệ thống</p>
          </div>
          <div class="flex items-center space-x-3">
            <span class="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
              {{ filteredUsers.length }} người dùng
            </span>
          </div>
        </div>
      </div>

      <!-- Table View -->
      <div class="overflow-hidden rounded-xl border border-gray-200">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gradient-to-r from-blue-600 to-purple-600">
              <tr>
                <th class="px-6 py-4 text-left">
                  <div class="flex items-center">
                    <input type="checkbox"
                      class="rounded border-white/50 bg-white/20 text-blue-500 focus:ring-0 focus:ring-offset-0 hover:bg-white/30 transition-colors">
                    <span class="ml-3 text-xs font-semibold uppercase tracking-wider text-white">Chọn tất cả</span>
                  </div>
                </th>
                <th class="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider text-white">
                  <div class="flex items-center gap-2">
                    <i class="fas fa-user text-white/90"></i>
                    Người dùng
                  </div>
                </th>
                <th class="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider text-white">
                  <div class="flex items-center gap-2">
                    <i class="fas fa-envelope text-white/90"></i>
                    Email & SĐT
                  </div>
                </th>
                <th class="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider text-white">
                  <div class="flex items-center gap-2">
                    <i class="fas fa-shield-alt text-white/90"></i>
                    Vai trò
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
                    <i class="fas fa-cog text-white/90"></i>
                    Thao tác
                  </div>
                </th>
              </tr>
            </thead>
            <tbody class="bg-white">
              <tr v-for="user in filteredUsers" :key="user.id"
                class="border-b border-gray-100 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200 group">
                
                <!-- Checkbox -->
                <td class="px-6 py-5">
                  <input type="checkbox"
                    class="rounded border-gray-300 text-blue-600 focus:ring-blue-500 hover:border-blue-400 transition-colors">
                </td>

                <!-- User Info -->
                <td class="px-6 py-5">
                  <div class="flex items-center gap-4">
                    <div class="relative">
                      <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-200">
                        <span class="text-white font-bold text-lg">{{ user.name.charAt(0).toUpperCase() }}</span>
                      </div>
                      <div v-if="user.verified" class="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                        <i class="fas fa-check text-white text-xs"></i>
                      </div>
                    </div>
                    <div>
                      <div class="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {{ user.name }}
                      </div>
                      <div class="text-sm text-gray-500">
                        <i class="fas fa-calendar-alt mr-1"></i>{{ formatDate(user.created_at) }}
                      </div>
                    </div>
                  </div>
                </td>

                <!-- Contact Info -->
                <td class="px-6 py-5">
                  <div class="space-y-1">
                    <div class="text-sm font-medium text-gray-900 flex items-center gap-2">
                      <i class="fas fa-envelope text-blue-500"></i>
                      {{ user.email }}
                    </div>
                    <div class="text-sm text-gray-500 flex items-center gap-2">
                      <i class="fas fa-phone text-green-500"></i>
                      {{ user.phone || 'Chưa cập nhật' }}
                    </div>
                  </div>
                </td>

                <!-- Role Badge -->
                <td class="px-6 py-5">
                  <span class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold shadow-xl transition-all duration-300 transform hover:scale-105"
                    :class="{
                      'bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 text-white hover:shadow-purple-500/60 ring-2 ring-purple-300': user.role === 'admin',
                      'bg-gradient-to-r from-purple-600 via-pink-500 to-pink-600 text-white hover:shadow-pink-500/60 ring-2 ring-pink-300 animate-pulse': user.role === 'customer'
                    }">
                    <i class="fas text-base" :class="{
                      'fa-crown': user.role === 'admin',
                      'fa-user-shield': user.role === 'customer'
                    }"></i>
                    <span class="uppercase tracking-wide">{{ user.role === 'admin' ? 'Quản trị' : 'Khách hàng' }}</span>
                  </span>
                </td>

                <!-- Status Badge -->
                <td class="px-6 py-5">
                  <span class="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold shadow-sm"
                    :class="user.status === 1 ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white' : 'bg-gradient-to-r from-red-500 to-pink-500 text-white'">
                    <div class="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                    <span>{{ user.status === 1 ? 'Hoạt động' : 'Đã khóa' }}</span>
                  </span>
                </td>

                <!-- Actions -->
                <td class="px-6 py-5">
                  <div class="flex items-center justify-end gap-2">
                    <button @click="viewUser(user)"
                      class="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-all duration-200 hover:shadow-md"
                      title="Xem chi tiết">
                      <i class="fas fa-eye"></i>
                    </button>
                    <button @click="editUser(user)"
                      class="p-2 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition-all duration-200 hover:shadow-md"
                      title="Chỉnh sửa">
                      <i class="fas fa-edit"></i>
                    </button>
                    <button @click="toggleUserStatus(user)"
                      class="p-2 rounded-lg bg-yellow-50 text-yellow-600 hover:bg-yellow-100 transition-all duration-200 hover:shadow-md"
                      :title="user.status === 1 ? 'Khóa tài khoản' : 'Kích hoạt tài khoản'">
                      <i class="fas" :class="user.status === 1 ? 'fa-lock' : 'fa-unlock'"></i>
                    </button>
                    <button @click="deleteUser(user.id)"
                      class="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-all duration-200 hover:shadow-md"
                      title="Xóa">
                      <i class="fas fa-trash"></i>
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
          <div class="flex items-center text-sm text-gray-700">
            Hiển thị <span class="font-medium">1</span> đến <span class="font-medium">10</span> 
            trong tổng số <span class="font-medium">{{ filteredUsers.length }}</span> người dùng
          </div>
        </div>
      </div>
    </div>

    <!-- Create/Edit User Modal -->
    <Transition name="modal" appear>
      <div v-if="showUserModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900 bg-opacity-50" @click="closeUserModal">
        <div class="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" @click.stop>
          <div class="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <div class="p-2 bg-blue-100 rounded-lg mr-3">
                  <i class="fas fa-user-plus text-blue-600" v-if="!form.id"></i>
                  <i class="fas fa-user-edit text-blue-600" v-else></i>
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-gray-900">
                    {{ form.id ? 'Chỉnh sửa người dùng' : 'Thêm người dùng mới' }}
                  </h3>
                  <p class="text-sm text-gray-500">
                    {{ form.id ? 'Cập nhật thông tin người dùng' : 'Tạo tài khoản mới cho hệ thống' }}
                  </p>
                </div>
              </div>
              <button type="button" @click="closeUserModal" class="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100">
                <i class="fas fa-times text-lg"></i>
              </button>
            </div>
          </div>

          <form @submit.prevent="saveUser">
            <div class="p-6 space-y-6">
              <!-- Basic Information -->
              <div class="bg-gray-50 rounded-lg p-4">
                <h4 class="text-md font-medium text-gray-900 mb-4 flex items-center">
                  <i class="fas fa-user mr-2 text-blue-600"></i>
                  Thông tin cá nhân
                </h4>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      Họ và tên <span class="text-red-500">*</span>
                    </label>
                    <div class="relative">
                      <i class="fas fa-user absolute left-3 top-3 text-gray-400"></i>
                      <input v-model="form.name" 
                             type="text" 
                             class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                             placeholder="Nhập họ và tên"
                             required>
                    </div>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      Email <span class="text-red-500">*</span>
                    </label>
                    <div class="relative">
                      <i class="fas fa-envelope absolute left-3 top-3 text-gray-400"></i>
                      <input v-model="form.email" 
                             type="email" 
                             class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                             placeholder="user@example.com"
                             required>
                    </div>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Số điện thoại</label>
                    <div class="relative">
                      <i class="fas fa-phone absolute left-3 top-3 text-gray-400"></i>
                      <input v-model="form.phone" 
                             type="tel" 
                             class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                             placeholder="0987654321">
                    </div>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      Vai trò <span class="text-red-500">*</span>
                    </label>
                    <div class="relative">
                      <i class="fas fa-shield-alt absolute left-3 top-3 text-gray-400"></i>
                      <select v-model="form.role" 
                              class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                              required>
                        <option value="user">Khách hàng</option>
                        <option value="admin">Quản trị viên</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end space-x-3">
              <button type="button" 
                      @click="closeUserModal" 
                      class="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 font-medium transition-colors">
                <i class="fas fa-times mr-2"></i>Hủy
              </button>
              <button type="submit" 
                      class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors">
                <i class="fas mr-2" :class="form.id ? 'fa-save' : 'fa-plus'"></i>
                {{ form.id ? 'Cập nhật' : 'Tạo mới' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Transition>

    <!-- User Details Modal -->
    <Transition name="modal" appear>
      <div v-if="showDetailsModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900 bg-opacity-50" @click="closeDetailsModal">
        <div class="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" @click.stop>
          <div class="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <div class="h-12 w-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center mr-4">
                  <span class="text-white font-semibold text-lg">{{ selectedUser?.name?.charAt(0)?.toUpperCase() }}</span>
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-gray-900">{{ selectedUser?.name }}</h3>
                  <p class="text-sm text-gray-500">Thông tin chi tiết tài khoản</p>
                </div>
              </div>
              <button type="button" @click="closeDetailsModal" class="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100">
                <i class="fas fa-times text-lg"></i>
              </button>
            </div>
          </div>

          <div class="p-6 space-y-6" v-if="selectedUser">
            <!-- Personal Information -->
            <div class="bg-gray-50 rounded-lg p-4">
              <h4 class="text-md font-medium text-gray-900 mb-4 flex items-center">
                <i class="fas fa-user mr-2 text-blue-600"></i>
                Thông tin cá nhân
              </h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="bg-white rounded-lg p-3 border">
                  <div class="flex items-center">
                    <i class="fas fa-id-card text-gray-400 mr-3"></i>
                    <div>
                      <p class="text-xs text-gray-500 uppercase tracking-wide">ID</p>
                      <p class="font-medium text-gray-900">#{{ selectedUser.id }}</p>
                    </div>
                  </div>
                </div>
                <div class="bg-white rounded-lg p-3 border">
                  <div class="flex items-center">
                    <i class="fas fa-user text-gray-400 mr-3"></i>
                    <div>
                      <p class="text-xs text-gray-500 uppercase tracking-wide">Họ tên</p>
                      <p class="font-medium text-gray-900">{{ selectedUser.name }}</p>
                    </div>
                  </div>
                </div>
                <div class="bg-white rounded-lg p-3 border">
                  <div class="flex items-center">
                    <i class="fas fa-envelope text-gray-400 mr-3"></i>
                    <div>
                      <p class="text-xs text-gray-500 uppercase tracking-wide">Email</p>
                      <p class="font-medium text-gray-900">{{ selectedUser.email }}</p>
                    </div>
                  </div>
                </div>
                <div class="bg-white rounded-lg p-3 border">
                  <div class="flex items-center">
                    <i class="fas fa-phone text-gray-400 mr-3"></i>
                    <div>
                      <p class="text-xs text-gray-500 uppercase tracking-wide">Số điện thoại</p>
                      <p class="font-medium text-gray-900">{{ selectedUser.phone || 'Chưa cập nhật' }}</p>
                    </div>
                  </div>
                </div>
                <div class="bg-white rounded-lg p-3 border">
                  <div class="flex items-center">
                    <i class="fas fa-shield-alt text-gray-400 mr-3"></i>
                    <div>
                      <p class="text-xs text-gray-500 uppercase tracking-wide">Vai trò</p>
                      <p class="font-medium text-gray-900">
                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                              :class="{
                                'bg-purple-100 text-purple-800': selectedUser.role === 'admin',
                                'bg-pink-100 text-pink-800': selectedUser.role === 'user'
                              }">
                          {{ selectedUser.role === 'admin' ? 'Quản trị' : 'Khách hàng' }}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <div class="bg-white rounded-lg p-3 border">
                  <div class="flex items-center">
                    <i class="fas fa-calendar text-gray-400 mr-3"></i>
                    <div>
                      <p class="text-xs text-gray-500 uppercase tracking-wide">Ngày tham gia</p>
                      <p class="font-medium text-gray-900">{{ formatDate(selectedUser.created_at) }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Account Status -->
            <div class="bg-gray-50 rounded-lg p-4">
              <h4 class="text-md font-medium text-gray-900 mb-4 flex items-center">
                <i class="fas fa-info-circle mr-2 text-blue-600"></i>
                Trạng thái tài khoản
              </h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="bg-white rounded-lg p-3 border">
                  <div class="flex items-center">
                    <i class="fas fa-check-circle text-gray-400 mr-3"></i>
                    <div>
                      <p class="text-xs text-gray-500 uppercase tracking-wide">Xác thực Email</p>
                      <p class="font-medium">
                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                              :class="selectedUser.verified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'">
                          {{ selectedUser.verified ? '✓ Đã xác thực' : '⚠ Chưa xác thực' }}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <div class="bg-white rounded-lg p-3 border">
                  <div class="flex items-center">
                    <i class="fas fa-power-off text-gray-400 mr-3"></i>
                    <div>
                      <p class="text-xs text-gray-500 uppercase tracking-wide">Trạng thái</p>
                      <p class="font-medium">
                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                              :class="selectedUser.status === 1 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'">
                          <div class="w-1.5 h-1.5 rounded-full mr-1.5"
                               :class="selectedUser.status === 1 ? 'bg-green-400' : 'bg-red-400'"></div>
                          {{ selectedUser.status === 1 ? 'Hoạt động' : 'Đã khóa' }}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Address -->
            <div class="bg-gray-50 rounded-lg p-4" v-if="selectedUser.address">
              <h4 class="text-md font-medium text-gray-900 mb-4 flex items-center">
                <i class="fas fa-map-marker-alt mr-2 text-blue-600"></i>
                Địa chỉ
              </h4>
              <div class="bg-white rounded-lg p-3 border">
                <p class="text-gray-700">{{ selectedUser.address }}</p>
              </div>
            </div>
          </div>
          
          <div class="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end space-x-3">
            <button type="button" 
                    @click="closeDetailsModal" 
                    class="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 font-medium transition-colors">
              <i class="fas fa-times mr-2"></i>Đóng
            </button>
            <button type="button" 
                    @click="editUser(selectedUser)" 
                    class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors">
              <i class="fas fa-edit mr-2"></i>Chỉnh sửa
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useUsers } from '@/composables'
import Swal from 'sweetalert2'

const {
  users,
  loading,
  currentPage,
  lastPage,
  total,
  stats: apiStats,
  loadUsers,
  loadStats,
  createUser,
  updateUser,
  deleteUser: apiDeleteUser,
  toggleUserStatus: apiToggleStatus,
  exportUsers: apiExportUsers
} = useUsers()

const stats = computed(() => [
  { icon: 'fas fa-users', iconClass: 'bg-blue-100 text-blue-600', value: apiStats.value.total || 0, label: 'Tổng người dùng' },
  { icon: 'fas fa-user-check', iconClass: 'bg-green-100 text-green-600', value: apiStats.value.active || 0, label: 'Đang hoạt động' },
  { icon: 'fas fa-crown', iconClass: 'bg-yellow-100 text-yellow-600', value: apiStats.value.admin || 0, label: 'Quản trị viên' },
  { icon: 'fas fa-user-plus', iconClass: 'bg-purple-100 text-purple-600', value: apiStats.value.newThisMonth || 0, label: 'Mới tháng này' },
])

// Load data khi component mount
onMounted(async () => {
  await Promise.all([
    loadUsers(),
    loadStats()
  ])
})

const filter = ref({
  search: '',
  role: '',
  status: '',
  dateFrom: ''
})

const emptyForm = {
  id: null,
  name: '',
  email: '',
  phone: '',
  role: 'user',
  status: 1 // 1 = active, 0 = inactive
}

const form = ref({ ...emptyForm })
const selectedUser = ref(null)

// Modal states
const showUserModal = ref(false)
const showDetailsModal = ref(false)

const filteredUsers = computed(() => {
  if (!users.value) return []
  
  return users.value.filter(user => {
    // Search filter
    if (filter.value.search) {
      const searchLower = filter.value.search.toLowerCase()
      const matchName = user.name?.toLowerCase().includes(searchLower)
      const matchEmail = user.email?.toLowerCase().includes(searchLower)
      const matchPhone = user.phone?.toLowerCase().includes(searchLower)
      
      if (!matchName && !matchEmail && !matchPhone) {
        return false
      }
    }
    
    // Role filter
    if (filter.value.role && user.role !== filter.value.role) {
      return false
    }
    
    // Status filter
    if (filter.value.status === 'active' && user.status !== 1) {
      return false
    }
    if (filter.value.status === 'inactive' && user.status !== 0) {
      return false
    }
    
    // Date filter
    if (filter.value.dateFrom && new Date(user.created_at) < new Date(filter.value.dateFrom)) {
      return false
    }
    
    return true
  })
})

function resetFilter() {
  filter.value.search = ''
  filter.value.role = ''
  filter.value.status = ''
  filter.value.dateFrom = ''
}

function openAddUser() {
  form.value = { ...emptyForm }
  showUserModal.value = true
}

function viewUser(user) {
  selectedUser.value = user
  showDetailsModal.value = true
}

function editUser(user) {
  form.value = { ...user, password: '', password_confirmation: '' }
  showDetailsModal.value = false
  showUserModal.value = true
}

function closeUserModal() {
  showUserModal.value = false
  form.value = { ...emptyForm }
}

function closeDetailsModal() {
  showDetailsModal.value = false
  selectedUser.value = null
}

async function saveUser() {
  try {
    if (form.value.id) {
      // Update existing user
      await updateUser(form.value.id, form.value)
    } else {
      // Add new user
      await createUser(form.value)
    }
    
    // Reload stats
    await loadStats()
    
    closeUserModal()
  } catch (error) {
    console.error('Error saving user:', error)
    // Error đã được xử lý trong composable
  }
}

async function toggleUserStatus(user) {
  const action = user.status === 1 ? 'khóa' : 'kích hoạt'
  
  const result = await Swal.fire({
    title: `Xác nhận ${action} tài khoản?`,
    text: `Bạn có chắc chắn muốn ${action} tài khoản của ${user.name}?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: `Có, ${action}!`,
    cancelButtonText: 'Hủy',
    confirmButtonColor: user.status === 1 ? '#dc3545' : '#198754'
  })
  
  if (result.isConfirmed) {
    try {
      await apiToggleStatus(user.id)
      await loadStats()
    } catch (error) {
      console.error('Error toggling status:', error)
    }
  }
}

async function deleteUser(userId) {
  const user = users.value.find(u => u.id === userId)
  
  if (!user) return
  
  const result = await Swal.fire({
    title: 'Xóa người dùng?',
    text: `Bạn có chắc chắn muốn xóa tài khoản của ${user.name}? Hành động này không thể hoàn tác!`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Xóa',
    cancelButtonText: 'Hủy',
    confirmButtonColor: '#dc3545'
  })
  
  if (result.isConfirmed) {
    try {
      await apiDeleteUser(userId)
      await loadStats()
    } catch (error) {
      console.error('Error deleting user:', error)
    }
  }
}

async function exportUsers() {
  try {
    await apiExportUsers(filter.value)
  } catch (error) {
    console.error('Error exporting users:', error)
  }
}

// Helper function
function formatDate(dateString) {
  if (!dateString) return 'N/A'
  
  const date = new Date(dateString)
  const now = new Date()
  const diff = now - date
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  
  if (days === 0) return 'Hôm nay'
  if (days === 1) return 'Hôm qua'
  if (days < 7) return `${days} ngày trước`
  if (days < 30) return `${Math.floor(days / 7)} tuần trước`
  if (days < 365) return `${Math.floor(days / 30)} tháng trước`
  
  return date.toLocaleDateString('vi-VN')
}
</script>

<style scoped>
/* Modal transitions */
.modal-enter-active, .modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from, .modal-leave-to {
  opacity: 0;
}

.modal-enter-active .bg-white,
.modal-leave-active .bg-white {
  transition: transform 0.3s ease;
}

.modal-enter-from .bg-white,
.modal-leave-to .bg-white {
  transform: scale(0.95);
}
</style>
