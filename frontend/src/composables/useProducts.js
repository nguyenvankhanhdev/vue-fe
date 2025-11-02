// src/composables/useProducts.js
import { ref, computed, reactive } from 'vue';
import { productService } from '../services/productService';
import { ApiError } from '../services/apiError';

// Global state cho products
const products = ref([]);
const product = ref(null);
const categories = ref([]);
const loading = ref(false);
const saving = ref(false);
const error = ref(null);

// Pagination state
const pagination = reactive({
  current_page: 1,
  last_page: 1,
  per_page: 10,
  total: 0,
  from: 0,
  to: 0
});

// Filters state
const filters = reactive({
  search: '',
  category_id: null,
  min_price: null,
  max_price: null,
  sort_by: 'created_at',
  sort_order: 'desc',
  status: null
});

// Selected products for bulk actions
const selectedProducts = ref([]);

// Stats computed
const stats = computed(() => {
  const totalProducts = products.value.length;
  const activeProducts = products.value.filter(p => p.active).length;
  const outOfStockProducts = products.value.filter(p => p.stock === 0).length;
  const lowStockProducts = products.value.filter(p => p.stock > 0 && p.stock <= 5).length;

  return {
    total: totalProducts,
    active: activeProducts,
    outOfStock: outOfStockProducts,
    lowStock: lowStockProducts
  };
});

