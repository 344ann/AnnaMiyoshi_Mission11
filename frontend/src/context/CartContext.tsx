import { useState } from 'react';
import { CartItem } from '../types/CartItem';

//setting up interface when we built the interface for the repository pattern
interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (bookID: number) => void;
  clearCart: () => void;
}

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((c) => c.bookID === item.bookID);
      const updatedCart = prevCart.map(
        (c) =>
          c.bookID === item.bookID ? { ...c, price: c.price + item.price } : c
        //not adding as anew item but update the price
      );

      return existingItem ? updatedCart : [...prevCart, item];
      //if the item already existed in the cart, updateCart, otherwise, add the item to the preveous cart
    });
    //spread operator = add to the array containing the previous cart and new item that is being passed into
  };
};
