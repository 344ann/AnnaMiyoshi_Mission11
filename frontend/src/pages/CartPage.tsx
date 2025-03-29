import { useNavigate } from 'react-router-dom';

function CartPage() {
  const navigate = useNavigate();

  return (
    <>
      <div>
        <h2>Your Cart</h2>
        <h3>Total: </h3>
        <button>Checkout</button>
        <button onClick={() => navigate('/books')}>Continue Browsing</button>
      </div>
    </>
  );
}

export default CartPage;
