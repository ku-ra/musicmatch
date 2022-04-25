import sequelize from '../../sequelize'

import { Order, Sequelize } from 'sequelize'
import { MatchInstance } from '../../sequelize/models/match.model';

const Matches = sequelize.models.Matches;

export const getAll = async () => {
    return await Matches.findAll({ attributes: ['firstUserId', 'secondUserId', 'scoreAverage', 'scoreArtists', 'scoreGenre', 'scoreTrack'] }) as MatchInstance[];
}

export const getByFirstUserIdReduced = async (userId: number) => {
    return await Matches.findOne({ attributes: ['secondUserId', 'scoreAverage', 'scoreArtists', 'scoreGenre', 'scoreTrack', 'updatedAt'], where: { firstUserId: userId }} ) as MatchInstance;
}

export const getByFirstUserIdDetailed = async (userId: number) => {
    return await Matches.findOne({ attributes: ['secondUserId', 'artists', 'genres', 'tracks', 'scoreAverage', 'scoreArtists', 'scoreGenre', 'scoreTrack', 'updatedAt'], where: { firstUserId: userId }} ) as MatchInstance;
}

export const getByFirstUserIdUserInfo = async (userId: number, limit: number, offset: number) => {
    console.log(limit, offset)
    return await Matches.findAll({ 
        attributes: ['secondUserId', 'scoreAverage', 'scoreArtist', 'scoreGenre', 'scoreTrack', 'updatedAt'], 
        where: { firstUserId: userId },
        include: [
            { 
                model: sequelize.models.Users, attributes: ['avatar', 'country', 'username', 'spotifyUrl'], 
            }
        ],
        order: [['scoreAverage', 'DESC']],
        limit: limit,
        offset: offset
    }) as MatchInstance[];
}

export const updateSeen = async (firstUserId: number, secondUserId: number) => {
    return (await Matches.update({ seen: true }, { where: { firstUserId: firstUserId, secondUserId: secondUserId }}))[0];
}

export const update = async (userId: number, matches: string[], artists: string[], genres: string[], tracks: string[], scoreAverage: number, scoreArtists: number, scoreGenre: number, scoreTrack: number ) => {
    return (await Matches.update({ matches: matches, artists: artists, genres: genres, tracks: tracks, scoreAverage: scoreAverage, scoreArtists: scoreArtists, scoreGenre: scoreGenre, scoreTrack: scoreTrack }, { where: { firstUserId: userId}}))[0];
}

export const create = async (firstUserId: number, secondUserId: number, artists: string[], genres: string[], tracks: string[], scoreAverage: number, scoreArtist: number, scoreGenre: number, scoreTrack: number) => {
    return await Matches.create({ 
        firstUserId: firstUserId, secondUserId: secondUserId, 
        artists: artists, genres: genres, tracks: tracks, 
        scoreAverage: scoreAverage, scoreArtist: scoreArtist, scoreGenre: scoreGenre, scoreTrack: scoreTrack 
    }) as MatchInstance;
}