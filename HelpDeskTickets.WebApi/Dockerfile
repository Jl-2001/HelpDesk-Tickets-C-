FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY HelpDeskTickets.WebApi.csproj ./
RUN dotnet restore ./HelpDeskTickets.WebApi.csproj

COPY . .
RUN dotnet publish ./HelpDeskTickets.WebApi.csproj -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app

ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080

COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "HelpDeskTickets.WebApi.dll"]
