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
            <button
              class="remove-item-btn"
              @click="removeItem(item.id, item.size)"
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
import { reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useCartStore } from "../stores/cart";
import { useAuthStore } from "../stores/auth";

const router = useRouter();
const cartStore = useCartStore();
const authStore = useAuthStore();

const customerData = reactive({
  name: "",
  phone: "",
  email: "",
  address: "",
  notes: "",
});

// Cargar datos guardados al montar el componente
onMounted(() => {
  // Prioridad 1: Cargar datos del usuario autenticado
  if (authStore.isAuthenticated && authStore.user) {
    customerData.name = authStore.user.name || "";
    customerData.phone = authStore.user.phone || "";
    customerData.email = authStore.user.email || "";
    customerData.address = authStore.user.address || "";
    customerData.notes = "";
  }
  // Prioridad 2: Cargar datos guardados en localStorage (si no hay usuario autenticado)
  else {
    const savedCustomer = localStorage.getItem("sc-styleurban-customer");
    if (savedCustomer) {
      const data = JSON.parse(savedCustomer);
      customerData.name = data.name || "";
      customerData.phone = data.phone || "";
      customerData.email = data.email || "";
      customerData.address = data.address || "";
      customerData.notes = data.notes || "";
    }
  }
});

const formatPrice = (price) => {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(price);
};

const removeItem = (itemId, size) => {
  // Encontrar el item antes de eliminarlo para mostrar el nombre
  const item = cartStore.cartItems.find(
    (i) => i.id === itemId && i.size === size
  );

  if (item) {
    cartStore.removeFromCart(itemId, size);
    showNotification(`✓ ${item.name} (Talla ${size}) eliminado del carrito`);

    // Si el carrito queda vacío, redirigir al catálogo
    if (cartStore.cartItems.length === 0) {
      router.push("/");
    }
  }
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

const goBack = () => {
  router.push("/");
};

const proceedToPayment = async () => {
  // Save customer data to localStorage
  localStorage.setItem("sc-styleurban-customer", JSON.stringify(customerData));

  // Si el usuario está autenticado, actualizar su perfil
  if (authStore.isAuthenticated && authStore.user) {
    try {
      await authStore.updateProfile({
        name: customerData.name,
        phone: customerData.phone,
        email: customerData.email,
        address: customerData.address,
      });
    } catch (error) {
      console.error("Error al actualizar perfil:", error);
      // Continuar al pago aunque falle la actualización del perfil
    }
  }

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
  background: #ffffff;
  border: 1px solid #e5e7eb;
  padding: 28px;
  border-radius: 12px;
  height: fit-content;
  position: sticky;
  top: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
}

.order-summary h2 {
  margin: 0 0 24px 0;
  font-size: 1.5rem;
  font-weight: 800;
  color: #2c3e50;
  letter-spacing: 0.3px;
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
  gap: 14px;
  padding: 14px;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  position: relative;
  transition: all 0.3s ease;
}

.summary-item:hover {
  border-color: #d0d0d0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.summary-item img {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
}

.item-info {
  flex: 1;
  padding-right: 30px;
}

.item-info h3 {
  margin: 0 0 6px 0;
  font-size: 0.95rem;
  font-weight: 700;
  color: #2c3e50;
  letter-spacing: 0.2px;
}

.item-info p {
  margin: 0 0 4px 0;
  font-size: 0.85rem;
  color: #5a6c7d;
  font-weight: 600;
}

.item-price {
  font-weight: 800 !important;
  color: #2c3e50 !important;
  font-size: 1rem !important;
}

.remove-item-btn {
  position: absolute;
  top: 10px;
  right: 10px;
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

.remove-item-btn:hover {
  background: #e74c3c;
  color: #ffffff;
  border-color: #e74c3c;
  transform: scale(1.1);
  box-shadow: 0 2px 8px rgba(231, 76, 60, 0.3);
}

.summary-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px;
  margin-top: 20px;
  background: #f8f9fa;
  border-radius: 10px;
  font-size: 1.3rem;
  font-weight: 800;
  color: #2c3e50;
}

.total-amount {
  color: #2c3e50;
  font-weight: 900;
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
  background: #2c3e50;
  color: #ffffff;
  border: none;
  border-radius: 10px;
  font-size: 1.05rem;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 0 2px 8px rgba(44, 62, 80, 0.2);
}

.submit-btn:hover {
  background: #34495e;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(44, 62, 80, 0.3);
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
