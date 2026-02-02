<template>
  <div class="payment-container">
    <div class="payment-header">
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
        Volver
      </button>
      <h1>Método de Pago</h1>
    </div>

    <div class="payment-content">
      <!-- Purchase Summary Card (Black) -->
      <div class="purchase-summary-card">
        <div class="summary-header">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path
              d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"
            ></path>
          </svg>
          <h2>Resumen de Compra</h2>
        </div>

        <div class="summary-content">
          <!-- Order Info -->
          <div class="info-row">
            <span class="label">Pedido #</span>
            <span class="value">{{ orderNumber }}</span>
          </div>
          <div class="info-row">
            <span class="label">Cliente</span>
            <span class="value">{{ customerData.name }}</span>
          </div>

          <!-- Address Section -->
          <div class="address-section">
            <div class="address-header">
              <span class="label">Dirección de Envío</span>
              <button class="edit-btn" @click="goToCheckout">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
                  ></path>
                  <path
                    d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
                  ></path>
                </svg>
                Editar
              </button>
            </div>
            <p class="address-text">{{ customerData.address }}</p>
          </div>

          <!-- Divider -->
          <div class="divider"></div>

          <!-- Products List -->
          <div class="products-list">
            <div
              v-for="item in cartStore.cartItems"
              :key="`${item.id}-${item.size}`"
              class="product-item"
            >
              <span class="product-name"
                >{{ item.name }} ({{ item.size }})</span
              >
              <span class="product-quantity">x{{ item.quantity }}</span>
            </div>
          </div>

          <!-- Divider -->
          <div class="divider"></div>

          <!-- Tax Breakdown -->
          <div class="tax-row">
            <span class="label">Subtotal (Base)</span>
            <span class="value">{{ formatPrice(subtotal) }}</span>
          </div>
          <div class="tax-row">
            <span class="label">IVA (19%)</span>
            <span class="value">{{ formatPrice(iva) }}</span>
          </div>
          <div class="tax-row">
            <span class="label">INC/ICO (8%)</span>
            <span class="value">{{ formatPrice(inc) }}</span>
          </div>

          <!-- Divider -->
          <div class="divider"></div>

          <!-- Total -->
          <div class="total-row">
            <span class="label">Total a Pagar</span>
            <span class="value">{{ formatPrice(total) }}</span>
          </div>
        </div>
      </div>

      <!-- Payment Method Card (White) -->
      <div class="payment-method-card">
        <div class="epayco-header">
          <div class="epayco-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <rect x="2" y="5" width="20" height="14" rx="2"></rect>
              <line x1="2" y1="10" x2="22" y2="10"></line>
            </svg>
          </div>
          <div class="epayco-info">
            <h3>Pago Seguro con ePayco</h3>
            <p>Múltiples métodos de pago disponibles</p>
          </div>
        </div>

        <!-- Payment Methods Grid -->
        <div class="payment-methods-grid">
          <div class="method-item">
            <span class="method-icon">💳</span>
            <span class="method-label">Tarjetas</span>
          </div>
          <div class="method-item">
            <span class="method-icon">🏦</span>
            <span class="method-label">PSE</span>
          </div>
          <div class="method-item">
            <span class="method-icon">💵</span>
            <span class="method-label">Efectivo</span>
          </div>
          <div class="method-item">
            <span class="method-icon">📱</span>
            <span class="method-label">Nequi</span>
          </div>
        </div>

        <!-- Pay Button -->
        <button
          class="pay-button"
          :disabled="isProcessing"
          @click="processPayment"
        >
          <svg
            v-if="!isProcessing"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <rect x="2" y="5" width="20" height="14" rx="2"></rect>
            <line x1="2" y1="10" x2="22" y2="10"></line>
          </svg>
          <span v-if="!isProcessing">Pagar {{ formatPrice(total) }}</span>
          <span v-else>Procesando...</span>
        </button>
      </div>
    </div>

    <!-- Success Modal -->
    <div v-if="showSuccessModal" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <div class="success-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        </div>
        <h2>¡Pedido Realizado con Éxito!</h2>
        <p>
          Tu pedido <strong>{{ orderNumber }}</strong> ha sido registrado.
        </p>
        <p class="modal-message">
          Hemos notificado a nuestro equipo sobre tu pedido.
        </p>
        <div class="notification-info">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
            ></path>
          </svg>
          <span>Notificación enviada al administrador</span>
        </div>
        <button class="modal-btn" @click="goToHome">Volver al Inicio</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useCartStore } from "../stores/cart";
