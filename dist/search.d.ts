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
export declare const search: (search: string, options?: SearchOptions) => Promise<SearchSongEnitity[]>;
