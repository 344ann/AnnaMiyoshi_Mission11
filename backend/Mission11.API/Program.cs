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
// Registering CORS (Cross-Origin Resource Sharing) policy in the service container.
// This policy allows HTTP requests from your React development server (http://localhost:5173),
// and permits any HTTP method (GET, POST, PUT, DELETE, etc.) and any headers.
builder.Services.AddCors(options => 
    options.AddPolicy("AllowReactApp",
         policy =>
             {
                 policy.WithOrigins("http://localhost:5173") // Allow only this origin
                     .AllowAnyMethod() // Allow all HTTP methods (GET, POST, PUT, DELETE, etc.)
                     .AllowAnyHeader(); // Allow all headers
             }));
    

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Enable the CORS policy defined above so the backend can accept requests from the React frontend
app.UseCors("AllowReactApp");

app.UseAuthorization();

app.MapControllers();

app.Run();
