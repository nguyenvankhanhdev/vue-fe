<template>
    <div class="contact-page">
        <!-- Page Header -->
        <section class="page-header">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1>Liên hệ với chúng tôi</h1>
                <p>Chúng tôi luôn sẵn sàng hỗ trợ bạn</p>
            </div>
            <div class="page-header-wave" aria-hidden="true"></div>
        </section>

        <!-- Contact Content -->
        <section class="contact-section py-5">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex flex-wrap">
                    <!-- Contact Information -->
                    <div class="col-lg-12">
                        <div class="contact-info">
                            <h2 class="text-lg font-semibold text-gray-900">
                                <i class="fas fa-headset me-2"></i>Thông tin liên hệ
                            </h2>
                            <p class="contact-description">
                                Hãy liên hệ với chúng tôi qua các kênh dưới đây. Chúng tôi sẽ phản hồi trong thời gian
                                sớm nhất.
                            </p>

                            <div class="contact-methods">
                                <div class="contact-method">
                                    <div class="method-icon">
                                        <i class="fas fa-map-marker-alt"></i>
                                    </div>
                                    <div class="method-content">
                                        <h4>Địa chỉ</h4>
                                        <p>123 Đường ABC, Phường 1, Quận 1<br>TP. Hồ Chí Minh, Việt Nam</p>
                                    </div>
                                </div>

                                <div class="contact-method">
                                    <div class="method-icon">
                                        <i class="fas fa-phone-alt"></i>
                                    </div>
                                    <div class="method-content">
                                        <h4>Điện thoại</h4>
                                        <p>
                                            <a href="tel:+84123456789">+84 123 456 789</a><br>
                                            <a href="tel:+84987654321">+84 987 654 321</a>
                                        </p>
                                    </div>
                                </div>

                                <div class="contact-method">
                                    <div class="method-icon">
                                        <i class="fas fa-envelope"></i>
                                    </div>
                                    <div class="method-content">
                                        <h4>Email</h4>
                                        <p>
                                            <a href="mailto:info@example.com">info@example.com</a><br>
                                            <a href="mailto:support@example.com">support@example.com</a>
                                        </p>
                                    </div>
                                </div>

                                <div class="contact-method">
                                    <div class="method-icon">
                                        <i class="fas fa-clock"></i>
                                    </div>
                                    <div class="method-content">
                                        <h4>Giờ làm việc</h4>
                                        <p>
                                            Thứ 2 - Thứ 6: 8:00 - 18:00<br>
                                            Thứ 7 - CN: 9:00 - 17:00
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div class="social-media">
                                <h4>Theo dõi chúng tôi</h4>
                                <div class="social-links">
                                    <a href="#" class="social-link facebook" aria-label="Facebook">
                                        <i class="fab fa-facebook-f"></i>
                                    </a>
                                    <a href="#" class="social-link twitter" aria-label="Twitter">
                                        <i class="fab fa-twitter"></i>
                                    </a>
                                    <a href="#" class="social-link instagram" aria-label="Instagram">
                                        <i class="fab fa-instagram"></i>
                                    </a>
                                    <a href="#" class="social-link youtube" aria-label="YouTube">
                                        <i class="fab fa-youtube"></i>
                                    </a>
                                    <a href="#" class="social-link linkedin" aria-label="LinkedIn">
                                        <i class="fab fa-linkedin-in"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Contact Form -->
                    <div class="col-lg-12">
                        <div class="contact-form-wrapper">
                            <h2 class="text-lg font-semibold text-gray-900">
                                <i class="fas fa-paper-plane me-2"></i>Gửi tin nhắn cho chúng tôi
                            </h2>

                            <form @submit.prevent="submitForm" class="contact-form" novalidate>
                                <div class="form-row">
                                    <div class="mb-4">
                                        <label for="name">Họ và tên *</label>
                                        <input ref="nameInput" type="text" id="name" v-model.trim="form.name"
                                            :aria-invalid="!!errors.name"
                                            :aria-describedby="errors.name ? 'name-error' : undefined"
                                            :class="{ error: errors.name }" placeholder="Nhập họ và tên của bạn"
                                            required>
                                        <span v-if="errors.name" id="name-error" class="error-message">
                                            <i class="fas fa-exclamation-circle me-1"></i>{{ errors.name }}
                                        </span>
                                    </div>

                                    <div class="mb-4">
                                        <label for="email">Email *</label>
                                        <input type="email" id="email" v-model.trim="form.email"
                                            :aria-invalid="!!errors.email"
                                            :aria-describedby="errors.email ? 'email-error' : undefined"
                                            :class="{ error: errors.email }" placeholder="Nhập địa chỉ email của bạn"
                                            required>
                                        <span v-if="errors.email" id="email-error" class="error-message">
                                            <i class="fas fa-exclamation-circle me-1"></i>{{ errors.email }}
                                        </span>
                                    </div>
                                </div>

                                <div class="form-row">
                                    <div class="mb-4">
                                        <label for="phone">Số điện thoại</label>
                                        <input type="tel" id="phone" v-model.trim="form.phone"
                                            :aria-invalid="!!errors.phone"
                                            :aria-describedby="errors.phone ? 'phone-error' : undefined"
                                            :class="{ error: errors.phone }" placeholder="Nhập số điện thoại của bạn"
                                            inputmode="tel">
                                        <span v-if="errors.phone" id="phone-error" class="error-message">
                                            <i class="fas fa-exclamation-circle me-1"></i>{{ errors.phone }}
                                        </span>
                                    </div>

                                    <div class="mb-4">
                                        <label for="subject">Chủ đề *</label>
                                        <div class="select-wrapper" :class="{ error: errors.subject }">
                                            <select id="subject" v-model="form.subject" :aria-invalid="!!errors.subject"
                                                :aria-describedby="errors.subject ? 'subject-error' : undefined"
                                                required>
                                                <option value="">Chọn chủ đề</option>
                                                <option value="general">Thông tin chung</option>
                                                <option value="support">Hỗ trợ kỹ thuật</option>
                                                <option value="order">Đặt hàng</option>
                                                <option value="return">Đổi trả</option>
                                                <option value="complaint">Khiếu nại</option>
                                                <option value="partnership">Hợp tác</option>
                                                <option value="other">Khác</option>
                                            </select>
                                            <i class="fas fa-chevron-down select-caret" aria-hidden="true"></i>
                                        </div>
                                        <span v-if="errors.subject" id="subject-error" class="error-message">
                                            <i class="fas fa-exclamation-circle me-1"></i>{{ errors.subject }}
                                        </span>
                                    </div>
                                </div>

                                <div class="mb-4">
                                    <label for="message">Nội dung tin nhắn *</label>
                                    <textarea id="message" v-model.trim="form.message" :aria-invalid="!!errors.message"
                                        :aria-describedby="errors.message ? 'message-error' : undefined"
                                        :class="{ error: errors.message }" rows="6"
                                        placeholder="Nhập nội dung tin nhắn của bạn..." required></textarea>
                                    <div class="helper-row">
                                        <span v-if="errors.message" id="message-error" class="error-message">
                                            <i class="fas fa-exclamation-circle me-1"></i>{{ errors.message }}
                                        </span>
                                        <span class="char-counter">{{ form.message.length }}/1000</span>
                                    </div>
                                </div>

                                <!-- Privacy Policy -->
                                <div class="mb-4 checkbox-group">
                                    <label class="checkbox-label">
                                        <input type="checkbox" v-model="form.privacy" :class="{ error: errors.privacy }"
                                            required>
                                        <span class="checkmark"></span>

                                        <!-- gói toàn bộ câu + 2 link vào 1 span để không bị tách -->
                                        <span class="agree-text">
                                            Tôi đồng ý với
                                            <button class="linklike" type="button" @click="openDocs('privacy')">chính
                                                sách bảo mật</button>
                                            và
                                            <button class="linklike" type="button" @click="openDocs('terms')">điều khoản
                                                sử dụng</button>
                                            *
                                        </span>
                                    </label>

                                    <span v-if="errors.privacy" class="error-message">
                                        <i class="fas fa-exclamation-circle me-1"></i>{{ errors.privacy }}
                                    </span>
                                </div>


                                <!-- Submit Button -->
                                <button type="submit" class="submit-btn" :disabled="submitting || !isFormLikelyValid">
                                    <span v-if="submitting">
                                        <i class="fas fa-spinner fa-spin"></i>
                                        Đang gửi...
                                    </span>
                                    <span v-else>
                                        <i class="fas fa-paper-plane"></i>
                                        Gửi tin nhắn
                                    </span>
                                </button>

                                <!-- subtle tip -->
                                <p class="form-tip">
                                    <i class="far fa-lightbulb me-1"></i>
                                    Mẹo: điền email chính xác để chúng tôi phản hồi nhanh hơn.
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- FAQ Section -->
        <section class="faq-section py-5">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="section-header text-center">
                    <h2>Câu hỏi thường gặp</h2>
                    <p>Những câu hỏi phổ biến từ khách hàng</p>
                </div>

                <div class="faq-container">
                    <div v-for="(faq, index) in faqs" :key="index" class="faq-item" :class="{ active: faq.isOpen }">
                        <button class="faq-question" @click="toggleFAQ(index)" :aria-expanded="faq.isOpen"
                            :aria-controls="`faq-${index}`">
                            <h4>{{ faq.question }}</h4>
                            <i :class="faq.isOpen ? 'fas fa-minus' : 'fas fa-plus'"></i>
                        </button>
                        <transition name="accordion">
                            <div class="faq-answer" v-show="faq.isOpen" :id="`faq-${index}`" role="region">
                                <p>{{ faq.answer }}</p>
                            </div>
                        </transition>
                    </div>
                </div>
            </div>
        </section>

        <!-- Map Section -->
        <section class="map-section">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 class="text-center mb-4">Vị trí của chúng tôi</h2>
                <div class="map-wrapper">
                    <div class="map-placeholder">
                        <i class="fas fa-map-marked-alt"></i>
                        <p>Bản đồ Google Maps sẽ được hiển thị tại đây</p>
                        <p class="map-note">
                            Để tích hợp bản đồ thực tế, bạn thêm Google Maps API key vào iframe embed.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Success Modal -->
        <div v-if="showSuccessModal" class="modal-overlay" @click="closeSuccessModal">
            <div class="bg-white rounded-lg shadow-xl success-modal" role="dialog" aria-modal="true" aria-labelledby="success-title"
                @click.stop>
                <div class="flex justify-between items-center p-6 border-b border-gray-200">
                    <i class="fas fa-check-circle success-icon"></i>
                    <h3 id="success-title">Gửi thành công!</h3>
                </div>
                <div class="p-6">
                    <p>Cảm ơn bạn đã liên hệ với chúng tôi. Chúng tôi sẽ phản hồi trong vòng 24 giờ.</p>
                </div>
                <div class="flex justify-end space-x-3 p-6 border-t border-gray-200">
                    <button @click="closeSuccessModal" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md transition-colors duration-200 bg-blue-600 hover:bg-blue-700 text-white">
                        Đóng
                    </button>
                </div>
            </div>
        </div>

        <!-- Docs Modal (Privacy/Terms) -->
        <div v-if="showDocsModal" class="modal-overlay" @click="closeDocs">
            <div class="bg-white rounded-lg shadow-xl" role="dialog" aria-modal="true" @click.stop>
                <div class="flex justify-between items-center p-6 border-b border-gray-200">
                    <h3 class="mb-0"><i class="far fa-file-alt me-2"></i>{{ docsTitle }}</h3>
                </div>
                <div class="p-6">
                    <p class="text-start">
                        Đây là nội dung minh họa cho {{ docsTitle.toLowerCase() }}. Bạn có thể thay thế bằng nội dung
                        thật của hệ thống.
                    </p>
                </div>
                <div class="flex justify-end space-x-3 p-6 border-t border-gray-200">
                    <button @click="closeDocs" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md transition-colors duration-200 bg-blue-600 hover:bg-blue-700 text-white">Đã hiểu</button>
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
    { question: 'Làm sao để kiểm tra tình trạng đơn hàng?', answer: 'Đăng nhập và xem “Đơn hàng của tôi” hoặc liên hệ hotline.', isOpen: false }
])

