const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("resumir")
    .setDescription("Resumes the music"),
  run: async ({ client, interaction }) => {
    const queue = client.player.getQueue(interaction.guildId);

    if (!queue)
      return await interaction.editReply("No hay canciones en la lista.");

    queue.setPaused(false);
    await interaction.editReply(
      "Continuando la musica. Usa `/pausar` para detener la musica."
    );
  },
};
