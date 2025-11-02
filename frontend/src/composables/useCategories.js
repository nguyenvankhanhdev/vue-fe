// src/composables/useCategories.js
import { ref, computed, reactive } from 'vue';
import { categoryService } from '../services/categoryService';
import { ApiError } from '../services/apiError';

// Global state cho categories
const categories = ref([]);
const category = ref(null);
const loading = ref(false);
const saving = ref(false);
const error = ref(null);

// Tree view state
const expandedCategories = ref([]);
const viewMode = ref('table'); // 'table', 'tree', 'cards'

// Selected categories for bulk actions
const selectedCategories = ref([]);

// Filters state
const filters = reactive({
  search: '',
  parent_id: null,
  status: null,
  sort_by: 'name',
  sort_order: 'asc'
});

// Computed properties
const rootCategories = computed(() => {
  return categories.value.filter(cat => !cat.parent_id);
});

const orphanCategories = computed(() => {
  return categories.value.filter(cat => 
    cat.parent_id && !categories.value.some(parent => parent.id === cat.parent_id)
  );
});

const parentCategories = computed(() => {
  return categories.value.filter(cat => 
    !cat.parent_id && // Only root level categories can be parents
    cat.id !== category.value?.id // Can't be parent of itself
  );
});

const stats = computed(() => {
  const totalCategories = categories.value.length;
  const activeCategories = categories.value.filter(c => c.status).length;
  const totalProducts = categories.value.reduce((sum, c) => sum + (c.product_count || 0), 0);
  const emptyCategories = categories.value.filter(c => (c.product_count || 0) === 0).length;

  return {
    total: totalCategories,
    active: activeCategories,
    totalProducts: totalProducts,
    empty: emptyCategories
  };
});

