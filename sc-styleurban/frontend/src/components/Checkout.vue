<template>
  <div class="checkout-container">
    <div class="checkout-header">
      <button class="back-btn" @click="goBack">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        Volver al Catálogo
      </button>
      <h1>Finalizar Compra</h1>
    </div>

    <div class="checkout-content">
      <!-- Order Summary -->
      <div class="order-summary">
        <h2>Resumen del Pedido</h2>
        <div class="summary-items">
          <div
            v-for="item in cartStore.cartItems"
            :key="`${item.id}-${item.size}`"
            class="summary-item"
          >
            <img :src="item.image" :alt="item.name" />
            <div class="item-info">
              <h3>{{ item.name }}</h3>
              <p>Talla: {{ item.size }} | Cantidad: {{ item.quantity }}</p>
              <p class="item-price">
                {{ formatPrice(item.price * item.quantity) }}
              </p>
            </div>
          </div>
        </div>
        <div class="summary-total">
          <span>Total:</span>
          <span class="total-amount">{{
            formatPrice(cartStore.totalPrice)
          }}</span>
        </div>
      </div>

      <!-- Customer Form -->
      <div class="customer-form">
        <h2>Información de Envío</h2>
        <form @submit.prevent="proceedToPayment">
          <div class="form-group">
            <label for="name">Nombre Completo *</label>
            <input
              type="text"
              id="name"
              v-model="customerData.name"
              required
              placeholder="Ej: Juan Pérez"
            />
          </div>

          <div class="form-group">
            <label for="phone">Número de Teléfono *</label>
            <input
              type="tel"
              id="phone"
              v-model="customerData.phone"
              required
              placeholder="Ej: 3001234567"
            />
          </div>

          <div class="form-group">
            <label for="email">Correo Electrónico *</label>
            <input
              type="email"
              id="email"
              v-model="customerData.email"
              required
              placeholder="Ej: correo@ejemplo.com"
            />
          </div>

          <div class="form-group">
            <label for="address">Dirección de Envío *</label>
            <textarea
              id="address"
              v-model="customerData.address"
              required
              rows="3"
              placeholder="Calle, número, apartamento, ciudad, departamento"
            ></textarea>
          </div>

          <div class="form-group">
            <label for="notes">Notas Adicionales (Opcional)</label>
            <textarea
              id="notes"
              v-model="customerData.notes"
              rows="2"
              placeholder="Instrucciones especiales de entrega, referencias, etc."
            ></textarea>
          </div>

          <button type="submit" class="submit-btn">Continuar al Pago</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useCartStore } from "../stores/cart";

const router = useRouter();
const cartStore = useCartStore();

const customerData = reactive({
  name: "",
  phone: "",
  email: "",
  address: "",
  notes: "",
});

const formatPrice = (price) => {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(price);
};

const goBack = () => {
  router.push("/");
};

const proceedToPayment = () => {
  // Save customer data to localStorage
  localStorage.setItem("sc-styleurban-customer", JSON.stringify(customerData));
  router.push("/payment");
};
</script>

<style scoped>
.checkout-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  min-height: 100vh;
}

.checkout-header {
  margin-bottom: 40px;
}

.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: transparent;
  border: none;
  color: #4a90e2;
  font-size: 1rem;
  cursor: pointer;
  margin-bottom: 20px;
  padding: 8px 0;
  transition: all 0.3s ease;
}

.back-btn:hover {
  color: #357abd;
  transform: translateX(-4px);
}

.checkout-header h1 {
  font-size: 2.5rem;
  color: #1a1a1a;
  margin: 0;
}

.checkout-content {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 40px;
}

.order-summary {
  background: #f8f8f8;
  padding: 30px;
  border-radius: 12px;
  height: fit-content;
  position: sticky;
  top: 20px;
}

.order-summary h2 {
  margin: 0 0 24px 0;
  font-size: 1.5rem;
  color: #1a1a1a;
}

.summary-items {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
  max-height: 400px;
  overflow-y: auto;
}

.summary-item {
  display: flex;
  gap: 16px;
  padding: 16px;
  background: #ffffff;
  border-radius: 8px;
}

.summary-item img {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 6px;
}

.item-info h3 {
  margin: 0 0 8px 0;
  font-size: 0.95rem;
  color: #1a1a1a;
}

.item-info p {
  margin: 0 0 4px 0;
  font-size: 0.85rem;
  color: #666;
}

.item-price {
  font-weight: 700;
  color: #1a1a1a !important;
  font-size: 1rem !important;
}

.summary-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 24px;
  border-top: 2px solid #e0e0e0;
  font-size: 1.3rem;
  font-weight: 700;
}

.total-amount {
  color: #4a90e2;
}

.customer-form {
  background: #ffffff;
  padding: 30px;
  border-radius: 12px;
  border: 2px solid #e0e0e0;
}

.customer-form h2 {
  margin: 0 0 24px 0;
  font-size: 1.5rem;
  color: #1a1a1a;
}

.form-group {
  margin-bottom: 24px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #2c2c2c;
  font-size: 0.95rem;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  font-family: inherit;
  transition: all 0.3s ease;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #4a90e2;
  box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
}

.form-group textarea {
  resize: vertical;
}

.submit-btn {
  width: 100%;
  padding: 16px;
  background: linear-gradient(135deg, #1a1a1a 0%, #2c2c2c 100%);
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.submit-btn:hover {
  background: linear-gradient(135deg, #4a90e2 0%, #357abd 100%);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(74, 144, 226, 0.4);
}

@media (max-width: 968px) {
  .checkout-content {
    grid-template-columns: 1fr;
  }

  .order-summary {
    position: static;
  }
}

@media (max-width: 768px) {
  .checkout-header h1 {
    font-size: 2rem;
  }
}
</style>
