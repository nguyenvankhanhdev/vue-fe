<template>
  <div class="admin-settings">
    <!-- Enhanced Header -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
      <div class="flex flex-col md:flex-row md:items-center justify-between">
        <div class="mb-4 md:mb-0">
          <div class="flex items-center mb-2">
            <div class="w-10 h-10 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-lg flex items-center justify-center mr-3">
              <i class="fas fa-cogs text-white"></i>
            </div>
            <div>
              <h1 class="text-2xl font-bold text-gray-900">Cài đặt hệ thống</h1>
              <p class="text-gray-500">Quản lý cấu hình và tùy chỉnh hệ thống</p>
            </div>
          </div>
        </div>
        
        <div class="flex flex-wrap gap-3">
          <!-- Settings Status -->
          <div class="flex items-center bg-green-50 px-3 py-2 rounded-lg">
            <i class="fas fa-check-circle text-green-600 mr-2"></i>
            <span class="text-sm font-medium text-green-700">Cài đặt đồng bộ</span>
          </div>
          
          <!-- Action Buttons -->
          <button @click="resetToDefault" 
                  class="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 bg-white rounded-lg hover:bg-gray-50 font-medium transition-colors">
            <i class="fas fa-undo mr-2"></i>Khôi phục mặc định
          </button>
          
          <button @click="saveAllSettings" 
                  class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors">
            <i class="fas fa-save mr-2"></i>Lưu tất cả
          </button>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
      <!-- General Settings -->
      <div class="xl:col-span-2 space-y-6">
        <div class="bg-white rounded-xl shadow-sm border border-gray-200">
          <div class="px-6 py-4 bg-gray-50 border-b border-gray-200 rounded-t-xl">
            <div class="flex items-center">
              <i class="fas fa-cog text-blue-600 mr-3"></i>
              <h3 class="text-lg font-semibold text-gray-900">Cài đặt chung</h3>
            </div>
          </div>
          <div class="p-6">
            <form @submit.prevent="saveGeneralSettings">
              <div class="flex flex-wrap g-3">
                <div class="md:w-1/2">
                  <label class="block text-sm font-medium text-gray-700 mb-2">Tên website</label>
                  <input v-model="settings.general.site_name" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                </div>
                <div class="md:w-1/2">
                  <label class="block text-sm font-medium text-gray-700 mb-2">Email liên hệ</label>
                  <input v-model="settings.general.contact_email" type="email" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                </div>
                <div class="md:w-1/2">
                  <label class="block text-sm font-medium text-gray-700 mb-2">Số điện thoại</label>
                  <input v-model="settings.general.phone" type="tel" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                </div>
                <div class="md:w-1/2">
                  <label class="block text-sm font-medium text-gray-700 mb-2">Múi giờ</label>
                  <select v-model="settings.general.timezone" class="form-select">
                    <option value="Asia/Ho_Chi_Minh">Việt Nam (GMT+7)</option>
                    <option value="Asia/Bangkok">Thailand (GMT+7)</option>
                    <option value="Asia/Singapore">Singapore (GMT+8)</option>
                  </select>
                </div>
                <div class="w-full">
                  <label class="block text-sm font-medium text-gray-700 mb-2">Địa chỉ</label>
                  <textarea v-model="settings.general.address" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" rows="2"></textarea>
                </div>
                <div class="w-full">
                  <label class="block text-sm font-medium text-gray-700 mb-2">Mô tả website</label>
                  <textarea v-model="settings.general.description" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" rows="3"></textarea>
                </div>
              </div>
              <hr>
              <div class="flex justify-end">
                <button type="submit" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md transition-colors duration-200 bg-blue-600 hover:bg-blue-700 text-white">Lưu cài đặt chung</button>
              </div>
            </form>
          </div>
        </div>

        <!-- Email Settings -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200">
          <div class="px-6 py-4 bg-gray-50 border-b border-gray-200 rounded-t-xl">
            <div class="flex items-center">
              <i class="fas fa-envelope text-green-600 mr-3"></i>
              <h3 class="text-lg font-semibold text-gray-900">Cài đặt Email</h3>
            </div>
          </div>
          <div class="p-6">
            <form @submit.prevent="saveEmailSettings">
              <div class="flex flex-wrap g-3">
                <div class="md:w-1/2">
                  <label class="block text-sm font-medium text-gray-700 mb-2">SMTP Host</label>
                  <input v-model="settings.email.smtp_host" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                </div>
                <div class="md:w-1/2">
                  <label class="block text-sm font-medium text-gray-700 mb-2">SMTP Port</label>
                  <input v-model="settings.email.smtp_port" type="number" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                </div>
                <div class="md:w-1/2">
                  <label class="block text-sm font-medium text-gray-700 mb-2">Username</label>
                  <input v-model="settings.email.smtp_username" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                </div>
                <div class="md:w-1/2">
                  <label class="block text-sm font-medium text-gray-700 mb-2">Password</label>
                  <input v-model="settings.email.smtp_password" type="password" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                </div>
                <div class="md:w-1/2">
                  <label class="block text-sm font-medium text-gray-700 mb-2">Encryption</label>
                  <select v-model="settings.email.encryption" class="form-select">
                    <option value="tls">TLS</option>
                    <option value="ssl">SSL</option>
                    <option value="">None</option>
                  </select>
                </div>
                <div class="md:w-1/2">
                  <label class="block text-sm font-medium text-gray-700 mb-2">From Email</label>
                  <input v-model="settings.email.from_email" type="email" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                </div>
                <div class="w-full">
                  <div class="flex items-center">
                    <input v-model="settings.email.enabled" class="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500" type="checkbox" id="emailEnabled">
                    <label for="emailEnabled" class="text-sm text-gray-700">Bật gửi email</label>
                  </div>
                </div>
              </div>
              <hr>
              <div class="flex justify-between">
                <button type="button" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md transition-colors duration-200 btn-outline-secondary" @click="testEmail">
                  <i class="fas fa-paper-plane me-2"></i>Test Email
                </button>
                <button type="submit" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md transition-colors duration-200 bg-blue-600 hover:bg-blue-700 text-white">Lưu cài đặt Email</button>
              </div>
            </form>
          </div>
        </div>

        <!-- Payment Settings -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200">
          <div class="px-6 py-4 bg-gray-50 border-b border-gray-200 rounded-t-xl">
            <div class="flex items-center">
              <i class="fas fa-credit-card text-purple-600 mr-3"></i>
              <h3 class="text-lg font-semibold text-gray-900">Cài đặt Thanh toán</h3>
            </div>
          </div>
          <div class="p-6">
            <form @submit.prevent="savePaymentSettings">
              <div class="flex flex-wrap g-3">
                <div class="w-full">
                  <h6>Phương thức thanh toán</h6>
                </div>
                <div class="md:w-1/2">
                  <div class="flex items-center">
                    <input v-model="settings.payment.cod_enabled" class="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500" type="checkbox" id="codEnabled">
                    <label for="codEnabled" class="text-sm text-gray-700">Thu tiền khi giao hàng (COD)</label>
                  </div>
                </div>
                <div class="md:w-1/2">
                  <div class="flex items-center">
                    <input v-model="settings.payment.bank_transfer_enabled" class="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500" type="checkbox" id="bankEnabled">
                    <label for="bankEnabled" class="text-sm text-gray-700">Chuyển khoản ngân hàng</label>
                  </div>
                </div>
                <div class="md:w-1/2">
                  <div class="flex items-center">
                    <input v-model="settings.payment.vnpay_enabled" class="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500" type="checkbox" id="vnpayEnabled">
                    <label for="vnpayEnabled" class="text-sm text-gray-700">VNPay</label>
                  </div>
                </div>
                <div class="md:w-1/2">
                  <div class="flex items-center">
                    <input v-model="settings.payment.momo_enabled" class="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500" type="checkbox" id="momoEnabled">
                    <label for="momoEnabled" class="text-sm text-gray-700">MoMo</label>
                  </div>
                </div>
                
                <div class="w-full"><hr></div>
                <div class="w-full">
                  <h6>Cài đặt VNPay</h6>
                </div>
                <div class="md:w-1/2">
                  <label class="block text-sm font-medium text-gray-700 mb-2">TMN Code</label>
                  <input v-model="settings.payment.vnpay_tmn_code" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                </div>
                <div class="md:w-1/2">
                  <label class="block text-sm font-medium text-gray-700 mb-2">Hash Secret</label>
                  <input v-model="settings.payment.vnpay_hash_secret" type="password" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                </div>
                <div class="w-full">
                  <label class="block text-sm font-medium text-gray-700 mb-2">URL</label>
                  <input v-model="settings.payment.vnpay_url" type="url" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                </div>

                <div class="w-full"><hr></div>
                <div class="w-full">
                  <h6>Thông tin ngân hàng</h6>
                </div>
                <div class="md:w-1/2">
                  <label class="block text-sm font-medium text-gray-700 mb-2">Tên ngân hàng</label>
                  <input v-model="settings.payment.bank_name" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                </div>
                <div class="md:w-1/2">
                  <label class="block text-sm font-medium text-gray-700 mb-2">Số tài khoản</label>
                  <input v-model="settings.payment.bank_account" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                </div>
                <div class="w-full">
                  <label class="block text-sm font-medium text-gray-700 mb-2">Chủ tài khoản</label>
                  <input v-model="settings.payment.bank_owner" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                </div>
              </div>
              <hr>
              <div class="flex justify-end">
                <button type="submit" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md transition-colors duration-200 bg-blue-600 hover:bg-blue-700 text-white">Lưu cài đặt thanh toán</button>
              </div>
            </form>
          </div>
        </div>

        <!-- SEO Settings -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200">
          <div class="px-6 py-4 bg-gray-50 border-b border-gray-200 rounded-t-xl">
            <div class="flex items-center">
              <i class="fas fa-search text-orange-600 mr-3"></i>
              <h3 class="text-lg font-semibold text-gray-900">Cài đặt SEO</h3>
            </div>
          </div>
          <div class="p-6">
            <form @submit.prevent="saveSeoSettings">
              <div class="flex flex-wrap g-3">
                <div class="w-full">
                  <label class="block text-sm font-medium text-gray-700 mb-2">Meta Title</label>
                  <input v-model="settings.seo.meta_title" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" maxlength="60">
                  <div class="form-text">{{ settings.seo.meta_title?.length || 0 }}/60 ký tự</div>
                </div>
                <div class="w-full">
                  <label class="block text-sm font-medium text-gray-700 mb-2">Meta Description</label>
                  <textarea v-model="settings.seo.meta_description" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" rows="3" maxlength="160"></textarea>
                  <div class="form-text">{{ settings.seo.meta_description?.length || 0 }}/160 ký tự</div>
                </div>
                <div class="w-full">
                  <label class="block text-sm font-medium text-gray-700 mb-2">Meta Keywords</label>
                  <input v-model="settings.seo.meta_keywords" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="từ khóa 1, từ khóa 2, từ khóa 3">
                </div>
                <div class="md:w-1/2">
                  <label class="block text-sm font-medium text-gray-700 mb-2">Google Analytics ID</label>
                  <input v-model="settings.seo.google_analytics_id" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="GA-XXXXXXXXX-X">
                </div>
                <div class="md:w-1/2">
                  <label class="block text-sm font-medium text-gray-700 mb-2">Google Search Console</label>
                  <input v-model="settings.seo.google_site_verification" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                </div>
                <div class="w-full">
                  <label class="block text-sm font-medium text-gray-700 mb-2">Facebook Pixel ID</label>
                  <input v-model="settings.seo.facebook_pixel_id" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                </div>
              </div>
              <hr>
              <div class="flex justify-end">
                <button type="submit" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md transition-colors duration-200 bg-blue-600 hover:bg-blue-700 text-white">Lưu cài đặt SEO</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- Quick Actions & System Info -->
      <div class="xl:col-span-1 space-y-6">
        <!-- Quick Actions -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200">
          <div class="px-6 py-4 bg-gray-50 border-b border-gray-200 rounded-t-xl">
            <div class="flex items-center">
              <i class="fas fa-bolt text-yellow-600 mr-3"></i>
              <h3 class="text-lg font-semibold text-gray-900">Thao tác nhanh</h3>
            </div>
          </div>
          <div class="p-6">
            <div class="space-y-3">
              <button class="w-full inline-flex items-center justify-center px-4 py-3 border border-blue-300 text-blue-700 bg-blue-50 rounded-lg hover:bg-blue-100 font-medium transition-colors" @click="clearCache">
                <i class="fas fa-broom mr-3"></i>Xóa Cache
              </button>
              <button class="w-full inline-flex items-center justify-center px-4 py-3 border border-green-300 text-green-700 bg-green-50 rounded-lg hover:bg-green-100 font-medium transition-colors" @click="backupDatabase">
                <i class="fas fa-database mr-3"></i>Backup Database
              </button>
              <button class="w-full inline-flex items-center justify-center px-4 py-3 border border-purple-300 text-purple-700 bg-purple-50 rounded-lg hover:bg-purple-100 font-medium transition-colors" @click="optimizeDatabase">
                <i class="fas fa-cogs mr-3"></i>Tối ưu Database
              </button>
              <button class="w-full inline-flex items-center justify-center px-4 py-3 border border-orange-300 text-orange-700 bg-orange-50 rounded-lg hover:bg-orange-100 font-medium transition-colors" @click="checkUpdates">
                <i class="fas fa-sync-alt mr-3"></i>Kiểm tra cập nhật
              </button>
            </div>
          </div>
        </div>

        <!-- System Info -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200">
          <div class="px-6 py-4 bg-gray-50 border-b border-gray-200 rounded-t-xl">
            <div class="flex items-center">
              <i class="fas fa-server text-indigo-600 mr-3"></i>
              <h3 class="text-lg font-semibold text-gray-900">Thông tin hệ thống</h3>
            </div>
          </div>
          <div class="p-6">
            <div class="space-y-4">
              <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span class="text-sm text-gray-600">Phiên bản</span>
                <span class="font-semibold text-gray-900">{{ systemInfo.version }}</span>
              </div>
              <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span class="text-sm text-gray-600">Database</span>
                <span class="font-semibold text-gray-900">{{ systemInfo.database }}</span>
              </div>
              <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span class="text-sm text-gray-600">Server</span>
                <span class="font-semibold text-gray-900">{{ systemInfo.server }}</span>
              </div>
              <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span class="text-sm text-gray-600">PHP Version</span>
                <span class="font-semibold text-gray-900">{{ systemInfo.php_version }}</span>
              </div>
              <div class="p-3 bg-gray-50 rounded-lg">
                <div class="flex justify-between items-center mb-2">
                  <span class="text-sm text-gray-600">Dung lượng sử dụng</span>
                  <span class="text-sm font-medium">{{ systemInfo.disk_used }} / {{ systemInfo.disk_total }}</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div class="bg-blue-600 h-2 rounded-full transition-all" :style="{ width: systemInfo.disk_usage + '%' }"></div>
                </div>
                <div class="text-xs text-gray-500 mt-1">{{ systemInfo.disk_usage }}% đã sử dụng</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Backups -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200">
          <div class="px-6 py-4 bg-gray-50 border-b border-gray-200 rounded-t-xl">
            <div class="flex items-center">
              <i class="fas fa-archive text-teal-600 mr-3"></i>
              <h3 class="text-lg font-semibold text-gray-900">Backup gần đây</h3>
            </div>
          </div>
          <div class="p-0">
            <div v-for="backup in recentBackups" :key="backup.id" 
                 class="flex items-center p-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors">
              <div class="flex-shrink-0 mr-4">
                <div class="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                  <i class="fas fa-file-archive text-teal-600"></i>
                </div>
              </div>
              <div class="flex-1 min-w-0">
                <div class="font-medium text-gray-900 text-sm truncate">{{ backup.filename }}</div>
                <div class="text-xs text-gray-500">{{ formatDate(backup.created_at) }}</div>
              </div>
              <div class="text-right">
                <div class="text-xs font-medium text-gray-900">{{ backup.size }}</div>
              </div>
            </div>
            <div class="p-4 text-center">
              <button class="inline-flex items-center px-3 py-1.5 text-sm border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white rounded-lg transition-colors" @click="viewAllBackups">
                Xem tất cả
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Swal from 'sweetalert2'

