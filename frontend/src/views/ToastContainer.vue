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
              <i class="fas fa-times"></i>
            </button>
          </div>

          <!-- Enhanced Progress bar with gradient -->
          <div
            v-if="!toast.persistent && toast.duration > 0"
            class="toast-progress-container"
          >
            <!-- Progress bar (scale animation) -->
            <div
              class="toast-progress"
              :class="`toast-progress-${toast.type}`"
              :style="{ animationDuration: toast.duration + 'ms' }"
            ></div>
            
            <!-- Shimmer overlay (separate - not affected by scale) -->
            <div class="toast-progress-shine"></div>
          </div>
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
  max-width: 420px;
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
  border-radius: 16px;
  box-shadow: 
    0 20px 40px -12px rgba(0, 0, 0, 0.15),
    0 4px 16px rgba(0, 0, 0, 0.08),
    0 0 0 1px rgba(0, 0, 0, 0.04);
  margin-bottom: 16px;
  overflow: hidden;
  pointer-events: auto;
  position: relative;
  min-height: 68px;
  border-left: 4px solid;
  backdrop-filter: blur(10px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.toast::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 50%);
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.toast:hover::before {
  opacity: 1;
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
  padding: 18px 20px;
  gap: 14px;
}

.toast-icon {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  animation: iconPop 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

@keyframes iconPop {
  0% {
    transform: scale(0) rotate(-45deg);
    opacity: 0;
  }
  50% {
    transform: scale(1.2) rotate(10deg);
  }
  100% {
    transform: scale(1) rotate(0deg);
    opacity: 1;
  }
}

.toast-success .toast-icon {
  color: #10b981;
}

.toast-error .toast-icon {
  color: #ef4444;
  animation: iconShake 0.5s ease;
}

@keyframes iconShake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-3px); }
  20%, 40%, 60%, 80% { transform: translateX(3px); }
}

.toast-warning .toast-icon {
  color: #f59e0b;
  animation: iconBounce 0.6s ease;
}

@keyframes iconBounce {
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-8px); }
  60% { transform: translateY(-4px); }
}

.toast-info .toast-icon {
  color: #3b82f6;
}

.toast-message {
  flex: 1;
  font-size: 14px;
  line-height: 1.6;
  color: #1f2937;
  font-weight: 500;
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
  font-weight: 700;
  padding: 6px 12px;
  border-radius: 8px;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.toast-action:hover {
  background: #eff6ff;
  transform: translateY(-1px);
}

.toast-action:active {
  transform: translateY(0);
}

.toast-close {
  background: none;
  border: none;
  color: #9ca3af;
  cursor: pointer;
  padding: 6px;
  border-radius: 8px;
  transition: all 0.2s ease;
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
}

.toast-close:hover {
  background: #f3f4f6;
  color: #374151;
  transform: rotate(90deg);
}

.toast-close:active {
  transform: rotate(90deg) scale(0.95);
}

/* Enhanced Progress Bar */
.toast-progress-container {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 6px;
  background: rgba(0, 0, 0, 0.1);
  overflow: hidden; /* Container vẫn giữ overflow hidden */
  border-radius: 0 0 16px 16px;
}

.toast-progress {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  transform-origin: left center;
  animation: toastProgress linear forwards;
  animation-duration: inherit;
  border-radius: inherit;
  /* BỎ overflow: hidden để shine không bị ảnh hưởng */
  will-change: transform;
  z-index: 1;
}

.toast-progress-success {
  background: linear-gradient(90deg, 
    #34d399 0%, 
    #10b981 50%, 
    #059669 100%
  );
  box-shadow: 
    inset 0 1px 2px rgba(255, 255, 255, 0.3),
    0 0 20px rgba(16, 185, 129, 0.7);
}

.toast-progress-error {
  background: linear-gradient(90deg, 
    #f87171 0%, 
    #ef4444 50%, 
    #dc2626 100%
  );
  box-shadow: 
    inset 0 1px 2px rgba(255, 255, 255, 0.3),
    0 0 20px rgba(239, 68, 68, 0.7);
}

.toast-progress-warning {
  background: linear-gradient(90deg, 
    #fbbf24 0%, 
    #f59e0b 50%, 
    #d97706 100%
  );
  box-shadow: 
    inset 0 1px 2px rgba(255, 255, 255, 0.3),
    0 0 20px rgba(245, 158, 11, 0.7);
}

.toast-progress-info {
  background: linear-gradient(90deg, 
    #60a5fa 0%, 
    #3b82f6 50%, 
    #2563eb 100%
  );
  box-shadow: 
    inset 0 1px 2px rgba(255, 255, 255, 0.3),
    0 0 20px rgba(59, 130, 246, 0.7);
}

/* Shimmer effect - TÁCH RA NGOÀI, không bị scale theo progress bar */
.toast-progress-shine {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0) 20%,
    rgba(255, 255, 255, 0.4) 40%,
    rgba(255, 255, 255, 0.8) 50%,
    rgba(255, 255, 255, 0.4) 60%,
    rgba(255, 255, 255, 0) 80%,
    transparent 100%
  );
  transform: translateX(-100%);
  animation: shimmer 1.5s ease-in-out infinite;
  will-change: transform;
  pointer-events: none; /* Không chặn click */
  z-index: 2; /* Nằm trên progress bar */
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(200%);
  }
}

@keyframes toastProgress {
  0% {
    transform: scaleX(1);
  }
  100% {
    transform: scaleX(0);
  }
}

/* Toast animations - smoother entrance */
.toast-enter-active {
  transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.toast-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 1, 1);
}

.toast-enter-from {
  transform: translateX(120%) scale(0.8);
  opacity: 0;
}

.toast-leave-to {
  transform: translateX(120%) scale(0.8);
  opacity: 0;
}

.toast-move {
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Hover effects */
.toast:hover {
  box-shadow: 
    0 24px 48px -12px rgba(0, 0, 0, 0.2),
    0 8px 24px rgba(0, 0, 0, 0.12),
    0 0 0 1px rgba(0, 0, 0, 0.06);
  transform: translateY(-4px) scale(1.02);
}

.toast:hover .toast-progress {
  animation-play-state: paused;
}

.toast:hover .toast-progress-shine {
  animation-play-state: paused;
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .toast {
    background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
    color: #f9fafb;
    box-shadow: 
      0 20px 40px -12px rgba(0, 0, 0, 0.5),
      0 4px 16px rgba(0, 0, 0, 0.3),
      0 0 0 1px rgba(255, 255, 255, 0.1);
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
    background: #1e3a8a;
  }
  
  .toast-progress-container {
    background: rgba(255, 255, 255, 0.1);
  }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .toast-enter-active,
  .toast-leave-active,
  .toast-move,
  .toast,
  .toast::before,
  .toast-close,
  .toast-action {
    transition: none !important;
  }
  
  .toast-progress,
  .toast-progress-shine,
  .toast-icon {
    animation: none !important;
  }
}

/* High contrast mode */
@media (prefers-contrast: high) {
  .toast {
    border: 3px solid;
    border-color: currentColor;
  }
}

/* Mobile optimizations */
@media (max-width: 480px) {
  .toast {
    border-radius: 12px;
    min-height: 64px;
  }
  
  .toast-content {
    padding: 14px 16px;
    gap: 12px;
  }
  
  .toast-icon {
    width: 20px;
    height: 20px;
    font-size: 16px;
  }
  
  .toast-message {
    font-size: 13px;
  }
}
</style>