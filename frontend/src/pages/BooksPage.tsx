import { useState } from 'react';
import BookList from '../components/BookList';
import CategoryFilter from '../components/CategoryFilter';
import WelcomeBand from '../components/WelcomeBand';
import CartSummary from '../components/CartSummary';

// Importing the BookList component to display the list of books.
// BooksPage serves as the main page for displaying books, filtering by category, and showing cart summary.

function BooksPage() {
  // State to manage selected categories for filtering books
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]); //App is the parent elements so children elements can share

  return (
    <div className="container mt-4">
      <CartSummary />
      <WelcomeBand />
      <div className="row">
        <div className="col-md-3">
          <CategoryFilter
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
          />
        </div>
        <div className="col-md-9">
          <BookList selectedCategories={selectedCategories} />
        </div>
      </div>
    </div>
  );
}

//selectedCategories={selectedCategories} onCheckboxChange={setSelectedCategories} => can name anything you want
// This means that the component is passing down state and a state updater function
// which can be named anything.

export default BooksPage;
