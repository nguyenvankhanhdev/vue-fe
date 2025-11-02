// src/services/ImageManagerService.js
import apiClient from './apiClient';

class ImageManagerService {
  // Upload single image (API chỉ hỗ trợ upload 1 ảnh/request)
  async uploadProductImage(productId, file, alt = null) {
    const formData = new FormData();
    formData.append('product_id', productId);
    formData.append('image', file);
    if (alt) {
      formData.append('alt', alt);
    }
    
    const response = await apiClient.post(`/products/${productId}/images`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  }

  // Upload multiple images (gọi API nhiều lần)
  async uploadProductImages(productId, files) {
    const uploadPromises = files.map(file => 
      this.uploadProductImage(productId, file)
    );
    return Promise.allSettled(uploadPromises);
  }

  // Get all images for a product
  async getProductImages(productId) {
    const response = await apiClient.get(`/products/${productId}/images`);
    return response;
  }

  // Update image (alt text, image file, etc.)
  async updateProductImage(productId, imageId, imageData) {
    const formData = new FormData();
    formData.append('product_id', productId);
    
    if (imageData.image instanceof File) {
      formData.append('image', imageData.image);
    }
    if (imageData.alt !== undefined) {
      formData.append('alt', imageData.alt);
    }
    
    const response = await apiClient.post(`/products/${productId}/images/${imageId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      params: { _method: 'PUT' } // Laravel method spoofing
    });
    return response;
  }

  // Delete single image
  async deleteProductImage(productId, imageId) {
    const response = await apiClient.delete(`/products/${productId}/images/${imageId}`);
    return response;
  }

  // Delete multiple images (gọi API nhiều lần)
  async deleteMultipleImages(productId, imageIds) {
    const deletePromises = imageIds.map(imageId => 
      this.deleteProductImage(productId, imageId)
    );
    return Promise.allSettled(deletePromises);
  }
}

export const imageManagerService = new ImageManagerService();
export default imageManagerService;