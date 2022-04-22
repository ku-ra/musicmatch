import SpotifyWebApi from 'spotify-web-api-node';

export const getUserId = async (accessToken: string) => {
    const Spotify = new SpotifyWebApi({accessToken: accessToken});
    const response = await Spotify.getMe().catch((error) => { console.log(error); })

    if (response) {
        return response.body.id;
    }

    return null;
}

export const getUserData = async (accessToken: string) => {
    const Spotify = new SpotifyWebApi({accessToken: accessToken});
    const response = await Spotify.getMe().catch((error) => { console.log(error); })

    if (response) {
        return {
            username: response.body.display_name,
            email: response.body.email,
            avatar: response.body.images,
            country: response.body.country
        };
    }  
    
    return null;
}

export const getNewToken = async () => {
    var Spotify = new SpotifyWebApi();
    Spotify.refreshAccessToken();
    Spotify.getClientId();
}
