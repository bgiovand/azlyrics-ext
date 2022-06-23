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
export declare const getTrack: (url: string) => Promise<GetTrackReturn>;
