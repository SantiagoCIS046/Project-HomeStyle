import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import nequiRoutes from "./routes/nequi.routes.js";
import wompiRoutes from "./routes/wompi.routes.js";
import ordersRoutes from "./routes/orders.routes.js";
import jsonOrdersRoutes from "./routes/json-orders.routes.js";

// Cargar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Rutas
app.get("/", (req, res) => {
  res.json({
    message: "SC StyleUrban API - Sistema de Pagos",
    version: "1.0.0",
    endpoints: {
      nequi: "/api/pagos/nequi",
      wompi: "/api/pagos/wompi",
      orders: "/api/pedidos",
    },
  });
});

// Rutas de pagos
app.use("/api/pagos/nequi", nequiRoutes);
app.use("/api/pagos/wompi", wompiRoutes);
app.use("/api/pedidos", ordersRoutes);

// Rutas de órdenes (compatible con JSON Server para desarrollo)
app.use("/", jsonOrdersRoutes);

// Manejo de errores
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({
    error: "Error interno del servidor",
    message: err.message,
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`\n🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📱 Nequi API: /api/pagos/nequi`);
  console.log(`💳 Wompi API: /api/pagos/wompi`);
  console.log(`📦 Pedidos API: /api/pedidos\n`);
});

export default app;
