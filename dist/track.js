"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTrack = void 0;
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = __importDefault(require("cheerio"));
const util_1 = require("./util");
/**
 * Fetches a song from AZLyrics.com
 * @param url AZLyrics URL of the track
 * @example const songs = await AZLyrics.getTrack("https://www.azlyrics.com/lyrics/alanwalker/faded.html");
 */
const getTrack = (url) => __awaiter(void 0, void 0, void 0, function* () {
    if (!url || typeof url !== "string")
        throw new Error(util_1.constants.typeErr("url", "string", typeof url));
    let html;
    try {
        const res = yield axios_1.default.get(url, {
            headers: {
                "User-Agent": util_1.constants.userAgent,
            },
            responseType: "text",
        });
        html = res.data;
    }
    catch (err) {
        throw new Error("Failed to fetch site!");
    }
    try {
        const $ = cheerio_1.default.load(html);
        const artwork = $(".album-image").attr('src');
        const rgt = $(".ringtone");
        const title = rgt.nextAll("b").first();
        const lyrics = rgt.nextAll("div").first();
        const artist = $(".lyricsh");
        const result = {
            title: title.text().trim().slice(1, -1),
            artist: artist.text().trim().slice(0, -7),
            lyrics: lyrics.text().trim(),
            artworkURL: !artwork ? "" : `https://www.azlyrics.com${artwork}`,
        };
        return result;
    }
    catch (err) {
        throw new Error("Could not parse the site!");
    }
});
exports.getTrack = getTrack;
