import DiscordOauth2 from "discord-oauth2";


export const connect = async () => {
    const oauth = new DiscordOauth2();

    const response = await oauth.tokenRequest({
        clientId: "332269999912132097",
        clientSecret: "937it3ow87i4ery69876wqire",
    
        code: "query code",
        scope: "identify",
        grantType: "authorization_code",
    
        redirectUri: "http://localhost:8001/auth/discord/callback",
    });

    
}
