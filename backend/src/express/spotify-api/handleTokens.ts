import { SpotifyClientHandler, SpotifyRefreshHandler } from './apiFactory';

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

export const clientToken = async () => {
    const spotifyHandler = SpotifyClientHandler();
    const response = await spotifyHandler.clientCredentialsGrant().catch(error => { console.log(error) });
    
    if (response) {
        return response.body.access_token;
    }

    return undefined;
}