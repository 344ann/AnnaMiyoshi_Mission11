import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CartItem } from '../types/CartItem';

function CartPage() {
  const navigate = useNavigate(); // Hook for navigation between pages
  const { cart, removeFromCart } = useCart(); // Get cart data and remove function from context

  // Calculate total price of all items in the cart
  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <>
      <div>
        <h2>Your Cart</h2>
        <div>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <ul>
              {cart.map((item: CartItem) => (
                <li key={item.bookID}>
                  Title of Book: {item.title}
                  <br />
                  Price Per Book: ${item.price}
                  <br />
                  Quantity of Book: {item.quantity}
                  <br />
                  Subtotal: ${(item.price * item.quantity).toFixed(2)}
                  <br />
                  <button onClick={() => removeFromCart(item.bookID)}>
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <h3>Total: ${totalAmount.toFixed(2)}</h3>
        {/* <button>Checkout</button> */}
        <button onClick={() => navigate('/books')}>Continue Shopping</button>
      </div>
    </>
  );
}

export default CartPage;
