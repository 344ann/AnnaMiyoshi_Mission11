import { useEffect, useState } from 'react';
import { Book } from '../types/Book';
import { useNavigate } from 'react-router-dom';
import { fetchBooks } from '../api/BooksAPI';
import Pagination from './Pagination';

// BookList component that fetches and displays a list of books with sorting, filtering, and pagination
// can use different variable name from the other side (don't need to use selectedCategories for variable name)
function BookList({ selectedCategories }: { selectedCategories: string[] }) {
  // store the info from the API in an array
  //associate some data with this book list component
  //use state to keep track of this data as self-enclosed component
  //books = array and setBooks = function
  // State to store the list of books fetched from the API
  const [books, setBooks] = useState<Book[]>([]);

  // State to control how many books are displayed per page (default: 5)
  const [pageSize, setPageSize] = useState<number>(5);

  // State to track the current page number (default: 1)
  const [pageNum, setPageNum] = useState<number>(1);

  // State to calculate and store the total number of pages
  const [totalPages, setTotalPages] = useState<number>(0);

  //State to track sorting order using backend
  const [sortOrder, setSortOrder] = useState<string>('asc');

  // Navigation hook to redirect user to another route (e.g., purchase page)
  const navigate = useNavigate(); // Hook for navigation

  // State to store error message if fetching fails
  const [error, setError] = useState<string | null>(null);

  // State to show loading indicator while fetching data
  const [loading, setLoading] = useState(true);

  // // State to track sorting order (true for ascending, false for descending) FRONTEND
  // const [sortAscending, setSortAscending] = useState<boolean>(true);

  // Fetches book data from the API whenever pageSize, pageNum, or totalItems change
  //run this when something is changed
  useEffect(() => {
    const loadBooks = async () => {
      // Fetches book data from the API with pagination parameters

      try {
        setLoading(true); // Start loading spinner
        // Fetch paginated and filtered books from API
        const data = await fetchBooks(
          pageSize,
          pageNum,
          sortOrder,
          selectedCategories
        );

        setBooks(data.books); //once we have that data, set books to hold the data that comes in, Update the books list with the fetched data
        setTotalPages(Math.ceil(data.totalNumBooks / pageSize)); // Calculate the total pages based on the total items and page size
      } catch (error) {
        setError((error as Error).message);
      } finally {
        // even if getting an error somewhere in the try, still executed
        setLoading(false); // Stop loading spinner regardless of success/failure
      }
    };

    loadBooks(); //call the function trying to pull the data // Initial load
  }, [pageSize, pageNum, selectedCategories, sortOrder]); // Dependencies for re-fetching // Re-run effect if any of these change

  // Show loading text while books are being fetched
  if (loading) return <p>Loading books...</p>;

  // Show error message if there's a problem fetching books
  if (error) return <p className="text-red-500">Error: {error}</p>;

  // // Function to handle sorting books by title (ascending/descending) FRONTEND
  // const sortedBooks = [...books].sort((a, b) => {
  //   return sortAscending
  //     ? a.title.localeCompare(b.title)
  //     : b.title.localeCompare(a.title);
  // });

  return (
    <>
      <br />

      {/* <button onClick={() => setSortAscending(!sortAscending)}>
        Sort by Title {sortAscending ? '(Ascending)' : '(Descending)'}
      </button> */}

      <div className="sticky-top bg-white p-2">
        <button
          onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
        >
          Sort by Title {sortOrder === 'asc' ? '▲' : '▼'}
        </button>
      </div>

      <br />
      <br />
      {books.map((b) => (
        <div id="bookCard" className="card mb-3 shadow" key={b.bookID}>
          <h3 className="card-title">{b.title}</h3>
          <div className="card-body">
            <ul className="list-unstyled">
              <li>
                <strong>Author: </strong>
                {b.author}
              </li>
              <li>
                <strong>Publisher: </strong>
                {b.publisher}
              </li>
              <li>
                <strong>ISBN: </strong>
                {b.isbn}
              </li>
              <li>
                <strong>Classification: </strong>
                {b.classification}
              </li>
              <li>
                <strong>Category: </strong>
                {b.category}
              </li>
              <li>
                <strong>Number of pages: </strong>
                {b.pageCount}
              </li>
              <li>
                <strong>Price: </strong>${b.price}
              </li>
            </ul>
            <button
              className="btn btn-success"
              onClick={() =>
                navigate(`/purchase/${b.title}/${b.bookID}/${b.price}`)
              }
            >
              Purchase
            </button>
          </div>
        </div>
      ))}
      <Pagination
        currentPage={pageNum}
        totalPages={totalPages}
        pageSize={pageSize}
        onPageChange={setPageNum}
        onPageSizeChange={(newSize) => {
          setPageSize(newSize);
          setPageNum(1);
        }}
      />
    </>
  );
}

export default BookList;
