// src/services/categoryService.js
import apiClient from './apiClient';

class CategoryService {
  // Lấy danh sách danh mục
  async getCategories(params = {}) {
    const response = await apiClient.get('/categories', { params });
    return response;
  }

  // Lấy chi tiết danh mục theo ID
  async getCategory(id) {
    const response = await apiClient.get(`/categories/${id}`);
    return response;
  }

  // Tạo danh mục mới (Admin)
  async createCategory(categoryData) {
    const response = await apiClient.post('/categories', categoryData);
    return response;
  }

  // Cập nhật danh mục (Admin)
  async updateCategory(id, categoryData) {
    const response = await apiClient.put(`/categories/${id}`, categoryData);
    return response;
  }

  // Xóa danh mục (Admin)
  async deleteCategory(id) {
    const response = await apiClient.delete(`/categories/${id}`);
    return response;
  }

  // Lấy danh mục theo hierarchy (tree structure)
  async getCategoryTree() {
    const response = await apiClient.get('/categories/tree');
    return response;
  }

  // Lấy danh mục root (không có parent)
  async getRootCategories() {
    const response = await apiClient.get('/categories', { 
      params: { parent_id: null } 
    });
    return response;
  }

  // Lấy danh mục con theo parent ID
  async getChildCategories(parentId) {
    const response = await apiClient.get('/categories', { 
      params: { parent_id: parentId } 
    });
    return response;
  }

  // Bulk actions
  async bulkUpdateCategories(categoryIds, updateData) {
    const response = await apiClient.put('/categories/bulk-update', {
      category_ids: categoryIds,
      ...updateData
    });
    return response;
  }

  async bulkDeleteCategories(categoryIds) {
    const response = await apiClient.delete('/categories/bulk-delete', {
      data: { category_ids: categoryIds }
    });
    return response;
  }

  // Search categories
  async searchCategories(query, filters = {}) {
    const params = {
      search: query,
      ...filters
    };
    return this.getCategories(params);
  }

  // Reorder categories (for drag & drop)
  async reorderCategories(orderedIds) {
    const response = await apiClient.put('/categories/reorder', {
      ordered_ids: orderedIds
    });
    return response;
  }

  // Move category to different parent
  async moveCategory(categoryId, newParentId) {
    const response = await apiClient.put(`/categories/${categoryId}/move`, {
      parent_id: newParentId
    });
    return response;
  }
}

// Export single instance
export const categoryService = new CategoryService();
export default categoryService;