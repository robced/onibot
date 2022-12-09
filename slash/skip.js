const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("skip")
    .setDescription("Salta a la siguiente cancion."),
  run: async ({ client, interaction }) => {
    const queue = client.player.getQueue(interaction.guildId);

    if (!queue)
      return await interaction.editReply("No hay canciones en la lista.");

    const currentSong = queue.current;

    queue.skip();
    await interaction.editReply({
      embeds: [
        new MessageEmbed()
          .setDescription(`${currentSong.title} ha sido saltada.`)
          .setThumbnail(currentSong.thumbnail),
      ],
    });
  },
};
