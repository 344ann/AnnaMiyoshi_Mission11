// Defines the structure of a bowler object
// This interface is used to enforce type-checking and ensure that
// each book has the specified properties with their corresponding data types.
//object that is coming in the json object
export interface Book {
  bookID: number;
  title: string;
  author: string;
  publisher: string;
  isbn: string;
  classification: string;
  category: string;
  pageCount: number;
  price: number;
}
