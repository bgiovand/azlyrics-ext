const azlyrics = require("./dist");

const search = "faded alan";

const test = async () => {
    const songs = await azlyrics.search(search);
    console.log(`Results for search:`);
    console.log(
        songs
            .map((x, i) => `${i + 1}) ${x.fullTitle} - ${x.artist}`)
            .join("\n"),
        "\n"
    );

    const track = await azlyrics.getTrack(songs[0].url);
    console.log(
        `Lyrics for ${track.title} - ${track.artist} (${songs[0].url}):`
    );
    console.log(track.lyrics);
};

test();
