FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY HelpDeskTickets.WebApi.csproj ./
RUN dotnet restore ./HelpDeskTickets.WebApi.csproj

COPY . ./
RUN dotnet publish ./HelpDeskTickets.WebApi.csproj -c Release -o /app/out

FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/out ./

EXPOSE 5127
ENV ASPNETCORE_URLS=http://+:5127
ENTRYPOINT ["dotnet", "HelpDeskTickets.WebApi.dll"]