import config from '../../config/config.json'
import SpotifyWebApi from "spotify-web-api-node"

export const SpotifyHandler = (accessToken: string) => {
    console.log("Access Token: ", accessToken)
    return new SpotifyWebApi({clientId: config.SPOTIFY.CLIENT_ID, clientSecret: config.SPOTIFY.CLIENT_SECRET, accessToken: accessToken});
}

export const SpotifyRefreshHandler = (refreshToken: string) => {
    console.log("Refresh Token: ", refreshToken)
    return new SpotifyWebApi({clientId: config.SPOTIFY.CLIENT_ID, clientSecret: config.SPOTIFY.CLIENT_SECRET, refreshToken: refreshToken});
}