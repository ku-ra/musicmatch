import moment from "moment";

import { Request, Response } from "express";
import { analyseData } from "../spotify-api/analyseData";

import * as Users from '../interfaces/user.interface'
import * as SpotifyData from '../interfaces/spotifyData.interface'
import * as Matches from '../interfaces/match.interface'
import * as Utils from '../../utils/utils'

import { refreshToken } from "../spotify-api/handleTokens";
import { findMatches } from "../spotify-api/matchAlgorithm";

export const showMatches = async (req: Request, res: Response) => {
    if (!req.user) {
        return res.sendStatus(403);
    }

    if (!Utils.containsKeys(req.body, ['page'])) {
        return res.sendStatus(400);
    }
    
    const limit = 10;
    const offset = req.body.page ? req.body.page * limit : 0;
    const matches = await Matches.getByFirstUserIdUserInfo(req.user.userId, limit, offset);

    if (!matches) {
        return res.sendStatus(500);
    }

    return res.status(200).json(matches);
}

export const seenMatch = async (req: Request, res: Response) => {
    if (!req.user) {
        return res.sendStatus(403);
    }

    if (!req.body.matchUserId) {
        return res.sendStatus(400);
    }

    const matches = await Matches.updateSeen(req.user.userId, req.body.matchUserId);

    if (!matches) {
        return res.sendStatus(500);
    }

    return res.status(200);
}

export const matchUser = async (req: Request, res: Response) => {
    if (!req.user) {
        return res.sendStatus(403);
    }

    const matches = await findMatches(req.user.userId);

    matches.matches.forEach((match) => {
        Matches.create(matches.userId, match.matchUserId, match.infoArtists, match.infoGenres, match.infoTracks, match.matchOverall, match.matchArtist, match.matchGenre, match.matchTrack);
    })

    return res.status(200).json(matches);
}

export const analyseUser = async (req: Request, res: Response) => {
    if (!req.user) {
        return res.sendStatus(403);
    }
    
    const user = await Users.getById(req.user.userId);

    if (!user) {
        return res.sendStatus(500);
    }

    const accessToken = await refreshToken(user.spotifyRefreshToken);

    if (!accessToken) {
        return res.sendStatus(500);
    }

    const entry = await SpotifyData.getByUserId(req.user.userId);

    if (entry && moment(entry.updatedAt).diff(moment(new Date()), 'minutes') < 5) {
        return res.sendStatus(429);
    }

    const data = await analyseData(accessToken);

    if (!data) {
        return res.sendStatus(500);
    }

    if (!entry) {
        const row = await SpotifyData.create({userId: req.user.userId, tracks: data.tracks, artists: data.artists, genres: data.genres});

        if (row) {
            return res.sendStatus(201);
        }

        return res.sendStatus(500);
    }

    const updated = await SpotifyData.update(req.user.userId, data.genres, data.tracks, data.artists);

    if (!updated) {
        return res.sendStatus(500);
    }

    return res.sendStatus(201);
}