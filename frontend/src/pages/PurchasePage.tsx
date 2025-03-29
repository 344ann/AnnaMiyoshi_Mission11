import { useNavigate, useParams } from 'react-router-dom';
import WelcomeBand from '../components/WelcomeBand';

function PurchasePage() {
  const navigate = useNavigate();
  const { title } = useParams();
  return (
    <>
      <WelcomeBand />
      <h2>Purchase {title}</h2>

      <div>
        <input type="number" placeholder="Enter purchase amount" />
        <button onClick={() => navigate('/cart')}>Add to Cart</button>
      </div>

      <button onClick={() => navigate(-1)}>Go Back</button>
    </>
  );
}

export default PurchasePage;

//single page pplication => not changing pages, staying on the same page and just shifting the content that appear on the page (changing the DOM), neverleaving index.html
//navigate('/books') = navigate(-1)
