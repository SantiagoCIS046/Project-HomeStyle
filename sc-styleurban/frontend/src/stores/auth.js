import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { authService } from '../services/authService';

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref(null);
  const isLoading = ref(false);

  // Getters
  const isAuthenticated = computed(() => user.value !== null);
  const userName = computed(() => user.value?.name || '');
  const userEmail = computed(() => user.value?.email || '');

  // Actions
  const initAuth = () => {
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      user.value = currentUser;
    }
  };

  const login = async (email, password) => {
    isLoading.value = true;
    try {
      const userData = authService.login(email, password);
      user.value = userData;
      return userData;
    } catch (error) {
      throw error;
    } finally {
      isLoading.value = false;
    }
  };

  const register = async (userData) => {
    isLoading.value = true;
    try {
      const newUser = authService.register(userData);
      user.value = newUser;
      return newUser;
    } catch (error) {
      throw error;
    } finally {
      isLoading.value = false;
    }
  };

  const logout = () => {
    authService.logout();
    user.value = null;
  };

  const updateProfile = async (userData) => {
    isLoading.value = true;
    try {
      const updatedUser = authService.updateProfile(userData);
      user.value = updatedUser;
      return updatedUser;
    } catch (error) {
      throw error;
    } finally {
      isLoading.value = false;
    }
  };

  const getUserOrders = () => {
    return authService.getUserOrders();
  };

  const addOrder = (orderData) => {
    authService.addOrderToUser(orderData);
  };

  // Initialize on store creation
  initAuth();

  return {
    // State
    user,
    isLoading,
    // Getters
    isAuthenticated,
    userName,
    userEmail,
    // Actions
    login,
    register,
    logout,
    updateProfile,
    getUserOrders,
    addOrder,
    initAuth
  };
});

