<script setup>
import { useRoute } from "vue-router";
import { computed } from "vue";
import CartIcon from "./components/CartIcon.vue";
import CartSidebar from "./components/CartSidebar.vue";

const route = useRoute();

// Show header only on catalog page
const showHeader = computed(() => route.path === "/");
</script>

<template>
  <div class="app-container">
    <!-- Cart Icon (always visible) -->
    <CartIcon />

    <!-- Cart Sidebar -->
    <CartSidebar />

    <!-- Header with Logo (only on home page) -->
    <header v-if="showHeader" class="header">
      <div class="logo-container">
        <img
          src="/Logo de proyecto.png"
          class="logo"
          alt="SC StyleUrban Logo"
        />
      </div>
      <h1 class="brand-title">SC UrbanStyle</h1>
      <p class="brand-subtitle">La calle habla, nosotros la vestimos.</p>
    </header>

    <!-- Main Content -->
    <main>
      <router-view />
    </main>

    <!-- Footer -->
    <footer class="footer">
      <p>&copy; 2024 SC StyleUrban. Todos los derechos reservados.</p>
    </footer>
  </div>
</template>

<style scoped>
.app-container {
  min-height: 100vh;
  background: linear-gradient(to bottom, #ffffff 0%, #f8f8f8 100%);
}

.header {
  background: linear-gradient(135deg, #1a1a1a 0%, #2c2c2c 100%);
  padding: 40px 20px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 40px;
}

.logo-container {
  margin-bottom: 20px;
}

.logo {
  height: 120px;
  width: auto;
  filter: drop-shadow(0 4px 8px rgba(255, 255, 255, 0.1));
  transition: transform 0.3s ease;
}

.logo:hover {
  transform: scale(1.05);
}

.brand-title {
  font-size: 3rem;
  font-weight: 800;
  color: #ffffff;
  margin: 0 0 10px 0;
  text-transform: uppercase;
  letter-spacing: 4px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.brand-subtitle {
  font-size: 1.2rem;
  color: #b0b0b0;
  margin: 0;
  font-style: italic;
  letter-spacing: 2px;
}

main {
  padding: 0 20px 40px;
}

.footer {
  background: #1a1a1a;
  color: #b0b0b0;
  text-align: center;
  padding: 30px 20px;
  margin-top: 60px;
  border-top: 3px solid #4a90e2;
}

.footer p {
  margin: 0;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .brand-title {
    font-size: 2rem;
    letter-spacing: 2px;
  }

  .brand-subtitle {
    font-size: 1rem;
  }

  .logo {
    height: 80px;
  }

  .header {
    padding: 30px 15px;
  }
}
</style>
