const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");
const { QueryType } = require("discord-player");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Reproduce una cancion.")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("song")
        .setDescription("Reproduce una sola cancion.")
        .addStringOption((option) =>
          option
            .setName("url")
            .setDescription("the song's url")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("playlist")
        .setDescription("Reproduce una playlist")
        .addStringOption((option) =>
          option
            .setName("url")
            .setDescription("Link de la playlist")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("buscar")
        .setDescription("Busca una cancion")
        .addStringOption((option) =>
          option
            .setName("nombre")
            .setDescription("Nombre de la cancion")
            .setRequired(true)
        )
    ),
  run: async ({ client, interaction }) => {
    if (!interaction.member.voice.channel)
      return interaction.editReply(
        "Entra a un chat de voz, mmg. Digo, glu, glu."
      );

    const queue = await client.player.createQueue(interaction.guild);
    if (!queue.connection)
      await queue.connect(interaction.member.voice.channel);

    let embed = new EmbedBuilder();

    if (interaction.options.getSubcommand() === "song") {
      let url = interaction.options.getString("url");
      const result = await client.player.search(url, {
        requestedBy: interaction.user,
        searchEngine: QueryType.YOUTUBE_VIDEO,
      });
      if (result.tracks.length === 0)
        return interaction.editReply("No se encontro na'.");

      const song = result.tracks[0];
      await queue.addTrack(song);
      embed
        .setDescription(
          `**[${song.title}](${song.url})** se agrego a la lista.`
        )
        .setThumbnail(song.thumbnail)
        .setFooter({ text: `Duracion: ${song.duration}` });
    } else if (interaction.options.getSubcommand() === "playlist") {
      let url = interaction.options.getString("url");
      const result = await client.player.search(url, {
        requestedBy: interaction.user,
        searchEngine: QueryType.YOUTUBE_PLAYLIST,
      });

      if (result.tracks.length === 0)
        return interaction.editReply("No se encontro na'.");

      const playlist = result.playlist;
      await queue.addTracks(result.tracks);
      embed
        .setDescription(
          `**${result.tracks.length} canciones de [${playlist.title}](${playlist.url})** se han agrego a la lista.`
        )
        .setThumbnail(playlist.thumbnail);
    } else if (interaction.options.getSubcommand() === "buscar") {
      let url = interaction.options.getString("nombre");
      const result = await client.player.search(url, {
        requestedBy: interaction.user,
        searchEngine: QueryType.AUTO,
      });

      if (result.tracks.length === 0)
        return interaction.editReply("No se encontro na'.");

      const song = result.tracks[0];
      await queue.addTrack(song);
      embed
        .setDescription(
          `**[${song.title}](${song.url})** se agrego a la lista.`
        )
        .setThumbnail(song.thumbnail)
        .setFooter({ text: `Duracion: ${song.duration}` });
    }
    if (!queue.playing) await queue.play();
    await interaction.editReply({
      embeds: [embed],
    });
  },
};
