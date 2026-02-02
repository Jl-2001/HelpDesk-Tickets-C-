

namespace HelpDeskTickets.WebApi.Dtos;

public class CreateTicketDto
{
    public string Title { get; set; } = "";
    public string? Description { get; set; }
    public string Category { get; set; } = "";
    public string Priority { get; set; } = "";
}

// we did not include id, status, createdat, resolvedat because the server should get them

