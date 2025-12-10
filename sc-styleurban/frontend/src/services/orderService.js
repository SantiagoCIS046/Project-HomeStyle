import { ORDERS_API_URL } from "../config/api.js";

const API_URL = ORDERS_API_URL;

export const orderService = {
  async createOrder(orderData) {
    try {
      const response = await fetch(`${API_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error("Error al crear el pedido");
      }

      return await response.json();
    } catch (error) {
      console.error("Error creating order:", error);
      throw error;
    }
  },

  async getOrders() {
    try {
      const response = await fetch(`${API_URL}/orders`);

      if (!response.ok) {
        throw new Error("Error al obtener los pedidos");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching orders:", error);
      throw error;
    }
  },

  async getOrderById(id) {
    try {
      const response = await fetch(`${API_URL}/orders/${id}`);

      if (!response.ok) {
        throw new Error("Error al obtener el pedido");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching order:", error);
      throw error;
    }
  },

  async updateOrderStatus(id, status) {
    try {
      const response = await fetch(`${API_URL}/orders/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error("Error al actualizar el estado del pedido");
      }

      return await response.json();
    } catch (error) {
      console.error("Error updating order status:", error);
      throw error;
    }
  },

  generateOrderNumber() {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `SCU-${timestamp}-${random}`;
  },
};
