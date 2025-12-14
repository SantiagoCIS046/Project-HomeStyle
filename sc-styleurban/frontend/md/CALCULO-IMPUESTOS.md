# 📊 Cálculo de Impuestos - StyleUrban

## Cómo Funciona el Cálculo

El sistema calcula automáticamente los impuestos incluidos en el precio de las camisetas.

### Precios de Productos

- **Camiseta Estampada**: $55.000 COP
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

#### Ejemplo 1: 1 Camiseta Estampada ($55.000)

```
Total = $55.000
Subtotal (Base) = $55.000 ÷ 1.27 = $43.307
IVA (19%) = $43.307 × 0.19 = $8.228
INC (8%) = $43.307 × 0.08 = $3.465
Total = $43.307 + $8.228 + $3.465 = $55.000 ✓
```

#### Ejemplo 2: 1 Camiseta Oversize ($70.000)

```
Total = $70.000
Subtotal (Base) = $70.000 ÷ 1.27 = $55.118
IVA (19%) = $55.118 × 0.19 = $10.472
INC (8%) = $55.118 × 0.08 = $4.410
Total = $55.118 + $10.472 + $4.410 = $70.000 ✓
```

#### Ejemplo 3: 2 Camisetas Estampadas ($110.000)

```
Total = $55.000 × 2 = $110.000
Subtotal (Base) = $110.000 ÷ 1.27 = $86.614
IVA (19%) = $86.614 × 0.19 = $16.457
INC (8%) = $86.614 × 0.08 = $6.929
Total = $86.614 + $16.457 + $6.929 = $110.000 ✓
```

#### Ejemplo 4: 1 Estampada + 1 Oversize ($125.000)

```
Total = $55.000 + $70.000 = $125.000
Subtotal (Base) = $125.000 ÷ 1.27 = $98.425
IVA (19%) = $98.425 × 0.19 = $18.701
INC (8%) = $98.425 × 0.08 = $7.874
Total = $98.425 + $18.701 + $7.874 = $125.000 ✓
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

