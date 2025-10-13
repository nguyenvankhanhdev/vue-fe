import { ref } from 'vue'

// Global loading state
const isLoading = ref(false)
const loadingMessage = ref('Đang tải...')

export function useLoading() {
  const startLoading = (message = 'Đang tải...') => {
    loadingMessage.value = message
    isLoading.value = true
  }

  const stopLoading = () => {
    isLoading.value = false
    loadingMessage.value = 'Đang tải...'
  }

  const setLoadingMessage = (message) => {
    loadingMessage.value = message
  }

  return {
    isLoading,
    loadingMessage,
    startLoading,
    stopLoading,
    setLoadingMessage
  }
}