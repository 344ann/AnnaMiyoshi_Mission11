using Microsoft.EntityFrameworkCore;

namespace Mission11.API.Data;

// DbContext class responsible for interacting with the database
public class BookDbContext : DbContext
{
    // Constructor that accepts options for configuring the DbContext (e.g., database connection string)
    public BookDbContext(DbContextOptions<BookDbContext> options) : base(options) {}
    
    // DbSet property representing the "Books" table in the database
    public DbSet<Book> Books { get; set; }
}

// each row comes into one of the project class instances and make it a set