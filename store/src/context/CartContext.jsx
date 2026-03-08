import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext(null);

export const useCart = () => useContext(CartContext);

// Helper: add N business days to a date (skip weekends)
export function addBusinessDays(date, days) {
    const result = new Date(date);
    let added = 0;
    while (added < days) {
        result.setDate(result.getDate() + 1);
        const day = result.getDay();
        if (day !== 0 && day !== 6) added++;
    }
    return result;
}

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [lastOrder, setLastOrder] = useState(null);

    // Adds a product to the cart. If it already exists, increments quantity.
    const addToCart = (product) => {
        setCartItems(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    // Removes a product from the cart by id.
    const removeFromCart = (productId) => {
        setCartItems(prev => prev.filter(item => item.id !== productId));
    };

    // Updates the quantity of a product. Removes the item if quantity reaches 0.
    const updateQuantity = (productId, delta) => {
        setCartItems(prev =>
            prev
                .map(item =>
                    item.id === productId
                        ? { ...item, quantity: item.quantity + delta }
                        : item
                )
                .filter(item => item.quantity > 0)
        );
    };

    // Total number of individual items in cart
    const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    // Place the order: save lastOrder snapshot and clear cart
    const placeOrder = (customerName) => {
        const orderDate = new Date();
        const orderId = `HS-${Date.now().toString(36).toUpperCase()}`;
        const snapshot = {
            orderId,
            customerName,
            items: cartItems,
            total: cartItems.reduce((s, i) => s + i.price * i.quantity, 0),
            date: orderDate.toISOString(),
            // Estimated milestone dates
            dates: {
                revisado: orderDate,
                empacado: addBusinessDays(orderDate, 1),
                enviado: addBusinessDays(orderDate, 2),
                entregado: addBusinessDays(orderDate, 5),
            },
        };
        setLastOrder(snapshot);
        setCartItems([]);
        return snapshot;
    };

    // Clear all items from the cart (kept for backward compat)
    const clearCart = () => setCartItems([]);

    return (
        <CartContext.Provider value={{
            cartItems, addToCart, removeFromCart,
            updateQuantity, cartCount, clearCart,
            placeOrder, lastOrder,
        }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartContext;
