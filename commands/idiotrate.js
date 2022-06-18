const { SlashCommandBuilder, channelMention } = require('@discordjs/builders');
const color = require('../utils/color.json');
const embed = require('../utils/embed.js');
const commands = require('./commands.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('idiotrate')
		.setDescription('are you an idiot? well, let\'s see')
		.addUserOption(option => option.setName('user').setDescription('who should i test')),
	async execute(interaction) {
        try {
            let argument = interaction.options.getUser('user');
            let randomPercentage = Math.floor(Math.random() * 100);
            if (!argument) {
                let embed = {
                    title: `idiot rate of ${interaction.user.username}`,
                    description: `${interaction.user.username} is ${randomPercentage}% idiot`,
                }
                await interaction.reply({ embeds: [embed] });
            } else {
                let embed = {
                    title: `idiot rate of ${argument.username}`,
                    description: `${argument.username} is ${randomPercentage}% idiot`,
                }
                await interaction.reply({ embeds: [embed] });
            }
        } catch (error) {
            console.log(error);
            await interaction.reply({ embeds: [embed.error], ephemeral: true });
        }
	},
};