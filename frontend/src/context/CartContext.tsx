import { createContext, ReactNode, useContext, useState } from 'react';
import { CartItem } from '../types/CartItem';

//setting up interface when we built the interface for the repository pattern
interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (bookID: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

//children = all elements/routes inside CartProvider in App.tsx
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((c) => c.bookID === item.bookID);
      const updatedCart = prevCart.map(
        (c) =>
          c.bookID === item.bookID
            ? { ...c, quantity: c.quantity + item.quantity }
            : c
        //not adding as a new item but update the price
      );

      return existingItem ? updatedCart : [...prevCart, item];
      //if the item already existed in the cart, updateCart, otherwise, add the item to the preveous cart
    });
    //spread operator = add to the array containing the previous cart and new item that is being passed into
  };

  const removeFromCart = (bookID: number) => {
    setCart((prevCart) => prevCart.filter((c) => c.bookID !== bookID));
    //filter by going through each row, checking if it is not the same one as an item that I want to remove (the item passed in) = all items except the passed one, and putting that into set cart
  };

  const clearCart = () => {
    setCart(() => []);
    //wihtout receiving anything and make it empty array
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext); // create like a instance of CartContext using react hook when it is called

  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
