import { createApp } from 'vue'
import './style.css'
import './assets/buttons.css'
import './assets/icons.css'
import './assets/icon-fix.js'
// Import FontAwesome
import '@fortawesome/fontawesome-free/css/all.css'
// Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css'
// Import Bootstrap JS
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'sweetalert2/dist/sweetalert2.min.css'
import App from './App.vue'
import router from './router'
import $ from 'jquery'
window.$ = window.jQuery = $

createApp(App).use(router).mount('#app')
