<template>
  <div class="login-page">
    <!-- Header -->
    <header class="header">
      <div class="header-content">
        <router-link to="/" class="logo">
          <h1>StyleUrban</h1>
        </router-link>
        <div class="header-actions">
          <ProfileMenu />
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="main-content">
      <div class="login-container">
        <div class="login-card">
          <div class="login-header">
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
            <h2>Iniciar Sesión</h2>
            <p>Ingresa a tu cuenta de StyleUrban</p>
          </div>

          <form @submit.prevent="handleLogin" class="login-form">
            <div class="form-group">
              <label for="email">Correo Electrónico</label>
              <input
                type="email"
                id="email"
                v-model="formData.email"
                placeholder="tu@email.com"
                required
              />
            </div>

            <div class="form-group">
              <label for="password">Contraseña</label>
              <input
                type="password"
                id="password"
                v-model="formData.password"
                placeholder="••••••••"
                required
              />
            </div>

            <div v-if="errorMessage" class="error-message">
              {{ errorMessage }}
            </div>

            <button type="submit" class="login-button" :disabled="isLoading">
              <span v-if="!isLoading">Iniciar Sesión</span>
              <span v-else>Iniciando...</span>
            </button>
          </form>

          <div class="login-footer">
            <p>
              ¿No tienes cuenta?
              <router-link to="/register">Regístrate aquí</router-link>
            </p>
            <router-link to="/" class="back-link">
              ← Volver al inicio
            </router-link>
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
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";
import { useCartStore } from "../stores/cart";
import ProfileMenu from "../components/ProfileMenu.vue";

const router = useRouter();
const authStore = useAuthStore();
const cartStore = useCartStore();

const formData = ref({
  email: "",
  password: "",
});

const errorMessage = ref("");
const isLoading = ref(false);

const handleLogin = async () => {
  errorMessage.value = "";
  isLoading.value = true;

  try {
    await authStore.login(formData.value.email, formData.value.password);
    router.push("/account");
  } catch (error) {
    errorMessage.value = error.message;
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.login-page {
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
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 24px;
}

.login-container {
  width: 100%;
  max-width: 450px;
}

.login-card {
  background: #ffffff;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.login-header {
  text-align: center;
  margin-bottom: 32px;
}

.login-header svg {
  color: #10b981;
  margin-bottom: 16px;
}

.login-header h2 {
  font-size: 1.8rem;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 8px 0;
}

.login-header p {
  color: #6b7280;
  margin: 0;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
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

.error-message {
  background: #fee2e2;
  color: #dc2626;
  padding: 12px 16px;
  border-radius: 10px;
  font-size: 0.9rem;
  text-align: center;
}

.login-button {
  padding: 14px 24px;
  background: #10b981;
  color: #ffffff;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
}

.login-button:hover:not(:disabled) {
  background: #059669;
  transform: translateY(-2px);
}

.login-button:disabled {
  background: #9ca3af;
  cursor: not-allowed;
}

.login-footer {
  margin-top: 24px;
  text-align: center;
}

.login-footer p {
  color: #6b7280;
  margin: 0 0 16px 0;
}

.login-footer a {
  color: #10b981;
  text-decoration: none;
  font-weight: 600;
}

.login-footer a:hover {
  text-decoration: underline;
}

.back-link {
  display: inline-block;
  color: #6b7280;
  font-size: 0.9rem;
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

/* Mobile responsive */
@media (max-width: 767px) {
  .header-content {
    padding: 0 16px;
  }

  .logo h1 {
    font-size: 1.5rem;
  }

  .login-card {
    padding: 32px 24px;
  }

  .login-header h2 {
    font-size: 1.5rem;
  }

  .footer-content {
    grid-template-columns: 1fr;
    gap: 24px;
  }
}
</style>