export function useProducts() {
  // Load products with pagination and filters
  const loadProducts = async (page = 1, resetProducts = false) => {
    loading.value = true;
    error.value = null;
    
    try {
      const params = {
        page,
        per_page: pagination.per_page,
        ...filters
      };

      const response = await productService.getProducts(params);
      
      // Handle different response structures
      if (response.data && Array.isArray(response.data)) {
        // Paginated response
        products.value = resetProducts ? response.data : [...products.value, ...response.data];
        
        // Update pagination
        Object.assign(pagination, {
          current_page: response.current_page || page,
          last_page: response.last_page || 1,
          per_page: response.per_page || 10,
          total: response.total || response.data.length,
          from: response.from || ((page - 1) * pagination.per_page) + 1,
          to: response.to || page * pagination.per_page
        });
      } else if (Array.isArray(response)) {
        // Simple array response
        products.value = resetProducts ? response : [...products.value, ...response];
        Object.assign(pagination, {
          current_page: page,
          last_page: 1,
          total: response.length
        });
      } else {
        throw new Error('Unexpected response format');
      }
    } catch (err) {
      error.value = err instanceof ApiError ? err.message : 'Lỗi khi tải danh sách sản phẩm';
      console.error('Error loading products:', err);
    } finally {
      loading.value = false;
    }
  };

  // Load single product
  const loadProduct = async (id) => {
    loading.value = true;
    error.value = null;
    
    try {
      const response = await productService.getProduct(id);
      product.value = response.data || response;
      return product.value;
    } catch (err) {
      error.value = err instanceof ApiError ? err.message : 'Lỗi khi tải thông tin sản phẩm';
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // Create new product
  const createProduct = async (productData) => {
    saving.value = true;
    error.value = null;
    
    try {
      const response = await productService.createProduct(productData);
      const newProduct = response.data || response;
      
      products.value.unshift(newProduct);
      pagination.total++;
      
      return newProduct;
    } catch (err) {
      error.value = err instanceof ApiError ? err.message : 'Lỗi khi tạo sản phẩm';
      throw err;
    } finally {
      saving.value = false;
    }
  };

  // Update product
  const updateProduct = async (id, productData) => {
    saving.value = true;
    error.value = null;
    
    try {
      const response = await productService.updateProduct(id, productData);
      const updatedProduct = response.data || response;
      
      // Update in products list
      const index = products.value.findIndex(p => p.id === id);
      if (index !== -1) {
        products.value[index] = updatedProduct;
      }
      
      // Update current product if it's the same
      if (product.value && product.value.id === id) {
        product.value = updatedProduct;
      }
      
      return updatedProduct;
    } catch (err) {
      error.value = err instanceof ApiError ? err.message : 'Lỗi khi cập nhật sản phẩm';
      throw err;
    } finally {
      saving.value = false;
    }
  };

  // Delete product
  const deleteProduct = async (id) => {
    loading.value = true;
    error.value = null;
    
    try {
      await productService.deleteProduct(id);
      
      // Remove from products list
      const index = products.value.findIndex(p => p.id === id);
      if (index !== -1) {
        products.value.splice(index, 1);
        pagination.total--;
      }
      
      // Clear current product if it's the same
      if (product.value && product.value.id === id) {
        product.value = null;
      }
      
      return true;
    } catch (err) {
      error.value = err instanceof ApiError ? err.message : 'Lỗi khi xóa sản phẩm';
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // Upload product image
  const uploadProductImage = async (productId, imageFile) => {
    saving.value = true;
    error.value = null;
    
    try {
      const response = await productService.uploadProductImage(productId, imageFile);
      
      // Update product image in list and current product
      const updatedImageUrl = response.data?.image || response.image;
      
      const index = products.value.findIndex(p => p.id === productId);
      if (index !== -1) {
        products.value[index].image = updatedImageUrl;
      }
      
      if (product.value && product.value.id === productId) {
        product.value.image = updatedImageUrl;
      }
      
      return response;
    } catch (err) {
      error.value = err instanceof ApiError ? err.message : 'Lỗi khi tải lên hình ảnh';
      throw err;
    } finally {
      saving.value = false;
    }
  };

  // Load categories
  const loadCategories = async () => {
    try {
      const response = await productService.getCategories();
      categories.value = response.data || response;
      return categories.value;
    } catch (err) {
      console.error('Error loading categories:', err);
      return [];
    }
  };

  // Search products
  const searchProducts = async (query) => {
    filters.search = query;
    await loadProducts(1, true);
  };

  // Apply filters
  const applyFilters = async (newFilters) => {
    Object.assign(filters, newFilters);
    await loadProducts(1, true);
  };

  // Reset filters
  const resetFilters = async () => {
    Object.assign(filters, {
      search: '',
      category_id: null,
      min_price: null,
      max_price: null,
      sort_by: 'created_at',
      sort_order: 'desc',
      status: null
    });
    await loadProducts(1, true);
  };

  // Pagination methods
  const goToPage = async (page) => {
    if (page >= 1 && page <= pagination.last_page) {
      await loadProducts(page, true);
    }
  };

  const nextPage = async () => {
    if (pagination.current_page < pagination.last_page) {
      await loadProducts(pagination.current_page + 1, true);
    }
  };

  const previousPage = async () => {
    if (pagination.current_page > 1) {
      await loadProducts(pagination.current_page - 1, true);
    }
  };

  const changePageSize = async (newSize) => {
    pagination.per_page = newSize;
    await loadProducts(1, true);
  };

  // Bulk actions
  const selectProduct = (productId) => {
    const index = selectedProducts.value.indexOf(productId);
    if (index === -1) {
      selectedProducts.value.push(productId);
    } else {
      selectedProducts.value.splice(index, 1);
    }
  };

  const selectAllProducts = () => {
    if (selectedProducts.value.length === products.value.length) {
      selectedProducts.value = [];
    } else {
      selectedProducts.value = products.value.map(p => p.id);
    }
  };

  const bulkDelete = async () => {
    if (selectedProducts.value.length === 0) return;
    
    loading.value = true;
    error.value = null;
    
    try {
      await productService.bulkDeleteProducts(selectedProducts.value);
      
      // Remove deleted products from list
      products.value = products.value.filter(p => !selectedProducts.value.includes(p.id));
      pagination.total -= selectedProducts.value.length;
      selectedProducts.value = [];
      
      return true;
    } catch (err) {
      error.value = err instanceof ApiError ? err.message : 'Lỗi khi xóa sản phẩm';
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const bulkUpdateStatus = async (status) => {
    if (selectedProducts.value.length === 0) return;
    
    loading.value = true;
    error.value = null;
    
    try {
      await productService.bulkUpdateProducts(selectedProducts.value, { active: status });
      
      // Update products status in list
      products.value.forEach(product => {
        if (selectedProducts.value.includes(product.id)) {
          product.active = status;
        }
      });
      
      selectedProducts.value = [];
      return true;
    } catch (err) {
      error.value = err instanceof ApiError ? err.message : 'Lỗi khi cập nhật trạng thái sản phẩm';
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // Utility methods
  const clearError = () => {
    error.value = null;
  };

  const refreshProducts = async () => {
    await loadProducts(pagination.current_page, true);
  };

  return {
    // State
    products: computed(() => products.value),
    product: computed(() => product.value),
    categories: computed(() => categories.value),
    loading: computed(() => loading.value),
    saving: computed(() => saving.value),
    error: computed(() => error.value),
    pagination: computed(() => pagination),
    filters: computed(() => filters),
    selectedProducts: computed(() => selectedProducts.value),
    
    // Filter properties
    searchQuery: computed({
      get: () => filters.search,
      set: (value) => filters.search = value
    }),
    selectedCategory: computed({
      get: () => filters.category_id,
      set: (value) => filters.category_id = value
    }),
    selectedStatus: computed({
      get: () => filters.status,
      set: (value) => filters.status = value
    }),
    currentPage: computed(() => pagination.current_page),
    perPage: computed({
      get: () => pagination.per_page,
      set: (value) => pagination.per_page = value
    }),
    
    stats,

    // Methods
    loadProducts,
    loadProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    uploadProductImage,
    loadCategories,
    searchProducts,
    applyFilters,
    resetFilters,
    goToPage,
    nextPage,
    previousPage,
    changePageSize,
    selectProduct,
    selectAllProducts,
    bulkDelete,
    bulkUpdateStatus,
    clearError,
    refreshProducts
  };
}
