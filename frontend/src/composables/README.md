# Composables Documentation

Thư mục chứa **Vue 3 Composables** - các function tái sử dụng cho logic nghiệp vụ.

## 📁 Cấu trúc thư mục

```
composables/
├── index.js              # Central export - import từ đây
├── admin/                # 🔒 Admin-only composables
│   ├── useProducts.js
│   ├── useCategories.js
│   ├── useUsers.js
│   ├── useImageManager.js
│   └── useVariantManager.js
├── client/               # 👥 Client-facing composables
│   └── useClientProducts.js
└── shared/               # 🌐 Shared composables
    ├── useAuth.js
    ├── useLoading.js
    └── useApi.js
```

## 🎯 Nguyên tắc tổ chức

### Admin Composables (`admin/`)
- Chỉ dùng cho **Admin Panel**
- Full CRUD operations
- Không filter theo status (hiển thị cả active/inactive)
- Có quyền sửa/xóa

### Client Composables (`client/`)
- Dùng cho **khách hàng** (phần công khai)
- Chỉ đọc dữ liệu (read-only)
- Chỉ hiển thị items có `status=1` (active)
- Tối ưu cho UX

### Shared Composables (`shared/`)
- Dùng chung cho **cả Admin và Client**
- Authentication, Loading, API client
- Core functionality

## 📦 Cách sử dụng

**ĐÚNG** ✅ - Import từ index.js:
```javascript
import { useProducts, useCategories, useUsers } from '@/composables'
import { useClientProducts } from '@/composables'
import { useAuth, useLoading } from '@/composables'
```

**SAI** ❌ - Không import trực tiếp:
```javascript
// ❌ Không làm thế này
import { useProducts } from '@/composables/admin/useProducts'
import { useAuth } from '@/composables/shared/useAuth'
```

## 🔍 Composables có sẵn

### Admin
- `useProducts()` - CRUD sản phẩm, phân trang, tìm kiếm
- `useCategories()` - CRUD danh mục, toggle status
- `useUsers()` - CRUD người dùng, phân quyền (Admin/Customer)
- `useImageManager()` - Upload/delete ảnh sản phẩm
- `useVariantManager()` - Quản lý variants (colors, capacities)

### Client
- `useClientProducts()` - Hiển thị sản phẩm, filter, sort, search

### Shared
- `useAuth()` - Login, logout, register, verify email
- `useLoading()` - Global loading state
- `useApi()` - Axios wrapper với interceptors

## 📝 Ví dụ

### Admin Product Management
```vue
<script setup>
import { useProducts } from '@/composables'

const { 
  products, 
  loading, 
  loadProducts, 
  createProduct,
  updateProduct,
  deleteProduct 
} = useProducts()

onMounted(() => loadProducts())
</script>
```

### Client Product Listing
```vue
<script setup>
import { useClientProducts } from '@/composables'

const { 
  filteredProducts,
  categories,
  selectedCategory,
  loadProducts 
} = useClientProducts()

onMounted(() => loadProducts())
</script>
```

## ✅ Đã kiểm tra

- ✅ Tất cả imports đã được cập nhật
- ✅ Không có lỗi compile
- ✅ Export/import paths đúng
- ✅ Services references đúng
- ✅ Cấu trúc thư mục rõ ràng
