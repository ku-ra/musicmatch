import moment from "moment";

import { Request, Response } from "express";
import { analyseData } from "../spotify-api/analyseData";

import * as Users from '../interfaces/user.interface'
import * as Matches from '../interfaces/match.interface'
import * as SpotifyData from '../interfaces/spotifyData.interface'

import * as Tracks from '../interfaces/track.interface'
import * as Artists from '../interfaces/artist.interface'
import * as MatchTracks from '../interfaces/matchTrack.interface'
import * as MatchArtists from '../interfaces/matchArtist.interface'

import * as Utils from '../../utils/utils'

import { clientToken, refreshToken } from "../spotify-api/handleTokens";
import { findMatches } from "../spotify-api/matchAlgorithm";
import { getArtists, getTracks } from "../spotify-api/requestData";

export const getUsersByArtist = async (req: Request, res: Response) => {
    if (!req.user) {
        return res.sendStatus(403);
    }

    if (!Utils.containsKeys(req.body, ['artistId'])) {
        return res.sendStatus(400);
    }

    const users = await SpotifyData.getUsersByArtist(req.body.artistId);

    if (!users) {
        return res.sendStatus(500);
    }

    return res.status(200).json(users);
} 

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

const matchUser = async (userId: number) => {
    const matches = await findMatches(userId);

    matches.matches.forEach((match) => {
        Matches.createOrUpdate(matches.userId, match.matchUserId, match.infoArtists, match.infoGenres, match.infoTracks, match.matchOverall, match.matchArtist, match.matchGenre, match.matchTrack).then(matchEntry => {
            match.infoTracks.forEach((track) => {
                console.log(track);
                MatchTracks.create(track, matchEntry.matchId).catch((error) => { console.log(error) })
            });
            match.infoArtists.forEach((artist) => {
                console.log(artist);
                MatchArtists.create(artist, matchEntry.matchId).catch((error) => { console.log(error) })
            });
        })
        .catch(error => {
            console.log(error);
        })
    })
}

export const analyseUser = async (req: Request, res: Response, next: Function) => {
    if (!req.user) {
        return;
    }
    
    const user = await Users.getById(req.user.userId);

    if (!user) {
        return next();
    }

    const accessToken = await refreshToken(user.spotifyRefreshToken);

    if (!accessToken) {
        return next();
    }

    const entry = await SpotifyData.getByUserId(req.user.userId);

    if (entry && moment(new Date()).diff(moment(entry.updatedAt), 'hours') < 12) {
        return next();
    }

    const data = await analyseData(accessToken);

    if (!data) {
        return next();
    }

    await insertTracks(data.tracks);
    await insertArtists(data.artists);

    if (!entry) {
        const row = await SpotifyData.create({userId: req.user.userId, tracks: data.tracks, artists: data.artists, genres: data.genres});

        if (!row) {
            return next();
        }
        
    } else {
        const updated = await SpotifyData.update(req.user.userId, data.genres, data.tracks, data.artists);

        if (!updated) {
            return next();
        }
    }

    matchUser(req.user.userId);

    next();
}

const insertTracks = async (trackIds: string[]) => {
    const token = await clientToken();

    if (!token) {
        return false;
    }

    const tracks = await getTracks(token, trackIds)

    if (!tracks) {
        return false;
    }

    tracks.forEach(track => {
        const artists = track.artists.map(artist => { return artist.name });
        Tracks.create(track.id, track.name, track.album.images[0].url, artists, track.uri)
        .catch(error => {
            console.log(error);
        });     
    });

    return true;
}

const insertArtists = async (artistIds: string[]) => {
    const token = await clientToken();

    if (!token) {
        return false;
    }

    const artists = await getArtists(token, artistIds)

    if (!artists) {
        return false;
    }

    artists.forEach(artist => {
        Artists.create(artist.id, artist.name, artist.images[0].url, artist.uri)
        .catch(error => {
            console.log(error);
        });         
    });

    return true;
}