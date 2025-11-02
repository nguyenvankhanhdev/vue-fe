// src/composables/useVariantManager.js
import { ref, computed } from 'vue';
import { variantManagerService } from '../services/VariantManagerService';
import { ApiError } from '../services/apiError';
import Swal from 'sweetalert2';

export function useVariantManager() {
  // State
  const showVariantModal = ref(false);
  const selectedVariantProduct = ref(null);
  const activeVariantTab = ref('colors');
  const loading = ref(false);
  
  // Colors
  const productColors = ref([]);
  const newColor = ref({
    name: '',
    color_code: '#000000'
  });

  // Capacities
  const productCapacities = ref([]);
  const newCapacity = ref({
    name: '',
    display_name: '',
    price: 0,
    discount_price: null,
    stock: 0
  });

  // Variants
  const productVariants = ref([]);
  const newVariant = ref({
    color_id: '',
    capacity_id: '',
    sku: '',
    price: 0,
    stock: 0,
    discount_price: null
  });

  // Methods
  const openVariantManager = async (product) => {
    selectedVariantProduct.value = product;
    showVariantModal.value = true;
    await Promise.all([
      loadProductColors(product.id),
      loadProductCapacities(product.id),
      loadProductVariants(product.id)
    ]);
  };

  const closeVariantModal = () => {
    showVariantModal.value = false;
    selectedVariantProduct.value = null;
    activeVariantTab.value = 'colors';
    productColors.value = [];
    productCapacities.value = [];
    productVariants.value = [];
    resetForms();
  };

  const resetForms = () => {
    newColor.value = { name: '', color_code: '#000000' };
    newCapacity.value = { name: '', display_name: '', price: 0, discount_price: null, stock: 0 };
    newVariant.value = { color_id: '', capacity_id: '', sku: '', price: 0, stock: 0, discount_price: null };
  };

  // Colors management
  const loadProductColors = async (productId) => {
    try {
      const response = await variantManagerService.getProductColors(productId);
      productColors.value = response.data || response;
    } catch (error) {
      console.error('Error loading colors:', error);
    }
  };

  const addColor = async () => {
    if (!selectedVariantProduct.value || !newColor.value.name.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Vui lòng nhập tên màu',
        timer: 1500
      });
      return;
    }

    try {
      const response = await variantManagerService.createProductColor(
        selectedVariantProduct.value.id, 
        newColor.value
      );
      
      productColors.value.push(response.data || response);
      newColor.value = { name: '', color_code: '#000000' };

      Swal.fire({
        icon: 'success',
        title: 'Đã thêm màu!',
        timer: 1500,
        showConfirmButton: false
      });
    } catch (error) {
      console.error('Error adding color:', error);
      Swal.fire({
        icon: 'error',
        title: 'Lỗi thêm màu',
        text: error.message || 'Không thể thêm màu.',
        confirmButtonColor: '#3B82F6'
      });
    }
  };

  const editColor = async (color) => {
    const { value: formValues } = await Swal.fire({
      title: 'Chỉnh sửa màu',
      html: `
        <input id="color-name" class="swal2-input" placeholder="Tên màu" value="${color.name}">
        <input id="color-code" type="color" class="swal2-input" value="${color.color_code}">
      `,
      focusConfirm: false,
      preConfirm: () => {
        return {
          name: document.getElementById('color-name').value,
          color_code: document.getElementById('color-code').value
        }
      }
    });

    if (formValues && formValues.name.trim()) {
      try {
        await variantManagerService.updateProductColor(
          selectedVariantProduct.value.id, 
          color.id, 
          formValues
        );

        const index = productColors.value.findIndex(c => c.id === color.id);
        if (index !== -1) {
          Object.assign(productColors.value[index], formValues);
        }

        Swal.fire({
          icon: 'success',
          title: 'Đã cập nhật màu!',
          timer: 1500,
          showConfirmButton: false
        });
      } catch (error) {
        console.error('Error updating color:', error);
        Swal.fire({
          icon: 'error',
          title: 'Lỗi cập nhật màu',
          text: error.message || 'Không thể cập nhật màu.',
          confirmButtonColor: '#3B82F6'
        });
      }
    }
  };

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
    });

    if (result.isConfirmed) {
      try {
        await variantManagerService.deleteProductColor(
          selectedVariantProduct.value.id, 
          colorId
        );
        
        productColors.value = productColors.value.filter(c => c.id !== colorId);

        Swal.fire({
          icon: 'success',
          title: 'Đã xóa màu!',
          timer: 1500,
          showConfirmButton: false
        });
      } catch (error) {
        console.error('Error deleting color:', error);
        Swal.fire({
          icon: 'error',
          title: 'Lỗi xóa màu',
          text: error.message || 'Không thể xóa màu.',
          confirmButtonColor: '#3B82F6'
        });
      }
    }
  };

  // Capacities management
  const loadProductCapacities = async (productId) => {
    try {
      const response = await variantManagerService.getProductCapacities(productId);
      productCapacities.value = response.data || response;
    } catch (error) {
      console.error('Error loading capacities:', error);
    }
  };

  const addCapacity = async () => {
    if (!selectedVariantProduct.value || !newCapacity.value.name.trim() || !newCapacity.value.price) {
      Swal.fire({
        icon: 'warning',
        title: 'Vui lòng nhập đầy đủ thông tin',
        timer: 1500
      });
      return;
    }

    try {
      const response = await variantManagerService.createProductCapacity(
        selectedVariantProduct.value.id, 
        newCapacity.value
      );
      
      productCapacities.value.push(response.data || response);
      newCapacity.value = { name: '', display_name: '', price: 0, discount_price: null, stock: 0 };

      Swal.fire({
        icon: 'success',
        title: 'Đã thêm dung lượng!',
        timer: 1500,
        showConfirmButton: false
      });
    } catch (error) {
      console.error('Error adding capacity:', error);
      Swal.fire({
        icon: 'error',
        title: 'Lỗi thêm dung lượng',
        text: error.message || 'Không thể thêm dung lượng.',
        confirmButtonColor: '#3B82F6'
      });
    }
  };

  const editCapacity = async (capacity) => {
    const { value: formValues } = await Swal.fire({
      title: 'Chỉnh sửa dung lượng',
      html: `
        <input id="cap-name" class="swal2-input" placeholder="Tên" value="${capacity.name}">
        <input id="cap-display" class="swal2-input" placeholder="Tên hiển thị" value="${capacity.display_name || ''}">
        <input id="cap-price" type="number" class="swal2-input" placeholder="Giá" value="${capacity.price}">
        <input id="cap-stock" type="number" class="swal2-input" placeholder="Tồn kho" value="${capacity.stock || 0}">
        <input id="cap-discount" type="number" class="swal2-input" placeholder="Giá khuyến mãi" value="${capacity.discount_price || ''}">
      `,
      focusConfirm: false,
      preConfirm: () => {
        return {
          name: document.getElementById('cap-name').value,
          display_name: document.getElementById('cap-display').value,
          price: parseFloat(document.getElementById('cap-price').value),
          stock: parseInt(document.getElementById('cap-stock').value) || 0,
          discount_price: document.getElementById('cap-discount').value ? 
            parseFloat(document.getElementById('cap-discount').value) : null
        }
      }
    });

    if (formValues && formValues.name.trim() && formValues.price) {
      try {
        await variantManagerService.updateProductCapacity(
          selectedVariantProduct.value.id, 
          capacity.id, 
          formValues
        );

        const index = productCapacities.value.findIndex(c => c.id === capacity.id);
        if (index !== -1) {
          Object.assign(productCapacities.value[index], formValues);
        }

        Swal.fire({
          icon: 'success',
          title: 'Đã cập nhật dung lượng!',
          timer: 1500,
          showConfirmButton: false
        });
      } catch (error) {
        console.error('Error updating capacity:', error);
        Swal.fire({
          icon: 'error',
          title: 'Lỗi cập nhật dung lượng',
          text: error.message || 'Không thể cập nhật dung lượng.',
          confirmButtonColor: '#3B82F6'
        });
      }
    }
  };

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
    });

    if (result.isConfirmed) {
      try {
        await variantManagerService.deleteProductCapacity(
          selectedVariantProduct.value.id, 
          capacityId
        );
        
        productCapacities.value = productCapacities.value.filter(c => c.id !== capacityId);

        Swal.fire({
          icon: 'success',
          title: 'Đã xóa dung lượng!',
          timer: 1500,
          showConfirmButton: false
        });
      } catch (error) {
        console.error('Error deleting capacity:', error);
        Swal.fire({
          icon: 'error',
          title: 'Lỗi xóa dung lượng',
          text: error.message || 'Không thể xóa dung lượng.',
          confirmButtonColor: '#3B82F6'
        });
      }
    }
  };

  // Variants management
  const loadProductVariants = async (productId) => {
    try {
      const response = await variantManagerService.getProductVariants(productId);
      productVariants.value = response.data || response;
    } catch (error) {
      console.error('Error loading variants:', error);
    }
  };

  const generateVariants = async () => {
    if (!selectedVariantProduct.value) return;

    try {
      const response = await variantManagerService.generateVariants(
        selectedVariantProduct.value.id
      );
      
      productVariants.value = response.data || response;

      Swal.fire({
        icon: 'success',
        title: 'Đã tạo variants!',
        timer: 1500,
        showConfirmButton: false
      });
    } catch (error) {
      console.error('Error generating variants:', error);
      Swal.fire({
        icon: 'error',
        title: 'Lỗi tạo variants',
        text: error.message || 'Không thể tạo variants.',
        confirmButtonColor: '#3B82F6'
      });
    }
  };

  const saveVariantChanges = async () => {
    Swal.fire({
      icon: 'success',
      title: 'Đã lưu thay đổi!',
      timer: 1500,
      showConfirmButton: false
    });
  };

  // Helper methods
  const getColorCode = (colorId) => {
    const color = productColors.value.find(c => c.id == colorId);
    return color?.color_code || '#cccccc';
  };

  const getColorName = (colorId) => {
    const color = productColors.value.find(c => c.id == colorId);
    return color?.name || 'Unknown';
  };

  const getCapacityName = (capacityId) => {
    const capacity = productCapacities.value.find(c => c.id == capacityId);
    return capacity?.display_name || capacity?.name || 'Unknown';
  };

  return {
    // State
    showVariantModal,
    selectedVariantProduct,
    activeVariantTab,
    loading,
    productColors,
    productCapacities,
    productVariants,
    newColor,
    newCapacity,
    newVariant,
    
    // Methods
    openVariantManager,
    closeVariantModal,
    loadProductColors,
    loadProductCapacities,
    loadProductVariants,
    addColor,
    editColor,
    deleteColor,
    addCapacity,
    editCapacity,
    deleteCapacity,
    generateVariants,
    saveVariantChanges,
    getColorCode,
    getColorName,
    getCapacityName
  };
}