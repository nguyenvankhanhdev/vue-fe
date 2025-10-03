<template>
  <div class="admin-layout">
    <!-- Sidebar -->
    <nav class="sidebar" :class="{ collapsed: sidebarCollapsed }">
      <div class="sidebar-header">
        <div class="brand" v-if="!sidebarCollapsed">
          <i class="fas fa-store" style="font-family: 'Font Awesome 6 Free'; font-weight: 900;"></i>
          <span>Admin Panel</span>
        </div>
        <button class="sidebar-toggle" @click="toggleSidebar">
          <i class="fas" :class="sidebarCollapsed ? 'fa-bars' : 'fa-times'" style="font-family: 'Font Awesome 6 Free'; font-weight: 900;"></i>
        </button>
      </div>

      <div class="sidebar-menu">
        <ul class="nav">
          <li class="nav-item">
            <router-link to="/admin/dashboard" class="nav-link">
              <i class="fas fa-tachometer-alt" style="font-family: 'Font Awesome 6 Free'; font-weight: 900;"></i>
              <span v-if="!sidebarCollapsed">Dashboard</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/admin/products" class="nav-link">
              <i class="fas fa-boxes" style="font-family: 'Font Awesome 6 Free'; font-weight: 900;"></i>
              <span v-if="!sidebarCollapsed">Quản lý sản phẩm</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/admin/categories" class="nav-link">
              <i class="fas fa-tags" style="font-family: 'Font Awesome 6 Free'; font-weight: 900;"></i>
              <span v-if="!sidebarCollapsed">Danh mục</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/admin/orders" class="nav-link">
              <i class="fas fa-shopping-cart" style="font-family: 'Font Awesome 6 Free'; font-weight: 900;"></i>
              <span v-if="!sidebarCollapsed">Đơn hàng</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/admin/users" class="nav-link">
              <i class="fas fa-users" style="font-family: 'Font Awesome 6 Free'; font-weight: 900;"></i>
              <span v-if="!sidebarCollapsed">Khách hàng</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/admin/reports" class="nav-link">
              <i class="fas fa-chart-bar" style="font-family: 'Font Awesome 6 Free'; font-weight: 900;"></i>
              <span v-if="!sidebarCollapsed">Báo cáo</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/admin/settings" class="nav-link">
              <i class="fas fa-cog" style="font-family: 'Font Awesome 6 Free'; font-weight: 900;"></i>
              <span v-if="!sidebarCollapsed">Cài đặt</span>
            </router-link>
          </li>
        </ul>
      </div>

      <div class="sidebar-footer" v-if="!sidebarCollapsed">
        <div class="admin-info">
          <div class="admin-avatar">
            <i class="fas fa-user-circle" style="font-family: 'Font Awesome 6 Free'; font-weight: 900;"></i>
          </div>
          <div class="admin-details">
            <strong>Admin User</strong>
            <small>Quản trị viên</small>
          </div>
        </div>
        <button class="btn btn-outline-light btn-sm" @click="logout">
          <i class="fas fa-sign-out-alt" style="font-family: 'Font Awesome 6 Free'; font-weight: 900;"></i>
          Đăng xuất
        </button>
      </div>
    </nav>

    <!-- Main Content -->
    <div class="main-content" :class="{ expanded: sidebarCollapsed }">
      <!-- Top Navigation -->
      <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <div class="container-fluid">
          <div class="navbar-nav ms-auto">
            <!-- Notifications -->
            <div class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="notificationDropdown" role="button" data-bs-toggle="dropdown">
                <i class="fas fa-bell" style="font-family: 'Font Awesome 6 Free'; font-weight: 900;"></i>
                <span class="badge bg-danger badge-sm">3</span>
              </a>
              <ul class="dropdown-menu dropdown-menu-end">
                <li><h6 class="dropdown-header">Thông báo mới</h6></li>
                <li><a class="dropdown-item" href="#">Đơn hàng mới #12345</a></li>
                <li><a class="dropdown-item" href="#">Sản phẩm sắp hết hàng</a></li>
                <li><a class="dropdown-item" href="#">Khách hàng mới đăng ký</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item text-center" href="#">Xem tất cả</a></li>
              </ul>
            </div>

            <!-- Messages -->
            <div class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="messageDropdown" role="button" data-bs-toggle="dropdown">
                <i class="fas fa-envelope" style="font-family: 'Font Awesome 6 Free'; font-weight: 900;"></i>
                <span class="badge bg-primary badge-sm">2</span>
              </a>
              <ul class="dropdown-menu dropdown-menu-end">
                <li><h6 class="dropdown-header">Tin nhắn mới</h6></li>
                <li><a class="dropdown-item" href="#">Khiếu nại từ khách hàng</a></li>
                <li><a class="dropdown-item" href="#">Yêu cầu hỗ trợ</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item text-center" href="#">Xem tất cả</a></li>
              </ul>
            </div>

            <!-- User Menu -->
            <div class="nav-item dropdown">
              <a class="nav-link dropdown-toggle d-flex align-items-center" href="#" id="userDropdown" role="button" data-bs-toggle="dropdown">
                <div class="avatar me-2">
                  <i class="fas fa-user-circle fa-lg" style="font-family: 'Font Awesome 6 Free'; font-weight: 900;"></i>
                </div>
                <span>Admin</span>
              </a>
              <ul class="dropdown-menu dropdown-menu-end">
                <li><a class="dropdown-item" href="#"><i class="fas fa-user me-2" style="font-family: 'Font Awesome 6 Free'; font-weight: 900;"></i>Hồ sơ</a></li>
                <li><a class="dropdown-item" href="#"><i class="fas fa-cog me-2" style="font-family: 'Font Awesome 6 Free'; font-weight: 900;"></i>Cài đặt</a></li>
                <li><a class="dropdown-item" href="#"><i class="fas fa-question-circle me-2" style="font-family: 'Font Awesome 6 Free'; font-weight: 900;"></i>Trợ giúp</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item" href="#" @click="logout"><i class="fas fa-sign-out-alt me-2" style="font-family: 'Font Awesome 6 Free'; font-weight: 900;"></i>Đăng xuất</a></li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      <!-- Page Content -->
      <main class="page-content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const sidebarCollapsed = ref(false)