const isFormLikelyValid = computed(() => {
    // kiểm tra “nhanh” để disable nút gửi trước khi validate sâu
    return form.name && form.email && form.subject && form.message && form.message.length >= 10 && form.privacy
})

const validateForm = () => {
    Object.keys(errors).forEach(k => delete errors[k])

    if (!form.name.trim()) errors.name = 'Vui lòng nhập họ và tên'

    if (!form.email.trim()) {
        errors.email = 'Vui lòng nhập email'
    } else if (!/^[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}$/.test(form.email)) {
        errors.email = 'Email không hợp lệ'
    }

    if (form.phone && !/^[0-9+\-\s()]{6,20}$/.test(form.phone)) {
        errors.phone = 'Số điện thoại không hợp lệ'
    }

    if (!form.subject) errors.subject = 'Vui lòng chọn chủ đề'

    if (!form.message.trim()) {
        errors.message = 'Vui lòng nhập nội dung tin nhắn'
    } else if (form.message.trim().length < 10) {
        errors.message = 'Nội dung tin nhắn phải có ít nhất 10 ký tự'
    } else if (form.message.length > 1000) {
        errors.message = 'Nội dung vượt quá 1000 ký tự'
    }

    if (!form.privacy) errors.privacy = 'Bạn phải đồng ý với chính sách bảo mật'

    return Object.keys(errors).length === 0
}

