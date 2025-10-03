<template>
  <teleport to="body">
    <div v-if="show" class="cd-overlay" @click.self="onCancel">
      <div class="cd-dialog" role="dialog" aria-modal="true" :aria-labelledby="dialogId + '-title'">
        <div class="cd-header">
          <h3 :id="dialogId + '-title'">{{ title }}</h3>
          <button class="cd-close" @click="onCancel" aria-label="Đóng">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="cd-body">
          <p>{{ message }}</p>
        </div>
        <div class="cd-actions">
          <button class="cd-btn cd-cancel" @click="onCancel">{{ cancelText }}</button>
          <button class="cd-btn cd-confirm" :class="typeClass" @click="onConfirm">{{ confirmText }}</button>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  show: { type: Boolean, default: false },
  title: { type: String, default: 'Xác nhận' },
  message: { type: String, default: 'Bạn có chắc chắn?' },
  confirmText: { type: String, default: 'Xác nhận' },
  cancelText: { type: String, default: 'Hủy' },
  type: { type: String, default: 'danger' } // 'primary' | 'danger' | 'warning'
})

const emit = defineEmits(['update:show', 'confirm', 'cancel'])

const dialogId = Math.random().toString(36).slice(2)

const typeClass = computed(() => ({
  'cd-primary': props.type === 'primary',
  'cd-danger': props.type === 'danger',
  'cd-warning': props.type === 'warning'
}))

const onCancel = () => {
  emit('update:show', false)
  emit('cancel')
}

const onConfirm = () => {
  emit('update:show', false)
  emit('confirm')
}
</script>

<style scoped>
.cd-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  padding: 16px;
}

.cd-dialog {
  width: 100%;
  max-width: 420px;
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 25px 60px rgba(0,0,0,0.2);
  overflow: hidden;
  animation: cd-pop 0.15s ease-out;
}

@keyframes cd-pop { from { transform: scale(0.96); opacity: 0.8; } to { transform: scale(1); opacity: 1; } }

.cd-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  border-bottom: 1px solid #f0f2f5;
}
.cd-header h3 { margin: 0; font-size: 18px; color: #111827; }

.cd-close { background: transparent; border: 0; font-size: 16px; color: #6b7280; cursor: pointer; }
.cd-close:hover { color: #374151; }

.cd-body { padding: 16px; color: #374151; }

.cd-actions { display: flex; gap: 10px; justify-content: flex-end; padding: 12px 16px 16px; }

.cd-btn { padding: 10px 14px; border-radius: 10px; border: 1px solid #e5e7eb; cursor: pointer; font-weight: 600; }

.cd-cancel { background: #fff; color: #374151; }
.cd-cancel:hover { background: #f9fafb; }

.cd-confirm { color: #fff; border: none; }
.cd-primary { background: #3b82f6; }
.cd-primary:hover { background: #2563eb; }
.cd-danger { background: #ef4444; }
.cd-danger:hover { background: #dc2626; }
.cd-warning { background: #f59e0b; }
.cd-warning:hover { background: #d97706; }
</style>