const settings = ref({
  general: {
    site_name: 'Cửa hàng trực tuyến',
    contact_email: 'contact@store.com',
    phone: '0987654321',
    timezone: 'Asia/Ho_Chi_Minh',
    address: '123 Đường ABC, Phường XYZ, Quận 1, TP.HCM',
    description: 'Cửa hàng trực tuyến hàng đầu Việt Nam'
  },
  email: {
    smtp_host: 'smtp.gmail.com',
    smtp_port: 587,
    smtp_username: '',
    smtp_password: '',
    encryption: 'tls',
    from_email: 'noreply@store.com',
    enabled: true
  },
  payment: {
    cod_enabled: true,
    bank_transfer_enabled: true,
    vnpay_enabled: false,
    momo_enabled: false,
    vnpay_tmn_code: '',
    vnpay_hash_secret: '',
    vnpay_url: 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html',
    bank_name: 'Vietcombank',
    bank_account: '1234567890',
    bank_owner: 'NGUYEN VAN A'
  },
  seo: {
    meta_title: 'Cửa hàng trực tuyến - Mua sắm online',
    meta_description: 'Cửa hàng trực tuyến uy tín với hàng ngàn sản phẩm chất lượng, giá tốt, giao hàng nhanh chóng.',
    meta_keywords: 'cửa hàng, mua sắm, online, điện thoại, laptop',
    google_analytics_id: '',
    google_site_verification: '',
    facebook_pixel_id: ''
  }
})

