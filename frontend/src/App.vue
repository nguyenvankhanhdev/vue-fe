<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Header from '@/components/Layout/Header.vue'
import Footer from '@/components/Layout/Footer.vue'
import ToastContainer from '@/views/ToastContainer.vue'
import GlobalLoading from '@/components/Common/GlobalLoading.vue'

const route = useRoute()

// Ẩn Header/Footer cho trang admin
const isAdminRoute = computed(() => {
  return route.path.startsWith('/admin')
})
</script>

<template>
  <div id="app">
    <!-- Chỉ hiển thị Header/Footer khi KHÔNG phải trang admin -->
    <Header v-if="!isAdminRoute" />

    <main class="main-content" role="main" :class="{ 'admin-layout': isAdminRoute }">
      <RouterView v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </RouterView>
    </main>

    <Footer v-if="!isAdminRoute" />

    <!-- Toast Notifications (luôn mounted ở root) -->
    <ToastContainer />

    <!-- Global Loading Overlay -->
    <GlobalLoading />
  </div>
</template>


<style>
/* App-specific Styles with Tailwind */
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  margin-bottom: 1.25rem;
}

/* Admin Layout - Trang admin không có margin/padding */
.main-content.admin-layout {
  margin: 0;
  padding: 0;
  min-height: 100vh;
  background-color: #f9fafb;
}

/* Animation classes */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease;
}

.slide-up-enter-from {
  transform: translateY(20px);
  opacity: 0;
}

.slide-up-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
</style>
