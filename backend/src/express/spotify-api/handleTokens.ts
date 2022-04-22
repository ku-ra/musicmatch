import { SpotifyRefreshHandler } from './apiFactory';

export const refreshToken = async (refreshToken: string) => {
    const spotifyHandler = SpotifyRefreshHandler(refreshToken);

    try {
        return (await spotifyHandler.refreshAccessToken()).body.access_token;
    }
    catch (error) {
        console.log(error);
    }

    return undefined;
}