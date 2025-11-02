<!-- src/components/Product/VariantManagerModal.vue -->
<template>
  <Transition enter-active-class="transition-all duration-300 ease-out" enter-from-class="opacity-0"
    enter-to-class="opacity-100" leave-active-class="transition-all duration-200 ease-in" leave-from-class="opacity-100"
    leave-to-class="opacity-0">
    <div v-if="showVariantModal" class="fixed inset-0 z-50 flex items-center justify-center p-4" @click="emit('close')">
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

      <!-- Modal Content -->
      <Transition enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 scale-95 translate-y-4" enter-to-class="opacity-100 scale-100 translate-y-0"
        leave-active-class="transition-all duration-200 ease-in" leave-from-class="opacity-100 scale-100 translate-y-0"
        leave-to-class="opacity-0 scale-95 translate-y-4">
        <div
          class="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
          @click.stop>

          <!-- Header -->
          <div class="relative" style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);">
            <div class="px-6 py-4">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <i class="fas fa-palette text-white text-lg"></i>
                  </div>
                  <div>
                    <h3 class="text-lg font-bold text-white">Quản lý biến thể</h3>
                    <p class="text-white/80 text-sm">{{ selectedProduct?.name || 'Sản phẩm' }}</p>
                  </div>
                </div>
                <button @click="emit('close')"
                  class="text-white/70 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-all">
                  <i class="fas fa-times text-lg"></i>
                </button>
              </div>
            </div>
          </div>

          <!-- Content -->
          <div class="flex-1 p-6 overflow-y-auto">
            <div v-if="selectedProduct" class="space-y-6">

              <!-- Product Info Header -->
              <div class="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-4 border border-yellow-200">
                <div class="flex items-center gap-4">
                  <div
                    class="w-16 h-16 rounded-lg border-2 border-yellow-300 bg-gray-100 flex items-center justify-center overflow-hidden">
                    <img
                      v-if="getImageSrc(selectedProduct.image_path || selectedProduct.image || selectedProduct.image_url)"
                      :src="getImageSrc(selectedProduct.image_path || selectedProduct.image || selectedProduct.image_url)"
                      :alt="selectedProduct.name" class="w-full h-full object-cover"
                      @error="$event.target.style.display = 'none'" />
                    <i v-else class="fas fa-image text-gray-400"></i>
                  </div>
                  <div class="flex-1">
                    <h4 class="text-lg font-semibold text-gray-900">{{ selectedProduct.name }}</h4>
                    <p class="text-sm text-gray-600">Mã: {{ selectedProduct.sku || 'N/A' }}</p>
                    <div class="flex items-center gap-4 mt-1">
                      <span class="text-sm font-medium text-orange-600">
                        Giá: {{ formatPrice(selectedProduct.price_range?.min || selectedProduct.price) }}
                        <span
                          v-if="selectedProduct.price_range?.max && selectedProduct.price_range.max !== selectedProduct.price_range.min">
                          - {{ formatPrice(selectedProduct.price_range.max) }}
                        </span>
                      </span>
                      <span class="text-sm text-gray-500">
                        Tổng biến thể: {{ selectedProduct.variants?.length || 0 }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Color Management -->
              <div class="border rounded-lg p-4">
                <div class="flex items-center justify-between mb-4">
                  <h5 class="font-semibold text-gray-900">
                    <i class="fas fa-palette mr-2 text-blue-500"></i>Quản lý màu sắc
                  </h5>
                  <button @click="addColor"
                    class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-colors">
                    <i class="fas fa-plus mr-1"></i>Thêm màu
                  </button>
                </div>

                <!-- Add Color Form -->
                <div class="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div class="grid grid-cols-3 gap-3 items-end">
                    <div>
                      <label class="block text-xs font-medium text-gray-700 mb-1">Tên màu</label>
                      <input v-model="newColor.name" type="text" placeholder="VD: Xanh dương"
                        class="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500">
                    </div>
                    <div>
                      <label class="block text-xs font-medium text-gray-700 mb-1">Mã màu</label>
                      <input v-model="newColor.color_code" type="color"
                        class="w-full h-8 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500">
                    </div>
                    <button @click="addColor"
                      class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-colors">
                      <i class="fas fa-plus mr-1"></i>Thêm
                    </button>
                  </div>
                </div>

                <div v-if="productColors.length" class="grid grid-cols-2 gap-3">
                  <div v-for="color in productColors" :key="color.id"
                    class="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50">
                    <div class="w-8 h-8 rounded-full border-2 border-gray-300"
                      :style="{ backgroundColor: color.color_code }"></div>
                    <div class="flex-1">
                      <div class="font-medium">{{ color.name }}</div>
                      <div class="text-xs text-gray-500">{{ color.color_code }}</div>
                    </div>
                    <div class="flex gap-1">
                      <button @click="editColor(color)" class="text-blue-500 hover:text-blue-700 p-1" title="Sửa">
                        <i class="fas fa-edit text-xs"></i>
                      </button>
                      <button @click="deleteColor(color.id)" class="text-red-500 hover:text-red-700 p-1" title="Xóa">
                        <i class="fas fa-trash text-xs"></i>
                      </button>
                    </div>
                  </div>
                </div>
                <div v-else class="text-center py-6 text-gray-500">
                  <i class="fas fa-palette text-2xl mb-2"></i>
                  <p>Chưa có màu sắc nào</p>
                </div>
              </div>

              <!-- Capacity Management -->
              <div class="border rounded-lg p-4">
                <div class="flex items-center justify-between mb-4">
                  <h5 class="font-semibold text-gray-900">
                    <i class="fas fa-cog mr-2 text-green-500"></i>Quản lý dung lượng
                  </h5>
                  <button @click="addCapacity"
                    class="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm transition-colors">
                    <i class="fas fa-plus mr-1"></i>Thêm dung lượng
                  </button>
                </div>

                <!-- Add Capacity Form -->
                <div class="mb-4 p-3 bg-green-50 rounded-lg border border-green-200">
                  <div class="grid grid-cols-2 gap-3 mb-3">
                    <div>
                      <label class="block text-xs font-medium text-gray-700 mb-1">Tên dung lượng</label>
                      <input v-model="newCapacity.name" type="text" placeholder="VD: 256GB"
                        class="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-green-500">
                    </div>
                    <div>
                      <label class="block text-xs font-medium text-gray-700 mb-1">Tên hiển thị</label>
                      <input v-model="newCapacity.display_name" type="text" placeholder="VD: 256GB - Pro"
                        class="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-green-500">
                    </div>
                  </div>
                  <div class="grid grid-cols-3 gap-3 items-end">
                    <div>
                      <label class="block text-xs font-medium text-gray-700 mb-1">Giá (VND)</label>
                      <input v-model="newCapacity.price" type="number" placeholder="0"
                        class="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-green-500">
                    </div>
                    <div>
                      <label class="block text-xs font-medium text-gray-700 mb-1">Tồn kho</label>
                      <input v-model="newCapacity.stock" type="number" placeholder="0"
                        class="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-green-500">
                    </div>
                    <button @click="addCapacity"
                      class="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm transition-colors">
                      <i class="fas fa-plus mr-1"></i>Thêm
                    </button>
                  </div>
                </div>

                <div v-if="productCapacities.length" class="grid grid-cols-1 gap-3">
                  <div v-for="capacity in productCapacities" :key="capacity.id"
                    class="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                    <div class="flex items-center gap-3">
                      <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <i class="fas fa-hdd text-green-600"></i>
                      </div>
                      <div>
                        <div class="font-medium">{{ capacity.display_name || capacity.name }}</div>
                        <div class="text-sm text-gray-500">Giá: {{ formatPrice(capacity.price) }}</div>
                      </div>
                    </div>
                    <div class="flex items-center gap-3">
                      <div class="text-sm">
                        <span class="text-gray-500">Tồn kho:</span>
                        <span class="font-medium ml-1" :class="capacity.stock > 0 ? 'text-green-600' : 'text-red-600'">
                          {{ capacity.stock }}
                        </span>
                      </div>
                      <div class="flex gap-1">
                        <button @click="editCapacity(capacity)" class="text-blue-500 hover:text-blue-700 p-1"
                          title="Sửa">
                          <i class="fas fa-edit text-xs"></i>
                        </button>
                        <button @click="deleteCapacity(capacity.id)" class="text-red-500 hover:text-red-700 p-1"
                          title="Xóa">
                          <i class="fas fa-trash text-xs"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-else class="text-center py-6 text-gray-500">
                  <i class="fas fa-cog text-2xl mb-2"></i>
                  <p>Chưa có dung lượng nào</p>
                </div>
              </div>

              <!-- Variants Management -->
              <div class="border rounded-lg p-4">
                <div class="flex items-center justify-between mb-4">
                  <h5 class="font-semibold text-gray-900">
                    <i class="fas fa-layer-group mr-2 text-purple-500"></i>Chi tiết biến thể
                  </h5>
                  <button @click="generateVariants"
                    class="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded text-sm transition-colors">
                    <i class="fas fa-plus mr-1"></i>Tạo biến thể
                  </button>
                </div>

                <div v-if="productVariants.length" class="space-y-3">
                  <div v-for="variant in productVariants" :key="variant.id"
                    class="border rounded-lg p-4 hover:bg-gray-50">
                    <div class="flex items-start justify-between">
                      <div class="flex-1">
                        <div class="flex items-center gap-3 mb-2">
                          <span class="font-medium">{{ variant.sku }}</span>
                          <span class="px-2 py-1 rounded text-xs"
                            :class="isVariantActive(variant) ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'">
                            {{ isVariantActive(variant) ? 'Hoạt động' : 'Không hoạt động' }}
                          </span>
                        </div>

                        <div class="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span class="text-gray-500">Màu sắc:</span>
                            <span class="ml-1 font-medium">
                              {{ variant.color?.name || variant.color_name || getColorName(variant.color_id) }}
                            </span>
                          </div>
                          <div>
                            <span class="text-gray-500">Dung lượng:</span>
                            <span class="ml-1 font-medium">
                              {{ variant.capacity?.display_name || variant.capacity?.name || variant.capacity_name || getCapacityName(variant.capacity_id) }}
                            </span>
                          </div>
                          <div>
                            <span class="text-gray-500">Giá:</span>
                            <span class="ml-1 font-medium text-orange-600">
                              {{ formatPrice(variant.price_info?.final_price || variant.capacity?.final_price || variant.price || 0) }}
                            </span>
                            <span v-if="variant.price_info?.has_discount || variant.capacity?.discount_price" 
                              class="ml-1 text-xs text-red-500 line-through">
                              {{ formatPrice(variant.price_info?.price || variant.capacity?.price) }}
                            </span>
                          </div>
                          <div>
                            <span class="text-gray-500">Tồn kho:</span>
                            <span class="ml-1 font-medium"
                              :class="(variant.stock || variant.stock_quantity || 0) > 0 ? 'text-green-600' : 'text-red-600'">
                              {{ variant.stock || variant.stock_quantity || 0 }}
                            </span>
                            <span v-if="variant.stock_status" class="ml-1 text-xs text-gray-500">
                              ({{ variant.stock_status.stock_message }})
                            </span>
                          </div>
                        </div>
                      </div>

                      <div class="flex gap-1 ml-4">
                        <button @click="editVariant(variant)" class="text-blue-500 hover:text-blue-700 p-2"
                          title="Sửa biến thể">
                          <i class="fas fa-edit"></i>
                        </button>
                        <button @click="deleteVariant(variant.id)" class="text-red-500 hover:text-red-700 p-2"
                          title="Xóa biến thể">
                          <i class="fas fa-trash"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-else class="text-center py-8 text-gray-500">
                  <i class="fas fa-layer-group text-3xl mb-3"></i>
                  <p class="text-lg mb-2">Chưa có biến thể nào</p>
                  <p class="text-sm">Thêm màu sắc và dung lượng trước, sau đó nhấn "Tạo biến thể"</p>
                </div>
              </div>

              <!-- Bulk Actions -->
              <div class="bg-gray-50 rounded-lg p-4">
                <h5 class="font-medium text-gray-900 mb-3">Thao tác hàng loạt</h5>
                <div class="flex flex-wrap gap-2">
                  <button @click="saveVariantChanges"
                    class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded text-sm transition-colors">
                    <i class="fas fa-save mr-1"></i>Lưu thay đổi
                  </button>
                  <button
                    class="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded text-sm transition-colors">
                    <i class="fas fa-check-circle mr-1"></i>Kích hoạt tất cả
                  </button>
                  <button
                    class="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded text-sm transition-colors">
                    <i class="fas fa-pause-circle mr-1"></i>Tạm dừng tất cả
                  </button>
                  <button
                    class="bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 rounded text-sm transition-colors">
                    <i class="fas fa-tag mr-1"></i>Cập nhật giá
                  </button>
                </div>
              </div>
            </div>

            <!-- Empty State -->
            <div v-else class="text-center py-12">
              <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i class="fas fa-layer-group text-2xl text-gray-400"></i>
              </div>
              <h3 class="text-lg font-medium text-gray-900 mb-2">Chưa chọn sản phẩm</h3>
              <p class="text-gray-500">Vui lòng chọn một sản phẩm để quản lý biến thể.</p>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import Swal from 'sweetalert2'

// Props
const props = defineProps({
  selectedProduct: {
    type: Object,
    default: null
  },
  showVariantModal: {
    type: Boolean,
    default: false
  }
})

// Emits
const emit = defineEmits(['close'])

// State
const loading = ref(false)
const productColors = ref([])
const productCapacities = ref([])
const productVariants = ref([])

// Forms
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

// Watch for modal open/close to handle body scroll
watch(() => props.showVariantModal, (isOpen) => {
  if (isOpen) {
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden'
  } else {
    // Restore body scroll when modal is closed
    document.body.style.overflow = ''
  }
})

// Watch for product changes
watch(() => props.selectedProduct, (newProduct) => {
  if (newProduct) {
    loadProductData()
  }
}, { immediate: true })

// Cleanup on unmount
onUnmounted(() => {
  document.body.style.overflow = ''
})

// Methods
const loadProductData = async () => {
  if (!props.selectedProduct?.id) return

  // Load mock data từ selectedProduct hoặc API
  productColors.value = props.selectedProduct.colors || []
  productCapacities.value = props.selectedProduct.capacities || []
  productVariants.value = props.selectedProduct.variants || []
}

// Color Management
const addColor = async () => {
  if (!newColor.value.name.trim()) {
    Swal.fire({
      icon: 'warning',
      title: 'Vui lòng nhập tên màu',
      timer: 1500
    })
    return
  }

  try {
    const color = {
      id: Date.now(), // Mock ID
      name: newColor.value.name,
      color_code: newColor.value.color_code,
      status: 1, // 1 = active, 0 = inactive (integer)
      product_id: props.selectedProduct.id
    }

    productColors.value.push(color)

    // Reset form
    newColor.value = { name: '', color_code: '#000000' }

    Swal.fire({
      icon: 'success',
      title: 'Đã thêm màu!',
      timer: 1500,
      showConfirmButton: false
    })
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

const editColor = async (color) => {
  const { value: formValues } = await Swal.fire({
    title: 'Chỉnh sửa màu',
    html: `
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Tên màu</label>
          <input id="color-name" class="swal2-input" placeholder="Tên màu" value="${color.name}">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Mã màu</label>
          <input id="color-code" type="color" class="w-full h-10 border border-gray-300 rounded" value="${color.color_code}">
        </div>
      </div>
    `,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: 'Cập nhật',
    cancelButtonText: 'Hủy',
    preConfirm: () => {
      const name = document.getElementById('color-name').value
      const colorCode = document.getElementById('color-code').value

      if (!name.trim()) {
        Swal.showValidationMessage('Vui lòng nhập tên màu')
        return false
      }

      return {
        name: name,
        color_code: colorCode
      }
    }
  })

  if (formValues) {
    try {
      const index = productColors.value.findIndex(c => c.id === color.id)
      if (index !== -1) {
        Object.assign(productColors.value[index], formValues)
      }

      Swal.fire({
        icon: 'success',
        title: 'Đã cập nhật màu!',
        timer: 1500,
        showConfirmButton: false
      })
    } catch (error) {
      console.error('Error updating color:', error)
      Swal.fire({
        icon: 'error',
        title: 'Lỗi cập nhật màu',
        text: 'Không thể cập nhật màu.',
        confirmButtonColor: '#3B82F6'
      })
    }
  }
}

const deleteColor = async (colorId) => {
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
      productColors.value = productColors.value.filter(c => c.id !== colorId)

      Swal.fire({
        icon: 'success',
        title: 'Đã xóa màu!',
        timer: 1500,
        showConfirmButton: false
      })
    } catch (error) {
      console.error('Error deleting color:', error)
      Swal.fire({
        icon: 'error',
        title: 'Lỗi xóa màu',
        text: 'Không thể xóa màu.',
        confirmButtonColor: '#3B82F6'
      })
    }
  }
}

// Capacity Management
const addCapacity = async () => {
  if (!newCapacity.value.name.trim() || !newCapacity.value.price) {
    Swal.fire({
      icon: 'warning',
      title: 'Vui lòng nhập đầy đủ thông tin',
      timer: 1500
    })
    return
  }

  try {
    const capacity = {
      id: Date.now(), // Mock ID
      name: newCapacity.value.name,
      display_name: newCapacity.value.display_name || newCapacity.value.name,
      price: parseFloat(newCapacity.value.price),
      discount_price: newCapacity.value.discount_price ? parseFloat(newCapacity.value.discount_price) : null,
      final_price: newCapacity.value.discount_price ? parseFloat(newCapacity.value.discount_price) : parseFloat(newCapacity.value.price),
      stock: parseInt(newCapacity.value.stock) || 0,
      status: 1, // 1 = active, 0 = inactive (integer)
      product_id: props.selectedProduct.id
    }

    productCapacities.value.push(capacity)

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
  } catch (error) {
    console.error('Error adding capacity:', error)
    Swal.fire({
      icon: 'error',
      title: 'Lỗi thêm dung lượng',
      text: 'Không thể thêm dung lượng.',
      confirmButtonColor: '#3B82F6'
    })
  }
}

const editCapacity = async (capacity) => {
  const { value: formValues } = await Swal.fire({
    title: 'Chỉnh sửa dung lượng',
    html: `
      <div class="space-y-3">
        <input id="cap-name" class="swal2-input" placeholder="Tên" value="${capacity.name}">
        <input id="cap-display" class="swal2-input" placeholder="Tên hiển thị" value="${capacity.display_name || ''}">
        <input id="cap-price" type="number" class="swal2-input" placeholder="Giá" value="${capacity.price}">
        <input id="cap-stock" type="number" class="swal2-input" placeholder="Tồn kho" value="${capacity.stock || 0}">
        <input id="cap-discount" type="number" class="swal2-input" placeholder="Giá khuyến mãi" value="${capacity.discount_price || ''}">
      </div>
    `,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: 'Cập nhật',
    cancelButtonText: 'Hủy',
    preConfirm: () => {
      const name = document.getElementById('cap-name').value
      const price = document.getElementById('cap-price').value

      if (!name.trim() || !price) {
        Swal.showValidationMessage('Vui lòng nhập tên và giá')
        return false
      }

      return {
        name: name,
        display_name: document.getElementById('cap-display').value,
        price: parseFloat(price),
        stock: parseInt(document.getElementById('cap-stock').value) || 0,
        discount_price: document.getElementById('cap-discount').value ?
          parseFloat(document.getElementById('cap-discount').value) : null
      }
    }
  })

  if (formValues) {
    try {
      const index = productCapacities.value.findIndex(c => c.id === capacity.id)
      if (index !== -1) {
        Object.assign(productCapacities.value[index], formValues)
      }

      Swal.fire({
        icon: 'success',
        title: 'Đã cập nhật dung lượng!',
        timer: 1500,
        showConfirmButton: false
      })
    } catch (error) {
      console.error('Error updating capacity:', error)
      Swal.fire({
        icon: 'error',
        title: 'Lỗi cập nhật dung lượng',
        text: 'Không thể cập nhật dung lượng.',
        confirmButtonColor: '#3B82F6'
      })
    }
  }
}

const deleteCapacity = async (capacityId) => {
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
      productCapacities.value = productCapacities.value.filter(c => c.id !== capacityId)

      Swal.fire({
        icon: 'success',
        title: 'Đã xóa dung lượng!',
        timer: 1500,
        showConfirmButton: false
      })
    } catch (error) {
      console.error('Error deleting capacity:', error)
      Swal.fire({
        icon: 'error',
        title: 'Lỗi xóa dung lượng',
        text: 'Không thể xóa dung lượng.',
        confirmButtonColor: '#3B82F6'
      })
    }
  }
}