const submitForm = async () => {
    if (!validateForm()) {
        // focus vào field đầu tiên bị lỗi
        const firstErrorKey = Object.keys(errors)[0]
        if (firstErrorKey === 'name' && nameInput.value) nameInput.value.focus()
        return
    }

    submitting.value = true
    try {
        // TODO: thay bằng call API thực tế
        await new Promise(r => setTimeout(r, 1200))

        // reset form
        Object.keys(form).forEach(k => (typeof form[k] === 'boolean' ? (form[k] = false) : (form[k] = '')))
        showSuccessModal.value = true
    } catch (e) {
        console.error(e)
        alert('Có lỗi xảy ra khi gửi tin nhắn. Vui lòng thử lại.')
    } finally {
        submitting.value = false
    }
}

const toggleFAQ = (i) => {
    faqs.value[i].isOpen = !faqs.value[i].isOpen
}

const closeSuccessModal = () => {
    showSuccessModal.value = false
}

const onEsc = (e) => {
    if (e.key === 'Escape') {
        if (showSuccessModal.value) showSuccessModal.value = false
        if (showDocsModal.value) showDocsModal.value = false
    }
}

const openDocs = (type) => {
    docsTitle.value = type === 'privacy' ? 'Chính sách bảo mật' : 'Điều khoản sử dụng'
    showDocsModal.value = true
}

