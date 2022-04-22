import sequelize from '../../sequelize'

import { Order, Sequelize } from 'sequelize'
import { SpotifyDataInstance } from '../../sequelize/models/spotifyData.model';

const SpotifyData = sequelize.models.SpotifyData;

export const getAll = async () => {
    return await SpotifyData.findAll({ attributes: ['userId', 'tracks', 'genres', 'artists'] }) as SpotifyDataInstance[];
}

export const getByUserId = async (userId: number) => {
    return await SpotifyData.findOne({ attributes: ['updatedAt'], where: { userId: userId }} ) as SpotifyDataInstance;
}

export const update = async (userId: number, genres: string[], tracks: string[], artists: string[]) => {
    return (await SpotifyData.update({ genres: genres, tracks: tracks, artists: artists }, { where: { userId: userId}}))[0];
}

export const create = async (values: any) => {
    return await SpotifyData.create(values) as SpotifyDataInstance;
}