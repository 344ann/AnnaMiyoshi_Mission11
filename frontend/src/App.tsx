import './App.css';
import BooksPage from './pages/BooksPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PurchasePage from './pages/PurchasePage';
import CartPage from './pages/CartPage';
//Router = enable routing generally
//Routes = hold the route definitions
//Route = a specific route

// Main App component - the root component of the React application.
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<BooksPage />} />
          <Route path="/books" element={<BooksPage />} />
          <Route path="/purchase/:title" element={<PurchasePage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

//if putnothing ("/"), go to the book page
// /:title = potentially ceiving as a parameter
