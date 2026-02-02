# 📊 Cálculo de Impuestos - StyleUrban

## Cómo Funciona el Cálculo

El sistema calcula automáticamente los impuestos incluidos en el precio de las camisetas.

### Precios de Productos

- **Camiseta Estampada**: $60.000 COP
- **Camiseta Oversize**: $70.000 COP

### Fórmula de Cálculo

El precio total **YA INCLUYE** los impuestos. El sistema desglosa:

```
Total = Subtotal + IVA + INC
Total = Subtotal × (1 + 0.19 + 0.08)
Total = Subtotal × 1.27

Por lo tanto:
Subtotal (Base) = Total ÷ 1.27
IVA (19%) = Subtotal × 0.19
INC (8%) = Subtotal × 0.08
```

### Ejemplos Prácticos

#### Ejemplo 1: 1 Camiseta Estampada ($60.000)

```
Total = $60.000
Subtotal (Base) = $60.000 ÷ 1.27 = $47.244
IVA (19%) = $47.244 × 0.19 = $8.976
INC (8%) = $47.244 × 0.08 = $3.780
Total = $47.244 + $8.976 + $3.780 = $60.000 ✓
```

#### Ejemplo 2: 1 Camiseta Oversize ($70.000)

```
Total = $70.000
Subtotal (Base) = $70.000 ÷ 1.27 = $55.118
IVA (19%) = $55.118 × 0.19 = $10.472
INC (8%) = $55.118 × 0.08 = $4.410
Total = $55.118 + $10.472 + $4.410 = $70.000 ✓
```

#### Ejemplo 3: 2 Camisetas Estampadas ($120.000)

```
Total = $60.000 × 2 = $120.000
Subtotal (Base) = $120.000 ÷ 1.27 = $94.488
IVA (19%) = $94.488 × 0.19 = $17.953
INC (8%) = $94.488 × 0.08 = $7.559
Total = $94.488 + $17.953 + $7.559 = $120.000 ✓
```

#### Ejemplo 4: 1 Estampada + 1 Oversize ($130.000)

```
Total = $60.000 + $70.000 = $130.000
Subtotal (Base) = $130.000 ÷ 1.27 = $102.362
IVA (19%) = $102.362 × 0.19 = $19.449
INC (8%) = $102.362 × 0.08 = $8.189
Total = $102.362 + $19.449 + $8.189 = $130.000 ✓
```

## Resumen de Compra

El componente `Payment.vue` muestra:

1. **Pedido #**: Número único del pedido
2. **Cliente**: Nombre del cliente
3. **Productos**: Lista de productos con cantidades
4. **Subtotal (Base)**: Precio sin impuestos
5. **IVA (19%)**: Impuesto al Valor Agregado
6. **INC (8%)**: Impuesto Nacional al Consumo
7. **Total a Pagar**: Suma de Subtotal + IVA + INC

## Importante

✅ El **Total a Pagar** siempre será igual al precio de las camisetas  
✅ Los impuestos están **incluidos** en el precio  
✅ El cálculo se hace en **tiempo real** al agregar/quitar productos  
✅ Los valores se redondean al peso más cercano

## Implementación Técnica

El cálculo se realiza con computed properties en Vue 3:

```javascript
const total = computed(() => {
  return cartStore.cartItems.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);
});

const subtotal = computed(() => {
  return Math.round(total.value / 1.27);
});

const iva = computed(() => {
  return Math.round(subtotal.value * 0.19);
});

const inc = computed(() => {
  return Math.round(subtotal.value * 0.08);
});
```

Esto garantiza que los valores se actualicen automáticamente cuando cambia el carrito.
