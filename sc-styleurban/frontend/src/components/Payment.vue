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
      <!-- Order Info -->
      <div class="order-info">
        <h2>Información del Pedido</h2>
        <div class="info-card">
          <div class="info-row">
            <span class="label">Número de Pedido:</span>
            <span class="value">{{ orderNumber }}</span>
          </div>
          <div class="info-row">
            <span class="label">Total a Pagar:</span>
            <span class="value total">{{
              formatPrice(cartStore.totalPrice)
            }}</span>
          </div>
          <div class="info-row">
            <span class="label">Cliente:</span>
            <span class="value">{{ customerData.name }}</span>
          </div>
        </div>
      </div>

      <!-- Payment Methods -->
      <div class="payment-methods">
        <h2>Selecciona tu Método de Pago</h2>

        <div class="payment-options">
          <!-- Bancolombia -->
          <div
            class="payment-option"
            :class="{ selected: selectedMethod === 'bancolombia' }"
            @click="selectMethod('bancolombia')"
          >
            <div class="option-header">
              <div class="option-icon bancolombia-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                  <line x1="1" y1="10" x2="23" y2="10"></line>
                </svg>
              </div>
              <div class="option-info">
                <h3>Bancolombia</h3>
                <p>Tarjeta de Crédito o Débito</p>
              </div>
              <div class="radio-check">
                <div
                  class="radio"
                  :class="{ checked: selectedMethod === 'bancolombia' }"
                ></div>
              </div>
            </div>

            <div v-if="selectedMethod === 'bancolombia'" class="option-details">
              <form @submit.prevent class="payment-form">
                <!-- Card Type Selection -->
                <div class="form-group">
                  <label>Tipo de Tarjeta *</label>
                  <div class="card-type-selector">
                    <label class="card-type-option">
                      <input
                        type="radio"
                        v-model="bancolombiaData.cardType"
                        value="credito"
                        required
                      />
                      <span>Crédito</span>
                    </label>
                    <label class="card-type-option">
                      <input
                        type="radio"
                        v-model="bancolombiaData.cardType"
                        value="debito"
                        required
                      />
                      <span>Débito</span>
                    </label>
                  </div>
                </div>

                <!-- Card Number -->
                <div class="form-group">
                  <label for="cardNumber">Número de Tarjeta *</label>
                  <input
                    type="text"
                    id="cardNumber"
                    v-model="bancolombiaData.cardNumber"
                    @input="formatCardNumber"
                    placeholder="1234 5678 9012 3456"
                    maxlength="19"
                    required
                  />
                  <span v-if="cardBrand" class="card-brand">{{
                    cardBrand
                  }}</span>
                </div>

                <!-- Cardholder Name -->
                <div class="form-group">
                  <label for="cardName">Nombre del Titular *</label>
                  <input
                    type="text"
                    id="cardName"
                    v-model="bancolombiaData.cardName"
                    placeholder="Como aparece en la tarjeta"
                    required
                  />
                </div>

                <!-- Expiry and CVV -->
                <div class="form-row">
                  <div class="form-group">
                    <label for="expiryDate">Fecha de Vencimiento *</label>
                    <input
                      type="text"
                      id="expiryDate"
                      v-model="bancolombiaData.expiryDate"
                      @input="formatExpiryDate"
                      placeholder="MM/AA"
                      maxlength="5"
                      required
                    />
                  </div>
                  <div class="form-group">
                    <label for="cvv">CVV *</label>
                    <input
                      type="text"
                      id="cvv"
                      v-model="bancolombiaData.cvv"
                      @input="formatCVV"
                      placeholder="123"
                      maxlength="4"
                      required
                    />
                  </div>
                </div>

                <!-- Amount Display -->
                <div class="amount-display">
                  <span>Monto a Pagar:</span>
                  <strong>{{ formatPrice(cartStore.totalPrice) }}</strong>
                </div>
              </form>
            </div>
          </div>

          <!-- Nequi -->
          <div
            class="payment-option"
            :class="{ selected: selectedMethod === 'nequi' }"
            @click="selectMethod('nequi')"
          >
            <div class="option-header">
              <div class="option-icon nequi-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"
                  ></path>
                </svg>
              </div>
              <div class="option-info">
                <h3>Nequi</h3>
                <p>Dinero Electrónico</p>
              </div>
              <div class="radio-check">
                <div
                  class="radio"
                  :class="{ checked: selectedMethod === 'nequi' }"
                ></div>
              </div>
            </div>

            <div v-if="selectedMethod === 'nequi'" class="option-details">
              <form @submit.prevent class="payment-form">
                <!-- Phone Number -->
                <div class="form-group">
                  <label for="nequiPhone">Número de Celular Nequi *</label>
                  <input
                    type="tel"
                    id="nequiPhone"
                    v-model="nequiData.phoneNumber"
                    @input="formatPhoneNumber"
                    placeholder="300 123 4567"
                    maxlength="12"
                    required
                  />
                  <small class="help-text"
                    >Ingresa tu número de celular registrado en Nequi</small
                  >
                </div>

                <!-- Amount Display -->
                <div class="amount-display">
                  <span>Monto a Pagar:</span>
                  <strong>{{ formatPrice(cartStore.totalPrice) }}</strong>
                </div>

                <!-- Nequi Info -->
                <div class="nequi-info">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                  </svg>
                  <p>
                    Recibirás una notificación en tu app Nequi para aprobar el
                    pago.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>

        <button
          class="confirm-payment-btn"
          :disabled="!selectedMethod || isProcessing"
          @click="processPayment"
        >
          <span v-if="!isProcessing">Confirmar y Pagar</span>
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
          Recibirás un correo de confirmación en breve.
        </p>
        <button class="modal-btn" @click="goToHome">Volver al Inicio</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useCartStore } from "../stores/cart";
