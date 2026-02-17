using HelpDeskTickets.WebApi.Data;
using HelpDeskTickets.WebApi.Models;
using Microsoft.EntityFrameworkCore;

namespace HelpDeskTickets.WebApi.Endpoints;

public class GetTicketByIdEndpoint // again this is important for dependency injection
{
    private readonly HelpDeskTicketsDbContext _db;

    public GetTicketByIdEndpoint(HelpDeskTicketsDbContext db)
    {
        _db = db;
    }

    public async Task<Ticket?> ExecuteAsync(int id)
    {
        
        
        return await _db.Tickets
            .AsNoTracking()
            // Super important for interviews and performance. Simple explanation:
            // “Hey database, I am only READING this data. Don’t waste memory tracking changes.”
            .FirstOrDefaultAsync(t => t.Id == id);
        //Return first or default that you se that equals to the ID

    }
}