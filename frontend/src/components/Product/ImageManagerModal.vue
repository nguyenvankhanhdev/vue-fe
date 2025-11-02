<template>
  <Transition
    enter-active-class="transition-all duration-300 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-all duration-200 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0">
    <div v-if="showImageModal" class="fixed inset-0 z-50 flex items-center justify-center p-4" @click="handleClose">
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
        <div class="relative bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col"
          @click.stop>
        
        <!-- Header -->
        <div class="relative" style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);">
          <div class="px-6 py-4">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <i class="fas fa-images text-white text-lg"></i>
                </div>
                <div>
                  <h3 class="text-lg font-bold text-white">Quản lý ảnh sản phẩm</h3>
                  <p class="text-white/80 text-sm">{{ localProduct?.name || 'Sản phẩm' }}</p>
                </div>
              </div>
              <button @click="handleClose"
                class="text-white/70 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-all">
                <i class="fas fa-times text-lg"></i>
              </button>
            </div>
          </div>
        </div>

        <!-- Content -->
        <div class="flex-1 p-6 overflow-y-auto">
          <div v-if="localProduct" class="space-y-6">
            
            <!-- Main Image Section -->
            <div class="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200">
              <h4 class="text-lg font-semibold mb-4 text-gray-900">
                <i class="fas fa-star text-yellow-500 mr-2"></i>Ảnh chính
              </h4>
              <div class="flex justify-center">
                <div class="relative">
                  <div class="w-56 h-56 rounded-xl overflow-hidden border-4 border-yellow-400 shadow-xl bg-gray-100 flex items-center justify-center">
                    <img v-if="getImageSrc(localProduct.image_path || localProduct.image || localProduct.image_url)"
                      :src="getImageSrc(localProduct.image_path || localProduct.image || localProduct.image_url)" 
                      :alt="localProduct.name"
                      class="w-full h-full object-cover"
                      @error="handleImageError" />
                    <div v-else class="text-center text-gray-400">
                      <i class="fas fa-image text-5xl mb-2"></i>
                      <p class="text-sm">Chưa có ảnh chính</p>
                    </div>
                  </div>
                  <div class="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    Ảnh chính
                  </div>
                </div>
              </div>
            </div>

            <!-- Upload Section -->
            <div class="border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-yellow-400 transition-all bg-gray-50">
              <div class="text-center">
                <div class="mx-auto w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                  <i class="fas fa-cloud-upload-alt text-3xl text-yellow-600"></i>
                </div>
                <h5 class="text-lg font-semibold text-gray-900 mb-2">Tải lên ảnh mới</h5>
                <p class="text-sm text-gray-500 mb-4">Kéo thả hoặc click để chọn nhiều ảnh</p>
                
                <!-- Upload Progress -->
                <div v-if="uploadProgress.length > 0" class="mb-4 space-y-2">
                  <div v-for="(progress, index) in uploadProgress" :key="index" 
                    class="bg-white rounded-lg p-3 border border-gray-200">
                    <div class="flex items-center gap-3">
                      <img v-if="progress.preview" :src="progress.preview" class="w-12 h-12 rounded object-cover" />
                      <div class="flex-1 text-left">
                        <p class="text-sm font-medium text-gray-700">{{ progress.name }}</p>
                        <div class="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div class="bg-yellow-500 h-2 rounded-full transition-all" 
                            :style="{ width: progress.percent + '%' }"></div>
                        </div>
                      </div>
                      <i v-if="progress.status === 'success'" class="fas fa-check-circle text-green-500"></i>
                      <i v-if="progress.status === 'error'" class="fas fa-times-circle text-red-500"></i>
                      <i v-if="progress.status === 'uploading'" class="fas fa-spinner fa-spin text-yellow-500"></i>
                    </div>
                  </div>
                </div>

                <input ref="fileInput" type="file" accept="image/*" multiple @change="handleFileUpload" class="hidden" />
                <button @click="$refs.fileInput.click()" :disabled="uploading"
                  class="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed">
                  <i class="fas fa-upload mr-2"></i>
                  {{ uploading ? 'Đang tải lên...' : 'Chọn ảnh' }}
                </button>
                <p class="text-xs text-gray-400 mt-3">
                  <i class="fas fa-info-circle mr-1"></i>
                  Hỗ trợ: JPG, PNG, WebP - Tối đa 5MB/ảnh
                </p>
              </div>
            </div>

            <!-- Image Gallery -->
            <div>
              <div class="flex items-center justify-between mb-4">
                <h4 class="text-lg font-semibold text-gray-900">
                  <i class="fas fa-images text-blue-500 mr-2"></i>
                  Thư viện ảnh 
                  <span v-if="productImages.length > 0" class="text-sm text-gray-500">
                    ({{ productImages.length }})
                  </span>
                </h4>
                
                <!-- Bulk Actions -->
                <div v-if="productImages.length > 0" class="flex items-center gap-2">
                  <label class="flex items-center gap-2 text-sm text-gray-600 cursor-pointer hover:text-gray-900">
                    <input type="checkbox" :checked="allSelected" @change="selectAllImages"
                      class="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    Chọn tất cả
                  </label>
                  <button v-if="selectedImages.length > 0" @click="deleteSelectedImages"
                    class="text-red-600 hover:text-red-700 px-3 py-1 rounded-lg hover:bg-red-50 transition-colors text-sm font-medium">
                    <i class="fas fa-trash mr-1"></i>Xóa đã chọn ({{ selectedImages.length }})
                  </button>
                </div>
              </div>
              
              <!-- Loading State -->
              <div v-if="loading" class="text-center py-12">
                <div class="w-12 h-12 border-4 border-yellow-200 border-t-yellow-600 rounded-full animate-spin mx-auto mb-4"></div>
                <p class="text-gray-500">Đang tải ảnh...</p>
              </div>

              <!-- Images Grid -->
              <div v-else-if="productImages.length > 0" class="grid grid-cols-3 gap-4">
                <div v-for="(img, index) in productImages" :key="img.id"
                  class="relative group">
                  
                  <!-- Image Container -->
                  <div class="aspect-square rounded-lg overflow-hidden border-2 transition-all cursor-pointer bg-gray-100 flex items-center justify-center"
                    :class="selectedImages.includes(img.id) ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200 group-hover:border-yellow-400'">
                    <img v-if="getImageSrc(img.image_url || img.image_path || img.image)"
                      :src="getImageSrc(img.image_url || img.image_path || img.image)" 
                      :alt="img.alt || localProduct.name"
                      class="w-full h-full object-cover"
                      @error="handleImageError" />
                    <i v-else class="fas fa-image text-gray-400 text-3xl"></i>
                  </div>
                  
                  <!-- Checkbox -->
                  <div class="absolute top-2 left-2">
                    <input type="checkbox" :value="img.id" v-model="selectedImages"
                      class="w-5 h-5 rounded border-2 border-white shadow-lg text-blue-600 focus:ring-0 focus:ring-offset-0" />
                  </div>
                  
                  <!-- Index Badge -->
                  <div class="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
                    #{{ index + 1 }}
                  </div>
                  
                  <!-- Action Buttons (Hover) -->
                  <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-2">
                    <button @click="setMainImage(img.id)" :disabled="img.is_main"
                      class="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      :title="img.is_main ? 'Đang là ảnh chính' : 'Đặt làm ảnh chính'">
                      <i class="fas fa-star text-sm"></i>
                    </button>
                    <button @click="viewImage(img)" 
                      class="bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg transition-colors"
                      title="Xem phóng to">
                      <i class="fas fa-search-plus text-sm"></i>
                    </button>
                    <button @click="editImage(img)" 
                      class="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-lg transition-colors"
                      title="Chỉnh sửa">
                      <i class="fas fa-edit text-sm"></i>
                    </button>
                    <button @click="deleteImage(img.id)" 
                      class="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-colors"
                      title="Xóa ảnh">
                      <i class="fas fa-trash text-sm"></i>
                    </button>
                  </div>

                  <!-- Main Badge -->
                  <div v-if="img.is_main" class="absolute bottom-2 left-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                    <i class="fas fa-star mr-1"></i>Chính
                  </div>
                </div>
              </div>
              
              <!-- Empty State -->
              <div v-else class="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                <i class="fas fa-images text-5xl text-gray-300 mb-4"></i>
                <p class="text-gray-500 font-medium">Chưa có ảnh phụ nào</p>
                <p class="text-sm text-gray-400 mt-1">Tải lên ảnh để bắt đầu</p>
              </div>
            </div>

            <!-- Tips -->
            <div class="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-4 border border-blue-200">
              <h5 class="font-semibold text-blue-900 mb-2 flex items-center">
                <i class="fas fa-lightbulb text-yellow-500 mr-2"></i>
                Mẹo quản lý ảnh
              </h5>
              <ul class="text-sm text-blue-800 space-y-1">
                <li><i class="fas fa-check text-green-500 mr-2"></i>Ảnh chính hiển thị trong danh sách sản phẩm</li>
                <li><i class="fas fa-check text-green-500 mr-2"></i>Các ảnh phụ hiển thị trong trang chi tiết</li>
                <li><i class="fas fa-check text-green-500 mr-2"></i>Click vào ảnh để xem các tùy chọn</li>
                <li><i class="fas fa-check text-green-500 mr-2"></i>Có thể chọn nhiều ảnh để xóa hàng loạt</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <div class="flex justify-end">
            <button @click="emit('close')"
              class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
              <i class="fas fa-times mr-2"></i>Đóng
            </button>
          </div>
        </div>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<script setup>
