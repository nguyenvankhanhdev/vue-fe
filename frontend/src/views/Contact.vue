<template>
    <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <!-- Page Header -->
        <section class="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white py-16 lg:py-24 relative overflow-hidden">
            <div class="absolute inset-0 bg-black/10"></div>
            <div class="absolute top-0 left-0 w-full h-full">
                <div class="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
                <div class="absolute bottom-10 right-10 w-40 h-40 bg-blue-400/20 rounded-full blur-2xl"></div>
                <div class="absolute top-1/2 left-1/3 w-24 h-24 bg-purple-300/15 rounded-full blur-lg"></div>
            </div>
            
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                <h1 class="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                    Liên hệ với chúng tôi
                </h1>
                <p class="text-xl lg:text-2xl text-blue-50 max-w-3xl mx-auto leading-relaxed">
                    Chúng tôi luôn sẵn sàng hỗ trợ bạn 24/7
                </p>
                <div class="flex justify-center mt-8">
                    <div class="flex items-center space-x-4 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
                        <i class="fas fa-headset text-blue-200"></i>
                        <span class="text-blue-100 font-medium">Hỗ trợ 24/7</span>
                        <div class="w-px h-6 bg-blue-300/50"></div>
                        <i class="fas fa-clock text-blue-200"></i>
                        <span class="text-blue-100 font-medium">Phản hồi nhanh</span>
                    </div>
                </div>
            </div>
        </section>

        <!-- Contact Content -->
        <section class="py-16">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="grid lg:grid-cols-2 gap-16">
                    <!-- Contact Information -->
                    <div class="space-y-8">
                        <div class="bg-white rounded-2xl shadow-xl overflow-hidden border border-blue-100/50">
                            <div class="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
                                <h2 class="text-2xl font-bold text-white flex items-center">
                                    <i class="fas fa-headset mr-3"></i>Thông tin liên hệ
                                </h2>
                                <p class="text-blue-100 mt-2">
                                    Hãy liên hệ với chúng tôi qua các kênh dưới đây. Chúng tôi sẽ phản hồi trong thời gian sớm nhất.
                                </p>
                            </div>

                            <div class="p-6 space-y-6">
                                <div class="flex items-start space-x-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                                    <div class="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-full text-white flex-shrink-0">
                                        <i class="fas fa-map-marker-alt"></i>
                                    </div>
                                    <div>
                                        <h4 class="font-semibold text-gray-900 mb-1">Địa chỉ</h4>
                                        <p class="text-gray-600">123 Đường ABC, Phường 1, Quận 1<br>TP. Hồ Chí Minh, Việt Nam</p>
                                    </div>
                                </div>

                                <div class="flex items-start space-x-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                                    <div class="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-full text-white flex-shrink-0">
                                        <i class="fas fa-phone-alt"></i>
                                    </div>
                                    <div>
                                        <h4 class="font-semibold text-gray-900 mb-1">Điện thoại</h4>
                                        <p class="text-gray-600">
                                            <a href="tel:+84123456789" class="hover:text-blue-600 transition-colors">+84 123 456 789</a><br>
                                            <a href="tel:+84987654321" class="hover:text-blue-600 transition-colors">+84 987 654 321</a>
                                        </p>
                                    </div>
                                </div>

                                <div class="flex items-start space-x-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                                    <div class="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-full text-white flex-shrink-0">
                                        <i class="fas fa-envelope"></i>
                                    </div>
                                    <div>
                                        <h4 class="font-semibold text-gray-900 mb-1">Email</h4>
                                        <p class="text-gray-600">
                                            <a href="mailto:info@example.com" class="hover:text-blue-600 transition-colors">info@example.com</a><br>
                                            <a href="mailto:support@example.com" class="hover:text-blue-600 transition-colors">support@example.com</a>
                                        </p>
                                    </div>
                                </div>

                                <div class="flex items-start space-x-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                                    <div class="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-full text-white flex-shrink-0">
                                        <i class="fas fa-clock"></i>
                                    </div>
                                    <div>
                                        <h4 class="font-semibold text-gray-900 mb-1">Giờ làm việc</h4>
                                        <p class="text-gray-600">
                                            Thứ 2 - Thứ 6: 8:00 - 18:00<br>
                                            Thứ 7 - CN: 9:00 - 17:00
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="bg-white rounded-2xl shadow-xl overflow-hidden border border-blue-100/50">
                            <div class="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
                                <h4 class="text-xl font-bold text-white">Theo dõi chúng tôi</h4>
                            </div>
                            <div class="p-6">
                                <div class="flex space-x-4">
                                    <a href="#" class="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transition-all duration-200 hover:scale-110" aria-label="Facebook">
                                        <i class="fab fa-facebook-f"></i>
                                    </a>
                                    <a href="#" class="bg-sky-500 hover:bg-sky-600 text-white p-3 rounded-full transition-all duration-200 hover:scale-110" aria-label="Twitter">
                                        <i class="fab fa-twitter"></i>
                                    </a>
                                    <a href="#" class="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white p-3 rounded-full transition-all duration-200 hover:scale-110" aria-label="Instagram">
                                        <i class="fab fa-instagram"></i>
                                    </a>
                                    <a href="#" class="bg-red-600 hover:bg-red-700 text-white p-3 rounded-full transition-all duration-200 hover:scale-110" aria-label="YouTube">
                                        <i class="fab fa-youtube"></i>
                                    </a>
                                    <a href="#" class="bg-blue-800 hover:bg-blue-900 text-white p-3 rounded-full transition-all duration-200 hover:scale-110" aria-label="LinkedIn">
                                        <i class="fab fa-linkedin-in"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Contact Form -->
                    <div class="bg-white rounded-2xl shadow-xl overflow-hidden border border-blue-100/50">
                        <div class="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
                            <h2 class="text-2xl font-bold text-white flex items-center">
                                <i class="fas fa-paper-plane mr-3"></i>Gửi tin nhắn cho chúng tôi
                            </h2>
                        </div>

                        <div class="p-8">
                            <form @submit.prevent="submitForm" class="space-y-6" novalidate>
                                <div class="grid md:grid-cols-2 gap-6">
                                    <div class="space-y-2">
                                        <label for="name" class="block text-sm font-semibold text-gray-700">
                                            Họ và tên <span class="text-red-500">*</span>
                                        </label>
                                        <input 
                                            ref="nameInput" 
                                            type="text" 
                                            id="name" 
                                            v-model.trim="form.name"
                                            :aria-invalid="!!errors.name"
                                            :aria-describedby="errors.name ? 'name-error' : undefined"
                                            :class="{ 
                                                'border-red-500 focus:ring-red-500': errors.name,
                                                'border-gray-300 focus:ring-blue-500': !errors.name
                                            }" 
                                            class="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200"
                                            placeholder="Nhập họ và tên của bạn"
                                            required
                                        >
                                        <span v-if="errors.name" id="name-error" class="flex items-center text-red-500 text-sm mt-1">
                                            <i class="fas fa-exclamation-circle mr-1"></i>{{ errors.name }}
                                        </span>
                                    </div>

                                    <div class="space-y-2">
                                        <label for="email" class="block text-sm font-semibold text-gray-700">
                                            Email <span class="text-red-500">*</span>
                                        </label>
                                        <input 
                                            type="email" 
                                            id="email" 
                                            v-model.trim="form.email"
                                            :aria-invalid="!!errors.email"
                                            :aria-describedby="errors.email ? 'email-error' : undefined"
                                            :class="{ 
                                                'border-red-500 focus:ring-red-500': errors.email,
                                                'border-gray-300 focus:ring-blue-500': !errors.email
                                            }" 
                                            class="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200"
                                            placeholder="email@example.com"
                                            required
                                        >
                                        <span v-if="errors.email" id="email-error" class="flex items-center text-red-500 text-sm mt-1">
                                            <i class="fas fa-exclamation-circle mr-1"></i>{{ errors.email }}
                                        </span>
                                    </div>
                                </div>

                                <div class="grid md:grid-cols-2 gap-6">
                                    <div class="space-y-2">
                                        <label for="phone" class="block text-sm font-semibold text-gray-700">
                                            Số điện thoại
                                        </label>
                                        <input 
                                            type="tel" 
                                            id="phone" 
                                            v-model.trim="form.phone"
                                            :aria-invalid="!!errors.phone"
                                            :aria-describedby="errors.phone ? 'phone-error' : undefined"
                                            :class="{ 
                                                'border-red-500 focus:ring-red-500': errors.phone,
                                                'border-gray-300 focus:ring-blue-500': !errors.phone
                                            }" 
                                            class="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200"
                                            placeholder="0123 456 789"
                                            inputmode="tel"
                                        >
                                        <span v-if="errors.phone" id="phone-error" class="flex items-center text-red-500 text-sm mt-1">
                                            <i class="fas fa-exclamation-circle mr-1"></i>{{ errors.phone }}
                                        </span>
                                    </div>

                                    <div class="space-y-2">
                                        <label for="subject" class="block text-sm font-semibold text-gray-700">
                                            Chủ đề <span class="text-red-500">*</span>
                                        </label>
                                        <div class="relative">
                                            <select 
                                                id="subject" 
                                                v-model="form.subject" 
                                                :aria-invalid="!!errors.subject"
                                                :aria-describedby="errors.subject ? 'subject-error' : undefined"
                                                :class="{ 
                                                    'border-red-500 focus:ring-red-500': errors.subject,
                                                    'border-gray-300 focus:ring-blue-500': !errors.subject
                                                }"
                                                class="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 appearance-none bg-white"
                                                required
                                            >
                                                <option value="">Chọn chủ đề</option>
                                                <option value="general">Thông tin chung</option>
                                                <option value="support">Hỗ trợ kỹ thuật</option>
                                                <option value="order">Đặt hàng</option>
                                                <option value="return">Đổi trả</option>
                                                <option value="complaint">Khiếu nại</option>
                                                <option value="partnership">Hợp tác</option>
                                                <option value="other">Khác</option>
                                            </select>
                                            <i class="fas fa-chevron-down absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"></i>
                                        </div>
                                        <span v-if="errors.subject" id="subject-error" class="flex items-center text-red-500 text-sm mt-1">
                                            <i class="fas fa-exclamation-circle mr-1"></i>{{ errors.subject }}
                                        </span>
                                    </div>
                                </div>

                                <div class="space-y-2">
                                    <label for="message" class="block text-sm font-semibold text-gray-700">
                                        Nội dung tin nhắn <span class="text-red-500">*</span>
                                    </label>
                                    <textarea 
                                        id="message" 
                                        v-model.trim="form.message" 
                                        :aria-invalid="!!errors.message"
                                        :aria-describedby="errors.message ? 'message-error' : undefined"
                                        :class="{ 
                                            'border-red-500 focus:ring-red-500': errors.message,
                                            'border-gray-300 focus:ring-blue-500': !errors.message
                                        }" 
                                        rows="6"
                                        class="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 resize-none"
                                        placeholder="Nhập nội dung tin nhắn của bạn..." 
                                        required
                                    ></textarea>
                                    <div class="flex justify-between items-center">
                                        <span v-if="errors.message" id="message-error" class="flex items-center text-red-500 text-sm">
                                            <i class="fas fa-exclamation-circle mr-1"></i>{{ errors.message }}
                                        </span>
                                        <span class="text-sm text-gray-500">{{ form.message.length }}/1000</span>
                                    </div>
                                </div>

                                <!-- Privacy Policy -->
                                <div class="space-y-2">
                                    <label class="flex items-start space-x-3 cursor-pointer">
                                        <input 
                                            type="checkbox" 
                                            v-model="form.privacy" 
                                            :class="{ 
                                                'border-red-500 text-red-600': errors.privacy,
                                                'border-gray-300 text-blue-600': !errors.privacy
                                            }"
                                            class="mt-1 h-4 w-4 rounded focus:ring-2 focus:ring-blue-500"
                                            required
                                        >
                                        <span class="text-sm text-gray-700">
                                            Tôi đồng ý với
                                            <button type="button" @click="openDocs('privacy')" class="text-blue-600 hover:text-purple-600 font-medium underline">chính sách bảo mật</button>
                                            và
                                            <button type="button" @click="openDocs('terms')" class="text-blue-600 hover:text-purple-600 font-medium underline">điều khoản sử dụng</button>
                                            <span class="text-red-500">*</span>
                                        </span>
                                    </label>
                                    <span v-if="errors.privacy" class="flex items-center text-red-500 text-sm">
                                        <i class="fas fa-exclamation-circle mr-1"></i>{{ errors.privacy }}
                                    </span>
                                </div>

                                <!-- Submit Button -->
                                <button 
                                    type="submit" 
                                    class="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] transition-all duration-200 shadow-lg"
                                    :disabled="submitting || !isFormLikelyValid"
                                >
                                    <span v-if="submitting" class="flex items-center justify-center space-x-2">
                                        <i class="fas fa-spinner fa-spin"></i>
                                        <span>Đang gửi...</span>
                                    </span>
                                    <span v-else class="flex items-center justify-center space-x-2">
                                        <i class="fas fa-paper-plane"></i>
                                        <span>Gửi tin nhắn</span>
                                    </span>
                                </button>

                                <!-- subtle tip -->
                                <div class="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-6">
                                    <p class="flex items-center text-blue-700 text-sm">
                                        <i class="far fa-lightbulb mr-2 text-blue-600"></i>
                                        Mẹo: điền email chính xác để chúng tôi phản hồi nhanh hơn.
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- FAQ Section -->
        <section class="py-16 bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-12">
                    <h2 class="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                        Câu hỏi thường gặp
                    </h2>
                    <p class="text-gray-600 text-lg">Những câu hỏi phổ biến từ khách hàng</p>
                </div>

                <div class="space-y-4">
                    <div v-for="(faq, index) in faqs" :key="index" class="bg-white rounded-xl border border-blue-100/50 shadow-md hover:shadow-lg transition-shadow duration-200">
                        <button 
                            class="w-full flex items-center justify-between p-6 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset rounded-xl"
                            @click="toggleFAQ(index)" 
                            :aria-expanded="faq.isOpen"
                            :aria-controls="`faq-${index}`"
                        >
                            <h4 class="text-lg font-semibold text-gray-900 pr-4">{{ faq.question }}</h4>
                            <div class="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-full text-white transform transition-transform duration-200" :class="{ 'rotate-45': faq.isOpen }">
                                <i class="fas fa-plus text-sm"></i>
                            </div>
                        </button>
                        <transition 
                            enter-active-class="transition duration-200 ease-out"
                            enter-from-class="opacity-0 -translate-y-2"
                            enter-to-class="opacity-100 translate-y-0"
                            leave-active-class="transition duration-150 ease-in"
                            leave-from-class="opacity-100 translate-y-0"
                            leave-to-class="opacity-0 -translate-y-2"
                        >
                            <div v-show="faq.isOpen" :id="`faq-${index}`" role="region" class="px-6 pb-6">
                                <div class="border-t border-gray-100 pt-4">
                                    <p class="text-gray-600 leading-relaxed">{{ faq.answer }}</p>
                                </div>
                            </div>
                        </transition>
                    </div>
                </div>
            </div>
        </section>

        <!-- Map Section -->
        <section class="py-16 bg-white">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-12">
                    <h2 class="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                        Vị trí của chúng tôi
                    </h2>
                </div>
                <div class="bg-white rounded-2xl shadow-xl overflow-hidden border border-blue-100/50">
                    <div class="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
                        <h3 class="text-xl font-bold text-white flex items-center">
                            <i class="fas fa-map-marker-alt mr-3"></i>Địa chỉ cửa hàng
                        </h3>
                    </div>
                    <div class="p-12 text-center bg-gradient-to-br from-blue-50 to-purple-50">
                        <div class="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-full inline-block mb-6">
                            <i class="fas fa-map-marked-alt text-4xl text-white"></i>
                        </div>
                        <p class="text-gray-700 text-lg mb-4">Bản đồ Google Maps sẽ được hiển thị tại đây</p>
                        <p class="text-gray-500 text-sm bg-white/80 backdrop-blur-sm rounded-lg p-4 inline-block">
                            Để tích hợp bản đồ thực tế, bạn thêm Google Maps API key vào iframe embed.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Success Modal -->
        <div v-if="showSuccessModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" @click="closeSuccessModal">
            <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden" role="dialog" aria-modal="true" aria-labelledby="success-title" @click.stop>
                <div class="bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-center">
                    <div class="bg-white/20 p-4 rounded-full inline-block mb-4">
                        <i class="fas fa-check-circle text-4xl text-white"></i>
                    </div>
                    <h3 id="success-title" class="text-2xl font-bold text-white">Gửi thành công!</h3>
                </div>
                <div class="p-6 text-center">
                    <p class="text-gray-600">Cảm ơn bạn đã liên hệ với chúng tôi. Chúng tôi sẽ phản hồi trong vòng 24 giờ.</p>
                </div>
                <div class="p-6 bg-gray-50">
                    <button @click="closeSuccessModal" class="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200">
                        Đóng
                    </button>
                </div>
            </div>
        </div>

        <!-- Docs Modal (Privacy/Terms) -->
        <div v-if="showDocsModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" @click="closeDocs">
            <div class="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden" role="dialog" aria-modal="true" @click.stop>
                <div class="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
                    <h3 class="text-2xl font-bold text-white flex items-center">
                        <i class="far fa-file-alt mr-3"></i>{{ docsTitle }}
                    </h3>
                </div>
                <div class="p-6 overflow-y-auto max-h-96">
                    <p class="text-gray-600 leading-relaxed">
                        Đây là nội dung minh họa cho {{ docsTitle.toLowerCase() }}. Bạn có thể thay thế bằng nội dung thật của hệ thống.
                    </p>
                </div>
                <div class="p-6 bg-gray-50 border-t border-gray-200">
                    <button @click="closeDocs" class="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200">
                        Đã hiểu
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onBeforeUnmount } from 'vue'