export function useCategories() {
  // Load categories
  const loadCategories = async () => {
    loading.value = true;
    error.value = null;
    
    try {
      const response = await categoryService.getCategories(filters);
      
      // Handle different response structures
      if (response.data && Array.isArray(response.data)) {
        categories.value = response.data;
      } else if (Array.isArray(response)) {
        categories.value = response;
      } else {
        throw new Error('Unexpected response format');
      }
    } catch (err) {
      error.value = err instanceof ApiError ? err.message : 'Lỗi khi tải danh sách danh mục';
      console.error('Error loading categories:', err);
    } finally {
      loading.value = false;
    }
  };

  // Load single category
  const loadCategory = async (id) => {
    loading.value = true;
    error.value = null;
    
    try {
      const response = await categoryService.getCategory(id);
      category.value = response.data || response;
      return category.value;
    } catch (err) {
      error.value = err instanceof ApiError ? err.message : 'Lỗi khi tải thông tin danh mục';
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // Create new category
  const createCategory = async (categoryData) => {
    saving.value = true;
    error.value = null;
    
    try {
      const response = await categoryService.createCategory(categoryData);
      const newCategory = response.data || response;
      
      categories.value.unshift(newCategory);
      return newCategory;
    } catch (err) {
      error.value = err instanceof ApiError ? err.message : 'Lỗi khi tạo danh mục';
      throw err;
    } finally {
      saving.value = false;
    }
  };

  // Update category
  const updateCategory = async (id, categoryData) => {
    saving.value = true;
    error.value = null;
    
    try {
      const response = await categoryService.updateCategory(id, categoryData);
      const updatedCategory = response.data || response;
      
      // Update in categories list
      const index = categories.value.findIndex(c => c.id === id);
      if (index !== -1) {
        categories.value[index] = updatedCategory;
      }
      
      // Update current category if it's the same
      if (category.value && category.value.id === id) {
        category.value = updatedCategory;
      }
      
      return updatedCategory;
    } catch (err) {
      error.value = err instanceof ApiError ? err.message : 'Lỗi khi cập nhật danh mục';
      throw err;
    } finally {
      saving.value = false;
    }
  };

  // Delete category
  const deleteCategory = async (id) => {
    loading.value = true;
    error.value = null;
    
    try {
      await categoryService.deleteCategory(id);
      
      // Remove from categories list
      const index = categories.value.findIndex(c => c.id === id);
      if (index !== -1) {
        categories.value.splice(index, 1);
      }
      
      // Clear current category if it's the same
      if (category.value && category.value.id === id) {
        category.value = null;
      }
      
      return true;
    } catch (err) {
      error.value = err instanceof ApiError ? err.message : 'Lỗi khi xóa danh mục';
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // Tree view methods
  const toggleExpand = (categoryId) => {
    const index = expandedCategories.value.indexOf(categoryId);
    if (index > -1) {
      expandedCategories.value.splice(index, 1);
    } else {
      expandedCategories.value.push(categoryId);
    }
  };

  const getChildCategories = (parentId) => {
    return categories.value.filter(cat => cat.parent_id === parentId);
  };

  const getParentName = (parentId) => {
    const parent = categories.value.find(cat => cat.id === parentId);
    return parent ? parent.name : 'Không xác định';
  };

  // Search categories
  const searchCategories = async (query) => {
    filters.search = query;
    await loadCategories();
  };

  // Apply filters
  const applyFilters = async (newFilters) => {
    Object.assign(filters, newFilters);
    await loadCategories();
  };

  // Reset filters
  const resetFilters = async () => {
    Object.assign(filters, {
      search: '',
      parent_id: null,
      status: null,
      sort_by: 'name',
      sort_order: 'asc'
    });
    await loadCategories();
  };

  // View mode methods
  const setViewMode = (mode) => {
    viewMode.value = mode;
  };

  // Bulk actions
  const selectCategory = (categoryId) => {
    const index = selectedCategories.value.indexOf(categoryId);
    if (index === -1) {
      selectedCategories.value.push(categoryId);
    } else {
      selectedCategories.value.splice(index, 1);
    }
  };

  const selectAllCategories = () => {
    if (selectedCategories.value.length === categories.value.length) {
      selectedCategories.value = [];
    } else {
      selectedCategories.value = categories.value.map(c => c.id);
    }
  };

  const bulkDelete = async () => {
    if (selectedCategories.value.length === 0) return;
    
    loading.value = true;
    error.value = null;
    
    try {
      await categoryService.bulkDeleteCategories(selectedCategories.value);
      
      // Remove deleted categories from list
      categories.value = categories.value.filter(c => !selectedCategories.value.includes(c.id));
      selectedCategories.value = [];
      
      return true;
    } catch (err) {
      error.value = err instanceof ApiError ? err.message : 'Lỗi khi xóa danh mục';
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const bulkUpdateStatus = async (status) => {
    if (selectedCategories.value.length === 0) return;
    
    loading.value = true;
    error.value = null;
    
    try {
      await categoryService.bulkUpdateCategories(selectedCategories.value, { status: status });
      
      // Update categories status in list
      categories.value.forEach(category => {
        if (selectedCategories.value.includes(category.id)) {
          category.status = status;
        }
      });
      
      selectedCategories.value = [];
      return true;
    } catch (err) {
      error.value = err instanceof ApiError ? err.message : 'Lỗi khi cập nhật trạng thái danh mục';
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // Drag & drop methods
  const moveCategory = async (categoryId, newParentId) => {
    loading.value = true;
    error.value = null;
    
    try {
      const response = await categoryService.moveCategory(categoryId, newParentId);
      const updatedCategory = response.data || response;
      
      // Update in categories list
      const index = categories.value.findIndex(c => c.id === categoryId);
      if (index !== -1) {
        categories.value[index] = updatedCategory;
      }
      
      return updatedCategory;
    } catch (err) {
      error.value = err instanceof ApiError ? err.message : 'Lỗi khi di chuyển danh mục';
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const reorderCategories = async (orderedIds) => {
    loading.value = true;
    error.value = null;
    
    try {
      await categoryService.reorderCategories(orderedIds);
      
      // Reorder categories in list
      const orderedCategories = orderedIds.map(id => 
        categories.value.find(c => c.id === id)
      ).filter(Boolean);
      
      categories.value = orderedCategories;
      return true;
    } catch (err) {
      error.value = err instanceof ApiError ? err.message : 'Lỗi khi sắp xếp lại danh mục';
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // Utility methods
  const clearError = () => {
    error.value = null;
  };

  const refreshCategories = async () => {
    await loadCategories();
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount || 0);
  };

  return {
    // State
    categories: computed(() => categories.value),
    category: computed(() => category.value),
    loading: computed(() => loading.value),
    saving: computed(() => saving.value),
    error: computed(() => error.value),
    filters: computed(() => filters),
    selectedCategories: computed(() => selectedCategories.value),
    expandedCategories: computed(() => expandedCategories.value),
    viewMode: computed(() => viewMode.value),
    
    // Computed
    rootCategories,
    orphanCategories,
    parentCategories,
    stats,

    // Methods
    loadCategories,
    loadCategory,
    createCategory,
    updateCategory,
    deleteCategory,
    toggleExpand,
    getChildCategories,
    getParentName,
    searchCategories,
    applyFilters,
    resetFilters,
    setViewMode,
    selectCategory,
    selectAllCategories,
    bulkDelete,
    bulkUpdateStatus,
    moveCategory,
    reorderCategories,
    clearError,
    refreshCategories,
    formatCurrency
  };
}
