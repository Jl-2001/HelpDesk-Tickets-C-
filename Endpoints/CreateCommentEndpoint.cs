using HelpDeskTickets.WebApi.Data;
using HelpDeskTickets.WebApi.Dtos;
using HelpDeskTickets.WebApi.Models;
using Microsoft.EntityFrameworkCore;

namespace HelpDeskTickets.WebApi.Endpoints;

public class CreateCommentEndpoint
{
    private readonly HelpDeskTicketsDbContext _db;

    public CreateCommentEndpoint(HelpDeskTicketsDbContext db)
    {
        _db = db;
    }

    public async Task<IResult> ExecuteAsync(int ticketId, CreateCommentDto dto)
    {
        var ticket = await _db.Tickets.FindAsync(ticketId);

        if (ticket == null)
            return Results.NotFound("ticket not made or found");
        var comment = new TicketComment
        {
            TicketId = ticketId,
            Body = dto.Body,
            CreatedAt = DateTime.UtcNow
        };
        _db.Comments.Add(comment);
        await _db.SaveChangesAsync();
        return Results.Ok(comment);
    }
}