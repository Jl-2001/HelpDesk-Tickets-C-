 using HelpDeskTickets.WebApi.Data;
 using HelpDeskTickets.WebApi.Models;
 using Microsoft.EntityFrameworkCore;
 
 namespace HelpDeskTickets.WebApi.Endpoints;

 public class GetTicketsEndpoint
 {
     private readonly HelpDeskTicketsDbContext _db;

     public GetTicketsEndpoint(HelpDeskTicketsDbContext db)
     {
         _db = db;
     }
     
     public async Task<List<Ticket>> ExecuteAsync()
     {
         return await _db.Tickets
             .AsNoTracking()
             .OrderByDescending(t => t.CreatedAt)
             .ToListAsync();
     }
 }
 
 // similar to a js function that returns a list of tickets but in a class form