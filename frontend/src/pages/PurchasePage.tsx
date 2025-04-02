import { useNavigate, useParams } from 'react-router-dom';
import WelcomeBand from '../components/WelcomeBand';
import { useCart } from '../context/CartContext';
import { CartItem } from '../types/CartItem';
import { useState } from 'react';

function PurchasePage() {
  const navigate = useNavigate(); // Hook to navigate between pages
  const { title, bookID, price } = useParams(); // Get URL parameters
  const { addToCart } = useCart(); // built in CartContext page and exported, Access the addToCart function from CartContext
  const [quantity, setQuantity] = useState<number>(0); // State for storing the purchase quantity

  // Function to handle adding the selected book to the cart
  const handleAddToCart = () => {
    const newItem: CartItem = {
      bookID: Number(bookID), // Convert bookID from string to number
      title: title || 'No Title Found', // Fallback if title is missing
      price: Number(price), // Convert price from string to number
      quantity, // Use selected quantity from state
    };
    addToCart(newItem); // Add the item to the cart
    navigate('/cart'); // Redirect to the cart page after adding item
  };

  return (
    <>
      <WelcomeBand />
      <h2>Purchase {title}</h2>

      <div>
        <input
          type="number"
          placeholder="Enter purchase quantity"
          value={quantity}
          onChange={(x) => setQuantity(Number(x.target.value))}
        />
        <button onClick={handleAddToCart}>Add to Cart</button>
      </div>

      <button onClick={() => navigate(-1)}>Go Back</button>
    </>
  );
}

export default PurchasePage;

//single page pplication => not changing pages, staying on the same page and just shifting the content that appear on the page (changing the DOM), neverleaving index.html
//navigate('/books') = navigate(-1)
