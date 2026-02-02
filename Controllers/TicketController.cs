using HelpDeskTickets.WebApi.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HelpDeskTickets.WebApi.Controllers;

[ApiController]
[Route("api/tickets")]
public class TicketController : ControllerBase
{
    private readonly HelpDeskTicketsDbContext _db;

    public TicketController(HelpDeskTicketsDbContext db)
    {
        _db = db;
    }

    [HttpGet]
    public async Task<IActionResult> GetTickets()
    {
        var tickets = await _db.Tickets
        .AsNoTracking()
        .OrderByDescending(t => t.CreatedAt)
        .ToListAsync();

        return Ok(tickets);
}

}

// what is going on here?

//before this controller, the dbContext was injected into a lamba, and route is defined in program.cs

//now , this controllers dbcontext is injected into the contructor, then the route is defined 
// by attributes, and the http logic is grouped in one class. though the query itself did not change

