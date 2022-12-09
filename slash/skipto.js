const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("skipa")
    .setDescription("Salta a una cancion especifica.")
    .addNumberOption((option) =>
      option
        .setName("tracknumber")
        .setDescription("The track to skip to")
        .setMinValue(1)
        .setRequired(true)
    ),
  run: async ({ client, interaction }) => {
    const queue = client.player.getQueue(interaction.guildId);

    if (!queue)
      return await interaction.editReply("No hay canciones en la lista.");

    const trackNum = interaction.options.getNumber("tracknumber");
    if (trackNum > queue.tracks.length)
      return await interaction.editReply("Numero de cancion invalido, mmg.");
    queue.skipTo(trackNum - 1);

    await interaction.editReply(
      `Se ha saltado a la cancion numero ${trackNum}.`
    );
  },
};
