<template>
  <div class="catalog-page">
    <!-- Header -->
    <header class="header">
      <div class="header-content">
        <div class="logo">
          <h1>Home Style</h1>
        </div>
        <div class="header-actions">
          <!-- Categories Menu -->
          <div class="categories-menu-container" ref="categoriesMenuRef">
            <button class="categories-button" @click="toggleCategoriesMenu">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
            <div v-if="showCategoriesMenu" class="categories-dropdown">
              <a
                href="#estampadas"
                class="category-item"
                @click="scrollToSection('estampadas')"
              >
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
                    d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"
                  ></path>
                  <line x1="7" y1="7" x2="7.01" y2="7"></line>
                </svg>
                <span>Camisetas Estampadas</span>
              </a>
              <a
                href="#oversize"
                class="category-item"
                @click="scrollToSection('oversize')"
              >
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
                    d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"
                  ></path>
                  <line x1="7" y1="7" x2="7.01" y2="7"></line>
                </svg>
                <span>Camisetas Oversize</span>
              </a>
            </div>
          </div>

          <router-link to="/cart" class="cart-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
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

    <div class="catalog-container">
      <!-- Alert Banner -->
      <div class="alert-banner">
        <div class="alert-icon">ℹ️</div>
        <div class="alert-content">
          <strong>Información Importante</strong>
          <p>
            Las camisetas estampadas están disponibles en tallas S, M y L. Las
            camisetas Oversize solo están disponibles en talla M.
          </p>
        </div>
      </div>

      <!-- Camisetas Estampadas Section -->
      <section id="estampadas" class="category-section">
        <div class="category-header">
          <h2 class="category-title">Camisetas Estampadas</h2>
          <div class="size-filter">
            <button
              :class="[
                'size-filter-btn',
                { active: selectedEstampadasFilter === 'all' },
              ]"
              @click="selectedEstampadasFilter = 'all'"
            >
              Todas
            </button>
            <button
              :class="[
                'size-filter-btn',
                { active: selectedEstampadasFilter === 'S' },
              ]"
              @click="selectedEstampadasFilter = 'S'"
            >
              S
            </button>
            <button
              :class="[
                'size-filter-btn',
                { active: selectedEstampadasFilter === 'M' },
              ]"
              @click="selectedEstampadasFilter = 'M'"
            >
              M
            </button>
            <button
              :class="[
                'size-filter-btn',
                { active: selectedEstampadasFilter === 'L' },
              ]"
              @click="selectedEstampadasFilter = 'L'"
            >
              L
            </button>
          </div>
        </div>

        <div class="products-grid">
          <div
            v-for="product in filteredEstampadasProducts"
            :key="product.id"
            class="product-card"
          >
            <div
              class="product-image-container"
              @click="openImageZoom(product)"
            >
              <img
                :src="product.images[currentImageIndex[product.id] || 0]"
                :alt="product.name"
                class="product-image"
              />
              <div class="product-badge">{{ product.size }}</div>
              <div class="zoom-icon">🔍</div>
              <div
                class="image-indicator"
                @click="toggleImage(product.id, $event)"
              >
                <span
                  v-for="(img, index) in product.images"
                  :key="index"
                  :class="[
                    'dot',
                    { active: (currentImageIndex[product.id] || 0) === index },
                  ]"
                ></span>
              </div>
            </div>
            <div class="product-info">
              <h3 class="product-name">{{ product.name }}</h3>
              <p class="product-color">Color: {{ product.color }}</p>
              <p class="product-size-info">Talla: {{ product.size }}</p>
              <p class="product-price">{{ formatPrice(product.price) }}</p>
              <button
                class="buy-button"
                @click="handleBuy(product, 'estampada')"
              >
                <span class="btn-icon">🛒</span>
                Agregar al Carrito
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Camisetas Oversize Section -->
      <section id="oversize" class="category-section">
        <div class="category-header">
          <h2 class="category-title">Camisetas Oversize</h2>
          <div class="size-info-badge">Talla Única: M</div>
        </div>

        <div class="products-grid">
          <div
            v-for="product in oversizeProducts"
            :key="product.id"
            class="product-card"
          >
            <div
              class="product-image-container"
              @click="openImageZoom(product)"
            >
              <img
                :src="product.images[currentImageIndex[product.id] || 0]"
                :alt="product.name"
                class="product-image"
              />
              <div class="product-badge oversize">M</div>
              <div class="zoom-icon">🔍</div>
              <div
                class="image-indicator"
                @click="toggleImage(product.id, $event)"
              >
                <span
                  v-for="(img, index) in product.images"
                  :key="index"
                  :class="[
                    'dot',
                    { active: (currentImageIndex[product.id] || 0) === index },
                  ]"
                ></span>
              </div>
            </div>
            <div class="product-info">
              <h3 class="product-name">{{ product.name }}</h3>
              <p class="product-color">Color: {{ product.color }}</p>
              <p class="product-size-info">Talla: {{ product.size }}</p>
              <p class="product-price">{{ formatPrice(product.price) }}</p>
              <button
                class="buy-button"
                @click="handleBuy(product, 'oversize')"
              >
                <span class="btn-icon">🛒</span>
                Agregar al Carrito
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- Modal de Zoom de Imagen -->
    <Transition name="modal-fade">
      <div
        v-if="imageZoomModal.isOpen"
        class="image-zoom-modal"
        @click="closeImageZoom"
      >
        <div class="modal-content" @click.stop>
          <button class="modal-close" @click="closeImageZoom">✕</button>

          <div class="modal-header">
            <h3>{{ imageZoomModal.productName }}</h3>
          </div>

          <div class="modal-body">
            <button
              v-if="imageZoomModal.images.length > 1"
              class="modal-nav modal-prev"
              @click="prevImageInModal"
            >
              ‹
            </button>

            <img
              :src="imageZoomModal.imageUrl"
              :alt="imageZoomModal.productName"
              class="modal-image"
            />

            <button
              v-if="imageZoomModal.images.length > 1"
              class="modal-nav modal-next"
              @click="nextImageInModal"
            >
              ›
            </button>
          </div>

          <div class="modal-footer" v-if="imageZoomModal.images.length > 1">
            <div class="modal-indicators">
              <span
                v-for="(img, index) in imageZoomModal.images"
                :key="index"
                :class="[
                  'modal-dot',
                  { active: imageZoomModal.currentIndex === index },
                ]"
              ></span>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Footer -->
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-section">
          <h3>HomeStyle</h3>
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
import { ref, reactive, computed, onMounted, onUnmounted } from "vue";
import { useCartStore } from "../stores/cart";
import ProfileMenu from "./ProfileMenu.vue";