import { orderService } from "../services/orderService";

const router = useRouter();
const cartStore = useCartStore();

const selectedMethod = ref("");
const isProcessing = ref(false);
const showSuccessModal = ref(false);
const orderNumber = ref("");
const customerData = ref({});
const cardBrand = ref("");

// Bancolombia payment data
const bancolombiaData = ref({
  cardType: "",
  cardNumber: "",
  cardName: "",
  expiryDate: "",
  cvv: "",
});

// Nequi payment data
const nequiData = ref({
  phoneNumber: "",
});

onMounted(() => {
  // Load customer data
  const savedCustomer = localStorage.getItem("sc-styleurban-customer");
  if (savedCustomer) {
    customerData.value = JSON.parse(savedCustomer);
  }

  // Generate order number
  orderNumber.value = orderService.generateOrderNumber();

  // Redirect if cart is empty
  if (cartStore.cartItems.length === 0) {
    router.push("/");
  }
});

const formatPrice = (price) => {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(price);
};

const selectMethod = (method) => {
  selectedMethod.value = method;
};

const goBack = () => {
  router.push("/checkout");
};

// Format card number with spaces
const formatCardNumber = (event) => {
  let value = event.target.value.replace(/\s/g, "");
  value = value.replace(/\D/g, "");

  // Add spaces every 4 digits
  const formatted = value.match(/.{1,4}/g)?.join(" ") || value;
  bancolombiaData.value.cardNumber = formatted;

  // Detect card brand
  if (value.startsWith("4")) {
    cardBrand.value = "Visa";
  } else if (value.startsWith("5")) {
    cardBrand.value = "Mastercard";
  } else if (value.startsWith("3")) {
    cardBrand.value = "American Express";
  } else {
    cardBrand.value = "";
  }
};

// Format expiry date MM/YY
const formatExpiryDate = (event) => {
  let value = event.target.value.replace(/\D/g, "");

  if (value.length >= 2) {
    value = value.slice(0, 2) + "/" + value.slice(2, 4);
  }

  bancolombiaData.value.expiryDate = value;
};

// Format CVV (only numbers)
const formatCVV = (event) => {
  bancolombiaData.value.cvv = event.target.value.replace(/\D/g, "");
};

// Format phone number
const formatPhoneNumber = (event) => {
  let value = event.target.value.replace(/\D/g, "");

  // Format as XXX XXX XXXX
  if (value.length >= 3) {
    value = value.slice(0, 3) + " " + value.slice(3);
  }
  if (value.length >= 7) {
    value = value.slice(0, 7) + " " + value.slice(7, 11);
  }

  nequiData.value.phoneNumber = value;
};

// Validate Bancolombia payment data
const validateBancolombiaData = () => {
  const { cardType, cardNumber, cardName, expiryDate, cvv } =
    bancolombiaData.value;

  if (!cardType) {
    alert("Por favor selecciona el tipo de tarjeta");
    return false;
  }

  const cleanCardNumber = cardNumber.replace(/\s/g, "");
  if (cleanCardNumber.length < 15 || cleanCardNumber.length > 16) {
    alert("Número de tarjeta inválido");
    return false;
  }

  if (!cardName || cardName.trim().length < 3) {
    alert("Por favor ingresa el nombre del titular");
    return false;
  }

  if (expiryDate.length !== 5) {
    alert("Fecha de vencimiento inválida (MM/AA)");
    return false;
  }

  // Validate expiry date
  const [month, year] = expiryDate.split("/");
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear() % 100;
  const currentMonth = currentDate.getMonth() + 1;

  if (parseInt(month) < 1 || parseInt(month) > 12) {
    alert("Mes de vencimiento inválido");
    return false;
  }

  if (
    parseInt(year) < currentYear ||
    (parseInt(year) === currentYear && parseInt(month) < currentMonth)
  ) {
    alert("La tarjeta está vencida");
    return false;
  }

  if (cvv.length < 3 || cvv.length > 4) {
    alert("CVV inválido");
    return false;
  }

  return true;
};

