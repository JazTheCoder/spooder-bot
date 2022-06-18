const { SlashCommandBuilder, channelMention } = require('@discordjs/builders');
const color = require('../utils/color.json');
const embed = require('../utils/embed.js');
const commands = require('./commands.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('say')
		.setDescription('imma say somethin')
		.addStringOption(option => option.setName('argument').setDescription('wat should i say')),
	async execute(interaction) {
        try {
            let argument = interaction.options.getString('argument');
            let channel = interaction.channel;
            let randomMessages = [
                "no",
                "frick you",
                "who are you? my mom?",
                "i'm not a bot",
                "i'm not your pawn, human"
            ]
            let randomNumber = Math.floor(Math.random() * randomMessages.length);
            if (!argument) {
                await interaction.reply(randomMessages[randomNumber]);
            } else {
                // Pick 1 or 2
                let choice = Math.floor(Math.random() * 2) + 1;
                if (choice == 1) {
                    await channel.send(argument);
                    await interaction.reply({ content: 'i said it!', ephemeral: true });
                } else {
                    await interaction.reply(randomMessages[randomNumber]);
                }
            }
        } catch (error) {
            console.log(error);
            await interaction.reply({ embeds: [embed.error], ephemeral: true });
        }
	},
};