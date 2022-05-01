import sequelize from '../../sequelize'

import { Op, Order, Sequelize } from 'sequelize'
import { SpotifyDataInstance } from '../../sequelize/models/spotifyData.model';

const SpotifyData = sequelize.models.SpotifyData;

export const getAll = async () => {
    return await SpotifyData.findAll({ attributes: ['userId', 'tracks', 'genres', 'artists'] }) as SpotifyDataInstance[];
}

export const getByUserId = async (userId: number) => {
    return await SpotifyData.findOne({ attributes: ['updatedAt'], where: { userId: userId }} ) as SpotifyDataInstance;
}

export const getInfoByUserId = async (userId: number) => {
    return await SpotifyData.findOne({ attributes: ['userId', 'genres', 'tracks', 'artists'], where: { userId: userId }} ) as SpotifyDataInstance;
}

export const getUsersByArtist = async (artistId: string) => {
    return await SpotifyData.findAll({
        where: { artists: { [Op.contains]: artistId }},
        attributes: [],
        include: [
            { 
                model: sequelize.models.Users, attributes: ['avatar', 'country', 'username', 'spotifyUrl'], 
            },
        ]
    })
}


export const update = async (userId: number, genres: string[], tracks: string[], artists: string[]) => {
    return (await SpotifyData.update({ genres: genres, tracks: tracks, artists: artists }, { where: { userId: userId}}))[0];
}

export const create = async (values: any) => {
    return await SpotifyData.create(values) as SpotifyDataInstance;
}