import SpotifyWebApi from 'spotify-web-api-node';
import { SpotifyHandler } from './apiFactory';

export const getHistory = async (accessToken: string) => {
    const spotifyHandler = SpotifyHandler(accessToken);
    const recentTracks = await recentlyListened(spotifyHandler);
}

const recentlyListened = async (spotifyHandler: SpotifyWebApi, before?: number) => {
    return await spotifyHandler.getMyRecentlyPlayedTracks(before ? { before: before, limit: 50 } : { limit: 50 });
}

const extractAllListenedTracks = async (spotifyHandler: SpotifyWebApi) => {
    // Finish implementeation using pagination with before timestamp
}

export const favoriteArtists = async (accessToken: string, limit: number) => {
    const spotifyHandler = SpotifyHandler(accessToken);
    console.log(spotifyHandler);
    const topArtists = await spotifyHandler.getMyTopArtists({limit: limit});
    return topArtists.body.items.map((artist) => { return artist.name })
}

export const favoriteTracks = async (accessToken: string, limit: number) => {
    const spotifyHandler = SpotifyHandler(accessToken);
    const topTracks = await spotifyHandler.getMyTopTracks({limit: limit});
    return topTracks.body.items.map((track) => { return track.name })
}

export const favoriteGenres = async (accessToken: string, limit: number) => {
    const spotifyHandler = SpotifyHandler(accessToken);
    const topArtists = await spotifyHandler.getMyTopArtists({limit: limit});
    return Array.from(new Set<string>(topArtists.body.items.map((artist) => { return artist.genres }).flat(1)));
}