const cartStore = useCartStore();

// Selected sizes for each product
const selectedSizes = reactive({});

// Filter for estampadas products
const selectedEstampadasFilter = ref("all");

// Categories menu state
const showCategoriesMenu = ref(false);
const categoriesMenuRef = ref(null);

const toggleCategoriesMenu = () => {
  showCategoriesMenu.value = !showCategoriesMenu.value;
};

const scrollToSection = (sectionId) => {
  showCategoriesMenu.value = false;
  const element = document.getElementById(sectionId);
  if (element) {
    const headerOffset = 100; // Offset for sticky header
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
};

// Close menu when clicking outside
const handleClickOutside = (event) => {
  if (
    categoriesMenuRef.value &&
    !categoriesMenuRef.value.contains(event.target)
  ) {
    showCategoriesMenu.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});

// Estado para controlar qué imagen se muestra (0 o 1)
const currentImageIndex = reactive({});

// Estado para el modal de zoom de imagen
const imageZoomModal = reactive({
  isOpen: false,
  imageUrl: "",
  productName: "",
  currentIndex: 0,
  images: [],
});

// Camisetas Estampadas - 4 camisetas por talla (S, M, L)
const estampadasProducts = ref([
  // Talla S
  {
    id: 1,
    name: "Camiseta Estampada Blanca",
    color: "Blanco",
    size: "S",
    price: 60000,
    images: [
      new URL(
        "../img/Camiseta Estampada, Blanco, Talla S.jpeg",
        import.meta.url
      ).href,
      new URL(
        "../img/Camiseta Estampada, Blanco, Talla S. (2).jpeg",
        import.meta.url
      ).href,
    ],
  },
  {
    id: 2,
    name: "Camiseta Estampada Negra",
    color: "Negro",
    size: "S",
    price: 60000,
    images: [
      new URL(
        "../img/Camiseta Estampada, color Negro, Talla S.jpeg",
        import.meta.url
      ).href,
      new URL(
        "../img/Camiseta Estampada, color Negro, Talla S..jpeg",
        import.meta.url
      ).href,
    ],
  },
  {
    id: 3,
    name: "Camiseta Estampada Negra",
    color: "Negro",
    size: "S",
    price: 60000,
    images: [
      new URL("../img/Camiseta Estampada, negro, Talla S.jpeg", import.meta.url)
        .href,
      new URL(
        "../img/Camiseta Estampada, negro, Talla S..jpeg",
        import.meta.url
      ).href,
    ],
  },
  {
    id: 4,
    name: "Camiseta Estampada Gris Claro",
    color: "Gris Claro",
    size: "S",
    price: 60000,
    images: [
      new URL(
        "../img/Camiseta Estampada, Gris Claro, Talla S.jpeg",
        import.meta.url
      ).href,
      new URL(
        "../img/Camiseta Estampada, Gris Claro, Talla S..jpeg",
        import.meta.url
      ).href,
    ],
  },

  // Talla M
  {
    id: 5,
    name: "Camiseta Estampada Blanca",
    color: "Blanco",
    size: "M",
    price: 60000,
    images: [
      new URL(
        "../img/Camiseta Estampada, color Blanco, Talla M.jpeg",
        import.meta.url
      ).href,
      new URL(
        "../img/Camiseta Estampada, color Blanco, Talla M..jpeg",
        import.meta.url
      ).href,
    ],
  },
  {
    id: 6,
    name: "Camiseta Estampada Negra",
    color: "Negro",
    size: "M",
    price: 60000,
    images: [
      new URL(
        "../img/Camiseta Estampada, color Negro, Talla M.jpeg",
        import.meta.url
      ).href,
      new URL(
        "../img/Camiseta Estampada, color Negro, Talla M..jpeg",
        import.meta.url
      ).href,
    ],
  },
  {
    id: 7,
    name: "Camiseta Estampada Hueso",
    color: "Hueso",
    size: "M",
    price: 60000,
    images: [
      new URL(
        "../img/Camiseta Estampada, color hueso, Talla M.jpeg",
        import.meta.url
      ).href,
      new URL(
        "../img/Camiseta Estampada, color hueso, Talla M..jpeg",
        import.meta.url
      ).href,
    ],
  },
  {
    id: 8,
    name: "Camiseta Estampada Roja",
    color: "Rojo",
    size: "M",
    price: 60000,
    images: [
      new URL(
        "../img/Camiseta Estampada, color rojo, Talla M.jpeg",
        import.meta.url
      ).href,
      new URL(
        "../img/Camiseta Estampada, color rojo, Talla M..jpeg",
        import.meta.url
      ).href,
    ],
  },

  // Talla L
  {
    id: 9,
    name: "Camiseta Estampada Hueso",
    color: "Hueso",
    size: "L",
    price: 60000,
    images: [
      new URL("../img/Camiseta Estampada, Hueso, Talla L.jpeg", import.meta.url)
        .href,
      new URL(
        "../img/Camiseta Estampada, Hueso, Talla L..jpeg",
        import.meta.url
      ).href,
    ],
  },
  {
    id: 10,
    name: "Camiseta Estampada Negra",
    color: "Negro",
    size: "L",
    price: 60000,
    images: [
      new URL("../img/Camiseta Estampada, Negro, Talla L.jpeg", import.meta.url)
        .href,
      new URL(
        "../img/Camiseta Estampada, Negro, Talla L..jpeg",
        import.meta.url
      ).href,
    ],
  },
  {
    id: 11,
    name: "Camiseta Estampada Verde Militar",
    color: "Verde Militar",
    size: "L",
    price: 60000,
    images: [
      new URL(
        "../img/Camiseta Estampada, Verde Militar,  Talla L.jpeg",
        import.meta.url
      ).href,
      new URL(
        "../img/Camiseta Estampada, Verde Militar, Talla L..jpeg",
        import.meta.url
      ).href,
    ],
  },
]);

// Camisetas Oversize - 6 camisetas en talla M
const oversizeProducts = ref([
  {
    id: 12,
    name: "Camiseta Oversize Blanca",
    color: "Blanco",
    size: "M",
    price: 70000,
    images: [
      new URL("../img/Overzise-Blanca,Talla M.jpeg", import.meta.url).href,
      new URL("../img/Overzise-Blanco,Talla M..jpeg", import.meta.url).href,
    ],
  },
  {
    id: 13,
    name: "Camiseta Oversize Gris",
    color: "Gris",
    size: "M",
    price: 70000,
    images: [
      new URL("../img/Overzise-Gris,Talla M.jpeg", import.meta.url).href,
      new URL("../img/Overzise-Gris,Talla M..jpeg", import.meta.url).href,
    ],
  },
  {
    id: 14,
    name: "Camiseta Oversize Marrón Claro",
    color: "Marrón Claro",
    size: "M",
    price: 70000,
    images: [
      new URL("../img/Overzise-Marron Claro,Talla M.jpeg", import.meta.url)
        .href,
      new URL("../img/Overzise-Marron Claro,Talla M..jpeg", import.meta.url)
        .href,
    ],
  },
  {
    id: 15,
    name: "Camiseta Oversize Marrón",
    color: "Marrón",
    size: "M",
    price: 70000,
    images: [
      new URL("../img/Overzise-Marron,Talla M.jpeg", import.meta.url).href,
      new URL("../img/Overzise-Marron,Talla M..jpeg", import.meta.url).href,
    ],
  },
  {
    id: 16,
    name: "Camiseta Oversize Negra",
    color: "Negro",
    size: "M",
    price: 70000,
    images: [
      new URL("../img/Overzise-Negra,Talla M.jpeg", import.meta.url).href,
      new URL("../img/Overzise-Negra,Talla M..jpeg", import.meta.url).href,
    ],
  },
  {
    id: 17,
    name: "Camiseta Oversize Negra",
    color: "Negro",
    size: "M",
    price: 70000,
    images: [
      new URL("../img/Overzise-Negro,Talla M.jpeg", import.meta.url).href,
      new URL("../img/Overzise-Negro,Talla M..jpeg", import.meta.url).href,
    ],
  },
]);

// Initialize default sizes and image indices
estampadasProducts.value.forEach((product) => {
  selectedSizes[product.id] = product.size;
  currentImageIndex[product.id] = 0;
});

oversizeProducts.value.forEach((product) => {
  selectedSizes[product.id] = "M";
  currentImageIndex[product.id] = 0;
});

// Toggle between images
const toggleImage = (productId, event) => {
  // Prevenir que se abra el modal cuando se cambia de imagen
  event.stopPropagation();

  const product = [...estampadasProducts.value, ...oversizeProducts.value].find(
    (p) => p.id === productId
  );
  if (product && product.images.length > 1) {
    currentImageIndex[productId] =
      ((currentImageIndex[productId] || 0) + 1) % product.images.length;
  }
};

// Abrir modal de zoom de imagen
const openImageZoom = (product) => {
  imageZoomModal.isOpen = true;
  imageZoomModal.productName = `${product.name} - Talla ${product.size}`;
  imageZoomModal.images = product.images;
  imageZoomModal.currentIndex = currentImageIndex[product.id] || 0;
  imageZoomModal.imageUrl = product.images[imageZoomModal.currentIndex];

  // Prevenir scroll del body cuando el modal está abierto
  document.body.style.overflow = "hidden";
};

// Cerrar modal de zoom
const closeImageZoom = () => {
  imageZoomModal.isOpen = false;
  imageZoomModal.imageUrl = "";
  imageZoomModal.productName = "";
  imageZoomModal.images = [];
  imageZoomModal.currentIndex = 0;

  // Restaurar scroll del body
  document.body.style.overflow = "auto";
};

// Navegar entre imágenes en el modal
const nextImageInModal = () => {
  imageZoomModal.currentIndex =
    (imageZoomModal.currentIndex + 1) % imageZoomModal.images.length;
  imageZoomModal.imageUrl = imageZoomModal.images[imageZoomModal.currentIndex];
};

const prevImageInModal = () => {
  imageZoomModal.currentIndex =
    (imageZoomModal.currentIndex - 1 + imageZoomModal.images.length) %
    imageZoomModal.images.length;
  imageZoomModal.imageUrl = imageZoomModal.images[imageZoomModal.currentIndex];
};

// Filtered products based on size selection
const filteredEstampadasProducts = computed(() => {
  if (selectedEstampadasFilter.value === "all") {
    return estampadasProducts.value;
  }
  return estampadasProducts.value.filter(
    (product) => product.size === selectedEstampadasFilter.value
  );
});

const formatPrice = (price) => {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(price);
};

const handleBuy = (product, type) => {
  const selectedSize = product.size;

  // Crear objeto del producto con la imagen actual
  const productToAdd = {
    ...product,
    image: product.images[currentImageIndex[product.id] || 0],
  };

  cartStore.addToCart(productToAdd, selectedSize);

  // Show success message
  const message = `✓ ${product.name} ${product.color} (Talla ${selectedSize}) agregado al carrito`;
  showNotification(message);
};

const showNotification = (message) => {
  // Create a simple notification
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
</script>

<style scoped>
.catalog-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f5f7fa;
}

/* Header */
.header {
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding: 18px 0;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.15);
}

