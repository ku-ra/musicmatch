import { Request, Response } from "express";
import { getAuthUrl, getToken, getUserData, refreshToken } from "../integrations/discord";

import * as Discords from "../interfaces/discord.interface";
import * as Utils from '../../utils/utils'

import config from '../../config/config.json';

export const connect = async (req: Request, res: Response) => {
    res.redirect(getAuthUrl());
}

export const callback = async (req: Request, res: Response) => {
    if (!req.user) {
        return res.sendStatus(403);
    }

    if (!req.query.code) {
        return res.sendStatus(400);
    }

    const code = req.query.code.toString();

    const response = await getToken(code);

    if (response) {
        const userInfo = await getUserData(response.access_token);

        if (!userInfo) {
            return res.sendStatus(500);
        }

        const connected = await Discords.create(req.user.userId, response.access_token, response.refresh_token, response.expires_in, response.scope, userInfo.username, userInfo.discriminator).catch(error => { console.log(error); });

        if (!connected) {
            return res.status(500).redirect(config.HOME);
        }

        return res.status(200).redirect(config.HOME);
    }

    return res.status(500).redirect(config.HOME);
}