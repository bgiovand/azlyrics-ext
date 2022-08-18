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
exports.search = void 0;
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = __importDefault(require("cheerio"));
const util_1 = require("./util");
/**
 * Searches for songs in AZLyrics.com
 * @param search Search terms
 * @param options Options
 * @example const songs = await AZLyrics.search("faded");
 */
const search = (search, options = {}) => __awaiter(void 0, void 0, void 0, function* () {
    if (!search || typeof search !== "string")
        throw new Error(util_1.constants.typeErr("search", "string", typeof search));
    if (!options || typeof options !== "object")
        throw new Error(util_1.constants.typeErr("options", "object", typeof options));
    if (options.page && typeof options.page !== "number")
        throw new Error(util_1.constants.typeErr("options.page", "number", typeof options.page));
    const url = `${util_1.constants.searchUrl}?q=${encodeURIComponent(search)}&w=songs&p=${options.page || 1}&x=0b9e5ef2d4fc5a5820f54324ea397cfdb58b1523f045edf536b1b547be94952c`;
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
        const tds = $("table td.text-left");
        const songs = [];
        tds.each(function () {
            const ele = $(this);
            const fullTitle = ele.find("a");
            const title = fullTitle.find("b");
            const artist = ele.children("b").last();
            songs.push({
                title: title.text().slice(1, -1).trim(),
                fullTitle: fullTitle.text().trim(),
                artist: artist.text().trim(),
                url: fullTitle.attr("href"),
            });
        });
        return songs;
    }
    catch (err) {
        throw new Error("Could not parse the site!");
    }
});
exports.search = search;