const nameInput = ref(null)
const submitting = ref(false)
const showSuccessModal = ref(false)

const showDocsModal = ref(false)
const docsTitle = ref('Chính sách bảo mật')

const form = reactive({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    privacy: false
})

const errors = reactive({})
const faqs = ref([
    { question: 'Làm thế nào để đặt hàng trên website?', answer: 'Bạn có thể duyệt sản phẩm, thêm vào giỏ hàng và thực hiện thanh toán. Chúng tôi hỗ trợ nhiều phương thức thanh toán khác nhau.', isOpen: false },
    { question: 'Thời gian giao hàng là bao lâu?', answer: 'Thông thường 2-5 ngày làm việc tùy khu vực. Nội thành 1-2 ngày.', isOpen: false },
    { question: 'Tôi có thể đổi trả sản phẩm không?', answer: 'Có, trong 7 ngày kể từ ngày nhận hàng khi sản phẩm còn nguyên vẹn.', isOpen: false },
    { question: 'Có những phương thức thanh toán nào?', answer: 'COD, chuyển khoản, thẻ tín dụng/ghi nợ, ví Momo, ZaloPay.', isOpen: false },
    { question: 'Làm sao để kiểm tra tình trạng đơn hàng?', answer: 'Đăng nhập và xem "Đơn hàng của tôi" hoặc liên hệ hotline.', isOpen: false }
])

