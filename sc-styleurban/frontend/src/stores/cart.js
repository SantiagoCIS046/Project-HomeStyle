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
    localStorage.setItem("sc-homestyle-cart", JSON.stringify(items.value));
  }

  function loadFromLocalStorage() {
    const saved = localStorage.getItem("sc-homestyle-cart");
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
