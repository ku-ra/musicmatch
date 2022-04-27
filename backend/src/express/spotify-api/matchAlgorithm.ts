import * as Users from '../interfaces/user.interface';
import * as SpotifyData from '../interfaces/spotifyData.interface';

export type Match = {
    userId: number,
    matches: MatchInfo[]
}

export type MatchInfo = {
    matchUserId: number,
    infoArtists: string[],
    infoGenres: string[],
    infoTracks: string[],
    matchGenre: number,
    matchArtist: number,
    matchTrack: number,
    matchOverall: number,
}


export const findMatches = async (userId: number) => {
    const userData = await SpotifyData.getInfoByUserId(userId);
    const matchData = await SpotifyData.getAll();

    let matches: Match = { userId: userId, matches: [] }

    for (let i = 0; i < matchData.length; i++) {
        const data = matchData[i];

        if (userId === data.userId) {
            continue;
        }

        const genres = userData.genres.filter(genre => data.genres.includes(genre));       
        const artists = userData.artists.filter(artist => data.artists.includes(artist));
        const tracks = userData.tracks.filter(track => data.tracks.includes(track));

        if (genres.length == 0 && artists.length == 0 && tracks.length == 0) {
            continue;
        }

        const matchGenre = +(genres.length / userData.genres.length).toFixed(2);
        const matchArtist = +(artists.length / userData.artists.length).toFixed(2);
        const matchTrack = +(tracks.length / userData.tracks.length).toFixed(2);

        const matchOverall = +(matchGenre * 0.45 + matchArtist * 0.45 + matchTrack * 0.1).toFixed(2);

        console.log(genres);

        matches.matches.push({ matchUserId: data.userId, infoArtists: artists, infoGenres: genres, infoTracks: tracks, matchGenre: matchGenre, matchArtist: matchArtist, matchTrack: matchTrack, matchOverall: matchOverall });
    }

    return matches;
}