.header-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo h1 {
  font-size: 1.9rem;
  font-weight: 800;
  color: #ffffff;
  margin: 0;
  letter-spacing: 1.5px;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

/* Categories Menu */
.categories-menu-container {
  position: relative;
}

.categories-button {
  padding: 10px 14px;
  color: #ffffff;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.categories-button:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.3);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.categories-button svg {
  color: #ffffff;
}

.categories-dropdown {
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  min-width: 240px;
  z-index: 1000;
  overflow: hidden;
  animation: slideDown 0.3s ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.category-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 18px;
  color: #2c3e50;
  text-decoration: none;
  transition: all 0.2s ease;
  cursor: pointer;
  border-bottom: 1px solid #f0f0f0;
}

.category-item:last-child {
  border-bottom: none;
}

.category-item:hover {
  background: #f8f9fa;
  color: #1a1a1a;
}

.category-item svg {
  flex-shrink: 0;
  color: #5a6c7d;
}

.category-item:hover svg {
  color: #2c3e50;
}

.category-item span {
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: 0.3px;
}

.cart-button {
  position: relative;
  padding: 10px 14px;
  color: #ffffff;
  text-decoration: none;
  border-radius: 10px;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
}

.cart-button:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.3);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.cart-button svg {
  color: #ffffff;
}

