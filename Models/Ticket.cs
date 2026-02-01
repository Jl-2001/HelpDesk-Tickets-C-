namespace HelpDeskTickets.WebApi.Models;

public class Ticket
{
    public int Id { get; set; }
    public string Title { get; set; } = "";
    public string? Description { get; set; }
    public string Category { get; set; } = "";
    public string Priority { get; set; } = "";
    public string Status { get; set; } = "";
    public DateTime CreatedAt { get; set; }
    public DateTime? ResolvedAt { get; set; }
}


// the EFCORE uses this file to map the sql rows then converts to C# objeects, 
// json serialization  uses the file to return api responses
//controllers/endpoints are used to read and write the data
//SQL row  ⇄  Ticket object  ⇄  JSON response



//? match null

//Quick checklist before frontend
// 
// You’re ready for frontend only if all are true:
// 
// /api/tickets returns data
// 
// No DB errors in console
// 
// You understand why DI worked here
// 
// If you want, next I can:
// 
// help you add a /api/tickets/{id} endpoint
// 
// show how to test with curl/Postman
// 
// explain how a React/Blazor frontend would call this
// 
// or add a simple health endpoint (/health)
// 
// First: go to /api/tickets and tell me what you see