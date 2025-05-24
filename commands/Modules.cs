using NetCord.Rest;
using NetCord.Services.ApplicationCommands;
using NetCord;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TinyTimer.commands
{
    public class Modules : ApplicationCommandModule<ApplicationCommandContext>
    {
        [SlashCommand("pong", "Pong!")]
        public static string Pong() => "Ping!";

        [UserCommand("ID")]
        public static string Id(User user) => user.Id.ToString();

        [MessageCommand("Timestamp")]
        public static string Timestamp(RestMessage message) => message.CreatedAt.ToString();
    }
}