// Variant Management
const generateVariants = async () => {
  if (productColors.value.length === 0 || productCapacities.value.length === 0) {
    Swal.fire({
      icon: 'warning',
      title: 'Chưa đủ dữ liệu',
      text: 'Vui lòng thêm ít nhất 1 màu sắc và 1 dung lượng trước.',
      confirmButtonColor: '#3B82F6'
    })
    return
  }

  const result = await Swal.fire({
    title: 'Tạo tất cả variants?',
    text: `Sẽ tạo ${productColors.value.length} × ${productCapacities.value.length} = ${productColors.value.length * productCapacities.value.length} variants`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#8B5CF6',
    cancelButtonColor: '#6B7280',
    confirmButtonText: 'Có, tạo!',
    cancelButtonText: 'Hủy'
  })

  if (result.isConfirmed) {
    try {
      const newVariants = []

      productColors.value.forEach(color => {
        productCapacities.value.forEach(capacity => {
          const exists = productVariants.value.find(v =>
            v.color_id === color.id && v.capacity_id === capacity.id
          )
          console.log(exists);
          

          if (!exists) {
            const variant = {
              id: Date.now() + Math.random(), // Mock ID (sẽ được backend tạo ID thật)
              color_id: color.id,
              capacity_id: capacity.id,
              sku: `${props.selectedProduct.sku || 'PRD'}-${color.name.substring(0, 3).toUpperCase()}-${capacity.name}`.replace(/\s/g, ''),
              stock: capacity.stock || 0, // Backend dùng 'stock' không phải 'stock_quantity'
              status: 1, // 1 = active, 0 = inactive (integer)
              product_id: props.selectedProduct.id,
              
              // Mock nested objects giống backend response
              color: {
                id: color.id,
                name: color.name,
                color_code: color.color_code
              },
              capacity: {
                id: capacity.id,
                name: capacity.name,
                display_name: capacity.display_name || capacity.name,
                price: capacity.price,
                discount_price: capacity.discount_price,
                final_price: capacity.discount_price || capacity.price,
                stock: capacity.stock || 0,
                status: capacity.status ?? 1
              },
              price_info: {
                price: capacity.price,
                discount_price: capacity.discount_price,
                final_price: capacity.discount_price || capacity.price,
                has_discount: !!capacity.discount_price,
                price_formatted: new Intl.NumberFormat('vi-VN').format(capacity.price) + ' VNĐ',
                final_price_formatted: new Intl.NumberFormat('vi-VN').format(capacity.discount_price || capacity.price) + ' VNĐ'
              },
              stock_status: {
                in_stock: (capacity.stock || 0) > 0,
                stock_level: (capacity.stock || 0) > 20 ? 'high' : ((capacity.stock || 0) > 5 ? 'medium' : ((capacity.stock || 0) > 0 ? 'low' : 'out')),
                stock_message: (capacity.stock || 0) > 20 ? 'Còn hàng' : ((capacity.stock || 0) > 5 ? 'Sắp hết hàng' : ((capacity.stock || 0) > 0 ? 'Còn ít' : 'Hết hàng'))
              }
            }
            newVariants.push(variant)
          }
        })
      })

      productVariants.value.push(...newVariants)

      Swal.fire({
        icon: 'success',
        title: 'Đã tạo variants!',
        text: `Tạo thành công ${newVariants.length} variant mới.`,
        timer: 2000,
        showConfirmButton: false
      })
    } catch (error) {
      console.error('Error generating variants:', error)
      Swal.fire({
        icon: 'error',
        title: 'Lỗi tạo variants',
        text: 'Không thể tạo variants.',
        confirmButtonColor: '#3B82F6'
      })
    }
  }
}

