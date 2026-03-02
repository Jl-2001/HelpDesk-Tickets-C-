using HelpDeskTickets.WebApi.Data;
using HelpDeskTickets.WebApi.Models.Dtos;
using Microsoft.EntityFrameworkCore;

namespace HelpDeskTickets.WebApi.Endpoints;

public class GetCommentByTicketIdEndpoint
{
    private readonly HelpDeskTicketsDbContext _db;

    public GetCommentByTicketIdEndpoint(HelpDeskTicketsDbContext db)
    {
        _db = db;
    }

    public async Task<IResult> ExecuteAsync(int ticketId)
    {
        var comments = await _db.Comments
            .Where(c => c.TicketId == ticketId)
            .OrderByDescending(c => c.CreatedAt)
            .Select(c => new TicketCommentDto
            {
                Id = c.Id,
                TicketId = c.TicketId,
                Body = c.Body,
                CreatedAt = c.CreatedAt,
                UpdatedAt = c.UpdatedAt
            })
            .ToListAsync();
        
        return Results.Ok(comments);
    }
}