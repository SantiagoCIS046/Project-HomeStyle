<template>
  <div class="account-page">
    <!-- Header -->
    <header class="header">
      <div class="header-content">
        <router-link to="/" class="logo">
          <h1>StyleUrban</h1>
        </router-link>
        <div class="header-actions">
          <router-link to="/cart" class="cart-button">
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
            <span v-if="cartStore.itemCount > 0" class="cart-count">{{
              cartStore.itemCount
            }}</span>
          </router-link>
          <ProfileMenu />
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="main-content">
      <div class="account-container">
        <!-- Welcome Section -->
        <div class="welcome-section">
          <div class="welcome-header">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <div>
              <h2>¡Hola, {{ authStore.userName }}!</h2>
              <p>Bienvenido a tu cuenta de StyleUrban</p>
            </div>
          </div>
          <router-link to="/" class="back-button">
            ← Volver al inicio
          </router-link>
        </div>

        <!-- Account Sections -->
        <div class="account-sections">
          <!-- Personal Info Section -->
          <div class="section-card">
            <div class="section-header">
              <h3>Información Personal</h3>
              <button
                v-if="!isEditingProfile"
                @click="startEditProfile"
                class="edit-button"
              >
                Editar
              </button>
            </div>

            <div v-if="!isEditingProfile" class="info-grid">
              <div class="info-item">
                <span class="label">Nombre:</span>
                <span class="value">{{ authStore.user.name }}</span>
              </div>
              <div class="info-item">
                <span class="label">Email:</span>
                <span class="value">{{ authStore.user.email }}</span>
              </div>
              <div class="info-item">
                <span class="label">Teléfono:</span>
                <span class="value">{{
                  authStore.user.phone || "No registrado"
                }}</span>
              </div>
              <div class="info-item">
                <span class="label">Dirección:</span>
                <span class="value">{{
                  authStore.user.address || "No registrada"
                }}</span>
              </div>
            </div>

            <form v-else @submit.prevent="saveProfile" class="edit-form">
              <div class="form-group">
                <label>Nombre</label>
                <input type="text" v-model="editForm.name" required />
              </div>
              <div class="form-group">
                <label>Teléfono</label>
                <input type="tel" v-model="editForm.phone" />
              </div>
              <div class="form-group">
                <label>Dirección</label>
                <input type="text" v-model="editForm.address" />
              </div>
              <div class="form-actions">
                <button type="submit" class="save-button">Guardar</button>
                <button
                  type="button"
                  @click="cancelEditProfile"
                  class="cancel-button"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>

          <!-- Orders Section -->
          <div class="section-card">
            <div class="section-header">
              <h3>Historial de Pedidos</h3>
              <span class="orders-count">{{ userOrders.length }} pedidos</span>
            </div>

            <div v-if="userOrders.length === 0" class="empty-state">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="64"
                height="64"
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
              <p>Aún no has realizado ningún pedido</p>
              <router-link to="/" class="shop-button">
                Ir a comprar
              </router-link>
            </div>

            <div v-else class="orders-list">
              <div
                v-for="order in userOrders"
                :key="order.orderNumber"
                class="order-card"
              >
                <div class="order-header">
                  <div>
                    <h4>Pedido #{{ order.orderNumber }}</h4>
                    <p class="order-date">
                      {{ formatDate(order.orderDate) }}
                    </p>
                  </div>
                  <span
                    class="order-status"
                    :class="getStatusClass(order.status)"
                  >
                    {{ order.status }}
                  </span>
                </div>

                <div class="order-products">
                  <div
                    v-for="product in order.products"
                    :key="`${product.id}-${product.size}`"
                    class="order-product"
                  >
                    <span class="product-name"
                      >{{ product.name }} ({{ product.size }})</span
                    >
                    <span class="product-quantity"
                      >x{{ product.quantity }}</span
                    >
                    <span class="product-price">{{
                      formatPrice(product.subtotal)
                    }}</span>
                  </div>
                </div>

                <div class="order-footer">
                  <span class="order-total-label">Total:</span>
                  <span class="order-total">{{
                    formatPrice(order.total)
                  }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-section">
          <h3>StyleUrban</h3>
          <p>Moda urbana de calidad</p>
        </div>
        <div class="footer-section">
          <h4>Contacto</h4>
          <p>Email: info@styleurban.com</p>
          <p>Tel: +57 300 123 4567</p>
        </div>
        <div class="footer-section">
          <h4>Síguenos</h4>
          <p>Instagram | Facebook | Twitter</p>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2024 StyleUrban. Todos los derechos reservados.</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";
import { useCartStore } from "../stores/cart";
import ProfileMenu from "../components/ProfileMenu.vue";

const router = useRouter();
const authStore = useAuthStore();
const cartStore = useCartStore();

const isEditingProfile = ref(false);
const editForm = ref({
  name: "",
  phone: "",
  address: "",
});

const userOrders = computed(() => authStore.getUserOrders());

onMounted(() => {
  // Redirect if not authenticated
  if (!authStore.isAuthenticated) {
    router.push("/login");
  }
});

const startEditProfile = () => {
  editForm.value = {
    name: authStore.user.name,
    phone: authStore.user.phone || "",
    address: authStore.user.address || "",
  };
  isEditingProfile.value = true;
};

const cancelEditProfile = () => {
  isEditingProfile.value = false;
};

const saveProfile = async () => {
  try {
    await authStore.updateProfile(editForm.value);

    // Actualizar también el localStorage de customer data para que se refleje en checkout
    const customerData = {
      name: editForm.value.name,
      phone: editForm.value.phone,
      email: authStore.user.email,
      address: editForm.value.address,
      notes: "",
    };
    localStorage.setItem(
      "sc-styleurban-customer",
      JSON.stringify(customerData)
    );

    isEditingProfile.value = false;
  } catch (error) {
    alert("Error al actualizar el perfil: " + error.message);
  }
};

const formatPrice = (price) => {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(price);
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("es-CO", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getStatusClass = (status) => {
  const statusMap = {
    Aprobado: "status-approved",
    Pendiente: "status-pending",
    Rechazado: "status-rejected",
    Enviado: "status-shipped",
    Entregado: "status-delivered",
  };
  return statusMap[status] || "status-pending";
};
</script>

<style scoped>
.account-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f9fafb;
}

/* Header */
.header {
  background: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  padding: 16px 0;
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  text-decoration: none;
}

.logo h1 {
  font-size: 1.8rem;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.cart-button {
  position: relative;
  padding: 8px;
  color: #1a1a1a;
  text-decoration: none;
  border-radius: 8px;
  transition: background 0.3s ease;
}

.cart-button:hover {
  background: #f3f4f6;
}

.cart-count {
  position: absolute;
  top: 2px;
  right: 2px;
  background: #10b981;
  color: #ffffff;
  font-size: 0.7rem;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 10px;
  min-width: 18px;
  text-align: center;
}

/* Main Content */
.main-content {
  flex: 1;
  padding: 40px 24px;
}

.account-container {
  max-width: 1000px;
  margin: 0 auto;
}

/* Welcome Section */
.welcome-section {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  border-radius: 20px;
  padding: 32px;
  margin-bottom: 32px;
  color: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
}

.welcome-header {
  display: flex;
  align-items: center;
  gap: 20px;
}

.welcome-header svg {
  flex-shrink: 0;
}

.welcome-header h2 {
  font-size: 2rem;
  margin: 0 0 4px 0;
  font-weight: 700;
}

.welcome-header p {
  margin: 0;
  opacity: 0.9;
}

.back-button {
  background: rgba(255, 255, 255, 0.2);
  color: #ffffff;
  padding: 10px 20px;
  border-radius: 10px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.back-button:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateX(-4px);
}

/* Account Sections */
.account-sections {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.section-card {
  background: #ffffff;
  border-radius: 20px;
  padding: 32px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 2px solid #f3f4f6;
}

.section-header h3 {
  font-size: 1.5rem;
  margin: 0;
  color: #1a1a1a;
}

.edit-button {
  background: #10b981;
  color: #ffffff;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.edit-button:hover {
  background: #059669;
}

.orders-count {
  background: #f3f4f6;
  color: #6b7280;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
}

/* Personal Info */
.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.info-item .label {
  font-size: 0.85rem;
  color: #6b7280;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.info-item .value {
  font-size: 1.1rem;
  color: #1a1a1a;
  font-weight: 500;
}

/* Edit Form */
.edit-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-size: 0.9rem;
  font-weight: 600;
  color: #374151;
}

.form-group input {
  padding: 12px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.form-group input:focus {
  outline: none;
  border-color: #10b981;
}

.form-actions {
  display: flex;
  gap: 12px;
  margin-top: 8px;
}

.save-button,
.cancel-button {
  padding: 12px 24px;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.save-button {
  background: #10b981;
  color: #ffffff;
  flex: 1;
}

.save-button:hover {
  background: #059669;
}

.cancel-button {
  background: #f3f4f6;
  color: #6b7280;
  flex: 1;
}

.cancel-button:hover {
  background: #e5e7eb;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 60px 20px;
}

.empty-state svg {
  color: #d1d5db;
  margin-bottom: 20px;
}

.empty-state p {
  color: #6b7280;
  font-size: 1.1rem;
  margin: 0 0 24px 0;
}

.shop-button {
  display: inline-block;
  background: #10b981;
  color: #ffffff;
  padding: 12px 32px;
  border-radius: 10px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
}

.shop-button:hover {
  background: #059669;
  transform: translateY(-2px);
}

/* Orders List */
.orders-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.order-card {
  border: 2px solid #f3f4f6;
  border-radius: 12px;
  padding: 20px;
  transition: all 0.3s ease;
}

.order-card:hover {
  border-color: #10b981;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.1);
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #f3f4f6;
}

.order-header h4 {
  font-size: 1.1rem;
  margin: 0 0 4px 0;
  color: #1a1a1a;
}

.order-date {
  font-size: 0.85rem;
  color: #6b7280;
  margin: 0;
}

.order-status {
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
}

.status-approved {
  background: #d1fae5;
  color: #065f46;
}

.status-pending {
  background: #fef3c7;
  color: #92400e;
}

.status-rejected {
  background: #fee2e2;
  color: #991b1b;
}

.status-shipped {
  background: #dbeafe;
  color: #1e40af;
}

.status-delivered {
  background: #d1fae5;
  color: #065f46;
}

.order-products {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
}

.order-product {
  display: grid;
  grid-template-columns: 1fr auto auto;
  gap: 12px;
  align-items: center;
  padding: 8px 0;
}

.product-name {
  color: #374151;
  font-weight: 500;
}

.product-quantity {
  color: #10b981;
  font-weight: 600;
  font-size: 0.9rem;
}

.product-price {
  color: #1a1a1a;
  font-weight: 600;
  text-align: right;
}

.order-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  border-top: 1px solid #f3f4f6;
}

.order-total-label {
  font-size: 1rem;
  color: #6b7280;
  font-weight: 600;
}

.order-total {
  font-size: 1.3rem;
  color: #10b981;
  font-weight: 700;
}

/* Footer */
.footer {
  background: #1a1a1a;
  color: #ffffff;
  padding: 40px 24px 24px;
  margin-top: auto;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 32px;
  margin-bottom: 24px;
}

.footer-section h3 {
  font-size: 1.5rem;
  margin: 0 0 8px 0;
}

.footer-section h4 {
  font-size: 1.1rem;
  margin: 0 0 12px 0;
}

.footer-section p {
  color: #9ca3af;
  margin: 4px 0;
  font-size: 0.9rem;
}

.footer-bottom {
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 24px;
  border-top: 1px solid #374151;
  text-align: center;
}

.footer-bottom p {
  color: #9ca3af;
  margin: 0;
  font-size: 0.9rem;
}

/* Responsive */
@media (max-width: 767px) {
  .header-content {
    padding: 0 16px;
  }

  .logo h1 {
    font-size: 1.5rem;
  }

  .welcome-section {
    padding: 24px;
  }

  .welcome-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .welcome-header h2 {
    font-size: 1.5rem;
  }

  .section-card {
    padding: 24px 20px;
  }

  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .info-grid {
    grid-template-columns: 1fr;
  }

  .form-actions {
    flex-direction: column;
  }

  .order-product {
    grid-template-columns: 1fr;
    gap: 4px;
  }

  .product-price {
    text-align: left;
  }

  .footer-content {
    grid-template-columns: 1fr;
    gap: 24px;
  }
}
</style>
