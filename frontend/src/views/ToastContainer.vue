<template>
  <teleport to="body">
    <div class="toast-container" v-if="toasts.length > 0">
      <transition-group name="toast" tag="div">
        <div
          v-for="toast in toasts"
          :key="toast.id"
          class="toast"
          :class="[`toast-${toast.type}`, { 'toast-persistent': toast.persistent }]"
          role="alert"
          aria-live="polite"
        >
          <div class="toast-content">
            <div class="toast-icon" v-if="toast.icon">
              <i :class="toast.icon"></i>
            </div>
            
            <div class="toast-message">
              <p v-html="toast.message"></p>
            </div>

            <button
              class="toast-action"
              v-if="toast.action"
              @click="handleAction(toast)"
              :aria-label="toast.action.label"
            >
              {{ toast.action.label }}
            </button>

            <button
              class="toast-close"
              @click="removeToast(toast.id)"
              aria-label="Đóng thông báo"
            >
              <i class="fas fa-times" style="font-family: 'Font Awesome 6 Free'; font-weight: 900;"></i>
            </button>
          </div>

          <!-- Progress bar for timed toasts -->
          <div
            v-if="!toast.persistent && toast.duration > 0"
            class="toast-progress"
            :style="{ animationDuration: `${toast.duration}ms` }"
          ></div>
        </div>
      </transition-group>
    </div>
  </teleport>
</template>

<script setup>
import { useToast } from '../services/toast.js'

import { onMounted, onUnmounted } from 'vue'

const { toasts, removeToast } = useToast()

// <script setup>
const onEsc = (e) => {
  if (e.key === 'Escape' && toasts.value.length) {
    removeToast(toasts.value[toasts.value.length - 1].id)
  }
}
onMounted(() => window.addEventListener('keydown', onEsc))
onUnmounted(() => window.removeEventListener('keydown', onEsc))



const handleAction = (toast) => {
  if (toast.action && toast.action.handler) {
    toast.action.handler()
  }
  removeToast(toast.id)
}
</script>

<style scoped>
.toast-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 99999;
  pointer-events: none;
  max-width: 400px;
  width: 100%;
}

@media (max-width: 480px) {
  .toast-container {
    top: 10px;
    right: 10px;
    left: 10px;
    max-width: none;
  }
}

.toast {
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1), 0 4px 16px rgba(0, 0, 0, 0.08);
  margin-bottom: 12px;
  overflow: hidden;
  pointer-events: auto;
  position: relative;
  min-height: 64px;
  border-left: 4px solid;
}

.toast-success {
  border-left-color: #10b981;
}

.toast-error {
  border-left-color: #ef4444;
}

.toast-warning {
  border-left-color: #f59e0b;
}

.toast-info {
  border-left-color: #3b82f6;
}

.toast-content {
  display: flex;
  align-items: flex-start;
  padding: 16px;
  gap: 12px;
}

.toast-icon {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2px;
}

.toast-success .toast-icon {
  color: #10b981;
}

.toast-error .toast-icon {
  color: #ef4444;
}

.toast-warning .toast-icon {
  color: #f59e0b;
}

.toast-info .toast-icon {
  color: #3b82f6;
}

.toast-message {
  flex: 1;
  font-size: 14px;
  line-height: 1.5;
  color: #374151;
}

.toast-message p {
  margin: 0;
}

.toast-action {
  background: none;
  border: none;
  color: #3b82f6;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 6px;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.toast-action:hover {
  background: #eff6ff;
}

.toast-close {
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  padding: 4px;
  border-radius: 6px;
  transition: all 0.2s ease;
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.toast-close:hover {
  background: #f3f4f6;
  color: #374151;
}

.toast-progress {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  background: currentColor;
  width: 100%;
  transform-origin: left;
  animation: toast-progress linear forwards;
  opacity: 0.3;
}

.toast-success .toast-progress {
  color: #10b981;
}

.toast-error .toast-progress {
  color: #ef4444;
}

.toast-warning .toast-progress {
  color: #f59e0b;
}

.toast-info .toast-progress {
  color: #3b82f6;
}

@keyframes toast-progress {
  from {
    transform: scaleX(1);
  }
  to {
    transform: scaleX(0);
  }
}

/* Toast animations */
.toast-enter-active {
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.toast-leave-active {
  transition: all 0.3s ease-in;
}

.toast-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.toast-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

.toast-move {
  transition: transform 0.3s ease;
}

/* Hover effects */
.toast:hover {
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15), 0 8px 24px rgba(0, 0, 0, 0.12);
  transform: translateY(-2px);
  transition: all 0.2s ease;
}

.toast:hover .toast-progress {
  animation-play-state: paused;
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .toast {
    background: #1f2937;
    color: #f9fafb;
  }
  
  .toast-message {
    color: #f9fafb;
  }
  
  .toast-close {
    color: #9ca3af;
  }
  
  .toast-close:hover {
    background: #374151;
    color: #f9fafb;
  }
  
  .toast-action:hover {
    background: #1e40af;
  }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .toast-enter-active,
  .toast-leave-active,
  .toast-move {
    transition: none;
  }
  
  .toast-progress {
    animation: none;
  }
}

/* High contrast mode */
@media (prefers-contrast: high) {
  .toast {
    border: 2px solid;
    border-color: currentColor;
  }
}
</style>