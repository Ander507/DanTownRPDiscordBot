const { Client, Events, GatewayIntentBits, Embed, ActivityType } = require('discord.js');
const dotenv = require('dotenv');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const fivem = require("discord-fivem-api");
const server = new fivem.DiscordFivemApi("95.214.55.215:30120");


dotenv.config();

client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);

	setInterval(()=>{
		server.getPlayersOnline().then((res) => client.user.setPresence({
			activities: [{ name: `Online Spiller: ${res}`, type: ActivityType.Watching }],
			status: 'dnd',
		  }));
		}, 5000)

    client.user.setPresence({ game: { name: 'te' }, status: 'dnd' });
});

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	if (interaction.commandName === 'ping') {
		await interaction.reply({ content: 'Pong!', ephemeral: true });
	}

    if (interaction.commandName === 'server-status') {
		await server.getPlayersOnline().then((res) => interaction.reply({ content: `Online Spiller: ${res}`, ephemeral: true }));
	}
});

client.login(process.env.DISCORD_TOKEN);