const systemInfo = {
  version: 'v2.1.0',
  database: 'MySQL 8.0.35',
  server: 'Apache 2.4.54',
  php_version: '8.2.0',
  disk_usage: 65,
  disk_used: '2.3 GB',
  disk_total: '5.0 GB'
}

const recentBackups = [
  {
    id: 1,
    filename: 'backup_2024-10-07_14-30.sql',
    size: '25.3 MB',
    created_at: '2024-10-07T14:30:00Z'
  },
  {
    id: 2,
    filename: 'backup_2024-10-06_14-30.sql',
    size: '24.8 MB',
    created_at: '2024-10-06T14:30:00Z'
  },
  {
    id: 3,
    filename: 'backup_2024-10-05_14-30.sql',
    size: '24.1 MB',
    created_at: '2024-10-05T14:30:00Z'
  }
]

function saveGeneralSettings() {
  Swal.fire({ 
    icon: 'success', 
    title: 'Đã lưu cài đặt chung', 
    timer: 1500, 
    showConfirmButton: false 
  })
}

function saveEmailSettings() {
  Swal.fire({ 
    icon: 'success', 
    title: 'Đã lưu cài đặt email', 
    timer: 1500, 
    showConfirmButton: false 
  })
}

function savePaymentSettings() {
  Swal.fire({ 
    icon: 'success', 
    title: 'Đã lưu cài đặt thanh toán', 
    timer: 1500, 
    showConfirmButton: false 
  })
}

