<!-- src/components/Product/ProductDetailModal.vue -->
<template>
  <Transition
    enter-active-class="transition-all duration-300 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-all duration-200 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0">
    <div v-if="showDetailModal" class="fixed inset-0 z-50 flex items-center justify-center p-4" @click="closeDetailModal">
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      
      <!-- Modal Content -->
      <Transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 scale-95 translate-y-4"
        enter-to-class="opacity-100 scale-100 translate-y-0"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="opacity-100 scale-100 translate-y-0"
        leave-to-class="opacity-0 scale-95 translate-y-4">
        <div class="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col"
          @click.stop>
        
        <!-- Header -->
        <div class="relative" style="background: linear-gradient(135deg, #059669 0%, #047857 100%);">
          <div class="px-6 py-4">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <i class="fas fa-eye text-white text-lg"></i>
                </div>
                <div>
                  <h3 class="text-lg font-bold text-white">Chi tiết sản phẩm</h3>
                  <p class="text-white/80 text-sm">{{ selectedProduct?.name || 'Sản phẩm' }}</p>
                </div>
              </div>
              <button @click="closeDetailModal"
                class="text-white/70 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-all">
                <i class="fas fa-times text-lg"></i>
              </button>
            </div>
          </div>
        </div>

        <!-- Content -->
        <div class="flex-1 p-6 overflow-y-auto">
          <div v-if="selectedProduct" class="space-y-6">
            
            <!-- Product Images Gallery -->
            <div class="space-y-4">
              <!-- Main Image -->
              <div class="flex justify-center">
                <div class="w-48 h-48 rounded-xl overflow-hidden border-2 border-gray-200 shadow-lg bg-gray-100 flex items-center justify-center">
                  <img v-if="getImageSrc(selectedProduct.image_path || selectedProduct.image || selectedProduct.image_url)"
                    :src="getImageSrc(selectedProduct.image_path || selectedProduct.image || selectedProduct.image_url)" 
                    :alt="selectedProduct.name"
                    class="w-full h-full object-cover"
                    @error="$event.target.style.display = 'none'" />
                  <div v-else class="text-center text-gray-400">
                    <i class="fas fa-image text-4xl mb-2"></i>
                    <p class="text-sm">Chưa có ảnh</p>
                  </div>
                </div>
              </div>
              
              <!-- Additional Images -->
              <div v-if="selectedProduct.product_images?.length" class="space-y-2">
                <h4 class="text-sm font-medium text-gray-700">Hình ảnh khác ({{ selectedProduct.product_images.length }}):</h4>
                <div class="grid grid-cols-4 gap-2">
                  <div v-for="img in selectedProduct.product_images" :key="img.id"
                    class="w-16 h-16 rounded-lg overflow-hidden border border-gray-200 hover:border-yellow-400 transition-colors cursor-pointer bg-gray-100 flex items-center justify-center">
                    <img v-if="getImageSrc(img.image_url || img.image_path || img.image)"
                      :src="getImageSrc(img.image_url || img.image_path || img.image)" 
                      :alt="img.alt || selectedProduct.name"
                      class="w-full h-full object-cover hover:scale-105 transition-transform"
                      @error="$event.target.style.display = 'none'" />
                    <i v-else class="fas fa-image text-gray-400"></i>
                  </div>
                </div>
              </div>
            </div>

            <!-- Basic Info -->
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="text-sm font-medium text-gray-600">Tên sản phẩm</label>
                <p class="text-gray-900 font-semibold">{{ selectedProduct.name }}</p>
              </div>
              <div>
                <label class="text-sm font-medium text-gray-600">Mã SKU</label>
                <p class="text-gray-900 font-mono">{{ selectedProduct.sku }}</p>
              </div>
              <div>
                <label class="text-sm font-medium text-gray-600">Danh mục</label>
                <p class="text-gray-900">{{ selectedProduct.category?.name || 'Chưa phân loại' }}</p>
              </div>
              <div>
                <label class="text-sm font-medium text-gray-600">Trạng thái</label>
                <span class="inline-flex items-center px-3 py-1 rounded-full text-sm"
                  :class="selectedProduct.status 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'">
                  {{ selectedProduct.status ? 'Hoạt động' : 'Không hoạt động' }}
                </span>
              </div>
              <div>
                <label class="text-sm font-medium text-gray-600">Giá bán</label>
                <div v-if="selectedProduct.price_range?.has_variants && selectedProduct.price_range.max_price > selectedProduct.price_range.min_price">
                  <p class="text-lg font-bold text-blue-600">
                    ₫{{ Number(selectedProduct.price_range.min_price).toLocaleString('vi-VN') }} - 
                    ₫{{ Number(selectedProduct.price_range.max_price).toLocaleString('vi-VN') }}
                  </p>
                </div>
                <div v-else>
                  <p class="text-lg font-bold text-blue-600">
                    ₫{{ Number(selectedProduct.price_range?.min_price || 0).toLocaleString('vi-VN') }}
                  </p>
                </div>
              </div>
              <div>
                <label class="text-sm font-medium text-gray-600">Tồn kho</label>
                <p class="text-gray-900 font-semibold">{{ Number(selectedProduct.stock || 0) }}</p>
              </div>
            </div>

            <!-- Description -->
            <div v-if="selectedProduct.description">
              <label class="text-sm font-medium text-gray-600">Mô tả</label>
              <p class="text-gray-900 mt-1">{{ selectedProduct.description }}</p>
            </div>

            <!-- Colors Section -->
            <div v-if="selectedProduct.colors?.length" class="bg-gray-50 rounded-lg p-4">
              <h4 class="font-medium text-gray-900 mb-3">Màu sắc có sẵn</h4>
              <div class="flex flex-wrap gap-2">
                <div v-for="color in selectedProduct.colors" :key="color.id"
                  class="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border border-gray-200">
                  <div class="w-4 h-4 rounded-full border border-gray-300"
                    :style="{ backgroundColor: color.color_code }"></div>
                  <span class="text-sm font-medium">{{ color.name }}</span>
                </div>
              </div>
            </div>

            <!-- Capacities Section -->
            <div v-if="selectedProduct.capacities?.length" class="bg-blue-50 rounded-lg p-4">
              <h4 class="font-medium text-gray-900 mb-3">Dung lượng có sẵn</h4>
              <div class="grid grid-cols-2 gap-2">
                <div v-for="capacity in selectedProduct.capacities" :key="capacity.id"
                  class="bg-white p-3 rounded-lg border border-blue-200">
                  <div class="flex justify-between items-center">
                    <span class="font-medium">{{ capacity.display_name }}</span>
                    <span class="text-blue-600 font-bold">₫{{ Number(capacity.final_price).toLocaleString('vi-VN') }}</span>
                  </div>
                  <div class="text-xs text-gray-500 mt-1">
                    Tồn kho: {{ capacity.stock }} | 
                    <span :class="capacity.in_stock ? 'text-green-600' : 'text-red-600'">
                      {{ capacity.in_stock ? 'Còn hàng' : 'Hết hàng' }}
                    </span>
                  </div>
                  <div v-if="capacity.discount_percentage" class="text-xs text-orange-600 mt-1">
                    Giảm {{ capacity.discount_percentage }}
                  </div>
                </div>
              </div>
            </div>

            <!-- Variants Section -->
            <div v-if="selectedProduct.variants?.length" class="bg-purple-50 rounded-lg p-4">
              <h4 class="font-medium text-gray-900 mb-3">Chi tiết biến thể ({{ selectedProduct.variants.length }})</h4>
              <div class="space-y-2 max-h-40 overflow-y-auto">
                <div v-for="variant in selectedProduct.variants" :key="variant.id"
                  class="bg-white p-3 rounded-lg border border-purple-200">
                  <div class="flex justify-between items-start">
                    <div>
                      <p class="font-medium">{{ variant.display_name }}</p>
                      <p class="text-xs text-gray-500">SKU: {{ variant.sku }}</p>
                    </div>
                    <div class="text-right">
                      <p class="text-purple-600 font-bold">₫{{ Number(variant.final_price).toLocaleString('vi-VN') }}</p>
                      <p class="text-xs" :class="variant.in_stock ? 'text-green-600' : 'text-red-600'">
                        Tồn: {{ variant.stock }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Stock Status Summary -->
            <div class="bg-yellow-50 rounded-lg p-4">
              <h4 class="font-medium text-gray-900 mb-2">Tình trạng kho</h4>
              <div class="grid grid-cols-3 gap-4 text-sm">
                <div class="text-center">
                  <div class="text-2xl font-bold" :class="selectedProduct.in_stock ? 'text-green-600' : 'text-red-600'">
                    {{ selectedProduct.in_stock ? '✓' : '✗' }}
                  </div>
                  <div class="text-gray-600">Còn hàng</div>
                </div>
                <div class="text-center">
                  <div class="text-2xl font-bold" :class="selectedProduct.low_stock ? 'text-orange-600' : 'text-gray-400'">
                    {{ selectedProduct.low_stock ? '⚠' : '○' }}
                  </div>
                  <div class="text-gray-600">Sắp hết</div>
                </div>
                <div class="text-center">
                  <div class="text-2xl font-bold" :class="selectedProduct.out_of_stock ? 'text-red-600' : 'text-gray-400'">
                    {{ selectedProduct.out_of_stock ? '✗' : '○' }}
                  </div>
                  <div class="text-gray-600">Hết hàng</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <div class="flex justify-end">
            <button @click="closeDetailModal"
              class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
              Đóng
            </button>
          </div>
        </div>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<script setup>
import { ref, watch, onUnmounted } from 'vue'

const props = defineProps({
  selectedProduct: Object,
  showDetailModal: Boolean
})

const emit = defineEmits(['close'])

// Watch for modal open/close to handle body scroll
watch(() => props.showDetailModal, (isOpen) => {
  if (isOpen) {
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden'
  } else {
    // Restore body scroll when modal is closed
    document.body.style.overflow = ''
  }
})

// Cleanup on unmount
onUnmounted(() => {
  document.body.style.overflow = ''
})

const closeDetailModal = () => {
  emit('close')
}

const getImageSrc = (image) => {
  if (!image) return null  // Return null để trigger fallback
  if (typeof image === 'string') {
    if (image.startsWith('http')) return image
    if (image.startsWith('data:')) return image
    return `http://127.0.0.1:8000/storage/${image}`
  }
  return null
}

const formatPrice = (price) => {
  if (!price) return '0₫'
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(price)
}
</script>

<!-- No custom CSS needed - using Tailwind transitions -->