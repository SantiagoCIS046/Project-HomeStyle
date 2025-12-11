<template>
  <div class="payment-container">
    <!-- Vista Normal de Pago -->
    <div v-if="!paymentResult" class="payment-main">
      <div class="payment-header">
        <button class="back-btn" @click="goBack">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
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
      </div>

      <div class="payment-card">
        <!-- Order Summary -->
        <div class="order-summary">
          <div class="summary-header">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
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

          <div class="order-details">
            <div class="detail-item">
              <span>Pedido #</span>
              <strong>{{ orderNumber }}</strong>
            </div>
            <div class="detail-item">
              <span>Cliente</span>
              <strong>{{ customerData.name }}</strong>
            </div>
            <div class="detail-item">
              <span>Subtotal (Base)</span>
              <strong>{{ formatPrice(cartStore.taxBase) }}</strong>
            </div>
            <div class="detail-item tax-item">
              <span>IVA (19%)</span>
              <strong>{{ formatPrice(cartStore.ivaAmount) }}</strong>
            </div>
            <div class="detail-item tax-item">
              <span>INC/ICO (8%)</span>
              <strong>{{ formatPrice(cartStore.icoAmount) }}</strong>
            </div>
            <div class="detail-item highlight">
              <span>Total a Pagar</span>
              <strong class="price">{{
                formatPrice(cartStore.totalPrice)
              }}</strong>
            </div>
          </div>
        </div>

        <!-- ePayco Payment Section -->
        <div class="epayco-section">
          <div class="section-header">
            <div class="epayco-logo">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                <line x1="1" y1="10" x2="23" y2="10"></line>
              </svg>
            </div>
            <div class="section-title">
              <h3>Pago Seguro con ePayco</h3>
              <p>Múltiples métodos de pago disponibles</p>
            </div>
          </div>

          <div class="payment-methods-grid">
            <div class="method-badge"><span>💳</span> Tarjetas</div>
            <div class="method-badge"><span>🏦</span> PSE</div>
            <div class="method-badge"><span>💵</span> Efectivo</div>
            <div class="method-badge"><span>📱</span> Nequi</div>
          </div>

          <button
            class="epayco-main-btn"
            @click="openEpaycoCheckout"
            :disabled="isProcessing"
          >
            <span v-if="!isProcessing" class="btn-content">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                <line x1="1" y1="10" x2="23" y2="10"></line>
              </svg>
              Pagar {{ formatPrice(cartStore.totalPrice) }}
            </span>
            <span v-else class="btn-loading">
              <div class="spinner"></div>
              Procesando...
            </span>
          </button>

          <div class="security-badges">
            <div class="badge">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              Pago 100% Seguro
            </div>
            <div class="badge">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
              Datos Encriptados
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Vista de Resultado de Pago -->
    <div v-else class="payment-result-view">
      <div class="result-card">
        <!-- Success -->
        <div v-if="paymentResult === 'success'" class="result-content success">
          <div class="result-icon">
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
          <h2>¡Pago Exitoso!</h2>
          <p class="result-message">Tu pedido ha sido confirmado</p>

          <div class="result-details">
            <div class="detail-row">
              <span>Número de Pedido</span>
              <strong>{{ orderNumber }}</strong>
            </div>
            <div class="detail-row">
              <span>Total Pagado</span>
              <strong>{{ formatPrice(paidAmount) }}</strong>
            </div>
            <div class="detail-row" v-if="transactionRef">
              <span>Referencia ePayco</span>
              <strong>{{ transactionRef }}</strong>
            </div>
          </div>

          <p class="email-notice">
            📧 Recibirás un correo de confirmación en breve
          </p>

          <button class="result-btn primary" @click="goToHome">
            🏠 Volver a la Tienda
          </button>
        </div>

        <!-- Pending -->
        <div
          v-else-if="paymentResult === 'pending'"
          class="result-content pending"
        >
          <div class="result-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
          </div>
          <h2>Pago Pendiente</h2>
          <p class="result-message">Tu pago está siendo procesado</p>
          <p class="pending-notice">
            Te notificaremos cuando se confirme la transacción
          </p>

          <button class="result-btn primary" @click="goToHome">
            🏠 Volver a la Tienda
          </button>
        </div>

        <!-- Failed -->
        <div
          v-else-if="paymentResult === 'failed'"
          class="result-content failed"
        >
          <div class="result-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="15" y1="9" x2="9" y2="15"></line>
              <line x1="9" y1="9" x2="15" y2="15"></line>
            </svg>
          </div>
          <h2>Pago No Procesado</h2>
          <p class="result-message">
            {{ errorMessage || "No se pudo completar el pago" }}
          </p>

          <div class="failed-actions">
            <button class="result-btn secondary" @click="retryPayment">
              🔄 Intentar de Nuevo
            </button>
            <button class="result-btn primary" @click="goToHome">
              🏠 Volver a la Tienda
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useCartStore } from "../stores/cart";
import { orderService } from "../services/orderService";