function saveSeoSettings() {
  Swal.fire({ 
    icon: 'success', 
    title: 'Đã lưu cài đặt SEO', 
    timer: 1500, 
    showConfirmButton: false 
  })
}

function saveAllSettings() {
  Swal.fire({ 
    icon: 'success', 
    title: 'Đã lưu tất cả cài đặt', 
    timer: 1500, 
    showConfirmButton: false 
  })
}

function testEmail() {
  Swal.fire({
    title: 'Test Email',
    input: 'email',
    inputLabel: 'Email nhận test',
    inputPlaceholder: 'your-email@example.com',
    showCancelButton: true,
    confirmButtonText: 'Gửi test',
    cancelButtonText: 'Hủy'
  }).then(result => {
    if (result.isConfirmed && result.value) {
      Swal.fire({ 
        icon: 'success', 
        title: 'Đã gửi email test', 
        text: `Email đã được gửi đến ${result.value}`,
        timer: 2000, 
        showConfirmButton: false 
      })
    }
  })
}

function clearCache() {
  Swal.fire({
    title: 'Xóa cache?',
    text: 'Hành động này sẽ xóa tất cả cache hiện tại.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Xóa cache',
    cancelButtonText: 'Hủy'
  }).then(result => {
    if (result.isConfirmed) {
      Swal.fire({ 
        icon: 'success', 
        title: 'Đã xóa cache thành công', 
        timer: 1500, 
        showConfirmButton: false 
      })
    }
  })
}

