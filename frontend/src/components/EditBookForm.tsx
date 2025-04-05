import { useState } from 'react';
import { Book } from '../types/Book';
import { updateBook } from '../api/BooksAPI';

// Props interface to define what gets passed into the EditBookForm component
interface EditBookFormProps {
  book: Book; //same shape as Book.ts // Book to edit, should match the Book type structure
  onSuccess: () => void; // Callback when the form is successfully submitted
  onCancel: () => void; // Callback when the user cancels editing
}

// Functional component for editing a book
const EditBookForm = ({ book, onSuccess, onCancel }: EditBookFormProps) => {
  // State to hold the form's data, initialized with the existing book's info
  const [formData, setFormData] = useState<Book>({ ...book }); //default state is expanding out whatever came in for our book

  //update the form state as the user types each field / as they go from field to field, it detects that there's change and it goes and updates formData with target name and value
  // Handles input changes and updates formData state
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value }); //watherver was alrady in formData + whatever inputbox called / name and value // Dynamically update the specific field based on input name
  };

  // Handles form submission
  //actually processes the form submission, preventDefault stops the website from reloading/refleshing
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent full page reload
    await updateBook(formData.bookID, formData); // Send updated book data to the API
    onSuccess(); // Notify parent that the update was successful
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Book</h2>
      <label>
        Book Title:{' '}
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
      </label>
      <label>
        Book Author:{' '}
        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
        />
      </label>
      <label>
        Book Publisher:{' '}
        <input
          type="text"
          name="publisher"
          value={formData.publisher}
          onChange={handleChange}
        />
      </label>
      <label>
        Book ISBN:{' '}
        <input
          type="text"
          name="isbn"
          value={formData.isbn}
          onChange={handleChange}
        />
      </label>
      <label>
        Book Classification:{' '}
        <input
          type="text"
          name="classification"
          value={formData.classification}
          onChange={handleChange}
        />
      </label>
      <label>
        Book Category:{' '}
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
        />
      </label>
      <label>
        Number of Pages:{' '}
        <input
          type="number"
          name="pageCount"
          value={formData.pageCount}
          onChange={handleChange}
        />
      </label>
      <label>
        Book Price:{' '}
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Update Book</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default EditBookForm;
