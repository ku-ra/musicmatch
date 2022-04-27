import sequelize from '../../sequelize'

import { Order, Sequelize } from 'sequelize'
import { TrackInstance } from '../../sequelize/models/track.model';

const Tracks = sequelize.models.Tracks;

export const getAll = async () => {
    return await Tracks.findAll({ attributes: ['trackId', 'name', 'image', 'artists', 'url'] }) as TrackInstance[];
}

export const getById = async (trackId: string) => {
    return await Tracks.findOne({ attributes: ['trackId', 'name', 'image', 'artists', 'url'], where: { trackId: trackId }}) as TrackInstance;
}

export const create = async (trackId: string, name: string, image: string, artists: string[], url: string) => {
    return await Tracks.findOrCreate({ 
        where: { trackId: trackId },
        defaults: {
            trackId: trackId,
            name: name,
            image: image,
            artists: artists, 
            url: url
        }
    });
}