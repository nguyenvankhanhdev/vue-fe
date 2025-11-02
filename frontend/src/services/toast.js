// Toast notification service
import { ref, reactive } from 'vue'

// Toast state
const toasts = ref([])
let toastId = 0

// Toast types
export const TOAST_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error', 
  WARNING: 'warning',
  INFO: 'info'
}

// Toast configuration
const DEFAULT_DURATION = 2000 // 5 seconds (để dễ thấy progress bar)
const MAX_TOASTS = 2

// Toast service
export const toastService = {
  // Show toast
  show(message, type = TOAST_TYPES.INFO, duration = DEFAULT_DURATION, options = {}) {
    const toast = {
      id: ++toastId,
      message,
      type,
      duration,
      timestamp: Date.now(),
      persistent: options.persistent || false,
      action: options.action || null,
      icon: options.icon || this.getDefaultIcon(type)
    }

    toasts.value.push(toast)

    // Limit number of toasts
    if (toasts.value.length > MAX_TOASTS) {
      toasts.value.shift()
    }

    // Auto remove toast
    if (!toast.persistent && duration > 0) {
      setTimeout(() => {
        this.remove(toast.id)
      }, duration)
    }

    return toast.id
  },

  // Remove toast
  remove(id) {
    const index = toasts.value.findIndex(toast => toast.id === id)
    if (index > -1) {
      toasts.value.splice(index, 1)
    }
  },

  // Clear all toasts
  clear() {
    toasts.value.splice(0)
  },

  // Convenience methods
  success(message, duration, options) {
    return this.show(message, TOAST_TYPES.SUCCESS, duration, options)
  },

  error(message, duration, options) {
    return this.show(message, TOAST_TYPES.ERROR, duration, options)
  },

  warning(message, duration, options) {
    return this.show(message, TOAST_TYPES.WARNING, duration, options)
  },

  info(message, duration, options) {
    return this.show(message, TOAST_TYPES.INFO, duration, options)
  },

  // Get default icon for toast type
  getDefaultIcon(type) {
    const icons = {
      [TOAST_TYPES.SUCCESS]: 'fas fa-check-circle',
      [TOAST_TYPES.ERROR]: 'fas fa-exclamation-circle',
      [TOAST_TYPES.WARNING]: 'fas fa-exclamation-triangle',
      [TOAST_TYPES.INFO]: 'fas fa-info-circle'
    }
    return icons[type] || icons[TOAST_TYPES.INFO]
  },

  // Get toasts (reactive)
  getToasts() {
    return toasts
  }
}

// Toast composable
export function useToast() {
  return {
    toasts: toasts,
    showToast: toastService.show.bind(toastService),
    removeToast: toastService.remove.bind(toastService),
    clearToasts: toastService.clear.bind(toastService),
    success: toastService.success.bind(toastService),
    error: toastService.error.bind(toastService),
    warning: toastService.warning.bind(toastService),
    info: toastService.info.bind(toastService)
  }
}

// Export default
export default toastService