using Microsoft.Extensions.Hosting;
using NetCord;
using NetCord.Hosting.Gateway;
using NetCord.Hosting.Services;
using NetCord.Hosting.Services.ApplicationCommands;
using NetCord.Rest;

var builder = Host.CreateApplicationBuilder(args);

builder.Services
    .AddDiscordGateway()
    .AddApplicationCommands();

var host = builder.Build();
host.AddSlashCommand("ping", "Ping!", () => "Pong!")
    .AddUserCommand("Username", (User user) => user.Username)
    .AddMessageCommand("Length", (RestMessage message) => message.Content.Length.ToString());

host.AddModules(typeof(Program).Assembly);

host.UseGatewayEventHandlers();

await host.RunAsync();