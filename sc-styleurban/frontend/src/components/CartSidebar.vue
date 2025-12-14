<template>
  <div>
    <!-- Overlay -->
    <transition name="fade">
      <div
        v-if="cartStore.isCartOpen"
        class="cart-overlay"
        @click="cartStore.closeCart()"
      ></div>
    </transition>

    <!-- Sidebar -->
    <transition name="slide">
      <div v-if="cartStore.isCartOpen" class="cart-sidebar">
        <div class="cart-header">
          <h2>Carrito de Compras</h2>
          <button class="close-btn" @click="cartStore.closeCart()">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div class="cart-content">
          <div v-if="cartStore.cartItems.length === 0" class="empty-cart">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
            >
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path
                d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"
              ></path>
            </svg>
            <p>Tu carrito está vacío</p>
          </div>

          <div v-else class="cart-items">
            <div
              v-for="item in cartStore.cartItems"
              :key="`${item.id}-${item.size}`"
              class="cart-item"
            >
              <img :src="item.image" :alt="item.name" class="item-image" />
              <div class="item-details">
                <h3>{{ item.name }}</h3>
                <p class="item-size">Talla: {{ item.size }}</p>
                <p class="item-price">{{ formatPrice(item.price) }}</p>
                <div class="quantity-controls">
                  <button @click="decreaseQuantity(item)">-</button>
                  <span>{{ item.quantity }}</span>
                  <button @click="increaseQuantity(item)">+</button>
                </div>
              </div>
              <button
                class="remove-btn"
                @click="removeItem(item)"
                title="Eliminar producto"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path
                    d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div v-if="cartStore.cartItems.length > 0" class="cart-footer">
          <div class="total-section">
            <span class="total-label">Total:</span>
            <span class="total-price">{{
              formatPrice(cartStore.totalPrice)
            }}</span>
          </div>
          <button class="checkout-btn" @click="goToCheckout">
            Proceder al Pago
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { useCartStore } from "../stores/cart";
import { useRouter } from "vue-router";

const cartStore = useCartStore();
const router = useRouter();

const formatPrice = (price) => {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(price);
};

const increaseQuantity = (item) => {
  cartStore.updateQuantity(item.id, item.size, item.quantity + 1);
};

const decreaseQuantity = (item) => {
  cartStore.updateQuantity(item.id, item.size, item.quantity - 1);
};

const removeItem = (item) => {
  cartStore.removeFromCart(item.id, item.size);
  showNotification(`✓ ${item.name} (Talla ${item.size}) eliminado del carrito`);
};

const showNotification = (message) => {
  const notification = document.createElement("div");
  notification.className = "cart-notification";
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.classList.add("show");
  }, 10);

  setTimeout(() => {
    notification.classList.remove("show");
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000); // 3 segundos
};

const goToCheckout = () => {
  cartStore.closeCart();
  router.push("/checkout");
};
</script>

<style scoped>
.cart-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1001;
}

.cart-sidebar {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  max-width: 450px;
  height: 100vh;
  background: #ffffff;
  box-shadow: -4px 0 20px rgba(0, 0, 0, 0.2);
  z-index: 1002;
  display: flex;
  flex-direction: column;
}

.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
}

.cart-header h2 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: 0.5px;
}

.close-btn {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  cursor: pointer;
  padding: 8px;
  color: #ffffff;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: rotate(90deg);
  border-color: rgba(255, 255, 255, 0.3);
}

.cart-content {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}

.empty-cart {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #999;
}

.empty-cart svg {
  margin-bottom: 20px;
  opacity: 0.3;
}

.empty-cart p {
  font-size: 1.1rem;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.cart-item {
  display: flex;
  gap: 14px;
  padding: 14px;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  position: relative;
  transition: all 0.3s ease;
}

.cart-item:hover {
  border-color: #d0d0d0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
}

.item-image {
  width: 75px;
  height: 75px;
  object-fit: cover;
  border-radius: 8px;
  background: #f0f0f0;
  border: 1px solid #e5e7eb;
}

.item-details {
  flex: 1;
  padding-right: 30px;
}

.item-details h3 {
  margin: 0 0 6px 0;
  font-size: 0.95rem;
  font-weight: 700;
  color: #2c3e50;
  letter-spacing: 0.2px;
}

.item-size {
  margin: 0 0 4px 0;
  font-size: 0.85rem;
  color: #5a6c7d;
  font-weight: 600;
}

.item-price {
  margin: 0 0 10px 0;
  font-size: 1.05rem;
  font-weight: 800;
  color: #2c3e50;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 10px;
}

.quantity-controls button {
  width: 26px;
  height: 26px;
  border-radius: 6px;
  background: #2c3e50;
  color: #ffffff;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.quantity-controls button:hover {
  background: #34495e;
  transform: scale(1.1);
}

.quantity-controls span {
  font-weight: 700;
  font-size: 0.95rem;
  min-width: 28px;
  text-align: center;
  color: #2c3e50;
}

.remove-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(231, 76, 60, 0.1);
  border: 1px solid rgba(231, 76, 60, 0.3);
  border-radius: 6px;
  cursor: pointer;
  color: #e74c3c;
  padding: 6px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.remove-btn:hover {
  background: #e74c3c;
  color: #ffffff;
  border-color: #e74c3c;
  transform: scale(1.1);
  box-shadow: 0 2px 8px rgba(231, 76, 60, 0.3);
}

.cart-footer {
  padding: 24px;
  border-top: 1px solid #e5e7eb;
  background: #ffffff;
}

.total-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 10px;
}

.total-label {
  font-size: 1.2rem;
  font-weight: 700;
  color: #2c3e50;
  letter-spacing: 0.3px;
}

.total-price {
  font-size: 1.4rem;
  font-weight: 900;
  color: #2c3e50;
  letter-spacing: 0.5px;
}

.checkout-btn {
  width: 100%;
  padding: 15px;
  background: #2c3e50;
  color: #ffffff;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 0 2px 8px rgba(44, 62, 80, 0.2);
}

.checkout-btn:hover {
  background: #34495e;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(44, 62, 80, 0.3);
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}

@media (max-width: 768px) {
  .cart-sidebar {
    max-width: 100%;
  }
}

/* Notification styles */
.cart-notification {
  position: fixed;
  bottom: 30px;
  right: 30px;
  background: #2c3e50;
  color: #ffffff;
  padding: 16px 24px;
  border-radius: 10px;
  font-size: 0.95rem;
  font-weight: 600;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  z-index: 10000;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.3s ease;
}

.cart-notification.show {
  opacity: 1;
  transform: translateY(0);
}
</style>
