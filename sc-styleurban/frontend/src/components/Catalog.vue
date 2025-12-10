<template>
  <div class="catalog-container">
    <!-- Alert Banner -->
    <div class="alert-banner">
      <p>
        ℹ️ <strong>Información importante:</strong> Las camisetas estampadas
        están disponibles en tallas S, M y L. Las camisetas Oversize solo están
        disponibles en talla M.
      </p>
    </div>

    <!-- Camisetas Estampadas Section -->
    <section class="category-section">
      <h2 class="category-title">Camisetas Estampadas</h2>
      <p class="category-subtitle">Tallas disponibles: S, M, L</p>

      <div class="products-grid">
        <div
          v-for="product in estampadasProducts"
          :key="product.id"
          class="product-card"
        >
          <div class="product-image-container">
            <img
              :src="product.image"
              :alt="product.name"
              class="product-image"
            />
          </div>
          <div class="product-info">
            <h3 class="product-name">{{ product.name }}</h3>
            <p class="product-price">{{ formatPrice(product.price) }}</p>
            <div class="size-selector">
              <label>Talla:</label>
              <select v-model="selectedSizes[product.id]" class="size-select">
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
              </select>
            </div>
            <button class="buy-button" @click="handleBuy(product, 'estampada')">
              Agregar al Carrito
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Camisetas Oversize Section -->
    <section class="category-section">
      <h2 class="category-title">Camisetas Oversize</h2>
      <p class="category-subtitle">Talla disponible: M</p>

      <div class="products-grid">
        <div
          v-for="product in oversizeProducts"
          :key="product.id"
          class="product-card"
        >
          <div class="product-image-container">
            <img
              :src="product.image"
              :alt="product.name"
              class="product-image"
            />
          </div>
          <div class="product-info">
            <h3 class="product-name">{{ product.name }}</h3>
            <p class="product-price">{{ formatPrice(product.price) }}</p>
            <div class="size-selector">
              <label>Talla:</label>
              <select
                v-model="selectedSizes[product.id]"
                class="size-select"
                disabled
              >
                <option value="M">M</option>
              </select>
            </div>
            <button class="buy-button" @click="handleBuy(product, 'oversize')">
              Agregar al Carrito
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useCartStore } from "../stores/cart";

const cartStore = useCartStore();

// Selected sizes for each product
const selectedSizes = reactive({});

// Camisetas Estampadas - 4 camisetas por talla (S, M, L)
const estampadasProducts = ref([
  {
    id: 1,
    name: "Estampada Classic S",
    size: "S",
    price: 55000,
    image: "/camiseta.png",
  },
  {
    id: 2,
    name: "Estampada Urban S",
    size: "S",
    price: 55000,
    image: "/camiseta.png",
  },
  {
    id: 3,
    name: "Estampada Style S",
    size: "S",
    price: 55000,
    image: "/camiseta.png",
  },
  {
    id: 4,
    name: "Estampada Modern S",
    size: "S",
    price: 55000,
    image: "/camiseta.png",
  },

  {
    id: 5,
    name: "Estampada Classic M",
    size: "M",
    price: 55000,
    image: "/camiseta.png",
  },
  {
    id: 6,
    name: "Estampada Urban M",
    size: "M",
    price: 55000,
    image: "/camiseta.png",
  },
  {
    id: 7,
    name: "Estampada Style M",
    size: "M",
    price: 55000,
    image: "/camiseta.png",
  },
  {
    id: 8,
    name: "Estampada Modern M",
    size: "M",
    price: 55000,
    image: "/camiseta.png",
  },

  {
    id: 9,
    name: "Estampada Classic L",
    size: "L",
    price: 55000,
    image: "/camiseta.png",
  },
  {
    id: 10,
    name: "Estampada Urban L",
    size: "L",
    price: 55000,
    image: "/camiseta.png",
  },
  {
    id: 11,
    name: "Estampada Style L",
    size: "L",
    price: 55000,
    image: "/camiseta.png",
  },
  {
    id: 12,
    name: "Estampada Modern L",
    size: "L",
    price: 55000,
    image: "/camiseta.png",
  },
]);

