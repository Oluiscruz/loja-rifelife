import { createContext, useEffect, useState } from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "rife-life-cart";

function readCart() {
    try {
        const storedCart = localStorage.getItem(STORAGE_KEY);
        return storedCart ? JSON.parse(storedCart) : [];
    } catch {
        return [];
    }
}

export function CartProvider({ children }) {
    const [items, setItems] = useState(readCart);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }, [items]);

    function addItem(product, quantity = 1) {
        const safeQuantity = Math.max(1, Number(quantity) || 1);

        setItems((currentItems) => {
            const existingItem = currentItems.find((item) => item.id === product.id);

            if (existingItem) {
                return currentItems.map((item) => (
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + safeQuantity }
                        : item
                ));
            }

            return [...currentItems, { ...product, quantity: safeQuantity }];
        });
    }

    function updateQuantity(id, quantity) {
        const safeQuantity = Number(quantity);

        if (!Number.isFinite(safeQuantity) || safeQuantity < 1) {
            removeItem(id);
            return;
        }

        setItems((currentItems) => currentItems.map((item) => (
            item.id === id ? { ...item, quantity: Math.floor(safeQuantity) } : item
        )));
    }

    function removeItem(id) {
        setItems((currentItems) => currentItems.filter((item) => item.id !== id));
    }

    const itemCount = items.reduce((total, item) => total + item.quantity, 0);
    return <CartContext.Provider value={{ items, itemCount, addItem, updateQuantity, removeItem }}>{children}</CartContext.Provider>;
}

export { CartContext };
