<template>
  <div class="cart-icon-container" @click="cartStore.toggleCart()">
    <div class="cart-icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="9" cy="21" r="1"></circle>
        <circle cx="20" cy="21" r="1"></circle>
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
      </svg>
      <span v-if="cartStore.itemCount > 0" class="cart-badge">
        {{ cartStore.itemCount }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '../stores/cart';

const cartStore = useCartStore();
</script>

<style scoped>
.cart-icon-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  cursor: pointer;
}

.cart-icon {
  position: relative;
  background: linear-gradient(135deg, #1a1a1a 0%, #2c2c2c 100%);
  padding: 12px;
  border-radius: 50%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
}

.cart-icon:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 20px rgba(74, 144, 226, 0.4);
  background: linear-gradient(135deg, #4a90e2 0%, #357abd 100%);
}

.cart-icon svg {
  color: #ffffff;
}

.cart-badge {
  position: absolute;
  top: -5px;
  right: -5px;
  background: #e74c3c;
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  padding: 4px 8px;
  border-radius: 12px;
  min-width: 20px;
  text-align: center;
  box-shadow: 0 2px 6px rgba(231, 76, 60, 0.4);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

@media (max-width: 768px) {
  .cart-icon-container {
    top: 15px;
    right: 15px;
  }
  
  .cart-icon {
    width: 48px;
    height: 48px;
    padding: 10px;
  }
  
  .cart-icon svg {
    width: 24px;
    height: 24px;
  }
}
</style>

