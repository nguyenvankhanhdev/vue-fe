import { createApp } from 'vue'
import './style.css'
import './assets/custom.css'
import '@fortawesome/fontawesome-free/css/all.css'
import 'sweetalert2/dist/sweetalert2.min.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(router).mount('#app')
