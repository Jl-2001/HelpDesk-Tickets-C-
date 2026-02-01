using Microsoft.EntityFrameworkCore;
using System;
using System.Data.SqlClient;


namespace HelpDeskTickets.WebApi
{
    class Program
    {
        static void Main(string[] args)
        {
            string connectionString = @"Server=.\SQLEXPRESS:DatabaseName;Trusted_Connection=true;TrustServerCertificate=True;";
        }
    }
}
