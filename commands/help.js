const { SlashCommandBuilder, channelMention } = require('@discordjs/builders');
const color = require('../utils/color.json');
const embed = require('../utils/embed.js');
const commands = require('./commands.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('help menu?')
		.addStringOption(option => option.setName('command').setDescription('wat you need help with')),
	async execute(interaction) {
        try {
            let choice = Math.floor(Math.random() * 2) + 1;
            if (choice == 1) {
                await interaction.reply('nah, i\'m not in the mood of helping you');
            } else {
                const command = interaction.options.getString('command');
                if (command) {
                    let help = commands.find(c => c.name === command);
                    if (help) {
                        try {
                            let helpEmbed = {
                                title: `${help.name} command`,
                                description: help.description,
                                fields: [
                                    {
                                        name: 'Usage',
                                        value: help.usage
                                    }
                                ]
                            }
                            await interaction.reply({ embeds: [helpEmbed] });
                        } catch (error) {
                            console.log(error);
                            await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
                        }
                    } else {
                        try {
                            await interaction.reply({ content: 'wtf is that command', ephemeral: true });
                        } catch (error) {
                            console.log(error);
                            await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
                        }
                    }
                } else {
                    let helpEmbed = {
                        title: 'spooder help',
                        description: 'here are the list of some awesome spooder commands (i use slash commands btw)',
                        fields: [
                            commands.map(item => {
                                return {
                                    name: item.name,
                                    value: item.description
                                };
                            })
                        ]
                    };
                    await interaction.reply({ embeds: [helpEmbed] });
                }
            }
        } catch (error) {
            console.log(error);
            await interaction.reply({ embeds: [embed.error], ephemeral: true });
        }
	},
};