const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pausa")
    .setDescription("Pausar musica."),
  run: async ({ client, interaction }) => {
    const queue = client.player.getQueue(interaction.guildId);

    if (!queue)
      return await interaction.editReply("No hay canciones en la lista.");

    queue.setPaused(true);
    await interaction.editReply(
      "La musica se pauso. Usa `/resumir` para continuar la fiesta."
    );
  },
};