import { useAuthStore } from "../stores/auth";
import { orderService } from "../services/orderService";
import { epaycoConfig } from "../config/epayco";
import { notificationService } from "../services/notificationService";

const router = useRouter();
const cartStore = useCartStore();
const authStore = useAuthStore();

const isProcessing = ref(false);
const showSuccessModal = ref(false);
const orderNumber = ref("");
const customerData = ref({});

// Tax calculations
// El total es el precio de las camisetas (55.000 o 70.000)
// Los impuestos están incluidos en ese precio
const total = computed(() => {
  return cartStore.cartItems.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);
});

// Calculamos la base imponible (precio sin impuestos)
// Total = Base + IVA(19%) + INC(8%)
// Total = Base * (1 + 0.19 + 0.08) = Base * 1.27
const subtotal = computed(() => {
  return Math.round(total.value / 1.27);
});

// IVA del 19% sobre la base
const iva = computed(() => {
  return Math.round(subtotal.value * 0.19);
});

// INC del 8% sobre la base
const inc = computed(() => {
  return Math.round(subtotal.value * 0.08);
});

onMounted(() => {
  // Load customer data
  const savedCustomer = localStorage.getItem("sc-homestyle-customer");
  if (savedCustomer) {
    customerData.value = JSON.parse(savedCustomer);
  }

  // Generate order number
  orderNumber.value = orderService.generateOrderNumber();

  // Redirect if cart is empty
  if (cartStore.cartItems.length === 0) {
    router.push("/");
  }

  // Load ePayco script
  loadEpaycoScript();
});

const formatPrice = (price) => {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(price);
};

const goBack = () => {
  router.push("/checkout");
};

const goToCheckout = () => {
  router.push("/checkout");
};

// Load ePayco script
const loadEpaycoScript = () => {
  return new Promise((resolve, reject) => {
    // Check if already loaded
    if (window.ePayco) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.epayco.co/checkout.js";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load ePayco script"));
    document.head.appendChild(script);
  });
};