const editVariant = async (variant) => {
  const currentStock = variant.stock || variant.stock_quantity || 0
  const currentPrice = variant.price_info?.price || variant.capacity?.price || variant.price || 0
  const currentDiscount = variant.price_info?.discount_price || variant.capacity?.discount_price || variant.discount_price
  
  const { value: formValues } = await Swal.fire({
    title: 'Chỉnh sửa variant',
    html: `
      <div class="space-y-3">
        <input id="var-sku" class="swal2-input" placeholder="SKU" value="${variant.sku}">
        <input id="var-price" type="number" class="swal2-input" placeholder="Giá" value="${currentPrice}">
        <input id="var-stock" type="number" class="swal2-input" placeholder="Tồn kho" value="${currentStock}">
        <input id="var-discount" type="number" class="swal2-input" placeholder="Giá khuyến mãi" value="${currentDiscount || ''}">
        <select id="var-status" class="swal2-input">
          <option value="1" ${variant.status === 1 ? 'selected' : ''}>Hoạt động</option>
          <option value="0" ${variant.status === 0 ? 'selected' : ''}>Không hoạt động</option>
        </select>
      </div>
    `,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: 'Cập nhật',
    cancelButtonText: 'Hủy',
    preConfirm: () => {
      const price = parseFloat(document.getElementById('var-price').value) || 0
      const discountPrice = document.getElementById('var-discount').value ?
        parseFloat(document.getElementById('var-discount').value) : null
      const stock = parseInt(document.getElementById('var-stock').value) || 0
      const status = parseInt(document.getElementById('var-status').value)
      
      return {
        sku: document.getElementById('var-sku').value,
        stock: stock,
        status: status,
        // Cập nhật capacity info
        capacity: {
          ...variant.capacity,
          price: price,
          discount_price: discountPrice,
          final_price: discountPrice || price,
          stock: stock,
          status: status
        },
        price_info: {
          price: price,
          discount_price: discountPrice,
          final_price: discountPrice || price,
          has_discount: !!discountPrice,
          price_formatted: new Intl.NumberFormat('vi-VN').format(price) + ' VNĐ',
          final_price_formatted: new Intl.NumberFormat('vi-VN').format(discountPrice || price) + ' VNĐ'
        },
        stock_status: {
          in_stock: stock > 0,
          stock_level: stock > 20 ? 'high' : (stock > 5 ? 'medium' : (stock > 0 ? 'low' : 'out')),
          stock_message: stock > 20 ? 'Còn hàng' : (stock > 5 ? 'Sắp hết hàng' : (stock > 0 ? 'Còn ít' : 'Hết hàng'))
        }
      }
    }
  })

  if (formValues) {
    try {
      const index = productVariants.value.findIndex(v => v.id === variant.id)
      if (index !== -1) {
        Object.assign(productVariants.value[index], formValues)
      }

      Swal.fire({
        icon: 'success',
        title: 'Đã cập nhật variant!',
        timer: 1500,
        showConfirmButton: false
      })
    } catch (error) {
      console.error('Error updating variant:', error)
      Swal.fire({
        icon: 'error',
        title: 'Lỗi cập nhật variant',
        text: 'Không thể cập nhật variant.',
        confirmButtonColor: '#3B82F6'
      })
    }
  }
}

