# 🛠️ Admin Panel - Hướng dẫn sử dụng

## 📋 Tổng quan
Admin Panel được xây dựng với **Vue.js 3** và **Bootstrap 5**, cung cấp giao diện quản lý chuyên nghiệp cho việc CRUD sản phẩm và quản lý cửa hàng.

## 🚀 Tính năng chính

### 📊 Dashboard
- Tổng quan thống kê (doanh thu, đơn hàng, khách hàng, sản phẩm)
- Biểu đồ doanh thu theo thời gian
- Danh sách sản phẩm bán chạy
- Đơn hàng gần đây
- Thao tác nhanh
- Trạng thái hệ thống

### 📦 Quản lý sản phẩm (CRUD hoàn chỉnh)
- ✅ **Create**: Thêm sản phẩm mới với form đầy đủ
- ✅ **Read**: Xem danh sách với phân trang, tìm kiếm, lọc
- ✅ **Update**: Chỉnh sửa thông tin sản phẩm
- ✅ **Delete**: Xóa sản phẩm (đơn lẻ và hàng loạt)

#### Chức năng nâng cao:
- 🔍 Tìm kiếm theo tên, mã sản phẩm
- 🏷️ Lọc theo danh mục, trạng thái
- 📄 Phân trang với điều khiển linh hoạt
- ☑️ Chọn nhiều để xóa hàng loạt
- 📊 Thống kê sản phẩm (tổng, còn hàng, hết hàng)
- 🖼️ Upload hình ảnh (URL)
- 📱 Responsive design

### 🎨 Giao diện
- **Framework**: Bootstrap 5.3.8
- **Icons**: FontAwesome 7.0.1
- **Layout**: Sidebar navigation + Main content
- **Theme**: Professional admin theme với màu xanh chủ đạo
- **Responsive**: Hoạt động tốt trên mọi thiết bị

## 🔐 Truy cập Admin Panel

### Cách 1: Qua Header (Demo)
1. Đăng nhập vào website (mặc định đã đăng nhập cho demo)
2. Click vào tên user ở góc phải header
3. Chọn "Admin Panel" từ dropdown menu

### Cách 2: Direct URL
```
http://localhost:5173/admin
```

## 📁 Cấu trúc file

```
src/views/Admin/
├── AdminLayout.vue       # Layout chính với sidebar
├── AdminDashboard.vue    # Trang dashboard
├── AdminProducts.vue     # Quản lý sản phẩm (CRUD)
├── AdminCategories.vue   # Quản lý danh mục (placeholder)
├── AdminOrders.vue       # Quản lý đơn hàng (placeholder)
├── AdminUsers.vue        # Quản lý khách hàng (placeholder)
├── AdminReports.vue      # Báo cáo (placeholder)
└── AdminSettings.vue     # Cài đặt (placeholder)
```

## 🛡️ Bảo mật

### Authentication Guard
- Route được bảo vệ bởi `requiresAuth` và `requiresAdmin`
- Chỉ admin mới có thể truy cập admin panel
- Redirect về trang chủ nếu không có quyền

### Authorization Check
```javascript
// router.js
meta: { requiresAuth: true, requiresAdmin: true }
```

## 📱 Responsive Design

### Desktop (≥1200px)
- Sidebar đầy đủ với menu text
- Layout 2 cột: sidebar + main content
- Table hiển thị đầy đủ cột

### Tablet (768px - 1199px)
- Sidebar thu gọn chỉ hiển thị icon
- Layout tối ưu cho màn hình trung bình

### Mobile (≤767px)
- Sidebar có thể ẩn/hiện
- Table responsive với scroll ngang
- Form layout 1 cột

## 🎯 Demo Data

### Sản phẩm mẫu
```javascript
- iPhone 15 Pro Max - $1,199
- MacBook Pro 16" - $2,499
- iPad Pro 12.9" - $1,099 (hết hàng)
- AirPods Pro 2 - $249
- Apple Watch Ultra 2 - $799
```

### Dashboard Stats
- Doanh thu tháng: $40,000
- Đơn hàng hôm nay: 25
- Khách hàng mới: 12
- Sản phẩm sắp hết: 8

## 🔧 Customization

### Thay đổi màu theme
```css
/* Tìm và thay đổi các biến CSS */
--primary-color: #4e73df;
--success-color: #1cc88a;
--warning-color: #f6c23e;
--danger-color: #e74c3c;
```

### Thêm chức năng mới
1. Tạo component Vue mới trong `src/views/Admin/`
2. Thêm route vào `router.js`
3. Thêm menu item vào `AdminLayout.vue`

## 📋 TODO - Chức năng mở rộng

- [ ] Quản lý danh mục sản phẩm
- [ ] Quản lý đơn hàng với workflow
- [ ] Quản lý khách hàng
- [ ] Báo cáo và thống kê chi tiết
- [ ] Cài đặt hệ thống
- [ ] Upload file/hình ảnh
- [ ] Integration với Backend API
- [ ] Real-time notifications
- [ ] Export Excel/PDF
- [ ] Dark mode theme

## 🚀 Deployment

### Development
```bash
npm run dev
# Truy cập: http://localhost:5173/admin
```

### Production
```bash
npm run build
```

## 💡 Tips sử dụng

1. **Tìm kiếm nhanh**: Sử dụng search bar để tìm sản phẩm theo tên hoặc mã
2. **Lọc hiệu quả**: Kết hợp các bộ lọc để tìm sản phẩm chính xác
3. **Thao tác hàng loạt**: Chọn nhiều sản phẩm để xóa cùng lúc
4. **Pagination**: Thay đổi số lượng hiển thị tùy theo nhu cầu
5. **Mobile**: Vuốt để xem thêm cột trên mobile

## 🐛 Troubleshooting

### Lỗi routing
- Kiểm tra `localStorage.getItem('userRole')` phải là 'admin'
- Đảm bảo `requiresAuth` và `requiresAdmin` được set đúng

### Lỗi Bootstrap
- Kiểm tra import Bootstrap CSS/JS trong `main.js`
- Đảm bảo dependencies được cài đặt

### Performance
- Sử dụng pagination thay vì load tất cả sản phẩm
- Implement lazy loading cho hình ảnh

---

**Phát triển bởi**: VueShop Team
**Version**: 1.0.0
**Cập nhật**: September 2025