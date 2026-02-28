using HelpDeskTickets.WebApi.Data;
using HelpDeskTickets.WebApi.Dtos;
using HelpDeskTickets.WebApi.Endpoints;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

var builder = WebApplication.CreateBuilder(args);


// program.cs is the where the app starts and is configured and how it behaves


// this starts up the web server, set up the dependency injection, identify
// with the databases,  tells asp.net how to route requests

//ASP.NET looks at the routes you have, finds the matching handler, injects dependencies, and runs the code


//NOTE: program.cs is not where business lodic should live, similar to react how each handler, route, and page should be in its own file or folder
builder.Services.AddControllers();
builder.Services.AddScoped<GetTicketsEndpoint>();
//scoped mean one per request
// then we update the controller to use the endpoint
builder.Services.AddScoped<CreateTicketEndpoint>();

builder.Services.AddScoped<UpdateTicketEndpoint>();

builder.Services.AddScoped<GetTicketByIdEndpoint>();
builder.Services.AddScoped<CreateCommentEndpoint>();
builder.Services.AddScoped<GetCommentByTicketIdEndpoint>();

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddDbContext<HelpDeskTicketsDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("local-ui", policy =>
        policy.WithOrigins("http://localhost:3000")
            .AllowAnyHeader()
            .AllowAnyMethod());
});

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<HelpDeskTicketsDbContext>();
    db.Database.EnsureCreated();
}

app.UseCors("local-ui");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    //app.MapOpenApi();
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapPut("/api/tickets/{id:int}", async (
        int id,
        UpdateTicketDto dto,
        UpdateTicketEndpoint endpoint) =>
    {
       var updated = await endpoint.ExecuteAsync(id, dto);

       return updated is null ? Results.NotFound() : Results.Ok(updated);
    });
;

app.MapPost("/api/tickets/{ticketId:int}/comments",
    async (int ticketId, CreateCommentDto dto, CreateCommentEndpoint endpoint) =>
        await endpoint.ExecuteAsync(ticketId, dto));

app.MapGet("/api/tickets/{ticketId:int}/comments",
    async (int ticketId, GetCommentByTicketIdEndpoint endpoint) =>
        await endpoint.ExecuteAsync(ticketId));

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