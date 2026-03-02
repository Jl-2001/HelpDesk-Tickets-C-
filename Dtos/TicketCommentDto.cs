namespace HelpDeskTickets.WebApi.Models.Dtos;

public class TicketCommentDto
{
    public int Id { get; set; }
    public int TicketId { get; set; }
    public string Body { get; set; } = "";
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
}