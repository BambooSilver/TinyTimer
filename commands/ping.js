module.exports = {
  data: {
    name: 'ping',
    description: 'Pings the bot and shows the latency'
  },
  execute(interaction, client) {
    interaction.reply(`Latency is ${Date.now() - interaction.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`);
  }
};