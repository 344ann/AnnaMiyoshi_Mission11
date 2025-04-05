import { Book } from '../types/Book';

//get a list of books, making centralized call so that other pages can make reference instead of calling directly from BookList.tsx
// Interface defining the structure of the API response for fetching books
interface FetchBooksResponse {
  //array of book types
  // Array of books returned from the backend
  books: Book[];
  //keep track of how many books are there
  // Total number of books (for pagination)
  totalNumBooks: number;
}

// Base URL for your backend Book API
const API_URL =
  'https://mission13-anna-backend-g9bdb2f4aqdeewc7.eastus-01.azurewebsites.net/Book';

// Fetches a list of books from the backend API with support for pagination,
// sorting, and filtering by selected categories.

export const fetchBooks = async (
  pageSize: number,
  pageNum: number,
  sortOrder: string,
  selectedCategories: string[]
): Promise<FetchBooksResponse> => {
  try {
    // Construct category filter parameters for API request
    // Construct query parameters for selected categories (e.g., &categories=Fiction&categories=Nonfiction)
    const categoryParams = selectedCategories
      .map((cat) => `categories=${encodeURIComponent(cat)}`) // encodeURIComponent ensures special characters are URL safe
      .join('&');
    //encodeURIComponent => put info in the right format, map => like a for each loop

    // Build the complete request URL with pagination, sorting, and category filters
    // Fetch books from the backend with pagination and sorting parameters
    const response = await fetch(
      `${API_URL}/AllBooks?pageHowMany=${pageSize}&pageNum=${pageNum}&sortBy=title&sortOrder=${sortOrder}${selectedCategories.length ? `&${categoryParams}` : ''}`
    );
    //awaits a fetch from this address //sort order using backend
    //if there is a variable inside the string, use back tick (`) instead of normal quotes (')
    //selectedCategories.length => check if selectedCategories has a length = has something in it

    // If the response is not OK (e.g., 404 or 500), throw an error
    if (!response.ok) {
      throw new Error('Failed to fetch books');
    }

    // Return the JSON response as a FetchBooksResponse object
    return await response.json();
  } catch (error) {
    //catch => if there is an error
    console.error('Error fetching books:', error);
    throw error;
  }
};

// take the info and put it into a FetchBooksResponse

//Sends a new book to the backend API to be added to the database.

export const addBook = async (newBook: Book): Promise<Book> => {
  try {
    const response = await fetch(`${API_URL}/AddBook`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Tells the server we're sending JSON
      },
      body: JSON.stringify(newBook), // Convert JS object to JSON string
    });

    // ! This check is incorrect — it should be if (!response.ok), not if (response.ok)
    if (!response.ok) {
      throw new Error('Failed to add book');
    }

    return await response.json();
  } catch (error) {
    console.error('Error adding book', error);
    throw error;
  }
};

// Sends an update for a specific book to the backend API.

export const updateBook = async (
  bookID: number,
  updatedBook: Book
): Promise<Book> => {
  try {
    const response = await fetch(`${API_URL}/UpdateBook/${bookID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedBook),
    });

    // Directly return the updated book data from the response
    return await response.json();
  } catch (error) {
    console.error('Error updating book:', error);
    throw error;
  }
};

// Sends a DELETE request to remove a book from the database.

export const deleteBook = async (bookID: number): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/DeleteBook/${bookID}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete book');
    }
  } catch (error) {
    console.error('Error deleting project:', error);
    throw error;
  }
};
