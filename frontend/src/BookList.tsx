import { useEffect, useState } from 'react';
import { Book } from './types/Book';

function BookList() {
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

  // State to store the total number of books available in the database
  const [totalItems, setTotalItems] = useState<number>(0);

  // State to calculate and store the total number of pages
  const [totalPages, setTotalPages] = useState<number>(0);

  //State to track sorting order using backend
  const [sortOrder, setSortOrder] = useState<string>('asc');

  // // State to track sorting order (true for ascending, false for descending) FRONTEND
  // const [sortAscending, setSortAscending] = useState<boolean>(true);

  // Fetches book data from the API whenever pageSize, pageNum, or totalItems change
  //run this when something is changed
  useEffect(() => {
    const fetchBooks = async () => {
      // Fetches book data from the API with pagination parameters
      const response = await fetch(
        `http://localhost:5288/Book/AllBooks?pageHowMany=${pageSize}&pageNum=${pageNum}&sortBy=title&sortOrder=${sortOrder}`
      ); // awaits a fetch from this address // sort order using backend
      //if there is a variable inside the string, use back tick (`) instead of normal quotes (')
      const data = await response.json(); // try to pull the json out of that into a variable called data, Parses the JSON response from the API
      setBooks(data.books); //once we have that data, set books to hold the data that comes in, Update the books list with the fetched data
      setTotalItems(data.totalNumBooks); // Set the total number of books (for pagination calculation)
      setTotalPages(Math.ceil(totalItems / pageSize)); // Calculate the total pages based on the total items and page size
    };

    fetchBooks(); //call the function trying to pull the data
  }, [pageSize, pageNum, totalItems, sortOrder]);

  // // Function to handle sorting books by title (ascending/descending) FRONTEND
  // const sortedBooks = [...books].sort((a, b) => {
  //   return sortAscending
  //     ? a.title.localeCompare(b.title)
  //     : b.title.localeCompare(a.title);
  // });

  return (
    <>
      <h1>List of Books</h1>
      <br />

      {/* <button onClick={() => setSortAscending(!sortAscending)}>
        Sort by Title {sortAscending ? '(Ascending)' : '(Descending)'}
      </button> */}

      <button
        onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
      >
        Sort by Title {sortOrder === 'asc' ? '▲' : '▼'}
      </button>

      <br />
      <br />
      {books.map((b) => (
        <div id="bookCard" className="card" key={b.bookID}>
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
          </div>
        </div>
      ))}

      <button disabled={pageNum === 1} onClick={() => setPageNum(pageNum - 1)}>
        Previous
      </button>

      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index + 1}
          onClick={() => setPageNum(index + 1)}
          disabled={pageNum === index + 1}
        >
          {index + 1}
        </button>
      ))}

      <button
        disabled={pageNum === totalPages}
        onClick={() => setPageNum(pageNum + 1)}
      >
        Next
      </button>

      <br />
      <label>
        Results per page:
        <select
          value={pageSize}
          onChange={(p) => {
            setPageSize(Number(p.target.value));
            setPageNum(1);
          }}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
        </select>
      </label>
    </>
  );
}

export default BookList;
