import { useState } from 'react';
import BookList from '../components/BookList';
import CategoryFilter from '../components/CategoryFilter';
import WelcomeBand from '../components/WelcomeBand';

// Importing the BookList component to display the list of books.

function BooksPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]); //App is the parent elements so children elements can share

  return (
    <div className="container mt-4">
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

export default BooksPage;