.cart-count {
  position: absolute;
  top: -6px;
  right: -6px;
  background: #e74c3c;
  color: #ffffff;
  font-size: 0.7rem;
  font-weight: 700;
  padding: 3px 7px;
  border-radius: 10px;
  min-width: 20px;
  text-align: center;
  box-shadow: 0 2px 6px rgba(231, 76, 60, 0.4);
  border: 2px solid #1a1a1a;
}

.catalog-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 32px;
  flex: 1;
}

.alert-banner {
  background: #ffffff;
  border: 2px solid #e0e0e0;
  border-left: 5px solid #3498db;
  padding: 20px 28px;
  margin-bottom: 40px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  gap: 18px;
  animation: slideInDown 0.5s ease-out;
}

@keyframes slideInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.alert-icon {
  font-size: 2rem;
  color: #3498db;
}

.alert-content {
  flex: 1;
}

.alert-content strong {
  display: block;
  color: #2c3e50;
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 6px;
  letter-spacing: 0.3px;
}

.alert-content p {
  margin: 0;
  color: #5a6c7d;
  font-size: 0.95rem;
  line-height: 1.5;
  font-weight: 400;
}

.category-section {
  margin-bottom: 70px;
  animation: fadeInUp 0.6s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.category-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 35px;
  flex-wrap: wrap;
  gap: 20px;
  padding-bottom: 18px;
  border-bottom: 2px solid #e0e0e0;
}

