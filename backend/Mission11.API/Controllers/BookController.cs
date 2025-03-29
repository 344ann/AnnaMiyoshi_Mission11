using Microsoft.AspNetCore.Mvc;
using Mission11.API.Data;

namespace Mission11.API.Controllers;

// Specifies that this class is a controller that handles API requests
[Route("[controller]")] // Sets the route for this controller (e.g., /Book)
[ApiController] // Indicates that this is an API controller, providing automatic model validation and binding

public class BookController : ControllerBase
{
   // Private field to hold the database context instance
   private BookDbContext _bookContext;
   
   //constructor - happens as soon as the program begins
   // Initializes the database context by injecting it from the dependency container
   //get an instance of the database (take the entry putted in the program.cs and load up using sqlite when you call the DbContext)
   public BookController(BookDbContext temp) => _bookContext = temp;
   
   //display a list
   [HttpGet("AllBooks")]
   //going to the database and book table, and getting all the entries and putting them to a list
   // Fetches a paginated list of books from the database
   public IActionResult GetBooks(int pageHowMany = 5, int pageNum = 1, [FromQuery] List<string>? categories = null, string sortBy = "title", string sortOrder = "asc")
   {
      var booksQuery = _bookContext.Books.AsQueryable();
      //normal list => the query has to be completed and runs immediately to get data
      //Queryable => for building queries, built it a piece at a time and ready we can use the query

      if (categories != null && categories.Any()) //two ways to check if something in there
      {
         booksQuery = booksQuery.Where(b => categories.Contains(b.Category)); //if the categories list match the categories of those specific records by looking through each row => include in query
      }
      
      // Apply sorting by title
      if (sortBy.ToLower() == "title")
      {
         booksQuery = sortOrder.ToLower() == "desc"
            ? booksQuery.OrderByDescending(b => b.Title)
            : booksQuery.OrderBy(b => b.Title);
      }
      
      // Gets the total number of books in the database
      var totalNumBooks = booksQuery.Count();
      
      // Retrieves a subset of books by skipping (pageNum - 1) * pageHowMany records
      // and taking the next "pageHowMany" records
      var booklist = booksQuery
         .Skip((pageNum - 1) * pageHowMany) // Skips records for previous pages
         .Take(pageHowMany) // Retrieves only the number of records specified by pageHowMany
         .ToList(); // Converts the result to a list
      
      // Constructs an anonymous object to return both the books and the total number of books
      var returnObject = new
      {
         Books = booklist,
         TotalNumBooks = totalNumBooks
      };
      
      //Ok is a 200 status in world of networking, this is the different way of turing info working with IActionResult and allowing to pass two different-type objects
      return Ok(returnObject);
   }

   [HttpGet("GetCategories")]
   public IActionResult GetCategories()
   {
      var categories = _bookContext.Books
         .Select(b => b.Category)
         .Distinct()
         .ToList();
      
      return Ok(categories);
   }

   [HttpGet("FictionBooks")]
   // Retrieves all books where the classification is "Fiction"
   public IEnumerable<Book> GetFunctionalBooks()
   {
      // Filters books with Classification equal to "Fiction" and converts the result to a list
      var booklist = _bookContext.Books.Where(b => b.Classification == "Fiction").ToList();
      return (booklist);
   }
}