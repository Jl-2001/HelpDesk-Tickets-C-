using HelpDeskTickets.WebApi.Dtos;
using HelpDeskTickets.WebApi.Data;
using HelpDeskTickets.WebApi.Models;

namespace HelpDeskTickets.WebApi.Endpoints;

public class UpdateTicketEndpoint
{
    private readonly HelpDeskTicketsDbContext _db;
    

    public UpdateTicketEndpoint(HelpDeskTicketsDbContext db)
    {
        _db = db;
    }

    public async Task<Ticket?> ExecuteAsync(int id, UpdateTicketDto dto)
    {
        var ticket = await _db.Tickets.FindAsync(id);
// you need await in order to find the async, but not await objects because that does not make sense, remember 
// to table is not to query something, 
        if (ticket == null) return null;
        

        //these string variables are new values from users
        var stringStatus = dto.Status?.Trim();
        var stringPriority = dto.Priority?.Trim();
        var stringCategory = dto.Category?.Trim();
        if (stringStatus != null )
        {
            if (string.IsNullOrWhiteSpace(stringStatus))// we always check the cleaned value.
            
                throw new ArgumentException("update the status, cant be empty");
            
                ticket.Status = stringStatus;

                ticket.ResolvedAt = stringStatus.Equals("Resolved", StringComparison.OrdinalIgnoreCase)
                    ? DateTime.UtcNow
                    : null;



        }
        // patch should be this:
        //Validate - Assign - Continue - Save at the end - Return at the end
        
        if (stringPriority != null)
        {
            if (string.IsNullOrWhiteSpace(stringPriority))
            
                throw new ArgumentException("update the priority, cant be empty");
            
                ticket.Priority = stringPriority;
            
        }
    
        if (stringCategory != null)
        {
            if (string.IsNullOrWhiteSpace(stringCategory))
            
                throw new ArgumentException("update the category, cant be empty");
            
                ticket.Category = stringCategory;
            
        }
        

        

        await _db.SaveChangesAsync();

        return ticket;

    }
    
     
}

// being inside the ticket endpoint means we
// take new data from the DTO
// then we find the ticket in the database.
// then we save the changes


//also, the ticket is considered a c# object 


//Mutating a tracked entity before saving changes
// This is the core of how EF Core updates work.


//remember. its like this:
//Find ticket
// If null → return null
// 
// If dto.Status != null:
//     Clean it
//     Validate it
//     Assign it
// 
// If dto.Priority != null:
//     Clean it
//     Validate it
//     Assign it
// 
// If dto.Category != null:
//     Clean it
//     Validate it
//     Assign it
// 
// SaveChanges
// Return ticket