.category-title {
  font-size: 2.4rem;
  font-weight: 800;
  color: #2c3e50;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  position: relative;
}

.size-filter {
  display: flex;
  gap: 10px;
  background: #f8f9fa;
  padding: 6px;
  border-radius: 12px;
  border: 1px solid #e0e0e0;
}

.size-filter-btn {
  padding: 9px 20px;
  background: transparent;
  color: #5a6c7d;
  border: 1px solid transparent;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.size-filter-btn:hover {
  background: #ffffff;
  color: #2c3e50;
  border-color: #d0d0d0;
}

.size-filter-btn.active {
  background: #2c3e50;
  color: #ffffff;
  border-color: #2c3e50;
  box-shadow: 0 2px 8px rgba(44, 62, 80, 0.2);
}

.size-info-badge {
  background: #2c3e50;
  color: #ffffff;
  padding: 10px 22px;
  border-radius: 10px;
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 8px rgba(44, 62, 80, 0.15);
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 24px;
  margin-top: 30px;
}

.product-card {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  position: relative;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
  border-color: #d0d0d0;
}

.product-image-container {
  width: 100%;
  height: 280px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
  cursor: zoom-in;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.product-card:hover .product-image {
  transform: scale(1.05);
}

/* Zoom Icon */
.zoom-icon {
  position: absolute;
  top: 10px;
  left: 10px;
  background: rgba(0, 0, 0, 0.6);
  color: #ffffff;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 5;
  pointer-events: none;
}

.product-image-container:hover .zoom-icon {
  opacity: 1;
}

/* Image Indicator Dots */
.image-indicator {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 6px;
  z-index: 10;
  cursor: pointer;
}

.image-indicator .dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  border: 1px solid rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  cursor: pointer;
}

.image-indicator .dot.active {
  background: #ffffff;
  box-shadow: 0 0 8px rgba(255, 255, 255, 0.8);
  transform: scale(1.2);
}

.product-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background: #2c3e50;
  color: #ffffff;
  padding: 5px 12px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.3px;
  box-shadow: 0 2px 6px rgba(44, 62, 80, 0.3);
}

