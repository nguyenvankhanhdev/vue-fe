<template>
  <div class="product-card" :class="{ 'out-of-stock': !product.inStock }">
    <div class="product-image">
      <img :src="product.image" :alt="product.name" loading="lazy" />
      <div class="product-badge" v-if="product.isNew">
        <span>Mới</span>
      </div>
      <div class="product-discount" v-if="product.discount">
        <span>-{{ product.discount }}%</span>
      </div>
      <div class="product-actions">
        <button @click="addToWishlist" class="action-btn wishlist-btn" aria-label="Yêu thích">
          <i class="fas fa-heart" :class="{ active: isWishlisted }"></i>
        </button>
        <button @click="quickView" class="action-btn" aria-label="Xem nhanh">
          <i class="fas fa-eye"></i>
        </button>
        <button @click="addToCart" class="action-btn" :disabled="!product.inStock" aria-label="Thêm vào giỏ">
          <i class="fas fa-shopping-cart"></i>
        </button>
      </div>
    </div>

    <!-- Dùng grid nội bộ để canh hàng: category, name, rating, (spacer), price, button -->
    <div class="product-info">
      <div class="product-category">{{ product.category }}</div>

      <h3 class="product-name">
        <router-link :to="`/products/${product.slug ?? product.id}`">
          {{ product.name }}
        </router-link>
      </h3>

      <div class="product-rating" v-if="product.rating">
        <div class="stars" :aria-label="`Đánh giá ${product.rating} sao`">
          <i
            v-for="star in 5"
            :key="star"
            class="fas fa-star"
            :class="{ active: star <= product.rating }"
          ></i>
        </div>
        <span class="rating-count">({{ product.reviewCount }})</span>
      </div>

      <!-- spacer đẩy phần giá + nút xuống đáy -->
      <div class="spacer" aria-hidden="true"></div>

      <div class="product-price">
        <span class="current-price">{{ formatCurrency(currentPrice) }}</span>
        <span class="original-price" v-if="product.originalPrice">
          {{ formatCurrency(product.originalPrice) }}
        </span>
      </div>

      <button
        @click="addToCart"
        class="add-to-cart-btn"
        :disabled="!product.inStock"
      >
        <i class="fas fa-shopping-cart"></i>
        {{ product.inStock ? 'Thêm vào giỏ' : 'Hết hàng' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  product: { type: Object, required: true }
})

const emit = defineEmits(['add-to-cart', 'add-to-wishlist', 'quick-view'])
const isWishlisted = ref(false)

const currentPrice = computed(() => {
  const p = props.product
  if (p.discount && p.originalPrice) {
    return p.originalPrice * (1 - p.discount / 100)
  }
  return p.price ?? p.originalPrice ?? 0
})

const formatCurrency = (price) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
    Number(price || 0)
  )

const addToCart = () => {
  if (props.product.inStock) emit('add-to-cart', props.product)
}
const addToWishlist = () => {
  isWishlisted.value = !isWishlisted.value
  emit('add-to-wishlist', props.product)
}
const quickView = () => emit('quick-view', props.product)
</script>

<style scoped>
/* --- Card khung chung: cao đều, kéo giãn --- */
.product-card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  max-width: 100%;
  margin: 0 auto;
  min-height: 420px; /* Chiều cao tối thiểu để đảm bảo đều nhau */
  border: 1px solid rgba(0, 0, 0, 0.05);
}
.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}

/* --- Ảnh: tỷ lệ vuông, cố định chiều cao để thẻ đều --- */
.product-image {
  position: relative;
  overflow: hidden;
  background: #f8f9fa;
  aspect-ratio: 1; /* Tỷ lệ vuông 1:1 */
  border-radius: 12px 12px 0 0;
}
.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}
.product-card:hover .product-image img {
  transform: scale(1.05);
}

/* Badge & giảm giá */
.product-badge,
.product-discount {
  position: absolute;
  top: 12px;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  color: #fff;
}
.product-badge { left: 12px; background: #27ae60; }
.product-discount { right: 12px; background: #e74c3c; }

/* Action nổi giữa ảnh */
.product-actions {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  opacity: 0;
  transition: opacity 0.3s ease;
}
.product-card:hover .product-actions { opacity: 1; }
.action-btn {
  width: 40px; height: 40px;
  background: rgba(255,255,255,0.9);
  border: none; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; transition: all 0.3s ease; backdrop-filter: blur(10px);
}
.action-btn:hover { background: #e74c3c; color: #fff; transform: scale(1.1); }
.wishlist-btn .fa-heart.active { color: #e74c3c; }

/* --- Khu info dùng grid để cố định vị trí các phần --- */
.product-info {
  padding: 16px 18px 18px;
  display: grid;
  grid-template-rows: auto auto auto 1fr auto auto; 
  /* category, name, rating, spacer, price, button */
  gap: 8px;
  flex: 1; /* đẩy info chiếm phần còn lại */
  min-height: 200px; /* Đảm bảo chiều cao tối thiểu */
}

/* Category */
.product-category {
  color: #95a5a6;
  font-size: 12px;
  text-transform: uppercase;
  font-weight: 600;
}

/* Tên sản phẩm: luôn 2 dòng cố định để card đều chiều cao */
.product-name {
  margin: 0;
  font-size: 15px;
  font-weight: 600;
  line-height: 1.4;
  /* 2-line clamp + chiều cao cố định tương ứng */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  height: calc(1.4em * 2); /* Chiều cao cố định cho 2 dòng */
  margin-bottom: 4px;
}
.product-name a {
  color: #333;
  text-decoration: none;
  transition: color 0.3s ease;
}
.product-name a:hover { color: #e74c3c; }

/* Rating */
.product-rating {
  display: flex; align-items: center; gap: 8px;
}
.stars { display: flex; gap: 2px; }
.stars i { color: #ddd; font-size: 14px; }
.stars i.active { color: #ffd700; }
.rating-count { color: #95a5a6; font-size: 12px; }

/* Spacer đẩy phần giá + nút xuống đáy */
.spacer { height: 100%; }

/* Giá */
.product-price { 
  display: flex; 
  align-items: baseline; 
  gap: 8px; 
  margin-bottom: 6px;
}
.current-price {
  font-size: 18px; 
  font-weight: 700; 
  color: #e74c3c; 
  white-space: nowrap;
}
.original-price {
  font-size: 14px; 
  color: #95a5a6; 
  text-decoration: line-through; 
  white-space: nowrap;
}

/* Nút giỏ nằm cuối cùng, full-width */
.add-to-cart-btn {
  width: 100%; 
  padding: 14px 16px;
  background: #e74c3c; 
  color: white; 
  border: none; 
  border-radius: 8px;
  font-weight: 600; 
  font-size: 14px;
  cursor: pointer; 
  transition: all 0.3s ease;
  display: flex; 
  align-items: center; 
  justify-content: center; 
  gap: 8px;
  margin-top: auto;
}
.add-to-cart-btn:hover:not(:disabled) { background: #c0392b; transform: translateY(-2px); }
.add-to-cart-btn:disabled { background: #95a5a6; cursor: not-allowed; }

/* Hết hàng: giảm độ bão hoà ảnh */
.out-of-stock .product-image img { filter: grayscale(0.2) saturate(0.6); }

/* Mobile tweaks */
@media (max-width: 768px) {
  .product-actions { opacity: 1; }
  .action-btn { width: 36px; height: 36px; }
  .product-image { height: 200px; }
}
</style>
