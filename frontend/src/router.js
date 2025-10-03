import { createRouter, createWebHistory } from 'vue-router'
import { toastService } from './services/toast'

// Khai báo danh sách route
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('./views/Home.vue'),
  },
  {
    path: '/products',
    name: 'Products',
    component: () => import('./views/Products.vue'),
  },
  {
    path: '/products/:id',
    name: 'ProductDetail',
    component: () => import('./views/ProductDetail.vue'),
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('./views/Cart.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('./views/Login.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('./views/Register.vue'),
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: () => import('./views/Checkout.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('./views/Profile.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/orders',
    name: 'Orders',
    component: () => import('./views/Orders.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/categories',
    name: 'Categories',
    component: () => import('./views/Categories.vue'),
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('./views/Contact.vue'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('./views/About.vue'),
  },
  // Admin Routes
  {
    path: '/admin',
    component: () => import('./views/Admin/AdminLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        redirect: '/admin/dashboard'
      },
      {
        path: 'dashboard',
        name: 'AdminDashboard',
        component: () => import('./views/Admin/AdminDashboard.vue'),
      },
      {
        path: 'products',
        name: 'AdminProducts',
        component: () => import('./views/Admin/AdminProducts.vue'),
      },
      {
        path: 'categories',
        name: 'AdminCategories',
        component: () => import('./views/Admin/AdminCategories.vue'),
      },
      {
        path: 'orders',
        name: 'AdminOrders',
        component: () => import('./views/Admin/AdminOrders.vue'),
      },
      {
        path: 'users',
        name: 'AdminUsers',
        component: () => import('./views/Admin/AdminUsers.vue'),
      },
      {
        path: 'reports',
        name: 'AdminReports',
        component: () => import('./views/Admin/AdminReports.vue'),
      },
      {
        path: 'settings',
        name: 'AdminSettings',
        component: () => import('./views/Admin/AdminSettings.vue'),
      }
    ]
  },
  // 404 Page
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('./views/NotFound.vue'),
  }
]

// Tạo router
const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Navigation guard để kiểm tra authentication
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token')
  const user = localStorage.getItem('user')
  
  // Check if user is truly authenticated
  const isLoggedIn = !!(isAuthenticated && user)
  
  // If user is logged in and trying to access login/register pages
  if (isLoggedIn && (to.name === 'Login' || to.name === 'Register')) {
    // Redirect to home page or intended destination
    const redirect = to.query.redirect || '/'
    next(redirect)
    return
  }
  
  // If route requires authentication and user is not logged in
  if (to.meta.requiresAuth && !isLoggedIn) {
    // Redirect to login page with return url
    next({
      name: 'Login',
      query: { redirect: to.fullPath }
    })
    return
  }
  
  // Allow navigation
  next()
})

// Post-login toast after navigation completes
router.afterEach((to, from) => {
  try {
    const flag = sessionStorage.getItem('justLoggedIn')
    const token = localStorage.getItem('token')
    const userStr = localStorage.getItem('user')
    const user = userStr ? JSON.parse(userStr) : null

    if ((flag === '1') || (from?.name === 'Login' && token && user)) {
      const name = (user?.first_name || user?.name || (user?.email?.split?.('@')[0]) || 'bạn')
      toastService.success(`Chào mừng ${name}! Đăng nhập thành công.`, 3500)
      sessionStorage.removeItem('justLoggedIn')
    }
  } catch (e) {
    // ignore toast errors
  }
})

// Xuất ra để main.js dùng
export default router