.product-badge.oversize {
  background: #34495e;
}

.product-info {
  padding: 16px;
  text-align: center;
}

.product-name {
  font-size: 1rem;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 8px 0;
  letter-spacing: 0.3px;
  line-height: 1.3;
}

.product-color {
  font-size: 0.85rem;
  font-weight: 500;
  color: #5a6c7d;
  margin: 0 0 4px 0;
  letter-spacing: 0.2px;
}

.product-size-info {
  font-size: 0.85rem;
  font-weight: 500;
  color: #5a6c7d;
  margin: 0 0 10px 0;
  letter-spacing: 0.2px;
}

.product-price {
  font-size: 1.4rem;
  font-weight: 800;
  color: #2c3e50;
  margin: 0 0 14px 0;
  letter-spacing: 0.3px;
}

.size-selector {
  display: none;
}

.size-selector label {
  display: none;
}

.size-select {
  display: none;
}

.buy-button {
  width: 100%;
  padding: 10px 16px;
  background: #2c3e50;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 6px rgba(44, 62, 80, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.buy-button:hover {
  background: #34495e;
  transform: translateY(-1px);
  box-shadow: 0 3px 10px rgba(44, 62, 80, 0.3);
}

.buy-button:active {
  transform: translateY(0);
}

.btn-icon {
  font-size: 0.9rem;
}

