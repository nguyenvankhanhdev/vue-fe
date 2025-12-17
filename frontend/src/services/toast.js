// toast.js
import Swal from 'sweetalert2'

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  zIndex: 9999,
  showClass: { popup: 'swal2-toast-in' },
  hideClass: { popup: 'swal2-toast-out' },
  customClass: {
    popup: 'ct-toast',
    title: 'ct-toast__title',
    icon: 'ct-toast__icon',
    timerProgressBar: 'ct-toast__progress',
    closeButton: 'ct-toast__close'
  },
  didOpen: (t) => {
    t.setAttribute('role', 'status')
    t.setAttribute('aria-live', 'polite')
    t.addEventListener('mouseenter', Swal.stopTimer)
    t.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

const kinds = {
  success: { 
    iconHtml: '<i class="fas fa-check-circle" style="font-size: 24px; background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;"></i>', 
    iconColor: 'transparent', 
    background: '#ffffff', 
    color: 'transparent' 
  },
  error: { 
    iconHtml: '<i class="fas fa-times-circle" style="font-size: 24px;"></i>', 
    iconColor: '#ef4444', 
    background: '#ffffff', 
    color: '#7f1d1d' 
  },
  warning: { 
    iconHtml: '<i class="fas fa-exclamation-circle" style="font-size: 24px;"></i>', 
    iconColor: '#f59e0b', 
    background: '#ffffff', 
    color: '#78350f' 
  },
  info: { 
    iconHtml: '<i class="fas fa-info-circle" style="font-size: 24px; background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;"></i>', 
    iconColor: 'transparent', 
    background: '#ffffff', 
    color: 'transparent' 
  }
}

export const toastService = {
  /**
   * type: success|error|warning|info
   * opts: { variant?: 'brand', position?, showCloseButton?, background?, color?, iconColor? ... }
   */
  show(type='info', message='', duration=3000, opts={}) {
    const base = kinds[type] || kinds.info

    // nếu muốn “brand”, ta override nền + class
    const brandOpts = opts.variant === 'brand'
      ? {
          background: 'var(--ct-toast-bg-brand)',
          color: 'var(--ct-on-brand)',
          iconColor: '#34d399', // xanh check mark đẹp trên nền brand
          customClass: { popup: 'ct-toast ct-toast--brand' }
        }
      : {}

    return Toast.fire({
      title: message,
      timer: duration,
      ...base,
      ...brandOpts,
      ...opts // cuối cùng cho phép override thủ công nếu cần
    })
  },
  success(m,d,o){ return this.show('success',m,d,o) },
  error(m,d,o){ return this.show('error',m,d,o) },
  warning(m,d,o){ return this.show('warning',m,d,o) },
  info(m,d,o){ return this.show('info',m,d,o) }
}

// Composable function for use in Vue components
export const useToast = () => toastService

export default toastService
