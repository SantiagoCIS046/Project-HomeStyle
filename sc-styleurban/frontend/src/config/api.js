// Configuración de la API
// Detecta automáticamente si está en desarrollo o producción

const isDevelopment = import.meta.env.DEV;
const isProduction = import.meta.env.PROD;

// URL base de la API
export const API_BASE_URL = isDevelopment
  ? "http://localhost:3000/api" // Desarrollo local
  : "/api"; // Producción (Vercel)

// URL para pedidos (JSON Server en desarrollo, API en producción)
export const ORDERS_API_URL = isDevelopment
  ? "http://localhost:3001" // JSON Server en desarrollo
  : "/api"; // API de Vercel en producción

// Configuración de endpoints
export const API_ENDPOINTS = {
  // Pedidos
  orders: `${ORDERS_API_URL}/orders`,

  // Pagos Nequi
  nequi: {
    create: `${API_BASE_URL}/pagos/nequi/crear`,
    status: `${API_BASE_URL}/pagos/nequi/estado`,
  },

  // Pagos Wompi
  wompi: {
    tokenize: `${API_BASE_URL}/pagos/wompi/tokenizar`,
    create: `${API_BASE_URL}/pagos/wompi/crear`,
    status: `${API_BASE_URL}/pagos/wompi/estado`,
  },
};

// Exportar configuración
export default {
  API_BASE_URL,
  ORDERS_API_URL,
  API_ENDPOINTS,
  isDevelopment,
  isProduction,
};