@media (max-width: 1024px) {
  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
  }

  .category-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .size-filter {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 768px) {
  .header-content {
    padding: 0 20px;
  }

  .logo h1 {
    font-size: 1.6rem;
  }

  .categories-dropdown {
    min-width: 220px;
  }

  .category-item {
    padding: 12px 16px;
  }

  .category-item span {
    font-size: 0.9rem;
  }

  .catalog-container {
    padding: 30px 20px;
  }

  .alert-banner {
    flex-direction: column;
    padding: 18px;
    text-align: center;
  }

  .alert-icon {
    font-size: 1.8rem;
  }

  .alert-content strong {
    font-size: 1rem;
  }

  .alert-content p {
    font-size: 0.9rem;
  }

  .category-title {
    font-size: 2rem;
  }

  .size-filter {
    flex-wrap: wrap;
  }

  .size-filter-btn {
    padding: 8px 16px;
    font-size: 0.85rem;
  }

  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 18px;
  }

  .product-image-container {
    height: 220px;
  }

  .product-name {
    font-size: 0.9rem;
    min-height: 38px;
  }

  .product-price {
    font-size: 1.2rem;
  }

  .buy-button {
    padding: 9px 14px;
    font-size: 0.75rem;
  }
}

@media (max-width: 480px) {
  .header {
    padding: 14px 0;
  }

  .header-content {
    padding: 0 16px;
  }

  .logo h1 {
    font-size: 1.4rem;
  }

  .cart-button {
    padding: 8px 10px;
  }

  .catalog-container {
    padding: 24px 16px;
  }

  .alert-banner {
    padding: 16px;
    margin-bottom: 28px;
  }

  .alert-icon {
    font-size: 1.6rem;
  }

  .alert-content strong {
    font-size: 0.95rem;
  }

  .alert-content p {
    font-size: 0.85rem;
  }

  .category-header {
    margin-bottom: 28px;
  }

  .category-title {
    font-size: 1.7rem;
    letter-spacing: 1px;
  }

  .size-filter {
    padding: 5px;
    gap: 6px;
  }

  .size-filter-btn {
    padding: 7px 14px;
    font-size: 0.8rem;
  }

  .size-info-badge {
    padding: 8px 18px;
    font-size: 0.85rem;
  }

  .products-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 14px;
  }

  .product-card {
    border-radius: 10px;
  }

  .product-image-container {
    height: 180px;
  }

  .product-info {
    padding: 12px;
  }

  .product-name {
    font-size: 0.85rem;
    min-height: 36px;
  }

  .product-price {
    font-size: 1.1rem;
    margin-bottom: 10px;
  }

  .buy-button {
    padding: 8px 12px;
    font-size: 0.7rem;
  }

  .btn-icon {
    font-size: 0.8rem;
  }
}

/* Footer */
.footer {
  background: #1a1a1a;
  color: #ffffff;
  padding: 40px 24px 24px;
  margin-top: 60px;
}

