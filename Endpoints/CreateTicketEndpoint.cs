using HelpDeskTickets.WebApi.Data;
using HelpDeskTickets.WebApi.Dtos;
using HelpDeskTickets.WebApi.Models;

namespace HelpDeskTickets.WebApi.Endpoints;

public class CreateTicketEndpoint
{
    private readonly HelpDeskTicketsDbContext _db;
    
    public CreateTicketEndpoint(HelpDeskTicketsDbContext db)
    {
        _db = db;
    }

    public async Task<Ticket> ExecuteAsync(CreateTicketDto dto)
    {
        var title = (dto.Title ?? "").Trim();
        if(title.Length == 0) throw new ArgumentException("Title is required.");
        if (title.Length > 200) throw new ArgumentException("title is too long, shorten it up");

        var ticket = new Ticket
        {
            Title = title,
            Description = dto.Description?.Trim(),
            Category = (dto.Category ?? "").Trim(),
            Priority = (dto.Priority ?? "").Trim(),
            Status = "Open",
            CreatedAt = DateTime.UtcNow,
            ResolvedAt = null
        };
        
        _db.Tickets.Add(ticket);
        await _db.SaveChangesAsync();

        return ticket;
    }
    
}

