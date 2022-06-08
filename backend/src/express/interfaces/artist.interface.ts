import sequelize from '../../sequelize'

import { Order, Sequelize } from 'sequelize'
import { ArtistInstance } from '../../sequelize/models/artist.model';

const Artists = sequelize.models.Artists;

export const getAll = async () => {
    return await Artists.findAll({ attributes: ['artistId', 'name', 'image', 'url'] }) as ArtistInstance[];
}

export const getAllIds = async () => {
    return await Artists.findAll({ attributes: ['artistId', 'name', 'image', 'url'] }) as ArtistInstance[];
}

export const update = async (artistId: string, image: string) => {
    return await Artists.update({ image: image }, { where: {artistId: artistId} })
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