.footer-content {
  max-width: 1400px;
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
  max-width: 1400px;
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

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: 24px;
  }
}

/* ========================================
   MODAL DE ZOOM DE IMAGEN
   ======================================== */

/* Modal Overlay */
.image-zoom-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  padding: 20px;
}

/* Modal Content Container */
.modal-content {
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  background: #ffffff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
}

/* Modal Header */
.modal-header {
  padding: 20px 24px;
  background: #2c3e50;
  color: #ffffff;
  text-align: center;
  border-bottom: 2px solid #34495e;
}

.modal-header h3 {
  margin: 0;
  font-size: 1.3rem;
  font-weight: 700;
  letter-spacing: 0.5px;
}

/* Modal Close Button */
.modal-close {
  position: absolute;
  top: 15px;
  right: 15px;
  background: rgba(255, 255, 255, 0.2);
  color: #ffffff;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 1.8rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 10;
  line-height: 1;
  padding: 0;
}

.modal-close:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: rotate(90deg);
}

/* Modal Body */
.modal-body {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f9fa;
  flex: 1;
  min-height: 400px;
  max-height: calc(90vh - 140px);
}

/* Modal Image */
.modal-image {
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  object-fit: contain;
  display: block;
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
}

/* Navigation Buttons */
.modal-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(44, 62, 80, 0.8);
  color: #ffffff;
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  font-size: 2.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 10;
  line-height: 1;
  padding: 0;
}

.modal-nav:hover {
  background: rgba(44, 62, 80, 1);
  transform: translateY(-50%) scale(1.1);
}

.modal-prev {
  left: 20px;
}

.modal-next {
  right: 20px;
}

/* Modal Footer */
.modal-footer {
  padding: 16px;
  background: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #e5e7eb;
}

/* Modal Indicators */
.modal-indicators {
  display: flex;
  gap: 10px;
}

.modal-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #d1d5db;
  transition: all 0.3s ease;
  cursor: pointer;
}

.modal-dot.active {
  background: #2c3e50;
  transform: scale(1.3);
}

/* Modal Fade Transition */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active .modal-content,
.modal-fade-leave-active .modal-content {
  transition: transform 0.3s ease;
}

.modal-fade-enter-from .modal-content {
  transform: scale(0.9);
}

.modal-fade-leave-to .modal-content {
  transform: scale(0.9);
}

/* Responsive Modal */
@media (max-width: 768px) {
  .modal-content {
    max-width: 95vw;
    max-height: 95vh;
  }

  .modal-header h3 {
    font-size: 1.1rem;
  }

  .modal-nav {
    width: 40px;
    height: 40px;
    font-size: 2rem;
  }

  .modal-prev {
    left: 10px;
  }

  .modal-next {
    right: 10px;
  }

  .modal-close {
    width: 35px;
    height: 35px;
    font-size: 1.5rem;
  }
}
</style>

<style>
/* Global notification styles */
.cart-notification {
  position: fixed;
  top: 100px;
  right: 30px;
  background: #2c3e50;
  color: #ffffff;
  padding: 18px 28px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(44, 62, 80, 0.3);
  font-weight: 700;
  font-size: 1rem;
  z-index: 10000;
  transform: translateX(500px);
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border: 1px solid rgba(255, 255, 255, 0.1);
  letter-spacing: 0.3px;
  max-width: 380px;
}

.cart-notification.show {
  transform: translateX(0);
}

@media (max-width: 768px) {
  .cart-notification {
    right: 20px;
    left: 20px;
    max-width: none;
    padding: 16px 22px;
    font-size: 0.95rem;
  }
}

@media (max-width: 480px) {
  .cart-notification {
    top: 80px;
    right: 16px;
    left: 16px;
    padding: 14px 18px;
    font-size: 0.9rem;
  }
}
</style>
