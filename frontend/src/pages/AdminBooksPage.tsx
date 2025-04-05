import { useEffect, useState } from 'react';
import { Book } from '../types/Book';
import { deleteBook, fetchBooks } from '../api/BooksAPI';
import Pagination from '../components/Pagination';
import NewBookForm from '../components/NewBookForm';
import EditBookForm from '../components/EditBookForm';

const AdminBooksPage = () => {
  // State variables
  const [books, setBooks] = useState<Book[]>([]); // List of books
  const [error, setError] = useState<string | null>(null); // Error message
  const [loading, setLoading] = useState(true); // Loading state
  const [pageSize, setPageSize] = useState<number>(5); // Number of books per page
  const [pageNum, setPageNum] = useState<number>(1); // Current page number
  const [sortOrder, setSortOrder] = useState<string>('asc'); // Sorting order for title
  const [totalPages, setTotalPages] = useState<number>(0); // Total number of pages
  const [showForm, setShowForm] = useState(false); // Show/hide add book form
  const [editingBook, setEditingBook] = useState<Book | null>(null); // Currently editing book

  // if the specific variable/ dependency array changes then go check the server
  // useEffect runs when pageSize, pageNum, or sortOrder changes
  useEffect(() => {
    const loadBooks = async () => {
      try {
        // Fetch book data from backend API
        const data = await fetchBooks(pageSize, pageNum, sortOrder, []);
        setBooks(data.books); // Update book list
        setTotalPages(Math.ceil(data.totalNumBooks / pageSize)); // Calculate total pages
      } catch (err) {
        setError((err as Error).message); // Set error message if fetch fails
      } finally {
        setLoading(false); // Stop loading indicator
      }
    };

    loadBooks();
  }, [pageSize, pageNum, sortOrder]);

  // Handle deletion of a book
  const handleDelete = async (bookID: number) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this book?'
    );

    if (!confirmDelete) return;

    try {
      await deleteBook(bookID); // Call API to delete book
      setBooks(books.filter((b) => b.bookID !== bookID)); // Remove from UI
    } catch (error) {
      alert('Failed to delete book. Please try again.');
    }
  };

  // Show loading or error messages if applicable
  if (loading) return <p>Loading books...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div>
      <h1>Admin - Books</h1>

      {/* Show add book button when form is hidden */}
      {!showForm && (
        <button
          className="btn btn-success mb-3"
          onClick={() => setShowForm(true)}
        >
          Add Book
        </button>
      )}

      {showForm && (
        <NewBookForm
          onSuccess={() => {
            // When new book is added successfully, refresh book list and hide form
            setShowForm(false);
            fetchBooks(pageSize, pageNum, sortOrder, []).then((data) =>
              setBooks(data.books)
            );
          }}
          // && = if it is true (true or false)
          // go to the NewBookForm and pass in onSuccess and do stuff inside of it
          onCancel={() => setShowForm(false)} // Close form if cancelled
        />
      )}

      {editingBook && (
        <EditBookForm //call
          book={editingBook} // Pass book to be edited
          onSuccess={() => {
            // Refresh list and close edit form after successful edit
            setEditingBook(null);
            fetchBooks(pageSize, pageNum, sortOrder, []).then((data) =>
              setBooks(data.books)
            );
          }}
          onCancel={() => setEditingBook(null)} // Close form if cancelled
        />
      )}

      <br />
      <div className="sticky-top bg-white p-2">
        <button
          onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
        >
          Sort by Title {sortOrder === 'asc' ? '▲' : '▼'}
        </button>
      </div>
      <br />
      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Publisher</th>
            <th>ISBN</th>
            <th>Classification</th>
            <th>Category</th>
            <th>Number of pages</th>
            <th>Price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {books.map((b) => (
            <tr key={b.bookID}>
              <td>{b.bookID}</td>
              <td>{b.title}</td>
              <td>{b.author}</td>
              <td>{b.publisher}</td>
              <td>{b.isbn}</td>
              <td>{b.classification}</td>
              <td>{b.category}</td>
              <td>{b.pageCount}</td>
              <td>{b.price}</td>
              <td>
                <button
                  className="btn btn-primary btn-sm w-100 mb-1"
                  onClick={() => setEditingBook(b)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm w-100"
                  onClick={() => handleDelete(b.bookID)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        currentPage={pageNum}
        totalPages={totalPages}
        pageSize={pageSize}
        onPageChange={setPageNum} // Set current page
        onPageSizeChange={(newSize) => {
          setPageSize(newSize); // Change page size
          setPageNum(1); // Reset to first page
        }}
      />
    </div>
  );
};

export default AdminBooksPage;
