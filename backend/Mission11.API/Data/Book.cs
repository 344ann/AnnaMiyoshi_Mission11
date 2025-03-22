using System.ComponentModel.DataAnnotations;

namespace Mission11.API.Data;

// Represents a book entity in the database
public class Book
{
    [Key]
    [Required]
    public int BookID { get; set; }
    
    [Required]
    public string Title { get; set; }
    
    [Required]
    public string  Author { get; set; }
    
    [Required]
    public string Publisher { get; set; }
    
    [Required]
    public string ISBN { get; set; }
    
    [Required]
    public string Classification { get; set; }
    
    [Required]
    public string Category { get; set; }
    
    [Required]
    public int PageCount { get; set; }
    
    [Required]
    public float Price { get; set; }
    
}

// what one record is going to look like