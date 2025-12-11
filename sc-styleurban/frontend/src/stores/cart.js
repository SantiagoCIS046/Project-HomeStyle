import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useCartStore = defineStore("cart", () => {
  // State
  const items = ref([]);
  const isCartOpen = ref(false);

  // Getters
  const itemCount = computed(() => {
    return items.value.reduce((total, item) => total + item.quantity, 0);
  });

  const totalPrice = computed(() => {
    return items.value.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  });

  // Tax calculations (IVA 19%, INC/ICO 8%)
  const IVA_RATE = 0.19;
  const ICO_RATE = 0.08;

  // Base price before taxes (price includes all taxes)
  const taxBase = computed(() => {
    const total = totalPrice.value;
    // Total = Base + IVA + ICO = Base * (1 + 0.19 + 0.08) = Base * 1.27
    return Math.round(total / 1.27);
  });

  // IVA amount (19% of base)
  const ivaAmount = computed(() => {
    return Math.round(taxBase.value * IVA_RATE);
  });

  // INC/ICO amount (8% of base)
  const icoAmount = computed(() => {
    return Math.round(taxBase.value * ICO_RATE);
  });

  const cartItems = computed(() => items.value);

  // Actions
  function addToCart(product, size) {
    const existingItem = items.value.find(
      (item) => item.id === product.id && item.size === size
    );

    if (existingItem) {
      existingItem.quantity++;
    } else {
      items.value.push({
        id: product.id,
        name: product.name,
        price: product.price,
        size: size,
        image: product.image,
        quantity: 1,
      });
    }

    // Save to localStorage
    saveToLocalStorage();
  }

  function removeFromCart(itemId, size) {
    const index = items.value.findIndex(
      (item) => item.id === itemId && item.size === size
    );

    if (index > -1) {
      items.value.splice(index, 1);
      saveToLocalStorage();
    }
  }

  function updateQuantity(itemId, size, quantity) {
    const item = items.value.find(
      (item) => item.id === itemId && item.size === size
    );

    if (item) {
      if (quantity <= 0) {
        removeFromCart(itemId, size);
      } else {
        item.quantity = quantity;
        saveToLocalStorage();
      }
    }
  }

  function clearCart() {
    items.value = [];
    saveToLocalStorage();
  }

  function toggleCart() {
    isCartOpen.value = !isCartOpen.value;
  }

  function openCart() {
    isCartOpen.value = true;
  }

  function closeCart() {
    isCartOpen.value = false;
  }

  function saveToLocalStorage() {
    localStorage.setItem("sc-styleurban-cart", JSON.stringify(items.value));
  }

  function loadFromLocalStorage() {
    const saved = localStorage.getItem("sc-styleurban-cart");
    if (saved) {
      items.value = JSON.parse(saved);
    }
  }

  // Load cart on initialization
  loadFromLocalStorage();

  return {
    items,
    isCartOpen,
    itemCount,
    totalPrice,
    taxBase,
    ivaAmount,
    icoAmount,
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleCart,
    openCart,
    closeCart,
  };
});
