import { SpotifyHandler } from "./apiFactory";

export const getTracks = async (accessToken: string, ids: string[]) => {
    const spotifyHandler = SpotifyHandler(accessToken);
    const response = await spotifyHandler.getTracks(ids).catch(error => { console.log(error) })
    
    if (response) {
        return response.body.tracks;
    }

    return null;
}

export const getArtists = async (accessToken: string, ids: string[]) => {
    const spotifyHandler = SpotifyHandler(accessToken);
    const response = await spotifyHandler.getArtists(ids).catch(error => { console.log(error) })
    
    if (response) {
        return response.body.artists;
    }

    return null;
}

export const getUser = async (accessToken: string, id: string) => {
    const spotifyHandler = SpotifyHandler(accessToken);
    const response = await spotifyHandler.getUser(id).catch(error => { console.log(error) });

    if (response) {
        return response.body;
    }

    return null;
}