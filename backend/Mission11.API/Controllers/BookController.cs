using Microsoft.AspNetCore.Mvc;
using Mission11.API.Data;

namespace Mission11.API.Controllers;

[Route("[controller]")]
[ApiController]

public class BookController : ControllerBase
{
   private BookDbContext _bookContext;
   
   //constructor - happens as soon as the program begins
   //get an instance of the database (take the entry putted in the program.cs and load up using sqlite when you call the DbContext)
   public BookController(BookDbContext temp) => _bookContext = temp;
   
   //display a list
   [HttpGet("AllBooks")]
   //going to the database and book table, and getting all the entries and putting them to a list
   public IEnumerable<Book> GetBooks()
   {
      var booklist = _bookContext.Books.ToList();
      
      return (booklist);
   }

   [HttpGet("FictionBooks")]
   public IEnumerable<Book> GetFunctionalBooks()
   {
      var booklist = _bookContext.Books.Where(b => b.Classification == "Fiction").ToList();
      return (booklist);
   }
}