function backupDatabase() {
  Swal.fire({ 
    icon: 'info', 
    title: 'Đang tạo backup...', 
    text: 'Quá trình này có thể mất vài phút',
    timer: 2000, 
    showConfirmButton: false 
  }).then(() => {
    Swal.fire({ 
      icon: 'success', 
      title: 'Backup thành công', 
      text: 'Database đã được backup thành công',
      timer: 1500, 
      showConfirmButton: false 
    })
  })
}

function optimizeDatabase() {
  Swal.fire({ 
    icon: 'success', 
    title: 'Đã tối ưu database', 
    timer: 1500, 
    showConfirmButton: false 
  })
}

function checkUpdates() {
  Swal.fire({ 
    icon: 'info', 
    title: 'Phiên bản hiện tại là mới nhất', 
    text: 'Không có cập nhật nào khả dụng',
    timer: 2000, 
    showConfirmButton: false 
  })
}

function viewAllBackups() {
  Swal.fire({ 
    icon: 'info', 
    title: 'Xem tất cả backup', 
    text: 'Chức năng sẽ được triển khai trong phiên bản tiếp theo',
    timer: 1500, 
    showConfirmButton: false 
  })
}

function resetToDefault() {
  Swal.fire({
    title: 'Khôi phục cài đặt mặc định?',
    text: 'Tất cả cài đặt hiện tại sẽ bị xóa và trở về mặc định.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Khôi phục',
    cancelButtonText: 'Hủy',
    confirmButtonColor: '#dc3545'
  }).then(result => {
    if (result.isConfirmed) {
      Swal.fire({ 
        icon: 'success', 
        title: 'Đã khôi phục cài đặt mặc định', 
        timer: 1500, 
        showConfirmButton: false 
      })
    }
  })
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>

<style scoped>
.progress {
  background-color: #e9ecef;
}

.form-text {
  font-size: 0.875em;
  color: #6c757d;
}

.card-shadow {
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
}
</style>