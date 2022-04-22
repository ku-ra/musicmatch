
import { favoriteArtists, favoriteGenres, favoriteTracks } from './extractData';

export const analyseData = async (accessToken: string) => {

    const artists = await favoriteArtists(accessToken, 50);
    const tracks = await favoriteTracks(accessToken, 50);
    const genres = await favoriteGenres(accessToken, 50);

    return { artists: artists, tracks: tracks, genres: genres };
}