const deleteVariant = async (variantId) => {
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
      productVariants.value = productVariants.value.filter(v => v.id !== variantId)

      Swal.fire({
        icon: 'success',
        title: 'Đã xóa variant!',
        timer: 1500,
        showConfirmButton: false
      })
    } catch (error) {
      console.error('Error deleting variant:', error)
      Swal.fire({
        icon: 'error',
        title: 'Lỗi xóa variant',
        text: 'Không thể xóa variant.',
        confirmButtonColor: '#3B82F6'
      })
    }
  }
}

// Helper methods
const isVariantActive = (variant) => {
  // Backend trả về status = 0 (inactive) hoặc 1 (active)
  // Chấp nhận cả: 1, true, 'active' (để tương thích mock data)
  const statusValue = variant.status ?? variant.is_active
  
  if (statusValue === undefined || statusValue === null) {
    return true // Mặc định là active nếu không có field
  }
  
  // Status = 1 (active) hoặc = 0 (inactive)
  return statusValue === 1 || statusValue === true || statusValue === 'active'
}

const getColorCode = (colorId) => {
  const color = productColors.value.find(c => c.id == colorId)
  return color?.color_code || '#cccccc'
}

const getColorName = (colorId) => {
  const color = productColors.value.find(c => c.id == colorId)
  return color?.name || 'Unknown'
}

const getCapacityName = (capacityId) => {
  const capacity = productCapacities.value.find(c => c.id == capacityId)
  return capacity?.display_name || capacity?.name || 'Unknown'
}

const saveVariantChanges = async () => {
  Swal.fire({
    icon: 'success',
    title: 'Đã lưu thay đổi!',
    text: 'Tất cả thay đổi đã được lưu thành công.',
    timer: 2000,
    showConfirmButton: false
  })
}

// Methods
const getImageSrc = (imagePath) => {
  if (!imagePath) return null
  if (imagePath.startsWith('http')) return imagePath
  return `http://127.0.0.1:8000/storage/${imagePath}`
}

const formatPrice = (price) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(price)
}
</script>

<!-- No custom CSS needed - using Tailwind transitions -->