<template>
  <div class="admin-users p-6 bg-gray-50 min-h-screen">
    <!-- Page Header -->
    <div class="flex flex-col md:flex-row md:items-center justify-between mb-8">
      <div class="mb-4 md:mb-0">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Quản lý người dùng</h1>
        <p class="text-gray-600">Quản lý tài khoản và phân quyền người dùng hệ thống</p>
      </div>
      <div class="flex flex-wrap gap-3">
        <button class="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-all duration-200 shadow-sm" @click="exportUsers">
          <i class="fas fa-file-export mr-2"></i>Xuất Excel
        </button>
        <button class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all duration-200 shadow-sm">
          <i class="fas fa-file-import mr-2"></i>Import CSV
        </button>
        <button class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5" @click="openAddUser">
          <i class="fas fa-user-plus mr-2"></i>Thêm người dùng
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
              <option value="manager">Quản lý</option>
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
            <button @click="resetFilter" class="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
              <i class="fas fa-times mr-2"></i>Reset
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
            <p class="text-sm text-gray-500 mt-1">Quản lý tất cả tài khoản trong hệ thống</p>
          </div>
          <div class="flex items-center space-x-3">
            <span class="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
              {{ filteredUsers.length }} người dùng
            </span>
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
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Người dùng</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Liên hệ</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vai trò</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hoạt động</th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="user in filteredUsers" :key="user.id" 
                class="hover:bg-gray-50 transition-colors duration-200">
              <!-- Checkbox -->
              <td class="px-6 py-4 whitespace-nowrap">
                <input type="checkbox" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500">
              </td>
              
              <!-- User Info -->
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10">
                    <div class="h-10 w-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                      <span class="text-white font-semibold text-sm">{{ user.name.charAt(0).toUpperCase() }}</span>
                    </div>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ user.name }}</div>
                    <div class="text-sm text-gray-500">#{{ user.id }}</div>
                  </div>
                </div>
              </td>
              
              <!-- Contact Info -->
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ user.email }}</div>
                <div class="text-sm text-gray-500">{{ user.phone || 'Chưa cập nhật' }}</div>
              </td>
              
              <!-- Role -->
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                      :class="{
                        'bg-purple-100 text-purple-800': user.role === 'admin',
                        'bg-blue-100 text-blue-800': user.role === 'manager',
                        'bg-green-100 text-green-800': user.role === 'user'
                      }">
                  <i class="fas mr-1" 
                     :class="{
                       'fa-crown': user.role === 'admin',
                       'fa-user-tie': user.role === 'manager', 
                       'fa-user': user.role === 'user'
                     }"></i>
                  {{ user.role === 'admin' ? 'Quản trị' : user.role === 'manager' ? 'Quản lý' : 'Khách hàng' }}
                </span>
              </td>
              
              <!-- Status -->
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                      :class="user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'">
                  <div class="w-1.5 h-1.5 rounded-full mr-1.5"
                       :class="user.status === 'active' ? 'bg-green-400' : 'bg-red-400'"></div>
                  {{ user.status === 'active' ? 'Hoạt động' : 'Đã khóa' }}
                </span>
              </td>
              
              <!-- Activity -->
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ user.orders }} đơn hàng</div>
                <div class="text-sm text-gray-500">{{ user.joinDate }}</div>
              </td>
              
              <!-- Actions -->
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex items-center justify-end space-x-2">
                  <button @click="viewUser(user)" 
                          class="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50 transition-colors">
                    <i class="fas fa-eye"></i>
                  </button>
                  <button @click="editUser(user)" 
                          class="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-50 transition-colors">
                    <i class="fas fa-edit"></i>
                  </button>
                  <button @click="toggleUserStatus(user)" 
                          class="text-yellow-600 hover:text-yellow-900 p-1 rounded hover:bg-yellow-50 transition-colors"
                          :title="user.status === 'active' ? 'Khóa tài khoản' : 'Kích hoạt tài khoản'">
                    <i class="fas" :class="user.status === 'active' ? 'fa-lock' : 'fa-unlock'"></i>
                  </button>
                  <button @click="deleteUser(user.id)" 
                          class="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50 transition-colors">
                    <i class="fas fa-trash"></i>
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
                        <option value="manager">Quản lý</option>
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
import { ref, computed } from 'vue'
import Swal from 'sweetalert2'

const stats = [
  { icon: 'fas fa-users', iconClass: 'bg-blue-100 text-blue-600', value: 2341, label: 'Tổng người dùng' },
  { icon: 'fas fa-user-check', iconClass: 'bg-green-100 text-green-600', value: 2156, label: 'Đang hoạt động' },
  { icon: 'fas fa-crown', iconClass: 'bg-yellow-100 text-yellow-600', value: 12, label: 'Quản trị viên' },
  { icon: 'fas fa-user-plus', iconClass: 'bg-purple-100 text-purple-600', value: 45, label: 'Mới tháng này' },
]

