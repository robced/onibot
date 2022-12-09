const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("parar")
    .setDescription("Detener la musica."),
  run: async ({ client, interaction }) => {
    const queue = client.player.getQueue(interaction.guildId);

    if (!queue)
      return await interaction.editReply("No hay canciones en la lista.");

    queue.destroy();
    await interaction.editReply("MMG! Digo, bye!");
  },
};