const processPayment = async () => {
  isProcessing.value = true;

  try {
    // Ensure ePayco script is loaded
    await loadEpaycoScript();

    // Wait a bit more to ensure ePayco is fully initialized
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Check if ePayco is available
    if (!window.ePayco) {
      throw new Error("ePayco no está disponible");
    }

    // Prepare product description
    const productDescription = cartStore.cartItems
      .map((item) => `${item.name} (${item.size}) x${item.quantity}`)
      .join(", ");

    // Configure ePayco handler
    const handler = window.ePayco.checkout.configure({
      key: "075441afc9f981a98531c8a15358c155",
      test: false,
    });

    // Prepare payment data
    const data = {
      name: productDescription,
      description: productDescription,
      invoice: orderNumber.value,
      currency: "cop",
      amount: total.value.toString(),
      tax_base: subtotal.value.toString(),
      tax: iva.value.toString(),
      tax_ico: inc.value.toString(),
      country: "co",
      lang: "es",
      external: "false",
      response: "",
      confirmation: "",
    };

    // Open ePayco checkout
    handler.open(data);
    isProcessing.value = false;

    // Listener para respuesta de ePayco
    window.addEventListener("message", async (event) => {
      // ========== LOG COMPLETO DE RESPUESTA EPAYCO ==========
      console.log("========== RESPUESTA EPAYCO ==========");
      console.log("Evento completo:", event);
      console.log("event.data:", event.data);
      console.log("event.data.event:", event.data?.event);
      console.log("event.data.data:", event.data?.data);
      console.log("JSON completo:", JSON.stringify(event.data, null, 2));
      console.log("=======================================");
      // ======================================================

      if (event.data.event === "epaycoClosed") {
        console.log(">>> ePayco cerrado por el usuario");
        isProcessing.value = false;
      } else if (event.data.event === "epaycoSuccess") {
        console.log(">>> PAGO EXITOSO - Datos:", event.data.data);
        // Pago exitoso
        const orderData = {
          orderNumber: orderNumber.value,
          customerName: customerData.value.name,
          phone: customerData.value.phone,
          email: customerData.value.email,
          address: customerData.value.address,
          notes: customerData.value.notes || "",
          orderDate: new Date().toISOString(),
          status: "Aprobado",
          paymentMethod: "ePayco",
          paymentDetails: {
            method: "ePayco",
            transactionId: event.data.data.x_transaction_id,
            reference: event.data.data.x_ref_payco,
          },
          subtotal: subtotal.value,
          iva: iva.value,
          inc: inc.value,
          total: total.value,
          products: cartStore.cartItems.map((item) => ({
            id: item.id,
            name: item.name,
            size: item.size,
            price: item.price,
            quantity: item.quantity,
            subtotal: item.price * item.quantity,
          })),
        };

        // Save order to database
        await orderService.createOrder(orderData);

        // If user is authenticated, save order to their account
        if (authStore.isAuthenticated) {
          await authStore.addOrder(orderData);
        }

        // Enviar notificación al administrador por WhatsApp
        notificationService.sendOrderNotificationToAdmin(orderData);

        // Clear cart and customer data
        cartStore.clearCart();
        localStorage.removeItem("sc-homestyle-customer");

        // Show success modal
        isProcessing.value = false;
        showSuccessModal.value = true;
      } else if (event.data.event === "epaycoError") {
        // Error en el pago
        console.log(">>> PAGO RECHAZADO/ERROR - Datos:", event.data);
        console.log("Razón del error:", event.data?.data);
        alert(
          "Hubo un error al procesar el pago. Por favor intenta nuevamente."
        );
        isProcessing.value = false;
      }
    });
  } catch (error) {
    console.error("Error processing payment:", error);
    alert("Hubo un error al procesar el pago. Por favor intenta nuevamente.");
    isProcessing.value = false;
  }
};

const closeModal = () => {
  showSuccessModal.value = false;
  router.push("/");
};

const goToHome = () => {
  showSuccessModal.value = false;
  router.push("/");
};
</script>

<style scoped>
.payment-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px 20px;
  min-height: 100vh;
}

