import sequelize from '../../sequelize'

import { Order, Sequelize } from 'sequelize'
import { MatchInstance } from '../../sequelize/models/match.model';

const Matches = sequelize.models.Matches;

export const getAll = async () => {
    return await Matches.findAll({ attributes: ['firstUserId', 'secondUserId', 'scoreAverage', 'scoreArtists', 'scoreGenre', 'scoreTrack'] }) as MatchInstance[];
}

export const getByIds = async (firstUserId: number, secondUserId: number) => {
    return await Matches.findOne({where: { firstUserId: firstUserId, secondUserId: secondUserId }});
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
        attributes: ['secondUserId', 'artists', 'tracks', 'genres', 'scoreAverage', 'scoreArtist', 'scoreGenre', 'scoreTrack', 'updatedAt'], 
        where: { firstUserId: userId },
        include: [
            { 
                model: sequelize.models.Users, attributes: ['avatar', 'country', 'username', 'spotifyUrl'], 
            },
            {
                model: sequelize.models.MatchTracks,
                attributes: ['updatedAt'],
                include: [
                    {
                        model: sequelize.models.Tracks,
                        attributes: ['name', 'image', 'artists', 'url']
                    }
                ],
            },
            {
                model: sequelize.models.MatchArtists,
                attributes: ['updatedAt'],
                include: [
                    {
                        model: sequelize.models.Artists,
                        attributes: ['name', 'image', 'url']
                    }
                ]
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

export const update = async (firstUserId: number, secondUserId: number, artists: string[], genres: string[], tracks: string[], scoreAverage: number, scoreArtist: number, scoreGenre: number, scoreTrack: number ) => {
    return (await Matches.update({
        artists: artists, genres: genres, tracks: tracks, 
        scoreAverage: scoreAverage, scoreArtist: scoreArtist, scoreGenre: scoreGenre, scoreTrack: scoreTrack },
        { where: { firstUserId: firstUserId, secondUserId: secondUserId }, returning: true}
    ));
}

export const create = async (firstUserId: number, secondUserId: number, artists: string[], genres: string[], tracks: string[], scoreAverage: number, scoreArtist: number, scoreGenre: number, scoreTrack: number) => {
    return await Matches.create({ 
        firstUserId: firstUserId, secondUserId: secondUserId, 
        artists: artists, genres: genres, tracks: tracks, 
        scoreAverage: scoreAverage, scoreArtist: scoreArtist, scoreGenre: scoreGenre, scoreTrack: scoreTrack 
    }) as MatchInstance;
}

export const createOrUpdate = async (firstUserId: number, secondUserId: number, artists: string[], genres: string[], tracks: string[], scoreAverage: number, scoreArtist: number, scoreGenre: number, scoreTrack: number) => {
    const exists = await getByIds(firstUserId, secondUserId);

    if (exists) {
        const result = await update(firstUserId, secondUserId, artists, genres, tracks, scoreAverage, scoreArtist, scoreGenre, scoreTrack);
        
        if (result && result[1].length > 0) {
            return result[1][0] as MatchInstance;
        }

        throw "No results returned";
    }

    return await create(firstUserId, secondUserId, artists, genres, tracks, scoreAverage, scoreArtist, scoreGenre, scoreTrack);
}