import { ref, computed, watch, onUnmounted } from 'vue'
import { useImageManager } from '@/composables'
import Swal from 'sweetalert2'

const props = defineProps({
  selectedProduct: Object,
  showImageModal: Boolean
})

const emit = defineEmits(['close', 'refresh'])

// Use Image Manager Composable
const {
  productImages,
  selectedImages,
  uploadProgress,
  loading,
  uploading,
  allSelected,
  loadProductImages,
  selectAllImages
} = useImageManager()

// Local state
const localProduct = ref(null)
const fileInput = ref(null)

// Watch for product changes
watch(() => props.selectedProduct, async (newProduct) => {
  if (newProduct && props.showImageModal) {
    console.log('Modal opened with product:', newProduct);
    localProduct.value = newProduct
    // Load images directly without using openImageManager
    await loadProductImages(newProduct.id)
  }
}, { immediate: true })

// Handle modal open/close
watch(() => props.showImageModal, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

onUnmounted(() => {
  document.body.style.overflow = ''
})

// Image source helper
const getImageSrc = (imagePath) => {
  if (!imagePath) return null
  if (imagePath.startsWith('http') || imagePath.startsWith('data:')) {
    return imagePath
  }
  return `http://127.0.0.1:8000/storage/${imagePath}`
}

// Handle image load error
const handleImageError = (e) => {
  e.target.style.display = 'none'
  const parent = e.target.parentElement
  if (parent) {
    const icon = document.createElement('i')
    icon.className = 'fas fa-image text-gray-400 text-3xl'
    parent.appendChild(icon)
  }
}

// File upload handler
const handleFileUpload = async (event) => {
  const files = Array.from(event.target.files)
  if (files.length === 0) return

  if (!localProduct.value || !localProduct.value.id) {
    console.error('No product selected for upload');
    Swal.fire({
      icon: 'error',
      title: 'Lỗi!',
      text: 'Không tìm thấy thông tin sản phẩm',
      confirmButtonColor: '#3085d6'
    })
    return
  }

  console.log('Uploading files for product:', localProduct.value.id);

  uploading.value = true
  uploadProgress.value = files.map(file => ({
    name: file.name,
    preview: URL.createObjectURL(file),
    percent: 0,
    status: 'uploading'
  }))

  let uploadedCount = 0
  let failedCount = 0

  try {
    // Import service directly
    const { imageManagerService } = await import('@/services/ImageManagerService')
    
    // Upload từng ảnh
    const results = await imageManagerService.uploadProductImages(
      localProduct.value.id,
      files
    )

    // Xử lý kết quả
    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        uploadProgress.value[index].percent = 100
        uploadProgress.value[index].status = 'success'
        uploadedCount++
      } else {
        uploadProgress.value[index].status = 'error'
        failedCount++
        console.error(`Failed to upload ${files[index].name}:`, result.reason)
      }
    })

    // Reload images
    await loadProductImages(localProduct.value.id)

    // Clear progress sau 2s
    setTimeout(() => {
      uploadProgress.value = []
    }, 2000)

    if (uploadedCount > 0) {
      emit('refresh')
      Swal.fire({
        icon: 'success',
        title: 'Thành công!',
        text: `Đã tải lên ${uploadedCount} ảnh`,
        timer: 2000,
        showConfirmButton: false
      })
    }

    if (failedCount > 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Tải lên một phần',
        text: `Thành công: ${uploadedCount}, Thất bại: ${failedCount}`,
        confirmButtonColor: '#3085d6'
      })
    }
  } catch (error) {
    console.error('Error uploading images:', error)
    uploadProgress.value.forEach(progress => {
      progress.status = 'error'
    })
    Swal.fire({
      icon: 'error',
      title: 'Lỗi upload',
      text: error.message || 'Không thể tải lên ảnh',
      confirmButtonColor: '#3085d6'
    })
  } finally {
    uploading.value = false
    // Reset file input
    if (fileInput.value) {
      fileInput.value.value = ''
    }
  }
}

