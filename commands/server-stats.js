const { SlashCommandBuilder } = require("@discordjs/builders");
const fivem = require("discord-fivem-api");
const server = new fivem.DiscordFivemApi("000.000.00.00:30120");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("server-stats")
    .setDescription('Sender server stats'),
    async execute(interaction, client) {
        await interaction.reply({ content: 'Spiller: ${server.getPlayersOnline()}', ephemeral: true })
    }
}