.payment-header {
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

.payment-header h1 {
  font-size: 2.5rem;
  color: #1a1a1a;
  margin: 0;
}

.payment-content {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.order-info h2,
.payment-methods h2 {
  font-size: 1.5rem;
  color: #1a1a1a;
  margin: 0 0 20px 0;
}

.info-card {
  background: #f8f8f8;
  padding: 24px;
  border-radius: 12px;
  border: 2px solid #e0e0e0;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #e0e0e0;
}

.info-row:last-child {
  border-bottom: none;
}

.info-row .label {
  font-weight: 600;
  color: #666;
}

.info-row .value {
  font-weight: 700;
  color: #1a1a1a;
}

.info-row .total {
  font-size: 1.3rem;
  color: #4a90e2;
}

.payment-options {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 30px;
}

.payment-option {
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  padding: 24px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: #ffffff;
}

.payment-option:hover {
  border-color: #4a90e2;
  box-shadow: 0 4px 12px rgba(74, 144, 226, 0.1);
}

.payment-option.selected {
  border-color: #4a90e2;
  background: #f0f7ff;
  box-shadow: 0 4px 12px rgba(74, 144, 226, 0.2);
}

.option-header {
  display: flex;
  align-items: center;
  gap: 20px;
}

.option-icon {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.epayco-icon {
  background: linear-gradient(135deg, #00a8e8 0%, #0077b6 100%);
  color: #ffffff;
}

.option-info {
  flex: 1;
}

.option-info h3 {
  margin: 0 0 4px 0;
  font-size: 1.3rem;
  color: #1a1a1a;
}

.option-info p {
  margin: 0;
  color: #666;
  font-size: 0.95rem;
}

.radio-check {
  flex-shrink: 0;
}

.radio {
  width: 24px;
  height: 24px;
  border: 2px solid #ccc;
  border-radius: 50%;
  position: relative;
  transition: all 0.3s ease;
}

.radio.checked {
  border-color: #4a90e2;
  background: #4a90e2;
}

.radio.checked::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 10px;
  height: 10px;
  background: #ffffff;
  border-radius: 50%;
}

.option-details {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #e0e0e0;
}

.payment-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: relative;
}

.form-group label {
  font-weight: 600;
  color: #2c2c2c;
  font-size: 0.95rem;
}

.form-group input,
.form-group select {
  padding: 12px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  font-family: inherit;
  transition: all 0.3s ease;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: #4a90e2;
  box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.card-type-selector {
  display: flex;
  gap: 12px;
}

.card-type-option {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.card-type-option:hover {
  border-color: #4a90e2;
  background: #f0f7ff;
}

.card-type-option input[type="radio"] {
  margin: 0;
  cursor: pointer;
}

.card-type-option span {
  font-weight: 600;
  color: #2c2c2c;
}

.card-brand {
  position: absolute;
  right: 16px;
  top: 38px;
  font-size: 0.85rem;
  font-weight: 700;
  color: #4a90e2;
  background: #f0f7ff;
  padding: 4px 8px;
  border-radius: 4px;
}

.help-text {
  font-size: 0.85rem;
  color: #666;
  margin-top: -4px;
}

.amount-display {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: linear-gradient(135deg, #f8f8f8 0%, #f0f0f0 100%);
  border-radius: 8px;
  border: 2px solid #e0e0e0;
  margin-top: 8px;
}

.amount-display span {
  font-size: 1rem;
  color: #666;
}

.amount-display strong {
  font-size: 1.3rem;
  color: #1a1a1a;
}

/* Purchase Summary Card (Black) */
.purchase-summary-card {
  background: #2c2c2c;
  border-radius: 20px;
  overflow: hidden;
  margin-bottom: 20px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
}

.summary-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 20px 24px;
  background: #2c2c2c;
}

.summary-header svg {
  color: #ffffff;
  flex-shrink: 0;
}

.summary-header h2 {
  margin: 0;
  font-size: 1.3rem;
  font-weight: 700;
  color: #ffffff;
}

.summary-content {
  padding: 0 24px 24px 24px;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
}

.info-row .label {
  color: #9ca3af;
  font-size: 0.95rem;
  font-weight: 400;
}

.info-row .value {
  color: #ffffff;
  font-size: 0.95rem;
  font-weight: 600;
}

.address-section {
  padding: 14px 0;
}

.address-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.address-header .label {
  color: #9ca3af;
  font-size: 0.95rem;
  font-weight: 400;
}

.edit-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #ffffff;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.edit-btn:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.3);
  transform: translateY(-1px);
}

.edit-btn svg {
  color: #ffffff;
}

.address-text {
  color: #ffffff;
  font-size: 0.9rem;
  font-weight: 500;
  line-height: 1.5;
  margin: 0;
  padding: 10px 14px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.divider {
  height: 1px;
  background: #444;
  margin: 16px 0;
}

.products-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.product-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
}

.product-name {
  color: #ffffff;
  font-size: 0.95rem;
  font-weight: 500;
}

.product-quantity {
  color: #10b981;
  font-size: 0.9rem;
  font-weight: 600;
}

.tax-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
}

.tax-row .label {
  color: #9ca3af;
  font-size: 0.95rem;
  font-weight: 400;
}

.tax-row .value {
  color: #ffffff;
  font-size: 0.95rem;
  font-weight: 600;
}

.total-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
}

.total-row .label {
  color: #ffffff;
  font-size: 1.05rem;
  font-weight: 600;
}

.total-row .value {
  color: #10b981;
  font-size: 1.6rem;
  font-weight: 700;
}

/* Payment Method Card (White) */
.payment-method-card {
  background: #ffffff;
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.epayco-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
}

.epayco-icon {
  width: 56px;
  height: 56px;
  background: #10b981;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.epayco-icon svg {
  color: #ffffff;
}

.epayco-info h3 {
  margin: 0 0 4px 0;
  font-size: 1.15rem;
  color: #1f2937;
  font-weight: 700;
}

.epayco-info p {
  margin: 0;
  font-size: 0.85rem;
  color: #6b7280;
}

.payment-methods-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-bottom: 24px;
}

