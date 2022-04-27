import config from '../../config/config.json'
import SpotifyWebApi from "spotify-web-api-node"

export const SpotifyClientHandler = () => {
    return new SpotifyWebApi({clientId: config.SPOTIFY.CLIENT_ID, clientSecret: config.SPOTIFY.CLIENT_SECRET});
}

export const SpotifyHandler = (accessToken: string) => {
    return new SpotifyWebApi({clientId: config.SPOTIFY.CLIENT_ID, clientSecret: config.SPOTIFY.CLIENT_SECRET, accessToken: accessToken});
}

export const SpotifyRefreshHandler = (refreshToken: string) => {
    return new SpotifyWebApi({clientId: config.SPOTIFY.CLIENT_ID, clientSecret: config.SPOTIFY.CLIENT_SECRET, refreshToken: refreshToken});
}