const router = useRouter();
const route = useRoute();
const cartStore = useCartStore();

// State
const isProcessing = ref(false);
const orderNumber = ref("");
const customerData = ref({});

// Payment result state
const paymentResult = ref(null); // 'success', 'pending', 'failed', null
const paidAmount = ref(0);
const transactionRef = ref("");
const errorMessage = ref("");

onMounted(async () => {
  // Check if returning from ePayco payment
  const urlParams = route.query;
  if (urlParams.ref_payco || urlParams.x_ref_payco) {
    await handlePaymentResponse(urlParams);
    return;
  }

  // Load customer data
  const savedCustomer = localStorage.getItem("sc-styleurban-customer");
  if (savedCustomer) {
    customerData.value = JSON.parse(savedCustomer);
  }

  // Generate order number
  orderNumber.value = orderService.generateOrderNumber();

  // Redirect if cart is empty and not showing payment result
  if (cartStore.cartItems.length === 0 && !paymentResult.value) {
    // Check for pending order
    const pendingOrder = localStorage.getItem("sc-styleurban-pending-order");
    if (!pendingOrder) {
      router.push("/");
    }
  }
});

const handlePaymentResponse = async (params) => {
  const response = params.x_response || params.response || "";
  transactionRef.value = params.x_ref_payco || params.ref_payco || "";

  // Load pending order
  const pendingOrderStr = localStorage.getItem("sc-styleurban-pending-order");
  let pendingOrder = null;

  if (pendingOrderStr) {
    pendingOrder = JSON.parse(pendingOrderStr);
    orderNumber.value = pendingOrder.orderNumber;
    paidAmount.value = pendingOrder.total;
  }

  // Determine payment status
  if (response.toLowerCase() === "aceptada" || response === "1") {
    paymentResult.value = "success";

    if (pendingOrder) {
      try {
        pendingOrder.status = "Aprobado";
        pendingOrder.paymentDetails.transactionRef = transactionRef.value;
        await orderService.createOrder(pendingOrder);

        // Clear cart and data
        cartStore.clearCart();
        localStorage.removeItem("sc-styleurban-customer");
        localStorage.removeItem("sc-styleurban-pending-order");
      } catch (error) {
        console.error("Error saving order:", error);
      }
    }
  } else if (response.toLowerCase() === "pendiente" || response === "3") {
    paymentResult.value = "pending";
  } else {
    paymentResult.value = "failed";
    errorMessage.value =
      params.x_response_reason_text || "La transacción fue rechazada";
  }
};

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

// ePayco Checkout Integration
const openEpaycoCheckout = () => {
  if (isProcessing.value) return;

  // Check if ePayco is available
  if (typeof window.ePayco === "undefined") {
    alert("Error: No se pudo cargar ePayco. Por favor recarga la página.");
    return;
  }

  isProcessing.value = true;

  // Create product description
  const productDescription = cartStore.cartItems
    .map((item) => `${item.name} (${item.size}) x${item.quantity}`)
    .join(", ");

  // Get taxes from cart store (IVA 19%, INC/ICO 8%)
  const totalPrice = cartStore.totalPrice;
  const taxBase = cartStore.taxBase;
  const ivaAmount = cartStore.ivaAmount;
  const icoAmount = cartStore.icoAmount;

  // Configure ePayco handler
  const handler = window.ePayco.checkout.configure({
    key: "075441afc9f981a98531c8a15358c155",
    test: false,
  });

  // Checkout data
  const checkoutData = {
    name: productDescription.substring(0, 100) || "Productos StyleUrban",
    description: `Pedido ${orderNumber.value} - StyleUrban`,
    invoice: orderNumber.value,
    currency: "cop",
    amount: String(totalPrice),
    tax_base: String(taxBase),
    tax: String(ivaAmount),
    tax_ico: String(icoAmount),
    country: "co",
    name_billing: customerData.value.name || "",
    address_billing: customerData.value.address || "",
    email_billing: customerData.value.email || "",
    mobilephone_billing: customerData.value.phone || "",
    response: window.location.origin + "/payment",
    external: "false",
    extra1: orderNumber.value,
    extra2: customerData.value.name || "",
  };

  // Save pending order
  const pendingOrder = {
    orderNumber: orderNumber.value,
    customerName: customerData.value.name,
    phone: customerData.value.phone,
    email: customerData.value.email,
    address: customerData.value.address,
    notes: customerData.value.notes || "",
    orderDate: new Date().toISOString(),
    status: "Pendiente",
    paymentMethod: "epayco",
    paymentDetails: { method: "ePayco", invoice: orderNumber.value },
    total: cartStore.totalPrice,
    products: cartStore.cartItems.map((item) => ({
      id: item.id,
      name: item.name,
      size: item.size,
      price: item.price,
      quantity: item.quantity,
      subtotal: item.price * item.quantity,
    })),
  };

  localStorage.setItem(
    "sc-styleurban-pending-order",
    JSON.stringify(pendingOrder)
  );

  // Open ePayco checkout
  handler.open(checkoutData);
  isProcessing.value = false;
};