// Camisetas Oversize - 6 camisetas en talla M
const oversizeProducts = ref([
  {
    id: 13,
    name: "Oversize Essential",
    size: "M",
    price: 70000,
    image: "/camiseta.png",
  },
  {
    id: 14,
    name: "Oversize Premium",
    size: "M",
    price: 70000,
    image: "/camiseta.png",
  },
  {
    id: 15,
    name: "Oversize Deluxe",
    size: "M",
    price: 70000,
    image: "/camiseta.png",
  },
  {
    id: 16,
    name: "Oversize Elite",
    size: "M",
    price: 70000,
    image: "/camiseta.png",
  },
  {
    id: 17,
    name: "Oversize Signature",
    size: "M",
    price: 70000,
    image: "/camiseta.png",
  },
  {
    id: 18,
    name: "Oversize Limited",
    size: "M",
    price: 70000,
    image: "/camiseta.png",
  },
]);

// Initialize default sizes
estampadasProducts.value.forEach((product) => {
  selectedSizes[product.id] = product.size;
});

oversizeProducts.value.forEach((product) => {
  selectedSizes[product.id] = "M";
});

const formatPrice = (price) => {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(price);
};

const handleBuy = (product, type) => {
  const selectedSize = selectedSizes[product.id];

  if (!selectedSize) {
    alert("Por favor selecciona una talla");
    return;
  }

  cartStore.addToCart(product, selectedSize);

  // Show success message
  const message = `✓ ${product.name} (Talla ${selectedSize}) agregado al carrito`;
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
  }, 2000);
};
</script>

<style scoped>
.catalog-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
}

.alert-banner {
  background: linear-gradient(135deg, #2c2c2c 0%, #1a1a1a 100%);
  border-left: 4px solid #4a90e2;
  padding: 16px 24px;
  margin-bottom: 40px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.alert-banner p {
  margin: 0;
  color: #ffffff;
  font-size: 14px;
  line-height: 1.6;
}

.alert-banner strong {
  color: #4a90e2;
}

.category-section {
  margin-bottom: 60px;
}

.category-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 2px;
  position: relative;
  display: inline-block;
}

.category-title::after {
  content: "";
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, #4a90e2 0%, #2c2c2c 100%);
}

.category-subtitle {
  color: #666;
  font-size: 1rem;
  margin-bottom: 30px;
  font-style: italic;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
  margin-top: 30px;
}

.product-card {
  background: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.product-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  border-color: #4a90e2;
}

.product-image-container {
  width: 100%;
  height: 280px;
  background: linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.product-card:hover .product-image {
  transform: scale(1.05);
}

.product-info {
  padding: 20px;
  text-align: center;
}

.product-name {
  font-size: 1.1rem;
  font-weight: 600;
  color: #2c2c2c;
  margin: 0 0 12px 0;
  min-height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.product-price {
  font-size: 1.4rem;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 12px 0;
}

.size-selector {
  margin-bottom: 16px;
  text-align: left;
}

.size-selector label {
  display: block;
  font-size: 0.9rem;
  font-weight: 600;
  color: #666;
  margin-bottom: 6px;
}

.size-select {
  width: 100%;
  padding: 10px;
  border: 2px solid #e0e0e0;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  background: #ffffff;
  cursor: pointer;
  transition: all 0.3s ease;
}

.size-select:hover:not(:disabled) {
  border-color: #4a90e2;
}

.size-select:focus {
  outline: none;
  border-color: #4a90e2;
  box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
}

.size-select:disabled {
  background: #f5f5f5;
  cursor: not-allowed;
  opacity: 0.7;
}

.buy-button {
  width: 100%;
  padding: 12px 24px;
  background: linear-gradient(135deg, #2c2c2c 0%, #1a1a1a 100%);
  color: #ffffff;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.buy-button:hover {
  background: linear-gradient(135deg, #4a90e2 0%, #357abd 100%);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(74, 144, 226, 0.3);
}

.buy-button:active {
  transform: translateY(0);
}

@media (max-width: 768px) {
  .category-title {
    font-size: 2rem;
  }

  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 20px;
  }

  .product-image-container {
    height: 220px;
  }
}

@media (max-width: 480px) {
  .products-grid {
    grid-template-columns: 1fr;
  }

  .alert-banner {
    padding: 12px 16px;
  }

  .alert-banner p {
    font-size: 13px;
  }
}
</style>

<style>
/* Global notification styles */
.cart-notification {
  position: fixed;
  top: 100px;
  right: 20px;
  background: linear-gradient(135deg, #27ae60 0%, #229954 100%);
  color: #ffffff;
  padding: 16px 24px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  font-weight: 600;
  z-index: 10000;
  transform: translateX(400px);
  transition: transform 0.3s ease;
}

.cart-notification.show {
  transform: translateX(0);
}
</style>
