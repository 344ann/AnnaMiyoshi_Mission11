using Microsoft.EntityFrameworkCore;
using Mission11.API.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configures the database context (BookDbContext) and connects it to a SQLite database.
// The connection string is pulled from the app's configuration file (appsettings.json or similar).
builder.Services.AddDbContext<BookDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("BookstoreConnection")));

// Enables Cross-Origin Resource Sharing (CORS).
// This is necessary to allow requests from the frontend (e.g., a React app) to access this API.
builder.Services.AddCors();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Configures CORS to allow requests from "http://localhost:5173" (your React frontend).
app.UseCors(x => x.WithOrigins("http://localhost:5173"));

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
