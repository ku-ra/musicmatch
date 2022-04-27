import sequelize from '../../sequelize'

import { Order, Sequelize } from 'sequelize'
import { ArtistInstance } from '../../sequelize/models/artist.model';

const Artists = sequelize.models.Artists;

export const getAll = async () => {
    return await Artists.findAll({ attributes: ['artistId', 'name', 'image', 'url'] }) as ArtistInstance[];
}

export const getById = async (artistId: string) => {
    return await Artists.findOne({ attributes: ['artistId', 'name', 'image', 'url'], where: { artistId: artistId }}) as ArtistInstance;
}

export const create = async (artistId: string, name: string, image: string, url: string) => {
    return await Artists.findOrCreate({ 
        where: { artistId: artistId },
        defaults: {
            artistId: artistId,
            name: name,
            image: image,
            url: url
        }
    });
}