const closeDocs = () => {
    showDocsModal.value = false
}

onMounted(() => {
    document.addEventListener('keydown', onEsc)
    // autofocus name
    setTimeout(() => nameInput.value?.focus(), 0)
})
onBeforeUnmount(() => {
    document.removeEventListener('keydown', onEsc)
})
</script>

<style scoped>
/* ====== Layout base ====== */
.contact-page {
    min-height: 100vh;
    background: #f6f7fb;
}

.page-header {
    position: relative;
    background: linear-gradient(135deg, #6a8dff 0%, #8d5bf6 50%, #b054f6 100%);
    color: #fff;
    padding: 72px 0;
    text-align: center;
    overflow: hidden;
}

.page-header .container {
    position: relative;
    z-index: 1;
}

.page-header h1 {
    font-size: 2.6rem;
    margin: 0 0 8px;
    letter-spacing: .2px;
}

.page-header p {
    font-size: 1.05rem;
    opacity: .92;
    margin: 0;
}

.page-header-wave {
    position: absolute;
    left: 0;
    right: 0;
    bottom: -1px;
    height: 80px;
    background: radial-gradient(200% 100% at 50% 0%, rgba(255, 255, 255, .45) 0%, rgba(255, 255, 255, 0) 60%),
        linear-gradient(to bottom, rgba(255, 255, 255, .12), rgba(255, 255, 255, 0));
    filter: blur(10px);
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

/* Grid using CSS grid for equal heights */
.row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 36px;
    align-items: start;
}

/* ====== Cards ====== */
.card-title {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 16px;
}

.contact-info,
.contact-form-wrapper {
    background: #fff;
    padding: 36px;
    border-radius: 20px;
    box-shadow: 0 12px 30px rgba(28, 33, 63, 0.08);
    border: 1px solid rgba(99, 102, 241, .12);
}

/* ====== Left column ====== */
.contact-description {
    color: #666;
    line-height: 1.65;
    margin-bottom: 28px;
}

.contact-methods {
    display: grid;
    gap: 18px;
    margin-bottom: 28px;
}

.contact-method {
    display: grid;
    grid-template-columns: 60px 1fr;
    gap: 16px;
    padding: 16px 18px;
    background: #fafbff;
    border: 1px solid #edf0ff;
    border-radius: 14px;
    transition: transform .18s ease, box-shadow .18s ease, background .18s ease;
}

.contact-method:hover {
    background: #f5f7ff;
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(64, 87, 217, 0.08);
}

.method-icon {
    width: 60px;
    height: 60px;
    border-radius: 14px;
    display: grid;
    place-items: center;
    color: #fff;
    font-size: 20px;
    background: linear-gradient(135deg, #ff6b6b, #ff3d71);
}

.method-content h4 {
    color: #222;
    margin: 2px 0 6px;
    font-size: 17px;
}

.method-content p {
    color: #666;
    margin: 0;
    line-height: 1.55;
}

.method-content a {
    color: #ff4d67;
    text-decoration: none;
}

.method-content a:hover {
    text-decoration: underline;
}

.social-media h4 {
    color: #333;
    margin: 16px 0;
}

.social-links {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
}

.social-link {
    width: 46px;
    height: 46px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    color: #fff;
    text-decoration: none;
    font-size: 18px;
    transition: transform .18s ease, box-shadow .18s ease, opacity .18s;
}

.social-link:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 18px rgba(0, 0, 0, .12);
}

.social-link.facebook {
    background: #3b5998;
}

.social-link.twitter {
    background: #1da1f2;
}

.social-link.instagram {
    background: linear-gradient(45deg, #f09433, #dc2743, #cc2366, #bc1888);
}

.social-link.youtube {
    background: #ff0000;
}

.social-link.linkedin {
    background: #0077b5;
}

/* ====== Form ====== */
.contact-form {
    display: grid;
    gap: 18px;
}

.form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 18px;
}

.form-group {
    display: grid;
    gap: 8px;
}

.form-group label {
    font-weight: 600;
    color: #333;
}

.form-group input,
.form-group select,
.form-group textarea {
    padding: 14px 14px;
    border: 2px solid #e8ebf2;
    border-radius: 12px;
    font-size: 15.5px;
    outline: none;
    transition: border-color .18s ease, box-shadow .18s ease, background .18s ease;
    background: #fcfdff;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
    border-color: #7c84ff;
    box-shadow: 0 0 0 4px rgba(124, 132, 255, .12);
    background: #fff;
}

.form-group input.error,
.form-group select.error,
.form-group textarea.error {
    border-color: #e74c3c;
}

.select-wrapper {
    position: relative;
}

.select-wrapper select {
    appearance: none;
    width: 100%;
}

.select-wrapper .select-caret {
    position: absolute;
    right: 14px;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    color: #9aa0b4;
}

.select-wrapper.error select {
    border-color: #e74c3c;
}

.helper-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.char-counter {
    font-size: 12.5px;
    color: #8a90a6;
}

.checkbox-group .checkbox-label {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    cursor: pointer;
}

/* giữ dấu tick như cũ */
.checkbox-label input[type="checkbox"] {
    display: none;
}

.checkmark {
    width: 20px;
    height: 20px;
    border: 2px solid #e1e5e9;
    border-radius: 5px;
    position: relative;
    margin-top: 2px;
    transition: all .18s ease;
    background: #fff;
}

.checkbox-label input:checked+.checkmark {
    background: #7c84ff;
    border-color: #7c84ff;
}

.checkbox-label input:checked+.checkmark::after {
    content: '✓';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -56%);
    color: #fff;
    font-weight: 700;
    font-size: 12px;
}

