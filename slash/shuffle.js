const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("shuffle")
    .setDescription("Reproduce la musica aleatoriamente."),
  run: async ({ client, interaction }) => {
    const queue = client.player.getQueue(interaction.guildId);

    if (!queue)
      return await interaction.editReply("No hay canciones en la lista.");

    queue.shuffle();
    await interaction.editReply(
      `La lista de ${queue.tracks.length} ahora se reproducira aleatoriamente!`
    );
  },
};
