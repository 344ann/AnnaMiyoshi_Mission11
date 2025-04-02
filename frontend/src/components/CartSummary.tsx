import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

// CartSummary component displays a floating cart icon with the total price
const CartSummary = () => {
  const navigate = useNavigate(); // Hook to navigate between pages
  const { cart } = useCart(); // Retrieve cart items from context

  // Calculate total cart amount by summing (price * quantity) for each item
  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: '10px',
          right: '20px',
          background: '#f8f9fa',
          padding: '10px, 15px',
          borderRadius: '8px',
          cursor: 'pointer', // Indicate it's clickable
          display: 'flex',
          alignItems: 'center',
          boxShadow: '0 2px 5px rgba(0,0,0,0,2)',
          fontSize: '16px',
        }}
        onClick={() => navigate('/cart')} // Navigate to cart page when clicked
      >
        🛒 <strong>{totalAmount.toFixed(2)}</strong>
      </div>
    </>
  );
};

export default CartSummary;