// Delete selected images
const deleteSelectedImages = async () => {
  if (selectedImages.value.length === 0) return

  const result = await Swal.fire({
    title: 'Xóa ảnh đã chọn?',
    text: `Bạn có chắc muốn xóa ${selectedImages.value.length} ảnh đã chọn?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Xóa',
    cancelButtonText: 'Hủy'
  })

  if (!result.isConfirmed) return

  try {
    const { imageManagerService } = await import('@/services/ImageManagerService')
    
    let successCount = 0
    let failCount = 0

    const results = await imageManagerService.deleteMultipleImages(
      localProduct.value.id,
      [...selectedImages.value]
    )

    results.forEach(result => {
      if (result.status === 'fulfilled') {
        successCount++
      } else {
        failCount++
      }
    })

    if (successCount > 0) {
      // Reload images
      await loadProductImages(localProduct.value.id)
      selectedImages.value = []
      emit('refresh')
      
      Swal.fire({
        icon: 'success',
        title: 'Thành công!',
        text: `Đã xóa ${successCount} ảnh`,
        timer: 2000,
        showConfirmButton: false
      })
    }

    if (failCount > 0) {
      Swal.fire({
        icon: 'error',
        title: 'Có lỗi!',
        text: `Không thể xóa ${failCount} ảnh`,
        confirmButtonColor: '#3085d6'
      })
    }
  } catch (error) {
    console.error('Error deleting images:', error)
    Swal.fire({
      icon: 'error',
      title: 'Lỗi!',
      text: 'Không thể xóa ảnh',
      confirmButtonColor: '#3085d6'
    })
  }
}

// Delete single image
const deleteImage = async (imageId) => {
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

  if (!result.isConfirmed) return

  try {
    const { imageManagerService } = await import('@/services/ImageManagerService')
    await imageManagerService.deleteProductImage(localProduct.value.id, imageId)
    
    await loadProductImages(localProduct.value.id)
    emit('refresh')
    
    Swal.fire({
      icon: 'success',
      title: 'Đã xóa ảnh!',
      timer: 1500,
      showConfirmButton: false
    })
  } catch (error) {
    console.error('Error deleting image:', error)
    Swal.fire({
      icon: 'error',
      title: 'Lỗi xóa ảnh',
      text: error.message || 'Không thể xóa ảnh.',
      confirmButtonColor: '#3B82F6'
    })
  }
}

// Edit image
const editImage = async (image) => {
  const { value: formValues } = await Swal.fire({
    title: 'Chỉnh sửa ảnh',
    html: `
      <input id="alt-text" class="swal2-input" placeholder="Alt text" value="${image.alt || ''}">
    `,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: 'Lưu',
    cancelButtonText: 'Hủy',
    preConfirm: () => {
      return {
        alt: document.getElementById('alt-text').value
      }
    }
  })

  if (formValues) {
    try {
      const { imageManagerService } = await import('@/services/ImageManagerService')
      await imageManagerService.updateProductImage(
        localProduct.value.id,
        image.id,
        formValues
      )

      await loadProductImages(localProduct.value.id)
      emit('refresh')

      Swal.fire({
        icon: 'success',
        title: 'Đã cập nhật ảnh!',
        timer: 1500,
        showConfirmButton: false
      })
    } catch (error) {
      console.error('Error updating image:', error)
      Swal.fire({
        icon: 'error',
        title: 'Lỗi cập nhật ảnh',
        text: error.message || 'Không thể cập nhật ảnh.',
        confirmButtonColor: '#3B82F6'
      })
    }
  }
}

// Set main image
const setMainImage = async (imageId) => {
  try {
    const { imageManagerService } = await import('@/services/ImageManagerService')
    await imageManagerService.updateProductImage(
      localProduct.value.id,
      imageId,
      { is_main: true }
    )

    await loadProductImages(localProduct.value.id)
    emit('refresh')

    Swal.fire({
      icon: 'success',
      title: 'Đã đặt ảnh chính',
      timer: 1500,
      showConfirmButton: false
    })
  } catch (error) {
    console.error('Error setting main image:', error)
    Swal.fire({
      icon: 'error',
      title: 'Lỗi đặt ảnh chính',
      text: error.message || 'Backend chưa hỗ trợ tính năng này. Vui lòng xem IMAGE_MANAGER_BACKEND_GUIDE.md',
      confirmButtonColor: '#3B82F6'
    })
  }
}

// View image in fullscreen
const viewImage = (image) => {
  const imgSrc = getImageSrc(image.image_url || image.image_path || image.image)
  Swal.fire({
    imageUrl: imgSrc,
    imageAlt: image.alt || localProduct.value?.name,
    showConfirmButton: false,
    showCloseButton: true,
    width: 'auto',
    background: '#000',
    backdrop: 'rgba(0,0,0,0.9)'
  })
}

// Close handler
const handleClose = () => {
  emit('close')
}
</script>

<!-- No custom CSS needed - using Tailwind transitions -->
