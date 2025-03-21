import { useEffect, useState } from 'react';
import { Book } from './types/Book';

function BookList() {
  // store the info from the API in an array
  //associate some data with this book list component
  //use state to keep track of this data as self-enclosed component
  //books = array and setBooks = function
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch('http://localhost:5288/Book/AllBooks'); // awaits a fetch from this address
      const data = await response.json(); // try to pull the json out of that into a variable called data
      setBooks(data); //once we have that data, set books to hold the data that comes in
    };

    fetchBooks(); //call the method trying to pull the data
  }, []);

  return (
    <>
      <h1>List of Books</h1>
      <br />
      {books.map((b) => (
        <div id="bookCard" key={b.bookID}>
          <h3>{b.title}</h3>
          <ul>
            <li>Author: {b.author}</li>
            <li>Publisher: {b.publisher}</li>
            <li>ISBN: {b.isbn}</li>
            <li>Classification: {b.classification}</li>
            <li>Category: {b.category}</li>
            <li>Number of pages: {b.pageCount}</li>
            <li>Price: ${b.price}</li>
          </ul>
        </div>
      ))}
    </>
  );
}

export default BookList;