.method-item {
  background: #f3f4f6;
  border-radius: 12px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.method-icon {
  font-size: 1.8rem;
  line-height: 1;
}

.method-label {
  font-size: 0.8rem;
  font-weight: 600;
  color: #374151;
  text-align: center;
}

.pay-button {
  width: 100%;
  padding: 18px 24px;
  background: #10b981;
  color: #ffffff;
  border: none;
  border-radius: 14px;
  font-size: 1.2rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
}

.pay-button:hover:not(:disabled) {
  background: #059669;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(16, 185, 129, 0.4);
}

.pay-button:active:not(:disabled) {
  transform: translateY(0);
}

.pay-button:disabled {
  background: #9ca3af;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.pay-button svg {
  flex-shrink: 0;
}

.pay-button span {
  font-weight: 700;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  animation: fadeIn 0.3s ease;
}

.modal-content {
  background: #ffffff;
  padding: 40px;
  border-radius: 16px;
  max-width: 500px;
  width: 90%;
  text-align: center;
  animation: slideUp 0.3s ease;
}

.success-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 24px;
  background: linear-gradient(135deg, #27ae60 0%, #229954 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.success-icon svg {
  color: #ffffff;
}

.modal-content h2 {
  margin: 0 0 16px 0;
  font-size: 1.8rem;
  color: #1a1a1a;
}

.modal-content p {
  margin: 0 0 12px 0;
  color: #666;
  font-size: 1rem;
  line-height: 1.6;
}

.modal-message {
  margin-bottom: 16px !important;
}

.notification-info {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 12px 20px;
  background: #e8f5e9;
  border: 1px solid #27ae60;
  border-radius: 8px;
  margin-bottom: 24px;
}

.notification-info svg {
  color: #27ae60;
  flex-shrink: 0;
}

.notification-info span {
  color: #1b5e20;
  font-size: 0.9rem;
  font-weight: 600;
}

.modal-btn {
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #1a1a1a 0%, #2c2c2c 100%);
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.modal-btn:hover {
  background: linear-gradient(135deg, #4a90e2 0%, #357abd 100%);
  transform: translateY(-2px);
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    transform: translateY(30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* Responsive Design */

/* Desktop */
@media (min-width: 768px) {
  .payment-container {
    max-width: 600px;
    margin: 0 auto;
  }

  .payment-methods-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

/* Mobile */
@media (max-width: 767px) {
  .payment-container {
    padding: 16px;
  }

  .payment-header h1 {
    font-size: 1.5rem;
  }

  .back-btn {
    font-size: 0.9rem;
    padding: 10px 16px;
  }

  .purchase-summary-card,
  .payment-method-card {
    border-radius: 16px;
  }

  .summary-header {
    padding: 16px 20px;
  }

  .summary-header h2 {
    font-size: 1.15rem;
  }

  .summary-content {
    padding: 0 20px 20px 20px;
  }

  .total-row .value {
    font-size: 1.4rem;
  }

  .payment-method-card {
    padding: 20px;
  }

  .epayco-icon {
    width: 48px;
    height: 48px;
  }

  .epayco-info h3 {
    font-size: 1.05rem;
  }

  .epayco-info p {
    font-size: 0.8rem;
  }

  .pay-button {
    font-size: 1.1rem;
    padding: 16px 20px;
  }
}
</style>
