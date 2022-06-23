import axios from "axios";
import cheerio from "cheerio";
import { constants } from "./util";

export interface SearchOptions {
    page?: number;
}

export interface SearchSongEnitity {
    title: string;
    fullTitle: string;
    artist: string;
    url: string;
}

/**
 * Searches for songs in AZLyrics.com
 * @param search Search terms
 * @param options Options
 * @example const songs = await AZLyrics.search("faded");
 */
export const search = async (search: string, options: SearchOptions = {}) => {
    if (!search || typeof search !== "string")
        throw new Error(constants.typeErr("search", "string", typeof search));
    if (!options || typeof options !== "object")
        throw new Error(constants.typeErr("options", "object", typeof options));
    if (options.page && typeof options.page !== "number")
        throw new Error(
            constants.typeErr("options.page", "number", typeof options.page)
        );

    const url = `${constants.searchUrl}?q=${encodeURIComponent(
        search
    )}&w=songs&p=${options.page || 1}&x=757f045b6ab11cf5cd2345d28765250d42d13aac4767104571ca51885b9914e9`;

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
        const tds = $("table td.text-left");

        const songs: SearchSongEnitity[] = [];
        tds.each(function () {
            const ele = $(this);

            const fullTitle = ele.find("a");
            const title = fullTitle.find("b");
            const artist = ele.children("b").last();

            songs.push({
                title: title.text().slice(1, -1).trim(),
                fullTitle: fullTitle.text().trim(),
                artist: artist.text().trim(),
                url: fullTitle.attr("href")!,
            });
        });

        return songs;
    } catch (err) {
        throw new Error("Could not parse the site!");
    }
};
