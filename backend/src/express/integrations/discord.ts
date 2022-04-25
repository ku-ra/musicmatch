import DiscordOauth2 from "discord-oauth2";
import { Request, Response } from "express";
import * as Discords from "../interfaces/discord.interface";

import config from '../../config/config.json'

const oauth = new DiscordOauth2({
    clientId: config.DISCORD.CLIENT_ID,
    clientSecret: config.DISCORD.CLIENT_SECRET,
    redirectUri: config.DISCORD.CALLBACK_URL,
})

export const connect = async (req: Request, res: Response) => {
    return res.redirect(oauth.generateAuthUrl({ responseType: "code", prompt: "consent", scope: "identify" }));
}

export const callback = async (req: Request, res: Response) => {
    if (!req.user) {
        return res.sendStatus(403);
    }

    if (!req.query.code) {
        return res.sendStatus(400);
    }

    const code = req.query.code.toString();

    const response = await oauth.tokenRequest({
        code: code,
        scope: "identify",
        grantType: "authorization_code",
    }).catch(error => { console.log(error) });

    if (response) {

        const connected = await Discords.create(req.user.userId, response.access_token, response.refresh_token, response.expires_in, response.scope).catch(error => { console.log(error); });

        if (!connected) {
            return res.status(500).redirect(config.HOME);
        }

        return res.status(200).redirect(config.HOME);
    }

    return res.status(500).redirect(config.HOME);
}
