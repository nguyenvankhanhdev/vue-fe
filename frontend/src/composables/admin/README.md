# Admin Composables

Các composable dành riêng cho **Admin Panel** - quản lý nội bộ.

## Files

- **useProducts.js** - Quản lý sản phẩm (CRUD, phân trang, tìm kiếm)
- **useCategories.js** - Quản lý danh mục (CRUD, toggle status)
- **useUsers.js** - Quản lý người dùng (CRUD, phân quyền)
- **useImageManager.js** - Quản lý ảnh sản phẩm (upload, delete)
- **useVariantManager.js** - Quản lý biến thể sản phẩm (màu sắc, dung lượng)

## Usage

```javascript
import { useProducts, useCategories, useUsers } from '@/composables'
```

## Features

- ✅ Full CRUD operations
- ✅ Advanced filtering & search
- ✅ Pagination support
- ✅ Error handling
- ✅ Loading states