const users = ref([
  {
    id: 1,
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@email.com',
    phone: '0987654321',
    role: 'admin',
    is_active: true,
    status: 'active',
    address: '123 Đường ABC, Phường XYZ, Quận 1, TP.HCM',
    avatar: 'https://via.placeholder.com/40',
    created_at: '2024-01-15T09:30:00Z',
    joinDate: '15/01/2024',
    orders: 25,
    orders_count: 25
  },
  {
    id: 2,
    name: 'Trần Thị B',
    email: 'tranthib@email.com',
    phone: '0912345678',
    role: 'manager',
    is_active: true,
    status: 'active',
    address: '456 Đường DEF, Phường MNO, Quận 3, TP.HCM',
    avatar: 'https://via.placeholder.com/40',
    created_at: '2024-02-20T14:15:00Z',
    joinDate: '20/02/2024',
    orders: 12,
    orders_count: 12
  },
  {
    id: 3,
    name: 'Lê Văn C',
    email: 'levanc@email.com',
    phone: '0934567890',
    role: 'user',
    is_active: false,
    status: 'inactive',
    address: '789 Đường GHI, Phường PQR, Quận 7, TP.HCM',
    avatar: 'https://via.placeholder.com/40',
    created_at: '2024-03-10T16:45:00Z',
    joinDate: '10/03/2024',
    orders: 3,
    orders_count: 3
  }
])

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
  is_active: true
}

const form = ref({ ...emptyForm })
const selectedUser = ref(null)

// Modal states
const showUserModal = ref(false)
const showDetailsModal = ref(false)

const filteredUsers = computed(() => {
  return users.value.filter(user => {
    if (filter.value.search && !user.name.toLowerCase().includes(filter.value.search.toLowerCase()) && !user.email.toLowerCase().includes(filter.value.search.toLowerCase())) {
      return false
    }
    if (filter.value.role && user.role !== filter.value.role) return false
    if (filter.value.status === 'active' && !user.is_active) return false
    if (filter.value.status === 'inactive' && user.is_active) return false
    if (filter.value.dateFrom && new Date(user.created_at) < new Date(filter.value.dateFrom)) return false
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

function saveUser() {
  if (form.value.id) {
    // Update existing user
    const idx = users.value.findIndex(x => x.id === form.value.id)
    if (idx > -1) {
      users.value[idx] = { ...form.value }
      Swal.fire({ 
        icon: 'success', 
        title: 'Đã cập nhật người dùng', 
        timer: 1500, 
        showConfirmButton: false 
      })
    }
  } else {
    // Add new user
    const newUser = {
      ...form.value,
      id: Math.max(...users.value.map(u => u.id)) + 1,
      created_at: new Date().toISOString(),
      joinDate: new Date().toLocaleDateString('vi-VN'),
      orders: 0,
      orders_count: 0,
      status: form.value.is_active ? 'active' : 'inactive'
    }
    users.value.push(newUser)
    Swal.fire({ 
      icon: 'success', 
      title: 'Đã tạo người dùng mới', 
      timer: 1500, 
      showConfirmButton: false 
    })
  }
  closeUserModal()
}

function toggleUserStatus(user) {
  const action = user.status === 'active' ? 'khóa' : 'kích hoạt'
  Swal.fire({
    title: `Xác nhận ${action} tài khoản?`,
    text: `Bạn có chắc chắn muốn ${action} tài khoản của ${user.name}?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: `Có, ${action}!`,
    cancelButtonText: 'Hủy',
    confirmButtonColor: user.status === 'active' ? '#dc3545' : '#198754'
  }).then((result) => {
    if (result.isConfirmed) {
      const userIndex = users.value.findIndex(u => u.id === user.id)
      if (userIndex !== -1) {
        users.value[userIndex].status = user.status === 'active' ? 'inactive' : 'active'
        users.value[userIndex].is_active = !users.value[userIndex].is_active
        Swal.fire({
          icon: 'success',
          title: `Đã ${action} tài khoản thành công!`,
          timer: 2000,
          showConfirmButton: false
        })
      }
    }
  })
}

function deleteUser(userId) {
  const user = users.value.find(u => u.id === userId)
  if (user) {
    Swal.fire({
      title: 'Xóa người dùng?',
      text: `Bạn có chắc chắn muốn xóa tài khoản của ${user.name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy',
      confirmButtonColor: '#dc3545'
    }).then(result => {
      if (result.isConfirmed) {
        const idx = users.value.findIndex(u => u.id === userId)
        if (idx > -1) {
          users.value.splice(idx, 1)
          Swal.fire({ 
            icon: 'success', 
            title: 'Đã xóa người dùng', 
            timer: 1500, 
            showConfirmButton: false 
          })
        }
      }
    })
  }
}

function exportUsers() {
  Swal.fire({ 
    icon: 'success', 
    title: 'Đang xuất danh sách người dùng...', 
    timer: 1500, 
    showConfirmButton: false 
  })
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