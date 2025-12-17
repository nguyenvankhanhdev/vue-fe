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
              <i :class="toast.icon" style="font-family: 'Font Awesome 6 Free'; font-weight: 900;"></i>
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

const { toasts, removeToast } = useToast()

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
  z-index: 10000;
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
  background: linear-gradient(135deg, #ffffff 0%, #f9fafb 100%);
  border-radius: 16px;
  box-shadow: 
    0 20px 50px -12px rgba(0, 0, 0, 0.25),
    0 8px 24px rgba(0, 0, 0, 0.12),
    0 0 0 1px rgba(0, 0, 0, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.6);
  margin-bottom: 16px;
  overflow: hidden;
  pointer-events: auto;
  position: relative;
  min-height: 72px;
  border-left: 5px solid;
  backdrop-filter: blur(10px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Shimmer effect overlay */
.toast::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.3) 50%,
    transparent 100%
  );
  animation: shimmer 3s infinite;
  pointer-events: none;
}

@keyframes shimmer {
  0% { left: -100%; }
  100% { left: 200%; }
}

.toast-success {
  border-left-color: #10b981;
  background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
}

.toast-success::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at top right, rgba(16, 185, 129, 0.1) 0%, transparent 70%);
  pointer-events: none;
}

.toast-error {
  border-left-color: #ef4444;
  background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
}

.toast-error::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at top right, rgba(239, 68, 68, 0.1) 0%, transparent 70%);
  pointer-events: none;
}

.toast-warning {
  border-left-color: #f59e0b;
  background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%);
}

.toast-warning::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at top right, rgba(245, 158, 11, 0.1) 0%, transparent 70%);
  pointer-events: none;
}

.toast-info {
  border-left-color: #3b82f6;
  background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
}

.toast-info::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at top right, rgba(59, 130, 246, 0.1) 0%, transparent 70%);
  pointer-events: none;
}

.toast-content {
  display: flex;
  align-items: center;
  padding: 18px 20px;
  gap: 16px;
  position: relative;
  z-index: 1;
}

.toast-icon {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  border-radius: 12px;
  position: relative;
  animation: iconPulse 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

@keyframes iconPulse {
  0% {
    transform: scale(0) rotate(-180deg);
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
  color: #059669;
  background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
  box-shadow: 
    0 4px 12px rgba(16, 185, 129, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.5);
}

.toast-error .toast-icon {
  color: #dc2626;
  background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
  box-shadow: 
    0 4px 12px rgba(239, 68, 68, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.5);
  animation: iconShake 0.6s ease;
}

@keyframes iconShake {
  0%, 100% { transform: translateX(0) rotate(0deg); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-4px) rotate(-5deg); }
  20%, 40%, 60%, 80% { transform: translateX(4px) rotate(5deg); }
}

.toast-warning .toast-icon {
  color: #d97706;
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
  box-shadow: 
    0 4px 12px rgba(245, 158, 11, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.5);
  animation: iconBounce 0.7s ease;
}

@keyframes iconBounce {
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-10px); }
  60% { transform: translateY(-5px); }
}

.toast-info .toast-icon {
  color: #2563eb;
  background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
  box-shadow: 
    0 4px 12px rgba(59, 130, 246, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.5);
}

.toast-message {
  flex: 1;
  font-size: 15px;
  line-height: 1.6;
  color: #111827;
  font-weight: 600;
  letter-spacing: -0.01em;
}

.toast-message p {
  margin: 0;
}

