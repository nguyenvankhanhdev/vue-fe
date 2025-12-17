// src/services/productService.js
import apiClient from './apiClient';

class ProductService {
  // Lấy danh sách sản phẩm với pagination và filters
  async getProducts(params = {}) {
    const response = await apiClient.get('/products', { params });
    return response;
  }

  // Lấy chi tiết sản phẩm theo ID
  async getProduct(id) {
    const response = await apiClient.get(`/products/${id}`);
    return response;
  }

  // Lấy chi tiết sản phẩm theo slug
  async getProductBySlug(slug) {
    const response = await apiClient.get(`/products/${slug}`, {
      params: {
        include: 'colors,capacities,variants,product_images,category'
      }
    });
    return response;
  }

  // Lấy colors của sản phẩm
  async getProductColors(productId) {
    try {
      const response = await apiClient.get(`/products/${productId}/colors`);
      return response;
    } catch (error) {
      console.warn('Failed to load product colors:', error);
      return { data: [] };
    }
  }

  // Lấy capacities của sản phẩm
  async getProductCapacities(productId) {
    try {
      const response = await apiClient.get(`/products/${productId}/capacities`);
      return response;
    } catch (error) {
      console.warn('Failed to load product capacities:', error);
      return { data: [] };
    }
  }

  // Lấy variants của sản phẩm
  async getProductVariants(productId) {
    try {
      const response = await apiClient.get(`/products/${productId}/variants`);
      return response;
    } catch (error) {
      console.warn('Failed to load product variants:', error);
      return { data: [] };
    }
  }

  // Tạo sản phẩm mới (Admin)
  async createProduct(productData) {
    const response = await apiClient.post('/products', productData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  }

  // Cập nhật sản phẩm (Admin)
  async updateProduct(id, productData) {
    // Laravel không parse FormData từ PUT request
    // Phải dùng POST với _method=PUT
    const response = await apiClient.post(`/products/${id}`, productData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  }

  // Xóa sản phẩm (Admin)
  async deleteProduct(id) {
    const response = await apiClient.delete(`/products/${id}`);
    return response;
  }

  // Upload hình ảnh sản phẩm
  async uploadProductImage(productId, imageFile) {
    const formData = new FormData();
    formData.append('image', imageFile);
    
    const response = await apiClient.post(`/products/${productId}/image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  }

  // Lấy danh sách categories cho dropdown
  async getCategories() {
    const response = await apiClient.get('/categories');
    return response;
  }

  // Bulk actions
  async bulkUpdateProducts(productIds, updateData) {
    const response = await apiClient.put('/products/bulk-update', {
      product_ids: productIds,
      ...updateData
    });
    return response;
  }

  async bulkDeleteProducts(productIds) {
    const response = await apiClient.delete('/products/bulk-delete', {
      data: { product_ids: productIds }
    });
    return response;
  }

  // Search và filter methods
  async searchProducts(query, filters = {}) {
    const params = {
      search: query,
      ...filters
    };
    return this.getProducts(params);
  }

  // Advanced filtering
  async getProductsByCategory(categoryId, params = {}) {
    return this.getProducts({ category_id: categoryId, ...params });
  }

  async getProductsByPriceRange(minPrice, maxPrice, params = {}) {
    return this.getProducts({ 
      min_price: minPrice, 
      max_price: maxPrice, 
      ...params 
    });
  }

  async getFeaturedProducts(params = {}) {
    return this.getProducts({ featured: true, ...params });
  }

  async getTopSellingProducts(params = {}) {
    return this.getProducts({ sort_by: 'sales', sort_order: 'desc', ...params });
  }
}

// Export single instance
export const productService = new ProductService();
export default productService;