const isFormLikelyValid = computed(() => {
    return form.name && form.email && form.subject && form.message && form.message.length >= 10 && form.privacy
})

const validateForm = () => {
    Object.keys(errors).forEach(k => delete errors[k])

    if (!form.name.trim()) errors.name = 'Vui lòng nhập họ và tên'

    if (!form.email.trim()) {
        errors.email = 'Vui lòng nhập email'
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
        errors.email = 'Email không hợp lệ'
    }

    if (form.phone && !/^[\d\s\-\+\(\)]+$/.test(form.phone)) {
        errors.phone = 'Số điện thoại không hợp lệ'
    }

    if (!form.subject) errors.subject = 'Vui lòng chọn chủ đề'

    if (!form.message.trim()) {
        errors.message = 'Vui lòng nhập nội dung tin nhắn'
    } else if (form.message.length < 10) {
        errors.message = 'Tin nhắn quá ngắn (tối thiểu 10 ký tự)'
    } else if (form.message.length > 1000) {
        errors.message = 'Tin nhắn quá dài (tối đa 1000 ký tự)'
    }

    if (!form.privacy) errors.privacy = 'Vui lòng đồng ý với điều khoản'

    return Object.keys(errors).length === 0
}

const submitForm = async () => {
    if (!validateForm()) return

    submitting.value = true
    
    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        // Reset form
        Object.assign(form, {
            name: '',
            email: '',
            phone: '',
            subject: '',
            message: '',
            privacy: false
        })
        
        showSuccessModal.value = true
    } catch (error) {
        console.error('Submit failed:', error)
    } finally {
        submitting.value = false
    }
}

const closeSuccessModal = () => {
    showSuccessModal.value = false
}

const toggleFAQ = (index) => {
    faqs.value[index].isOpen = !faqs.value[index].isOpen
}

const openDocs = (type) => {
    docsTitle.value = type === 'privacy' ? 'Chính sách bảo mật' : 'Điều khoản sử dụng'
    showDocsModal.value = true
}

const closeDocs = () => {
    showDocsModal.value = false
}

const onEsc = (e) => {
    if (e.key === 'Escape') {
        if (showSuccessModal.value) closeSuccessModal()
        if (showDocsModal.value) closeDocs()
    }
}

onMounted(() => {
    document.addEventListener('keydown', onEsc)
    setTimeout(() => nameInput.value?.focus(), 0)
})

onBeforeUnmount(() => {
    document.removeEventListener('keydown', onEsc)
})
</script>

<style scoped>
/* Pure Tailwind CSS - No custom styles needed */
</style>