import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PATH = path.join(__dirname, '..', 'db.json');

/**
 * Leer base de datos
 */
async function leerDB() {
  try {
    const data = await fs.readFile(DB_PATH, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    // Si no existe, crear estructura inicial
    const dbInicial = { orders: [], transactions: [] };
    await fs.writeFile(DB_PATH, JSON.stringify(dbInicial, null, 2));
    return dbInicial;
  }
}

/**
 * Escribir en base de datos
 */
async function escribirDB(data) {
  await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
}

/**
 * Guardar pedido
 */
export async function guardarPedido(pedido) {
  const db = await leerDB();
  
  const nuevoPedido = {
    id: Date.now().toString(),
    ...pedido,
    fechaCreacion: pedido.fechaCreacion || new Date().toISOString()
  };

  db.orders.push(nuevoPedido);
  
  // Guardar también en transactions para tracking
  db.transactions.push({
    id: Date.now().toString(),
    transaccionId: pedido.transaccionId,
    pedidoId: pedido.pedidoId,
    monto: pedido.monto,
    estado: pedido.estado,
    metodoPago: pedido.metodoPago,
    fecha: nuevoPedido.fechaCreacion
  });

  await escribirDB(db);
  
  return nuevoPedido;
}

/**
 * Obtener pedido
 */
export async function obtenerPedido(filtro) {
  const db = await leerDB();
  
  if (filtro.pedidoId) {
    return db.orders.find(p => p.pedidoId === filtro.pedidoId);
  }
  
  if (filtro.transaccionId) {
    return db.orders.find(p => p.transaccionId === filtro.transaccionId);
  }
  
  if (filtro.reference) {
    return db.orders.find(p => p.reference === filtro.reference);
  }
  
  return null;
}

/**
 * Obtener todos los pedidos
 */
export async function obtenerTodosPedidos() {
  const db = await leerDB();
  return db.orders;
}

/**
 * Actualizar estado del pedido
 */
export async function actualizarEstadoPedido(pedidoId, actualizacion) {
  const db = await leerDB();
  
  const index = db.orders.findIndex(p => p.pedidoId === pedidoId);
  
  if (index === -1) {
    throw new Error('Pedido no encontrado');
  }
  
  db.orders[index] = {
    ...db.orders[index],
    ...actualizacion,
    fechaActualizacion: new Date().toISOString()
  };
  
  // Actualizar también en transactions
  const transIndex = db.transactions.findIndex(t => t.pedidoId === pedidoId);
  if (transIndex !== -1) {
    db.transactions[transIndex].estado = actualizacion.estado;
  }
  
  await escribirDB(db);
  
  return db.orders[index];
}

/**
 * Eliminar pedido (solo para testing)
 */
export async function eliminarPedido(pedidoId) {
  const db = await leerDB();
  
  db.orders = db.orders.filter(p => p.pedidoId !== pedidoId);
  db.transactions = db.transactions.filter(t => t.pedidoId !== pedidoId);
  
  await escribirDB(db);
}