/* đảm bảo nội dung là 1 dòng (cho phép wrap tự nhiên) và nút hiển thị inline */
.agree-text {
    line-height: 1.6;
}

.linklike {
    display: inline;
    background: none;
    border: none;
    padding: 0;
    color: #7c84ff;
    cursor: pointer;
}

.linklike:hover {
    text-decoration: underline;
}

.error-message {
    color: #dc3545;
    font-size: 13.5px;
    display: inline-flex;
    align-items: center;
    gap: 6px;
}

/* Submit */
.submit-btn {
    background: linear-gradient(135deg, #7c84ff, #845ef7);
    color: #fff;
    border: none;
    padding: 14px 22px;
    border-radius: 12px;
    font-size: 15.5px;
    font-weight: 700;
    cursor: pointer;
    transition: transform .18s ease, box-shadow .18s ease, opacity .18s ease;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    justify-content: center;
}

.submit-btn:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 12px 24px rgba(132, 94, 247, .24);
}

.submit-btn:disabled {
    opacity: .6;
    cursor: not-allowed;
}

.form-tip {
    margin: 6px 2px 0;
    color: #8a90a6;
    font-size: 13px;
}

/* ====== FAQ ====== */
.faq-section {
    background: #fff;
}

.section-header {
    margin-bottom: 36px;
}

