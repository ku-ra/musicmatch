import DiscordOauth2 from "discord-oauth2";
import { Request, Response } from "express";

import config from '../../config/config.json'
import axios from "axios";

const oauth = new DiscordOauth2({
    clientId: config.DISCORD.CLIENT_ID,
    clientSecret: config.DISCORD.CLIENT_SECRET,
    redirectUri: config.DISCORD.CALLBACK_URL,
})

export const getAuthUrl = () => {
    return oauth.generateAuthUrl({ responseType: "code", prompt: "consent", scope: "identify" });
}

export const getToken = async (code: string) => {
    const response = await oauth.tokenRequest({
        code: code,
        scope: "identify",
        grantType: "authorization_code",
    }).catch(error => { console.log(error) });

    if (response) {
        return response;
    }

    return null;
}

export const getUserData = async (accessToken: string) => {
    const data = await oauth.getUser(accessToken).catch(error => { console.log(error) });

    if (data) {
        return data;
    }

    return null;
}

export const refreshToken = async (refreshToken: string) => {
    const token = await oauth.tokenRequest({
        scope: 'identify',
        grantType: "refresh_token",
        refreshToken: refreshToken,
    }).catch(error => { console.log(error) });

    if (token) {
        return token.access_token;
    }

    return null;
}
