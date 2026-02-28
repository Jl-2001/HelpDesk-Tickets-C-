namespace HelpDeskTickets.WebApi.Dtos;

public class UpdateTicketDto
{
    public string? Title { get; set; } 
    public string? Description { get; set; }
    public string? Category { get; set; }
    public string? Priority { get; set; } 
    public string? Status { get; set; } 
}
