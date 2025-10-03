<script setup>
import Header from '@/components/Layout/Header.vue'
import Footer from '@/components/Layout/Footer.vue'
import ToastContainer from '@/views/ToastContainer.vue'
</script>

<template>
  <div id="app">
    <Header />

    <main class="main-content" role="main">
      <RouterView v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </RouterView>
    </main>

    <Footer />

    <!-- Toast Notifications (luôn mounted ở root) -->
    <ToastContainer />
  </div>
</template>


<style>
/* App-specific Styles */
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  margin-bottom: 20px;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Component-specific responsive grid */
.row {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -15px;
}

.col-lg-6 {
  flex: 0 0 50%;
  max-width: 50%;
  padding: 0 15px;
}

.col-lg-4 {
  flex: 0 0 33.333333%;
  max-width: 33.333333%;
  padding: 0 15px;
}

.col-lg-3 {
  flex: 0 0 25%;
  max-width: 25%;
  padding: 0 15px;
}

@media (max-width: 768px) {
  .col-lg-6,
  .col-lg-4,
  .col-lg-3 {
    flex: 0 0 100%;
    max-width: 100%;
  }
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
