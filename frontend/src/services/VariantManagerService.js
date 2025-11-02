// src/services/VariantManagerService.js
import apiClient from './apiClient';

class VariantManagerService {
  // Colors management
  async getProductColors(productId) {
    const response = await apiClient.get(`/products/${productId}/colors`);
    return response;
  }

  async createProductColor(productId, colorData) {
    const response = await apiClient.post(`/products/${productId}/colors`, colorData);
    return response;
  }

  async updateProductColor(productId, colorId, colorData) {
    const response = await apiClient.put(`/products/${productId}/colors/${colorId}`, colorData);
    return response;
  }

  async deleteProductColor(productId, colorId) {
    const response = await apiClient.delete(`/products/${productId}/colors/${colorId}`);
    return response;
  }

  // Capacities management
  async getProductCapacities(productId) {
    const response = await apiClient.get(`/products/${productId}/capacities`);
    return response;
  }

  async createProductCapacity(productId, capacityData) {
    const response = await apiClient.post(`/products/${productId}/capacities`, capacityData);
    return response;
  }

  async updateProductCapacity(productId, capacityId, capacityData) {
    const response = await apiClient.put(`/products/${productId}/capacities/${capacityId}`, capacityData);
    return response;
  }

  async deleteProductCapacity(productId, capacityId) {
    const response = await apiClient.delete(`/products/${productId}/capacities/${capacityId}`);
    return response;
  }

  // Variants management
  async getProductVariants(productId) {
    const response = await apiClient.get(`/products/${productId}/variants`);
    return response;
  }

  async createProductVariant(productId, variantData) {
    const response = await apiClient.post(`/products/${productId}/variants`, variantData);
    return response;
  }

  async updateProductVariant(productId, variantId, variantData) {
    const response = await apiClient.put(`/products/${productId}/variants/${variantId}`, variantData);
    return response;
  }

  async deleteProductVariant(productId, variantId) {
    const response = await apiClient.delete(`/products/${productId}/variants/${variantId}`);
    return response;
  }

  // Generate variants automatically
  async generateVariants(productId, options = {}) {
    const response = await apiClient.post(`/products/${productId}/variants/generate`, options);
    return response;
  }

  // Bulk operations
  async bulkUpdateVariants(productId, variants) {
    const response = await apiClient.put(`/products/${productId}/variants/bulk-update`, {
      variants: variants
    });
    return response;
  }

  async bulkDeleteVariants(productId, variantIds) {
    const response = await apiClient.delete(`/products/${productId}/variants/bulk-delete`, {
      data: { variant_ids: variantIds }
    });
    return response;
  }
}

export const variantManagerService = new VariantManagerService();
export default variantManagerService;