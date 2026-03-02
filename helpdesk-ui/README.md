<!-- Improved compatibility of back to top link -->
<a id="readme-top"></a>


<br />

<h3 align="center">HelpDeskTickets — Full Stack IT Ticketing System (Dockerized)</h3>

  <p align="center">
    A production-style full-stack Help Desk Ticketing application built with ASP.NET Core, SQL Server, Next.js, and Docker Compose.  
    Designed to simulate a real internal IT support tool with tickets, comments, status tracking, and containerized deployment.
</div>

---

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#architecture-highlights">Architecture Highlights</a></li>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started (Docker)</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#api-overview">API Overview</a></li>
    <li><a href="#docker-architecture">Docker Architecture</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#why-this-project-stands-out">Why This Project Stands Out</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

---

## About The Project


HelpDeskTickets is a full-stack, containerized IT ticketing system inspired by real internal enterprise support tools.  
It allows users to create, update, and resolve tickets while supporting a relational comment system with timestamps and DTO-based API design.

This project was built to demonstrate real-world engineering practices including:
- Clean backend architecture (DTOs + endpoints)
- Full Docker container orchestration
- SQL Server integration
- Type-safe frontend with Next.js
- Internal container networking (api ↔ db ↔ web)


<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

### Architecture Highlights

- ASP.NET Core 8 Web API with Endpoint pattern
- DTO projection to prevent JSON serialization cycles
- EF Core + SQL Server (Dockerized)
- Next.js App Router frontend
- Comment system with CreatedAt / UpdatedAt tracking
- Multi-container Docker Compose environment
- Production Next.js build inside Docker

---

### Built With

* [Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
* [React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
* ASP.NET Core 8
* Entity Framework Core
* SQL Server 2022 (Docker)
* Docker & Docker Compose

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---

## Getting Started (Docker)

### Prerequisites

Make sure you have installed:

- Docker Desktop
- Docker Compose (included with Docker Desktop)
- Git

Verify installation:
```sh
docker --version
docker compose version
```

Installation:

Clone the repository

```sh
git clone https://github.com/github_username/repo_name.git
cd repo_name
```

Create a .env file in the project root
(This is required for SQL Server + API connection)

```sh
SA_PASSWORD=YourStrongPassword123!
DB_CONNECTION=Server=db,1433;Database=HelpDeskTicketsDB;User Id=sa;Password=YourStrongPassword123!;TrustServerCertificate=True;Encrypt=False;MultipleActiveResultSets=True
```
⚠️ Note: Password must meet SQL Server complexity requirements.

---

### Run the full stack with Docker

```sh
docker compose up --build
```

This will automatically start:

- SQL Server container (db)

- ASP.NET Core API (api)

- Next.js Frontend (web)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### API Overview

Core endpoints:

- GET    /api/tickets
- GET    /api/tickets/{id}
- PUT    /api/tickets/{id}
- GET    /api/tickets/{id}/comments
- POST   /api/tickets/{id}/comments

Design decisions:


- DTOs used instead of direct entity exposure
- Ordered comment retrieval (latest first)
- Proper async EF Core queries
- Clean separation of Models, DTOs, and Endpoints



### Docker Architecture

This project is fully containerized using a 3-service architecture:
```sh
Services:
db   -> SQL Server 2022 container
api  -> ASP.NET Core 8 (port 8080 internal)
web  -> Next.js production build
```
---
### Key engineering details:

- Multi-stage .NET Dockerfile (SDK → Runtime)

- Healthchecks for database readiness

- Internal networking using Server=db,1433

- Environment variable configuration via .env

- Production-ready frontend build inside container

This setup allows reviewers to run the entire system with a single command:
```sh
docker compose up --build
```
<p align="right">(<a href="#readme-top">back to top</a>)</p>


### Roadmap

- Authentication (JWT / Azure AD)
- Edit & delete comments
- Pagination for tickets
- Role-based access (Admin vs User)
- CI/CD pipeline (GitHub Actions)
- Cloud deployment (AWS / Azure Containers)
- Audit logging for ticket updates

See the open issues
for future improvements.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


### Why This Project Stands Out

Unlike basic CRUD portfolio apps, this project demonstrates:

- Real container orchestration (Docker Compose)
- Backend architecture with DTO layering
- Relational comment system (not flat data)
- Handling of serialization cycles (production concern)
- Internal tool design inspired by enterprise IT systems
- Full-stack integration across API, DB, and UI

This reflects practical experience closer to real workplace applications rather than tutorial-level projects.

## Contact

### Jorge Lazaro
Software Developer / IT Analyst
LinkedIn: https://www.linkedin.com/in/jorge-lazaro-13607b1ba/

Project Link:
https://github.com/Jl-2001/HelpDesk-Tickets-C-
<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Acknowledgments

- ASP.NET Core Documentation
- Next.js Documentation
- Docker Official Images
- EF Core Docs

