using HelpDeskTickets.WebApi.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

var builder = WebApplication.CreateBuilder(args);


// program.cs is the where the app starts and is configured and how it behaves


// this starts up the web server, set up the dependency injection, identify
// with the databases,  tells asp.net how to route requests

//ASP.NET looks at the routes you have, finds the matching handler, injects dependencies, and runs the code


//NOTE: program.cs is not where business lodic should live, similar to react how each handler, route, and page should be in its own file or folder
builder.Services.AddControllers();

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddDbContext<HelpDeskTicketsDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddOpenApi();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.MapControllers();

//app.MapGet("/api/tickets", async (HelpDeskTicketsDbContext db) =>
//{
  //  var tickets = await db.Tickets
   //     .AsNoTracking()
   //     .OrderByDescending(t => t.CreatedAt)
   //     .ToListAsync();

//    return Results.Ok(tickets);
//});

app.Run();

//DI is dependency injection


//TrustServerCertificate is used for docker db being used. to avoid ssl certificate
// database is HelpDeskTicketsDB
// table is dbo.Tickets

//ToList is to run the query