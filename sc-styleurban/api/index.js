import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Importar rutas del backend
import nequiRoutes from "../sc-styleurban/backend/routes/nequi.routes.js";
import wompiRoutes from "../sc-styleurban/backend/routes/wompi.routes.js";
import ordersRoutes from "../sc-styleurban/backend/routes/orders.routes.js";
import jsonOrdersRoutes from "../sc-styleurban/backend/routes/json-orders.routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cargar variables de entorno
dotenv.config({ path: path.join(__dirname, "../.env") });

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Ruta raíz de la API
app.get("/api", (req, res) => {
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

// Rutas de órdenes (compatible con JSON Server)
app.use("/api", jsonOrdersRoutes);

// Manejo de errores
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({
    error: "Error interno del servidor",
    message: err.message,
  });
});

// Exportar para Vercel Serverless
export default app;
