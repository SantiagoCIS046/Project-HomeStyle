<template>
  <div class="profile-menu-container">
    <button class="profile-button" @click="toggleMenu" ref="profileButton">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
      </svg>
      <span v-if="authStore.isAuthenticated" class="user-name">{{
        authStore.userName
      }}</span>
    </button>

    <transition name="dropdown">
      <div v-if="isMenuOpen" class="dropdown-menu" ref="dropdownMenu">
        <template v-if="!authStore.isAuthenticated">
          <router-link to="/login" class="menu-item" @click="closeMenu">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
              <polyline points="10 17 15 12 10 7"></polyline>
              <line x1="15" y1="12" x2="3" y2="12"></line>
            </svg>
            <span>Iniciar Sesión</span>
          </router-link>
          <router-link to="/register" class="menu-item" @click="closeMenu">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="8.5" cy="7" r="4"></circle>
              <line x1="20" y1="8" x2="20" y2="14"></line>
              <line x1="23" y1="11" x2="17" y2="11"></line>
            </svg>
            <span>Registrarse</span>
          </router-link>
        </template>

        <template v-else>
          <router-link to="/account" class="menu-item" @click="closeMenu">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <span>Mi Cuenta</span>
          </router-link>
        </template>

        <router-link to="/cart" class="menu-item" @click="closeMenu">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
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
          <span>Carrito de Compras</span>
          <span v-if="cartStore.itemCount > 0" class="cart-badge">{{
            cartStore.itemCount
          }}</span>
        </router-link>

        <template v-if="authStore.isAuthenticated">
          <div class="menu-divider"></div>
          <button class="menu-item logout" @click="handleLogout">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            <span>Cerrar Sesión</span>
          </button>
        </template>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";
import { useCartStore } from "../stores/cart";

const router = useRouter();
const authStore = useAuthStore();
const cartStore = useCartStore();

const isMenuOpen = ref(false);
const profileButton = ref(null);
const dropdownMenu = ref(null);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
  isMenuOpen.value = false;
};

const handleLogout = () => {
  authStore.logout();
  closeMenu();
  router.push("/login");
};

// Close menu when clicking outside
const handleClickOutside = (event) => {
  if (
    isMenuOpen.value &&
    profileButton.value &&
    dropdownMenu.value &&
    !profileButton.value.contains(event.target) &&
    !dropdownMenu.value.contains(event.target)
  ) {
    closeMenu();
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<style scoped>
.profile-menu-container {
  position: relative;
}

.profile-button {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #ffffff;
  cursor: pointer;
  padding: 10px 14px;
  border-radius: 10px;
  transition: all 0.3s ease;
}

.profile-button svg {
  color: #ffffff;
}

.profile-button:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.3);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.profile-button svg {
  flex-shrink: 0;
}

.user-name {
  font-size: 0.9rem;
  font-weight: 600;
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.dropdown-menu {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  min-width: 220px;
  padding: 8px;
  z-index: 1000;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  color: #1a1a1a;
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.2s ease;
  cursor: pointer;
  border: none;
  background: transparent;
  width: 100%;
  text-align: left;
  font-size: 0.95rem;
  position: relative;
}

.menu-item:hover {
  background: #f3f4f6;
}

.menu-item svg {
  flex-shrink: 0;
  color: #6b7280;
}

.menu-item span {
  flex: 1;
}

.menu-item.logout {
  color: #dc2626;
}

.menu-item.logout svg {
  color: #dc2626;
}

.menu-item.logout:hover {
  background: #fee2e2;
}

.cart-badge {
  background: #10b981;
  color: #ffffff;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 12px;
  min-width: 20px;
  text-align: center;
}

.menu-divider {
  height: 1px;
  background: #e5e7eb;
  margin: 8px 0;
}

/* Dropdown animation */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Mobile responsive */
@media (max-width: 767px) {
  .user-name {
    display: none;
  }

  .dropdown-menu {
    right: -8px;
    min-width: 200px;
  }

  .menu-item {
    padding: 10px 14px;
    font-size: 0.9rem;
  }
}
</style>
