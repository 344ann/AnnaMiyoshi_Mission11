import { createContext, ReactNode, useContext, useState } from 'react';
import { CartItem } from '../types/CartItem';

//setting up interface when we built the interface for the repository pattern
// Defining the shape of the cart context using an interface
// This ensures that any component consuming the context gets the correct structure
interface CartContextType {
  cart: CartItem[]; // Array of items in the cart
  addToCart: (item: CartItem) => void; // Function to add an item to the cart
  removeFromCart: (bookID: number) => void; // Function to remove an item from the cart by bookID
  clearCart: () => void; // Function to clear the entire cart
}

// Creating a context with an undefined default value
const CartContext = createContext<CartContextType | undefined>(undefined);

// CartProvider is a wrapper component that provides cart-related state and functions to its children
//children = all elements/routes inside CartProvider in App.tsx
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]); // State to store the cart items

  // Function to add an item to the cart
  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((c) => c.bookID === item.bookID); // Check if the item already exists in the cart
      const updatedCart = prevCart.map(
        (c) =>
          c.bookID === item.bookID
            ? { ...c, quantity: c.quantity + item.quantity } // If item exists, update the quantity
            : c
        //not adding as a new item but update the price
      );

      return existingItem ? updatedCart : [...prevCart, item];
      //if the item already existed in the cart, updateCart, otherwise, add the item to the preveous cart
      // If the item already exists, return the updated cart; otherwise, add the new item to the cart
    });
    //spread operator = add to the array containing the previous cart and new item that is being passed into
  };

  // Function to remove an item from the cart
  const removeFromCart = (bookID: number) => {
    setCart((prevCart) => prevCart.filter((c) => c.bookID !== bookID));
    //filter by going through each row, checking if it is not the same one as an item that I want to remove (the item passed in) = all items except the passed one, and putting that into set cart
    // Filter through the cart, removing the item with the specified bookID
  };

  // Function to clear all items from the cart
  const clearCart = () => {
    setCart(() => []);
    //wihtout receiving anything and make it empty array
    // Reset the cart to an empty array
  };

  return (
    // Providing the cart state and functions to all children components
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the cart context
export const useCart = () => {
  const context = useContext(CartContext); // create like a instance of CartContext using react hook when it is called, Access the CartContext

  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
    // Ensures that useCart is used only inside a CartProvider
  }
  return context;
};
