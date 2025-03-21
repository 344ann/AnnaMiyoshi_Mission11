using Microsoft.EntityFrameworkCore;

namespace Mission11.API.Data;

public class BookDbContext : DbContext
{
    public BookDbContext(DbContextOptions<BookDbContext> options) : base(options) {}
    
    public DbSet<Book> Books { get; set; }
}

// each row comes into one of the project class instances and make it a set