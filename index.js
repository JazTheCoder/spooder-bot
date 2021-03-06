require('dotenv').config()
const fs = require('node:fs');
const path = require('node:path');
const {Client, Collection, Intents } = require('discord.js');
const token = process.env.TOKEN;

const client = new Client({
	intents: [Intents.FLAGS.GUILDS],
	presence: {
        status: 'online',
        afk: false,
        activities: [{
            name: 'haha web go brrrr',
            type: 'PLAYING'
        }]
    }
});

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}

client.once('ready', () => {
	console.log(`Logged in as ${client.user.tag}`);
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
	}
});

client.login(token);