const toggleSidebar = () => {
  sidebarCollapsed.value = !sidebarCollapsed.value
}

const logout = () => {
  if (confirm('Bạn có chắc chắn muốn đăng xuất?')) {
    // Handle logout logic here
    router.push('/')
  }
}
</script>

<style scoped>
.admin-layout {
  display: flex;
  min-height: 100vh;
}

/* Sidebar Styles */
.sidebar {
  width: 280px;
  background: linear-gradient(180deg, #4e73df 0%, #224abe 100%);
  color: white;
  transition: all 0.3s ease;
  position: fixed;
  height: 100vh;
  z-index: 1000;
  overflow-y: auto;
}

.sidebar.collapsed {
  width: 70px;
}

.sidebar-header {
  padding: 1.5rem 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.brand {
  display: flex;
  align-items: center;
  font-size: 1.25rem;
  font-weight: 600;
}

.brand i {
  margin-right: 0.5rem;
  font-size: 1.5rem;
}

.sidebar-toggle {
  background: none;
  border: none;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.sidebar-toggle:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.sidebar-menu {
  padding: 1rem 0;
  flex: 1;
}

.nav {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-item {
  margin-bottom: 0.25rem;
}

.nav-link {
  display: flex;
  align-items: center;
  padding: 0.75rem 1.5rem;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: all 0.3s ease;
  border-radius: 0;
}

.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
}

.nav-link.router-link-active {
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  border-right: 3px solid white;
}

.nav-link i {
  margin-right: 0.75rem;
  width: 20px;
  text-align: center;
}

.sidebar-footer {
  padding: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: auto;
}

.admin-info {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.admin-avatar {
  margin-right: 0.75rem;
  font-size: 2rem;
}

.admin-details strong {
  display: block;
  font-size: 0.9rem;
}

.admin-details small {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.75rem;
}

/* Main Content Styles */
.main-content {
  flex: 1;
  margin-left: 280px;
  transition: all 0.3s ease;
  background-color: #f8f9fc;
}

.main-content.expanded {
  margin-left: 70px;
}

.navbar {
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e3e6f0;
}

.dropdown-toggle::after {
  display: none;
}

.badge-sm {
  font-size: 0.6rem;
  position: absolute;
  top: -2px;
  right: -2px;
}

.avatar {
  color: #5a5c69;
}

.page-content {
  padding: 0;
  min-height: calc(100vh - 76px);
}

/* Responsive Design */
@media (max-width: 768px) {
  .sidebar {
    width: 70px;
  }
  
  .sidebar.collapsed {
    width: 0;
    overflow: hidden;
  }
  
  .main-content {
    margin-left: 70px;
  }
  
  .main-content.expanded {
    margin-left: 0;
  }
  
  .sidebar-header .brand {
    display: none;
  }
  
  .sidebar-footer {
    display: none;
  }
}

/* Custom Scrollbar for Sidebar */
.sidebar::-webkit-scrollbar {
  width: 6px;
}

.sidebar::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
}

.sidebar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 3px;
}

.sidebar::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}
</style>