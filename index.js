const fs = require('fs');
const path = require('path');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const fetch = require('node-fetch');
const config = require('./config.json');

// Setup client
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();

// Dynamically load command files
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
const commands = [];

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
    commands.push(command.data); // for registration
}

// Register commands & start bot
(async () => {
    console.log("Bot starting!")

    const token = config.token;
    if (!token) throw new Error('Invalid token in config.json');

    console.log("Token grabbed!")

    const ratelimitTest = await fetch(`https://discord.com/api/v9/invites/discord-developers`);
    console.log("Ratelimit check response:", ratelimitTest.status);
    if (!ratelimitTest.ok) {
        console.log('Node is rate-limited. Press Enter to try again later...');
        await new Promise(resolve => process.stdin.once('data', resolve));
        return require('child_process').execSync('kill 1');
    }

    console.log("Login started!");

    await client.login(token);
    console.log("Login successful!");

    await client.application.commands.set(commands);
    console.log('Bot is running.');
})();

// Handle interactions
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) return interaction.reply('This command is not available.');

    try {
        await command.execute(interaction, client);

    } 
    catch (error) {
        console.error(error);
        interaction.reply({ content: 'There was an error executing that command.', ephemeral: true });
    }
});