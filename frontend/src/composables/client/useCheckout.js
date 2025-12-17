// src/composables/client/useCheckout.js
import { ref, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import cartService from '@/services/cartService'
import addressService from '@/services/addressService'
import orderService from '@/services/orderService'
import toast from '@/services/toast'

export function useCheckout() {
  const router = useRouter()
  const route = useRoute()

  // State
  const orderLoading = ref(false)
  const cartItems = ref([])
  const checkoutSummary = ref(null)
  const appliedCouponData = ref(null)
  const couponCode = ref('')
  const selectedShippingMethod = ref('standard')
  const selectedPaymentMethod = ref('cod')
  const selectedBankTransferMethod = ref('')
  const loadingCheckout = ref(false)

  // User
  const user = computed(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      try {
        return JSON.parse(savedUser)
      } catch (error) {
        return null
      }
    }
    return null
  })

  // Forms
  const shippingInfo = ref({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    district: '',
    ward: '',
    notes: ''
  })

  const creditCard = ref({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  })

  // Address
  const provinces = ref([])
  const districts = ref([])
  const wards = ref([])
  const loadingProvinces = ref(false)
  const loadingDistricts = ref(false)
  const loadingWards = ref(false)

  // Static Data
  const shippingMethods = ref([
    {
      id: 'standard',
      name: 'Giao hàng tiêu chuẩn',
      price: 30000,
      estimatedTime: '2-3 ngày làm việc'
    },
    {
      id: 'express',
      name: 'Giao hàng nhanh',
      price: 50000,
      estimatedTime: '1-2 ngày làm việc'
    },
    {
      id: 'same_day',
      name: 'Giao hàng trong ngày',
      price: 100000,
      estimatedTime: 'Trong ngày (đặt trước 14:00)'
    }
  ])

  const paymentMethods = ref([
    {
      id: 'cod',
      name: 'Thanh toán khi nhận hàng',
      icon: 'fas fa-money-bill-wave'
    },
    {
      id: 'credit_card',
      name: 'Thẻ tín dụng/Ghi nợ',
      icon: 'fas fa-credit-card'
    },
    {
      id: 'bank_transfer',
      name: 'Chuyển khoản ngân hàng',
      icon: 'fas fa-university'
    },
    {
      id: 'e_wallet',
      name: 'Ví điện tử khác',
      icon: 'fas fa-wallet'
    }
  ])

  const bankTransferOptions = ref([
    { id: 'momo', name: 'Ví MoMo', icon: 'fab fa-apple' },
    { id: 'vnpay', name: 'VNPay', icon: 'fas fa-credit-card' }
  ])

  // Computed
  const selectedShipping = computed(() => {
    return shippingMethods.value.find(m => m.id === selectedShippingMethod.value)
  })

  const subtotal = computed(() => {
    return checkoutSummary.value?.subtotal || 
           cartItems.value.reduce((sum, item) => sum + (item.subtotal || 0), 0)
  })

  const shippingFee = computed(() => {
    return selectedShipping.value?.price || 0
  })

  const discount = computed(() => {
    return checkoutSummary.value?.discount || 0
  })

  const finalTotal = computed(() => {
    return checkoutSummary.value?.total || (subtotal.value + shippingFee.value - discount.value)
  })

  const canPlaceOrder = computed(() => {
    const hasShippingInfo = shippingInfo.value.firstName &&
      shippingInfo.value.lastName &&
      shippingInfo.value.email &&
      shippingInfo.value.phone &&
      shippingInfo.value.address &&
      shippingInfo.value.city &&
      shippingInfo.value.district &&
      shippingInfo.value.ward

    const hasPaymentInfo = selectedPaymentMethod.value !== 'credit_card' ||
      (creditCard.value.number && creditCard.value.expiry && creditCard.value.cvv)

    return hasShippingInfo && hasPaymentInfo && !orderLoading.value
  })

  // Methods
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price || 0)
  }

  const loadProvinces = async () => {
    loadingProvinces.value = true
    try {
      const response = await addressService.getProvinces()
      
      // Handle response structure from API
      if (Array.isArray(response)) {
        provinces.value = response
      } else if (response.provinces && Array.isArray(response.provinces)) {
        provinces.value = response.provinces
      } else if (response.data && Array.isArray(response.data)) {
        provinces.value = response.data
      } else {
        provinces.value = []
      }
    } catch (error) {
      console.error('❌ Load provinces error:', error)
      toast.error('Không thể tải danh sách tỉnh/thành phố')
    } finally {
      loadingProvinces.value = false
    }
  }

  const loadDistricts = async () => {
    loadingDistricts.value = true
    districts.value = []
    wards.value = []
    shippingInfo.value.district = ''
    shippingInfo.value.ward = ''

    try {
      const response = await addressService.getDistricts(shippingInfo.value.city)
      
      // API returns {province: {...}, districts: [...]}
      if (response.districts && Array.isArray(response.districts)) {
        districts.value = response.districts
      } else if (Array.isArray(response)) {
        districts.value = response
      } else if (response.data && Array.isArray(response.data)) {
        districts.value = response.data
      } else {
        districts.value = []
      }
    } catch (error) {
      console.error('❌ Load districts error:', error)
      toast.error('Không thể tải danh sách quận/huyện')
    } finally {
      loadingDistricts.value = false
    }
  }

  const loadWards = async () => {
    loadingWards.value = true
    wards.value = []
    shippingInfo.value.ward = ''

    try {
      const response = await addressService.getWards(shippingInfo.value.district)
      
      // API returns {district: {...}, wards: [...]}
      if (response.wards && Array.isArray(response.wards)) {
        wards.value = response.wards
      } else if (Array.isArray(response)) {
        wards.value = response
      } else if (response.data && Array.isArray(response.data)) {
        wards.value = response.data
      } else {
        wards.value = []
      }
    } catch (error) {
      console.error('❌ Load wards error:', error)
      toast.error('Không thể tải danh sách phường/xã')
    } finally {
      loadingWards.value = false
    }
  }

  const applyCoupon = async () => {
    if (!couponCode.value.trim()) {
      toast.warning('Vui lòng nhập mã giảm giá')
      return
    }

    try {
      const response = await cartService.applyCoupon(couponCode.value.trim())

      if (response.success) {
        appliedCouponData.value = response.data
        checkoutSummary.value = response.data.summary
        toast.success(response.message || 'Áp dụng mã giảm giá thành công!')
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Mã giảm giá không hợp lệ')
    }
  }

  const removeCoupon = async () => {
    try {
      const response = await cartService.removeCoupon()

      if (response.success) {
        appliedCouponData.value = null
        couponCode.value = ''
        checkoutSummary.value = response.data.summary
        toast.success('Đã xóa mã giảm giá')
      }
    } catch (error) {
      toast.error('Không thể xóa mã giảm giá')
    }
  }

  const placeOrder = async () => {
    if (!canPlaceOrder.value) {
      toast.warning('Vui lòng điền đầy đủ thông tin')
      return
    }

    // Validate all items have variants (required by backend)
    const itemsWithoutVariant = cartItems.value.filter(item => !item.variant || !item.variant.id)
    if (itemsWithoutVariant.length > 0) {
      const productNames = itemsWithoutVariant.map(item => item.name).join(', ')
      toast.error(`Tất cả sản phẩm phải có màu sắc và dung lượng! Sản phẩm thiếu: ${productNames}`)
      
      // Redirect to cart after 2 seconds
      setTimeout(() => {
        router.push('/cart')
      }, 2000)
      return
    }

    orderLoading.value = true

    try {
      // Prepare order data according to backend API
      const orderData = {
        cart_item_ids: cartItems.value.map(item => item.id),
        shipping_address: shippingInfo.value.address,
        province_id: shippingInfo.value.city,
        district_id: shippingInfo.value.district,
        ward_id: shippingInfo.value.ward,
        phone: shippingInfo.value.phone,
        customer_name: `${shippingInfo.value.firstName} ${shippingInfo.value.lastName}`.trim(),
        note: shippingInfo.value.notes || null
      }

      // Add coupon if applied
      if (appliedCouponData.value?.coupon?.code) {
        orderData.coupon_code = appliedCouponData.value.coupon.code
      }

      // Create order via API
      const response = await orderService.createOrder(orderData)

      if (response.success) {
        toast.success('Đặt hàng thành công!')

        // Redirect to order detail page
        setTimeout(() => {
          router.push(`/orders/${response.data.id}`)
        }, 1500)
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Đặt hàng thất bại'
      toast.error(errorMessage)
    } finally {
      orderLoading.value = false
    }
  }

  const loadCheckoutData = async () => {
    loadingCheckout.value = true

    try {
      // Get all cart items
      const response = await cartService.getCart()

      if (response.success) {
        const data = response.data
        const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000'

        // Handle different response structures
        const items = data.cart_items || data.items || []

        // Filter selected items if itemsParam exists
        const itemsParam = route.query.items
        let filteredItems = items

        if (itemsParam) {
          const selectedIds = itemsParam.split(',').map(id => parseInt(id.trim())).filter(id => !isNaN(id))
          filteredItems = items.filter(item => selectedIds.includes(item.id))
          
          if (filteredItems.length === 0) {
            toast.warning('Không có sản phẩm hợp lệ. Vui lòng quay lại giỏ hàng.')
            router.push('/cart')
            return
          }
        }

        // Check for items without variant BEFORE mapping
        const itemsWithoutVariant = filteredItems.filter(item => !item.variant || !item.variant.id)
        if (itemsWithoutVariant.length > 0) {
          const productNames = itemsWithoutVariant.map(item => item.product?.name || 'Unknown').join(', ')
          toast.error(`Có sản phẩm chưa chọn màu sắc và dung lượng: ${productNames}. Vui lòng cập nhật trong giỏ hàng!`)
          
          setTimeout(() => {
            router.push('/cart')
          }, 2000)
          return
        }

        cartItems.value = filteredItems.map(item => {
          // Get image URL from product or variant
          let imageUrl = item.product?.image || item.variant?.image_url || null

          if (imageUrl && !imageUrl.startsWith('http')) {
            imageUrl = `${baseURL}/storage/${imageUrl}`
          }

          // Check if variant exists
          const hasVariant = item.variant && item.variant.id

          return {
            id: item.id,
            quantity: item.quantity,
            price: parseFloat(item.price),
            subtotal: parseFloat(item.price) * item.quantity,

            product: {
              id: item.product?.id,
              name: item.product?.name,
              image_url: imageUrl
            },

            variant: hasVariant ? {
              id: item.variant.id,
              sku: item.variant.sku,
              size: item.variant.capacity?.display_name || item.variant.capacity?.name,
              color: item.variant.color?.name,
              color_code: item.variant.color?.color_code || null,
              image_url: imageUrl
            } : null,

            name: item.product?.name,
            image: imageUrl,
            product_image: imageUrl,
            selectedSize: hasVariant ? (item.variant.capacity?.display_name || item.variant.capacity?.name) : null,
            selectedColor: hasVariant && item.variant.color ? {
              name: item.variant.color.name,
              value: item.variant.color.color_code
            } : null
          }
        })

        // Calculate summary
        checkoutSummary.value = {
          total_items: cartItems.value.length,
          total_quantity: cartItems.value.reduce((sum, item) => sum + item.quantity, 0),
          subtotal: cartItems.value.reduce((sum, item) => sum + item.subtotal, 0)
        }
      }

      const savedUser = localStorage.getItem('user')
      if (savedUser) {
        const user = JSON.parse(savedUser)
        shippingInfo.value.email = user.email || ''
        shippingInfo.value.phone = user.phone || ''

        if (user.name) {
          const nameParts = user.name.trim().split(' ')
          if (nameParts.length > 1) {
            shippingInfo.value.firstName = nameParts.slice(0, -1).join(' ')
            shippingInfo.value.lastName = nameParts[nameParts.length - 1]
          } else {
            shippingInfo.value.firstName = user.name
          }
        }
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Không thể tải thông tin checkout'
      toast.error(errorMessage)

      setTimeout(() => {
        router.push('/cart')
      }, 2000)
    } finally {
      loadingCheckout.value = false
    }
  }

  // Setup watchers
  watch(() => shippingInfo.value.city, (newVal) => {
    if (newVal) {
      loadDistricts()
    }
  })

  watch(() => shippingInfo.value.district, (newVal) => {
    if (newVal) {
      loadWards()
    }
  })

  return {
    // State
    orderLoading,
    cartItems,
    checkoutSummary,
    appliedCouponData,
    couponCode,
    selectedShippingMethod,
    selectedPaymentMethod,
    selectedBankTransferMethod,
    loadingCheckout,
    user,
    shippingInfo,
    creditCard,
    provinces,
    districts,
    wards,
    loadingProvinces,
    loadingDistricts,
    loadingWards,
    shippingMethods,
    paymentMethods,
    bankTransferOptions,

    // Computed
    selectedShipping,
    subtotal,
    shippingFee,
    discount,
    finalTotal,
    canPlaceOrder,

    // Methods
    formatPrice,
    loadProvinces,
    loadDistricts,
    loadWards,
    applyCoupon,
    removeCoupon,
    placeOrder,
    loadCheckoutData
  }
}