// Validate Nequi payment data
const validateNequiData = () => {
  const cleanPhone = nequiData.value.phoneNumber.replace(/\s/g, "");

  if (cleanPhone.length !== 10) {
    alert("Número de celular inválido. Debe tener 10 dígitos");
    return false;
  }

  if (!cleanPhone.startsWith("3")) {
    alert("El número debe ser un celular colombiano (iniciar con 3)");
    return false;
  }

  return true;
};

const processPayment = async () => {
  if (!selectedMethod.value) {
    alert("Por favor selecciona un método de pago");
    return;
  }

  // Validate payment data
  if (selectedMethod.value === "bancolombia") {
    if (!validateBancolombiaData()) {
      return;
    }
  } else if (selectedMethod.value === "nequi") {
    if (!validateNequiData()) {
      return;
    }
  }

  isProcessing.value = true;

  // Simulate payment processing
  setTimeout(async () => {
    try {
      // Prepare payment details
      let paymentDetails = {};

      if (selectedMethod.value === "bancolombia") {
        paymentDetails = {
          method: "Bancolombia",
          cardType: bancolombiaData.value.cardType,
          cardNumber:
            "****" +
            bancolombiaData.value.cardNumber.replace(/\s/g, "").slice(-4),
          cardHolder: bancolombiaData.value.cardName,
        };
      } else if (selectedMethod.value === "nequi") {
        paymentDetails = {
          method: "Nequi",
          phoneNumber: nequiData.value.phoneNumber,
        };
      }

      // Create order object
      const orderData = {
        orderNumber: orderNumber.value,
        customerName: customerData.value.name,
        phone: customerData.value.phone,
        email: customerData.value.email,
        address: customerData.value.address,
        notes: customerData.value.notes || "",
        orderDate: new Date().toISOString(),
        status: "Aprobado",
        paymentMethod: selectedMethod.value,
        paymentDetails: paymentDetails,
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

      // Save order to database
      await orderService.createOrder(orderData);

      // Clear cart and customer data
      cartStore.clearCart();
      localStorage.removeItem("sc-styleurban-customer");

      // Show success modal
      isProcessing.value = false;
      showSuccessModal.value = true;
    } catch (error) {
      console.error("Error processing payment:", error);
      alert("Hubo un error al procesar el pago. Por favor intenta nuevamente.");
      isProcessing.value = false;
    }
  }, 2000);
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

.bancolombia-icon {
  background: linear-gradient(135deg, #ffdd00 0%, #ffc700 100%);
  color: #1a1a1a;
}

.nequi-icon {
  background: linear-gradient(135deg, #ff006b 0%, #e6005f 100%);
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

.nequi-info {
  display: flex;
  gap: 12px;
  padding: 12px;
  background: #fff3e0;
  border-left: 4px solid #ff006b;
  border-radius: 6px;
  margin-top: 8px;
}

.nequi-info svg {
  flex-shrink: 0;
  color: #ff006b;
}

.nequi-info p {
  margin: 0;
  font-size: 0.9rem;
  color: #666;
  line-height: 1.5;
}

.details-text {
  margin: 0 0 16px 0;
  color: #666;
  line-height: 1.6;
}

.payment-logos {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.logo-badge {
  padding: 6px 12px;
  background: #1a1a1a;
  color: #ffffff;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
}

.nequi-badge {
  background: #ff006b;
}

.confirm-payment-btn {
  width: 100%;
  padding: 18px;
  background: linear-gradient(135deg, #27ae60 0%, #229954 100%);
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-size: 1.2rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.confirm-payment-btn:hover:not(:disabled) {
  background: linear-gradient(135deg, #229954 0%, #1e8449 100%);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(39, 174, 96, 0.4);
}

.confirm-payment-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
  transform: none;
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
  margin-bottom: 24px !important;
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

@media (max-width: 768px) {
  .payment-header h1 {
    font-size: 2rem;
  }

  .option-header {
    gap: 12px;
  }

  .option-icon {
    width: 50px;
    height: 50px;
  }

  .option-info h3 {
    font-size: 1.1rem;
  }
}
</style>
