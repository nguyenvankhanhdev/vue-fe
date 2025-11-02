# Client Composables

Các composable dành cho **khách hàng** - phần hiển thị công khai.

## Files

- **useClientProducts.js** - Hiển thị sản phẩm cho khách (chỉ active, filtering, sorting)

## Usage

```javascript
import { useClientProducts } from '@/composables'
```

## Features

- ✅ Chỉ hiển thị sản phẩm active (status=1)
- ✅ Filter theo category, brand, price, rating
- ✅ Search theo tên, mô tả
- ✅ Sort theo giá, tên, rating, mới nhất
- ✅ Hỗ trợ slug-based URLs
- ✅ Tính toán giá từ price_range
- ✅ Xử lý discount từ capacities