.toast-action {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  border: none;
  color: white;
  cursor: pointer;
  font-size: 14px;
  font-weight: 700;
  padding: 8px 16px;
  border-radius: 10px;
  transition: all 0.2s ease;
  flex-shrink: 0;
  box-shadow: 
    0 4px 12px rgba(59, 130, 246, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.toast-action:hover {
  transform: translateY(-2px);
  box-shadow: 
    0 6px 16px rgba(59, 130, 246, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.toast-action:active {
  transform: translateY(0);
  box-shadow: 
    0 2px 8px rgba(59, 130, 246, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.toast-close {
  background: rgba(107, 114, 128, 0.1);
  border: none;
  color: #6b7280;
  cursor: pointer;
  padding: 8px;
  border-radius: 10px;
  transition: all 0.2s ease;
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
}

.toast-close:hover {
  background: rgba(239, 68, 68, 0.15);
  color: #ef4444;
  transform: rotate(90deg) scale(1.1);
}

.toast-close:active {
  transform: rotate(90deg) scale(0.95);
}

.toast-progress {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 5px;
  width: 100%;
  transform-origin: left;
  animation: toast-progress linear forwards;
  border-radius: 0 0 16px 16px;
  overflow: hidden;
}

.toast-progress::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.4) 50%,
    transparent 100%
  );
  animation: progressShimmer 1.5s infinite;
}

@keyframes progressShimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.toast-success .toast-progress {
  background: linear-gradient(90deg, #10b981 0%, #059669 100%);
  box-shadow: 
    0 0 20px rgba(16, 185, 129, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
}

.toast-error .toast-progress {
  background: linear-gradient(90deg, #ef4444 0%, #dc2626 100%);
  box-shadow: 
    0 0 20px rgba(239, 68, 68, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
}

.toast-warning .toast-progress {
  background: linear-gradient(90deg, #f59e0b 0%, #d97706 100%);
  box-shadow: 
    0 0 20px rgba(245, 158, 11, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
}

.toast-info .toast-progress {
  background: linear-gradient(90deg, #3b82f6 0%, #2563eb 100%);
  box-shadow: 
    0 0 20px rgba(59, 130, 246, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
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
  transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.toast-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 1, 1);
}

.toast-enter-from {
  transform: translateX(120%) scale(0.8) rotate(10deg);
  opacity: 0;
}

.toast-leave-to {
  transform: translateX(120%) scale(0.6) rotate(-10deg);
  opacity: 0;
}

.toast-move {
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Hover effects */
.toast:hover {
  box-shadow: 
    0 24px 60px -12px rgba(0, 0, 0, 0.3),
    0 12px 32px rgba(0, 0, 0, 0.16),
    0 0 0 1px rgba(0, 0, 0, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  transform: translateY(-4px) scale(1.02);
}

.toast:hover::before {
  animation-play-state: paused;
}

.toast:hover .toast-progress {
  animation-play-state: paused;
}

.toast:hover .toast-progress::before {
  animation-play-state: paused;
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .toast {
    background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
    color: #f9fafb;
    box-shadow: 
      0 20px 50px -12px rgba(0, 0, 0, 0.6),
      0 8px 24px rgba(0, 0, 0, 0.4),
      0 0 0 1px rgba(255, 255, 255, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
  }
  
  .toast-success {
    background: linear-gradient(135deg, #064e3b 0%, #022c22 100%);
  }
  
  .toast-error {
    background: linear-gradient(135deg, #7f1d1d 0%, #450a0a 100%);
  }
  
  .toast-warning {
    background: linear-gradient(135deg, #78350f 0%, #451a03 100%);
  }
  
  .toast-info {
    background: linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%);
  }
  
  .toast-message {
    color: #f9fafb;
  }
  
  .toast-close {
    background: rgba(255, 255, 255, 0.1);
    color: #d1d5db;
  }
  
  .toast-close:hover {
    background: rgba(239, 68, 68, 0.25);
    color: #fca5a5;
  }
  
  .toast-action {
    background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
  }
  
  .toast-action:hover {
    box-shadow: 
      0 6px 16px rgba(37, 99, 235, 0.5),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
  }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .toast-enter-active,
  .toast-leave-active,
  .toast-move,
  .toast,
  .toast-close,
  .toast-action {
    transition: none !important;
  }
  
  .toast-progress,
  .toast-progress::before,
  .toast::before,
  .toast-icon {
    animation: none !important;
  }
  
  .toast:hover {
    transform: none;
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
    border-radius: 14px;
    min-height: 68px;
  }
  
  .toast-content {
    padding: 16px 18px;
    gap: 14px;
  }
  
  .toast-icon {
    width: 42px;
    height: 42px;
    font-size: 22px;
  }
  
  .toast-message {
    font-size: 14px;
  }
  
  .toast-close {
    width: 34px;
    height: 34px;
  }
}
</style>