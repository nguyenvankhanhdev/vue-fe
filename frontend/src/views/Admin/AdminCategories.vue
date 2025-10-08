<template>
  <div class="p-6">
    <!-- Page Header -->
    <div class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Quản lý danh mục</h1>
        <p class="text-gray-600">Tổ chức và phân loại sản phẩm theo danh mục</p>
      </div>
      <button @click="openAddModal" class="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2">
        <i class="fas fa-plus"></i>
        Thêm danh mục
      </button>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div class="flex items-center">
          <div class="bg-blue-100 p-3 rounded-full">
            <i class="fas fa-tags text-blue-600"></i>
          </div>
          <div class="ml-4">
            <p class="text-sm text-gray-500">Tổng danh mục</p>
            <p class="text-2xl font-bold text-gray-900">{{ categories.length }}</p>
          </div>
        </div>
      </div>
      
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div class="flex items-center">
          <div class="bg-green-100 p-3 rounded-full">
            <i class="fas fa-eye text-green-600"></i>
          </div>
          <div class="ml-4">
            <p class="text-sm text-gray-500">Đang hiển thị</p>
            <p class="text-2xl font-bold text-gray-900">{{ categories.filter(c => c.active).length }}</p>
          </div>
        </div>
      </div>
      
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div class="flex items-center">
          <div class="bg-orange-100 p-3 rounded-full">
            <i class="fas fa-box text-orange-600"></i>
          </div>
          <div class="ml-4">
            <p class="text-sm text-gray-500">Tổng sản phẩm</p>
            <p class="text-2xl font-bold text-gray-900">{{ categories.reduce((sum, c) => sum + c.product_count, 0) }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Categories Table -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div class="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <div class="flex justify-between items-center">
          <h3 class="text-lg font-semibold text-gray-900">Danh sách danh mục</h3>
          <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
            {{ categories.length }} danh mục
          </span>
        </div>
      </div>
      
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên danh mục</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Slug</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Số sản phẩm</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="category in categories" :key="category.id" class="hover:bg-gray-50 transition-colors duration-200">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-semibold text-gray-900">{{ category.name }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-500">{{ category.slug }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ category.product_count }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="[
                  'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                  category.active 
                    ? 'bg-green-100 text-green-800 border border-green-200' 
                    : 'bg-red-100 text-red-800 border border-red-200'
                ]">
                  {{ category.active ? 'Hiển thị' : 'Ẩn' }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right">
                <div class="flex justify-end gap-2">
                  <button @click="openEdit(category)" 
                    class="bg-blue-100 hover:bg-blue-200 text-blue-700 p-2 rounded-lg transition-colors duration-200">
                    <i class="fas fa-pen text-sm"></i>
                  </button>
                  <button @click="remove(category)" 
                    class="bg-red-100 hover:bg-red-200 text-red-700 p-2 rounded-lg transition-colors duration-200">
                    <i class="fas fa-trash text-sm"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Enhanced Modal -->
    <Transition name="modal" appear>
      <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center p-4" @click="closeModal">
        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-lg transform transition-all duration-300" @click.stop>
          <div class="bg-gradient-to-r from-purple-50 to-blue-50 p-6 border-b border-gray-200 rounded-t-2xl">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-2xl font-bold text-gray-900 flex items-center">
                  <i class="fas fa-tags text-purple-500 mr-3"></i>
                  {{ form.id ? 'Chỉnh sửa danh mục' : 'Thêm danh mục mới' }}
                </h3>
                <p class="text-gray-600 text-sm mt-2">
                  {{ form.id ? 'Cập nhật thông tin danh mục sản phẩm' : 'Tạo danh mục sản phẩm mới cho cửa hàng' }}
                </p>
              </div>
              <button type="button" @click="closeModal" 
                class="text-gray-400 hover:text-gray-600 p-2 rounded-lg hover:bg-white transition-all duration-200">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
          </div>
          
          <form @submit.prevent="save" class="p-6 space-y-6">
            <!-- Category Information -->
            <div class="bg-gray-50 rounded-xl p-4">
              <h4 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <i class="fas fa-info-circle text-blue-500 mr-2"></i>
                Thông tin danh mục
              </h4>
              <div>
                <label for="categoryName" class="block text-sm font-bold text-gray-700 mb-2">Tên danh mục *</label>
                <input 
                  v-model="form.name" 
                  @input="updateSlug"
                  type="text" 
                  id="categoryName"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-lg font-medium"
                  placeholder="VD: Điện thoại thông minh"
                  required 
                />
              </div>
            </div>

            <!-- Category Status -->
            <div class="bg-green-50 rounded-xl p-4">
              <h4 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <i class="fas fa-toggle-on text-green-500 mr-2"></i>
                Trạng thái hiển thị
              </h4>
              <div class="flex items-center justify-between p-4 bg-white rounded-lg border border-green-200">
                <div class="flex items-center">
                  <input 
                    v-model="form.active" 
                    type="checkbox" 
                    id="categoryActive"
                    class="w-5 h-5 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500"
                  />
                  <label for="categoryActive" class="ml-3 text-sm font-semibold text-gray-700">
                    Hiển thị danh mục trên website
                  </label>
                </div>
                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium" 
                  :class="form.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'">
                  <span class="w-2 h-2 rounded-full mr-2" 
                    :class="form.active ? 'bg-green-400' : 'bg-gray-400'"></span>
                  {{ form.active ? 'Đang hiển thị' : 'Đã ẩn' }}
                </span>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex gap-3 pt-4 border-t border-gray-200">
              <button 
                type="button" 
                @click="closeModal"
                class="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200 font-medium"
              >
                <i class="fas fa-times mr-2"></i>Hủy bỏ
              </button>
              <button 
                type="submit"
                class="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl font-medium"
              >
                <i class="fas fa-save mr-2"></i>{{ form.id ? 'Cập nhật' : 'Tạo mới' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Swal from 'sweetalert2'

const categories = ref([
  { id: 1, name: 'Điện thoại', slug: 'dien-thoai', product_count: 120, active: true },
  { id: 2, name: 'Laptop', slug: 'laptop', product_count: 64, active: true },
  { id: 3, name: 'Phụ kiện', slug: 'phu-kien', product_count: 50, active: false },
])

const empty = { id: null, name: '', slug: '', active: true }
const form = ref({ ...empty })
const showModal = ref(false)

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

function updateSlug() {
  form.value.slug = slugify(form.value.name)
}

function openAddModal() {
  form.value = { ...empty }
  showModal.value = true
}

function openEdit(category) {
  form.value = { ...category }
  showModal.value = true
}

function closeModal() {
  showModal.value = false
  form.value = { ...empty }
}

function save() {
  try {
    if (!form.value.name.trim()) {
      Swal.fire({ icon: 'warning', title: 'Vui lòng nhập tên danh mục', timer: 1500 })
      return
    }

    const slug = slugify(form.value.name)
    
    if (form.value.id) {
      // Update existing category
      const idx = categories.value.findIndex(x => x.id === form.value.id)
      if (idx > -1) {
        categories.value[idx] = { 
          ...form.value, 
          slug,
          name: form.value.name.trim()
        }
        Swal.fire({ 
          icon: 'success', 
          title: 'Đã cập nhật danh mục', 
          timer: 1000, 
          showConfirmButton: false 
        })
      }
    } else {
      // Add new category
      const newId = Math.max(0, ...categories.value.map(x => x.id)) + 1
      categories.value.unshift({ 
        ...form.value, 
        id: newId,
        slug,
        name: form.value.name.trim(),
        product_count: 0 
      })
      Swal.fire({ 
        icon: 'success', 
        title: 'Đã thêm danh mục', 
        timer: 1000, 
        showConfirmButton: false 
      })
    }
    
    closeModal()
  } catch (error) {
    console.error('Error saving category:', error)
    Swal.fire({ icon: 'error', title: 'Có lỗi xảy ra', timer: 1500 })
  }
}

function remove(category) {
  Swal.fire({
    title: 'Xác nhận xóa?',
    text: `Bạn có chắc muốn xóa danh mục "${category.name}"?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Xóa',
    cancelButtonText: 'Hủy',
    confirmButtonColor: '#dc2626'
  }).then(result => {
    if (result.isConfirmed) {
      try {
        const idx = categories.value.findIndex(x => x.id === category.id)
        if (idx > -1) {
          categories.value.splice(idx, 1)
          Swal.fire({ 
            icon: 'success', 
            title: 'Đã xóa danh mục', 
            timer: 1000, 
            showConfirmButton: false 
          })
        }
      } catch (error) {
        console.error('Error removing category:', error)
        Swal.fire({ icon: 'error', title: 'Có lỗi xảy ra', timer: 1500 })
      }
    }
  })
}

onMounted(() => {
  // Component mounted
})
</script>

<style scoped>
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
</style>