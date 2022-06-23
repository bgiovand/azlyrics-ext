import axios from "axios";
import cheerio from "cheerio";
import { constants } from "./util";

export interface GetTrackReturn {
    title: string;
    artist: string;
    lyrics: string;
    artworkURL: string;
}

/**
 * Fetches a song from AZLyrics.com
 * @param url AZLyrics URL of the track
 * @example const songs = await AZLyrics.getTrack("https://www.azlyrics.com/lyrics/alanwalker/faded.html");
 */
export const getTrack = async (url: string) => {
    if (!url || typeof url !== "string")
        throw new Error(constants.typeErr("url", "string", typeof url));

    let html: string;
    try {
        const res = await axios.get<string>(url, {
            headers: {
                "User-Agent": constants.userAgent,
            },
            responseType: "text",
        });
        html = res.data;
    } catch (err) {
        throw new Error("Failed to fetch site!");
    }

    try {
        const $ = cheerio.load(html);
        const artwork = $(".album-image").attr('src');
        const rgt = $(".ringtone");
        const title = rgt.nextAll("b").first();
        const lyrics = rgt.nextAll("div").first();
        const artist = $(".lyricsh");
        

        const result: GetTrackReturn = {
            title: title.text().trim().slice(1, -1),
            artist: artist.text().trim().slice(0, -7),
            lyrics: lyrics.text().trim(),
            artworkURL: !artwork ? "" : `https://www.azlyrics.com${artwork}`,
        };

        return result;
    } catch (err) {
        throw new Error("Could not parse the site!");
    }
};
