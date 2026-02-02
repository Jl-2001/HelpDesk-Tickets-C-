using HelpDeskTickets.WebApi.Endpoints;
using Microsoft.AspNetCore.Mvc;
using HelpDeskTickets.WebApi.Dtos;

// m


namespace HelpDeskTickets.WebApi.Controllers;

[ApiController]
[Route("api/tickets")]
public class TicketController : ControllerBase
// this handles http requests, all routes start with /api/tickets
{
    private readonly GetTicketsEndpoint _getTickets;
    private readonly CreateTicketEndpoint _createTicket;

    public TicketController(GetTicketsEndpoint getTickets, CreateTicketEndpoint createTicket)
    {
        _getTickets = getTickets;
        _createTicket = createTicket;
    }
    // this is a contructor injestion which asp.net sees ticketcontroller.
    // it see the constructor needs getTicketsEndpoints, it looks in the DI container,
    // then finds the builder.services.addscope from program.cs
    // which creates the endpoint class, and injects it into the controller
    //as ASP.NET helped build 

    [HttpGet]
    public async Task<IActionResult> GetTickets()
    // this responds to the get route, then uses the route defined at the class level
    // then the final route = GET /api/tickets
    {
        var tickets = await _getTickets.ExecuteAsync();// this calls the endpoint class
        return Ok(tickets);
    }    
//its asking the controller to ask for the endpoint class,
//not to figure out how tickets are retrieved.
//this delegates the work

// then wraps the data in http 200 and json response


    [HttpPost]
    public async Task<IActionResult> CreateTicket([FromBody] CreateTicketDto dto)
    {
        try
        {
            var created = await _createTicket.ExecuteAsync(dto);
            return Created($"/api/tickets/{created.Id}", created);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }

}

// what is going on here?

//before this controller, the dbContext was injected into a lamba, and route is defined in program.cs

//now , this controllers dbcontext is injected into the contructor, then the route is defined 
// by attributes, and the http logic is grouped in one class. though the query itself did not change

// dbcontext is injected into an endpoint class
//endpoint class is injected into a controller
// route is defined using attributes
// http logic is grouped in one class
// gthe database  query itself did not change