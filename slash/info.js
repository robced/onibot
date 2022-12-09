const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("info")
    .setDescription("Muestra informacion acerca de la canción actual."),
  run: async ({ client, interaction }) => {
    const queue = client.player.getQueue(interaction.guildId);

    if (!queue)
      return await interaction.editReply("No hay canciones en la lista.");

    let bar = queue.createProgressBar({
      queue: false,
      length: 19,
    });

    const song = queue.current;

    await interaction.editReply({
      embeds: [
        new EmbedBuilder()
          .setThumbnail(song.thumbnail)
          .setDescription(
            `Reproduciendo [${song.title}](${song.url})\n\n` + bar
          ),
      ],
    });
  },
};