const goToHome = () => {
  paymentResult.value = null;
  router.push("/");
};

const retryPayment = () => {
  paymentResult.value = null;
  // Reload pending order data
  const pendingOrder = localStorage.getItem("sc-styleurban-pending-order");
  if (pendingOrder) {
    const order = JSON.parse(pendingOrder);
    orderNumber.value = order.orderNumber;
  }
};
</script>

<style scoped>
.payment-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  padding: 20px;
}

/* Payment Main View */
.payment-main {
  max-width: 500px;
  margin: 0 auto;
}

.payment-header {
  margin-bottom: 20px;
}

.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #fff;
  border: none;
  color: #666;
  font-size: 0.9rem;
  cursor: pointer;
  padding: 10px 16px;
  border-radius: 8px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.back-btn:hover {
  color: #1a1a1a;
  transform: translateX(-4px);
}

/* Payment Card */
.payment-card {
  background: #fff;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
}

/* Order Summary */
.order-summary {
  padding: 24px;
  background: linear-gradient(135deg, #1a1a1a 0%, #2c2c2c 100%);
  color: #fff;
}

.summary-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}

.summary-header svg {
  opacity: 0.8;
}

.summary-header h2 {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
}

.order-details {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.detail-item:last-child {
  border-bottom: none;
}

.detail-item span {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
}

.detail-item strong {
  color: #fff;
  font-size: 0.95rem;
}

.detail-item.tax-item {
  padding: 4px 0;
  border-bottom: none;
}

.detail-item.tax-item span {
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.85rem;
}

.detail-item.tax-item strong {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.85rem;
}

.detail-item.highlight {
  margin-top: 8px;
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
}

.detail-item .price {
  font-size: 1.4rem;
  color: #4ade80;
}

/* ePayco Section */
.epayco-section {
  padding: 24px;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
}

.epayco-logo {
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg, #00b894 0%, #00a085 100%);
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}

.section-title h3 {
  margin: 0 0 4px 0;
  font-size: 1.1rem;
  color: #1a1a1a;
}

.section-title p {
  margin: 0;
  font-size: 0.85rem;
  color: #888;
}

/* Payment Methods Grid */
.payment-methods-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  margin-bottom: 24px;
}

.method-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 10px 8px;
  background: #f8f9fa;
  border-radius: 10px;
  font-size: 0.75rem;
  font-weight: 600;
  color: #666;
}

.method-badge span {
  font-size: 1rem;
}

/* ePayco Main Button */
.epayco-main-btn {
  width: 100%;
  padding: 18px 24px;
  background: linear-gradient(135deg, #00b894 0%, #00a085 100%);
  border: none;
  border-radius: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.epayco-main-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 184, 148, 0.4);
}

.epayco-main-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.btn-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  color: #fff;
  font-size: 1.1rem;
  font-weight: 700;
}

.btn-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  color: #fff;
  font-size: 1rem;
}

.spinner {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Security Badges */
.security-badges {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #eee;
}

.badge {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.75rem;
  color: #888;
}

.badge svg {
  color: #00b894;
}

/* Payment Result View */
.payment-result-view {
  max-width: 500px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 40px);
}

.result-card {
  background: #fff;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  width: 100%;
  text-align: center;
}

.result-icon {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;
}

.result-content.success .result-icon {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: #fff;
}

.result-content.pending .result-icon {
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  color: #fff;
}

.result-content.failed .result-icon {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  color: #fff;
}

.result-content h2 {
  margin: 0 0 8px 0;
  font-size: 1.6rem;
  color: #1a1a1a;
}

.result-message {
  margin: 0 0 24px 0;
  color: #666;
  font-size: 1rem;
}

.result-details {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 24px;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #e5e7eb;
}

.detail-row:last-child {
  border-bottom: none;
}

.detail-row span {
  color: #666;
  font-size: 0.9rem;
}

.detail-row strong {
  color: #1a1a1a;
  font-size: 0.95rem;
}

.email-notice {
  color: #888;
  font-size: 0.9rem;
  margin-bottom: 24px;
}

.pending-notice {
  color: #888;
  font-size: 0.9rem;
  margin-bottom: 24px;
}

.result-btn {
  width: 100%;
  padding: 16px;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 10px;
}

.result-btn.primary {
  background: linear-gradient(135deg, #1a1a1a 0%, #333 100%);
  color: #fff;
}

.result-btn.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
}

.result-btn.secondary {
  background: #f1f5f9;
  color: #1a1a1a;
}

.result-btn.secondary:hover {
  background: #e2e8f0;
}

.failed-actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* Responsive */
@media (max-width: 480px) {
  .payment-card {
    border-radius: 16px;
  }

  .order-summary,
  .epayco-section {
    padding: 20px;
  }

  .payment-methods-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .method-badge {
    padding: 12px;
  }

  .result-card {
    padding: 30px 20px;
  }
}
</style>
