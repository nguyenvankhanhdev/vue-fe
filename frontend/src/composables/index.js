// Composables Index - Centralized Export
// ======================================

// ============ ADMIN COMPOSABLES ============
// For admin panel management
export { useProducts } from './admin/useProducts'
export { useCategories } from './admin/useCategories'
export { useUsers } from './admin/useUsers'
export { useImageManager } from './admin/useImageManager'
export { useVariantManager } from './admin/useVariantManager'

// ============ CLIENT COMPOSABLES ============
// For customer-facing features
export { useClientProducts } from './client/useClientProducts'
export { useProductDetail } from './client/useProductDetail'

// ============ SHARED COMPOSABLES ============
// Used by both admin and client
export { useAuth } from './shared/useAuth'
export { useLoading } from './shared/useLoading'
export { useApi } from './shared/useApi'
