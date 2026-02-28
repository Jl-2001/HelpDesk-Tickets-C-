using HelpDeskTickets.WebApi.Models;
using Microsoft.EntityFrameworkCore;

namespace HelpDeskTickets.WebApi.Data;


public class HelpDeskTicketsDbContext : DbContext
{
    public HelpDeskTicketsDbContext(DbContextOptions<HelpDeskTicketsDbContext> options)
        : base(options)
    {
    }
    
    public DbSet<Ticket> Tickets { get; set; }
    public DbSet<TicketComment> Comments {get; set;}

    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Ticket>().ToTable("Tickets", "dbo");
    
        modelBuilder.Entity<Ticket>().ToTable("Tickets", "dbo");
        modelBuilder.Entity<TicketComment>().ToTable("Comments", "dbo");

        modelBuilder.Entity<TicketComment>()
            .HasOne(c => c.Ticket)
            .WithMany(t => t.Comments)
            .HasForeignKey(c => c.TicketId)
            .OnDelete(DeleteBehavior.Cascade);
    }
    
}

// this file is used to translate the database which is pretty important
// this is a class that understands how to talk to sql server. knows what tables exist, 
// which is able tp translate c# to sql to c# again, a seesion manager in a way

// this opens connections, runs queries , maps results, closes connecttions, 

//this tells in EF terms, there is a table named tickets, which maps to the ticket class

//db.Tickets.ToListAsync();
// EF(entity framework):
// Generates SQL - Executes it - Returns C# objects :
// You never wrote SQL, but SQL still ran.