.section-header h2 {
    font-size: 2.2rem;
    color: #333;
    margin-bottom: 10px;
}

.section-header p {
    color: #666;
}

.faq-container {
    max-width: 860px;
    margin: 0 auto;
}

.faq-item {
    border: 1.5px solid #edf0ff;
    border-radius: 14px;
    margin-bottom: 14px;
    overflow: hidden;
    background: #fff;
    transition: border-color .18s ease, box-shadow .18s ease;
}

.faq-item:hover {
    border-color: #cfd6ff;
    box-shadow: 0 10px 24px rgba(92, 114, 225, .08);
}

.faq-item.active {
    border-color: #7c84ff;
}

.faq-question {
    width: 100%;
    text-align: left;
    padding: 18px 20px;
    background: #f7f8ff;
    border: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
}

.faq-question h4 {
    color: #333;
    font-size: 16.5px;
    margin: 0;
    padding-right: 16px;
}

.faq-question i {
    color: #7c84ff;
    font-size: 16px;
}

.accordion-enter-active,
.accordion-leave-active {
    transition: max-height .25s ease, opacity .25s ease;
}

.accordion-enter-from,
.accordion-leave-to {
    max-height: 0;
    opacity: 0;
}

.faq-answer {
    padding: 16px 20px 18px;
    color: #555;
    line-height: 1.65;
}

/* ====== Map ====== */
.map-section {
    padding: 60px 0;
    background: #f6f7fb;
}

.map-wrapper {
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
    border: 1px solid #edf0ff;
}

.map-placeholder {
    height: 380px;
    background: linear-gradient(135deg, #6a8dff 0%, #8d5bf6 100%);
    display: grid;
    place-items: center;
    color: white;
    text-align: center;
    padding: 24px;
}

.map-placeholder i {
    font-size: 46px;
    margin-bottom: 12px;
    opacity: .9;
}

.map-placeholder p {
    margin: 6px 0;
}

.map-note {
    opacity: .85;
}

/* ====== Modal ====== */
.modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(20, 24, 52, .55);
    display: grid;
    place-items: center;
    z-index: 1000;
    padding: 16px;
}

.modal-content {
    background: #fff;
    border-radius: 18px;
    padding: 0;
    width: 100%;
    max-width: 520px;
    box-shadow: 0 24px 64px rgba(10, 14, 40, .35);
    animation: pop .18s ease-out;
}

@keyframes pop {
    from {
        transform: scale(.98);
        opacity: .8;
    }

    to {
        transform: scale(1);
        opacity: 1;
    }
}

.modal-header {
    text-align: center;
    padding: 34px 28px 16px;
}

.success-icon {
    font-size: 52px;
    color: #2ecc71;
    margin-bottom: 10px;
}

.modal-header h3 {
    color: #2a2e43;
    margin: 0;
    font-size: 22px;
}

.modal-body {
    padding: 0 26px 6px;
    text-align: center;
    color: #60657b;
}

.modal-footer {
    padding: 18px 26px 26px;
    text-align: center;
}

.btn {
    padding: 12px 24px;
    border: none;
    border-radius: 10px;
    font-weight: 700;
    cursor: pointer;
    transition: filter .18s;
}

.btn-primary {
    background: linear-gradient(135deg, #7c84ff, #845ef7);
    color: #fff;
}

.btn-primary:hover {
    filter: brightness(1.05);
}

/* ====== Utilities ====== */
.text-center {
    text-align: center;
}

.mb-4 {
    margin-bottom: 2rem;
}

.py-5 {
    padding: 3rem 0;
}

/* ====== Responsive ====== */
@media (max-width: 992px) {
    .row {
        grid-template-columns: 1fr;
        gap: 26px;
    }

    .contact-info,
    .contact-form-wrapper {
        padding: 28px;
    }

    .form-row {
        grid-template-columns: 1fr;
    }

    .page-header {
        padding: 56px 0;
    }

    .page-header h1 {
        font-size: 2.2rem;
    }
}

@media (max-width: 480px) {
    .submit-btn {
        width: 100%;
    }
}
</style>
