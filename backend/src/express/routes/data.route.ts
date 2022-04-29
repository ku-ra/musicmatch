import { Request, Response } from "express";
import { getAuthUrl, getToken, getUserData, refreshToken } from "../integrations/discord";

import * as Artists from "../interfaces/artist.interface";
import * as Utils from '../../utils/utils'

import config from '../../config/config.json';

export const getArtists = async (req: Request, res: Response) => {
    if (!req.user) {
        return res.sendStatus(403);
    }

    const artists = await Artists.getAll();

    if (!artists) {
        return res.sendStatus(500);
    }

    return res.status(200).json(artists);
}