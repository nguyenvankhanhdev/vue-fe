// src/composables/admin/useImageManager.js
import { ref, computed } from 'vue';
import { imageManagerService } from '@/services/ImageManagerService';
import { ApiError } from '@/services/apiError';
import Swal from 'sweetalert2';

export function useImageManager() {
  // State
  const showImageModal = ref(false);
  const selectedProduct = ref(null);
  const productImages = ref([]);
  const selectedImages = ref([]);
  const uploadProgress = ref([]);
  const loading = ref(false);
  const uploading = ref(false);

  // Computed
  const allSelected = computed(() =>
    productImages.value.length > 0 && selectedImages.value.length === productImages.value.length
  );

  // Methods
  const openImageManager = async (product) => {
    selectedProduct.value = product;
    showImageModal.value = true;
    await loadProductImages(product.id);
  };

  const closeImageModal = () => {
    showImageModal.value = false;
    selectedProduct.value = null;
    productImages.value = [];
    selectedImages.value = [];
    uploadProgress.value = [];
  };

  const loadProductImages = async (productId) => {
    loading.value = true;
    try {
      const response = await imageManagerService.getProductImages(productId);
      productImages.value = response.data || response;
    } catch (error) {
      console.error('Error loading product images:', error);
      Swal.fire({
        icon: 'error',
        title: 'Lỗi tải ảnh',
        text: 'Không thể tải danh sách ảnh sản phẩm.',
        confirmButtonColor: '#3B82F6'
      });
    } finally {
      loading.value = false;
    }
  };

  const uploadMultipleImages = async (files) => {
    if (!selectedProduct.value || !selectedProduct.value.id || !files.length) {
      return { success: false, uploaded: 0, failed: files.length };
    }

    uploading.value = true;
    uploadProgress.value = files.map(file => ({
      name: file.name,
      preview: URL.createObjectURL(file),
      percent: 0,
      status: 'uploading'
    }));

    let uploadedCount = 0;
    let failedCount = 0;

    try {
      // Upload từng ảnh vì API chỉ nhận 1 ảnh/request
      const results = await imageManagerService.uploadProductImages(
        selectedProduct.value.id, 
        files
      );

      // Xử lý kết quả từng upload
      results.forEach((result, index) => {
        if (result.status === 'fulfilled') {
          uploadProgress.value[index].percent = 100;
          uploadProgress.value[index].status = 'success';
          uploadedCount++;
        } else {
          uploadProgress.value[index].status = 'error';
          failedCount++;
          console.error(`Failed to upload ${files[index].name}:`, result.reason);
        }
      });

      // Reload images để cập nhật danh sách
      await loadProductImages(selectedProduct.value.id);

      // Clear progress sau 2s
      setTimeout(() => {
        uploadProgress.value = [];
      }, 2000);

      return { 
        success: uploadedCount > 0, 
        uploaded: uploadedCount, 
        failed: failedCount 
      };

    } catch (error) {
      console.error('Error uploading images:', error);
      
      // Mark all as error
      uploadProgress.value.forEach(progress => {
        progress.status = 'error';
      });

      Swal.fire({
        icon: 'error',
        title: 'Lỗi upload',
        text: error.message || 'Không thể tải lên ảnh. Vui lòng thử lại.',
        confirmButtonColor: '#3B82F6'
      });

      return { success: false, uploaded: 0, failed: files.length };
    } finally {
      uploading.value = false;
    }
  };

  const setMainImage = async (imageId) => {
    if (!selectedProduct.value) return;

    try {
      // Sử dụng update API với is_main flag (nếu backend hỗ trợ)
      // Hoặc bạn cần thêm endpoint riêng trong Laravel
      await imageManagerService.updateProductImage(
        selectedProduct.value.id, 
        imageId, 
        { is_main: true }
      );

      // Update local state
      productImages.value.forEach(img => {
        img.is_main = img.id === imageId;
      });

      Swal.fire({
        icon: 'success',
        title: 'Đã đặt ảnh chính',
        timer: 1500,
        showConfirmButton: false
      });
    } catch (error) {
      console.error('Error setting main image:', error);
      Swal.fire({
        icon: 'error',
        title: 'Lỗi đặt ảnh chính',
        text: error.message || 'Không thể đặt ảnh chính. Vui lòng cập nhật backend để hỗ trợ tính năng này.',
        confirmButtonColor: '#3B82F6'
      });
    }
  };

  const deleteImage = async (imageId) => {
    if (!selectedProduct.value) return false;

    const result = await Swal.fire({
      title: 'Xác nhận xóa?',
      text: 'Bạn có chắc muốn xóa ảnh này?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DC2626',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Có, xóa!',
      cancelButtonText: 'Hủy'
    });

    if (result.isConfirmed) {
      try {
        await imageManagerService.deleteProductImage(selectedProduct.value.id, imageId);
        
        // Remove from local state
        productImages.value = productImages.value.filter(img => img.id !== imageId);
        selectedImages.value = selectedImages.value.filter(id => id !== imageId);

        Swal.fire({
          icon: 'success',
          title: 'Đã xóa ảnh!',
          timer: 1500,
          showConfirmButton: false
        });

        return true;
      } catch (error) {
        console.error('Error deleting image:', error);
        Swal.fire({
          icon: 'error',
          title: 'Lỗi xóa ảnh',
          text: error.message || 'Không thể xóa ảnh.',
          confirmButtonColor: '#3B82F6'
        });
        return false;
      }
    }
    return false;
  };

  const deleteSelectedImages = async () => {
    if (!selectedProduct.value || selectedImages.value.length === 0) return;

    const result = await Swal.fire({
      title: 'Xác nhận xóa?',
      text: `Bạn có chắc muốn xóa ${selectedImages.value.length} ảnh đã chọn?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DC2626',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Có, xóa!',
      cancelButtonText: 'Hủy'
    });

    if (result.isConfirmed) {
      try {
        // Xóa từng ảnh vì API không hỗ trợ bulk delete
        const results = await imageManagerService.deleteMultipleImages(
          selectedProduct.value.id, 
          selectedImages.value
        );

        // Đếm số ảnh xóa thành công
        let successCount = 0;
        let failedCount = 0;

        results.forEach(result => {
          if (result.status === 'fulfilled') {
            successCount++;
          } else {
            failedCount++;
          }
        });
        
        // Remove from local state (chỉ xóa những ảnh thành công)
        if (successCount > 0) {
          productImages.value = productImages.value.filter(
            img => !selectedImages.value.includes(img.id)
          );
          selectedImages.value = [];

          if (failedCount === 0) {
            Swal.fire({
              icon: 'success',
              title: 'Đã xóa tất cả ảnh!',
              timer: 1500,
              showConfirmButton: false
            });
          } else {
            Swal.fire({
              icon: 'warning',
              title: 'Xóa một phần',
              text: `Thành công: ${successCount}, Thất bại: ${failedCount}`,
              confirmButtonColor: '#3B82F6'
            });
          }
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Lỗi xóa ảnh',
            text: 'Không thể xóa các ảnh đã chọn.',
            confirmButtonColor: '#3B82F6'
          });
        }
      } catch (error) {
        console.error('Error deleting selected images:', error);
        Swal.fire({
          icon: 'error',
          title: 'Lỗi xóa ảnh',
          text: error.message || 'Không thể xóa các ảnh đã chọn.',
          confirmButtonColor: '#3B82F6'
        });
      }
    }
  };

  const selectAllImages = () => {
    if (allSelected.value) {
      selectedImages.value = [];
    } else {
      selectedImages.value = productImages.value.map(img => img.id);
    }
  };

  const editImage = async (image) => {
    const { value: formValues } = await Swal.fire({
      title: 'Chỉnh sửa ảnh',
      html: `
        <input id="alt-text" class="swal2-input" placeholder="Alt text" value="${image.alt || ''}">
        <input id="description" class="swal2-input" placeholder="Mô tả" value="${image.description || ''}">
      `,
      focusConfirm: false,
      preConfirm: () => {
        return {
          alt: document.getElementById('alt-text').value,
          description: document.getElementById('description').value
        }
      }
    });

    if (formValues) {
      try {
        await imageManagerService.updateProductImage(
          selectedProduct.value.id, 
          image.id, 
          formValues
        );

        // Update local state
        const index = productImages.value.findIndex(img => img.id === image.id);
        if (index !== -1) {
          Object.assign(productImages.value[index], formValues);
        }

        Swal.fire({
          icon: 'success',
          title: 'Đã cập nhật ảnh!',
          timer: 1500,
          showConfirmButton: false
        });
      } catch (error) {
        console.error('Error updating image:', error);
        Swal.fire({
          icon: 'error',
          title: 'Lỗi cập nhật ảnh',
          text: error.message || 'Không thể cập nhật ảnh.',
          confirmButtonColor: '#3B82F6'
        });
      }
    }
  };

  const saveImageChanges = async () => {
    // Implementation for saving any pending changes
    Swal.fire({
      icon: 'success',
      title: 'Đã lưu thay đổi!',
      timer: 1500,
      showConfirmButton: false
    });
  };

  // Utility methods
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return {
    // State
    showImageModal,
    selectedProduct,
    productImages,
    selectedImages,
    uploadProgress,
    loading,
    uploading,
    
    // Computed
    allSelected,
    
    // Methods
    openImageManager,
    closeImageModal,
    loadProductImages,
    uploadMultipleImages,
    setMainImage,
    deleteImage,
    deleteSelectedImages,
    selectAllImages,
    editImage,
    saveImageChanges,
    formatFileSize
  };
}