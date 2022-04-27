import sequelize from '../../sequelize'

import { Order, Sequelize } from 'sequelize'
import { MatchArtistInstance } from '../../sequelize/models/matchArtist.model';

const MatchArtists = sequelize.models.MatchArtists;


export const getByMatchId = async (matchId: number) => {
    return await MatchArtists.findAll({ 
        attributes: ['artistId'], 
        where: { matchId: matchId },
        include: [
            { 
                model: sequelize.models.Artists, attributes: ['name', 'image', 'url'], 
            }
        ],
    });
}

export const create = async (artistId: string, matchId: number) => {
    return await MatchArtists.findOrCreate({ 
        where: { artistId: artistId, matchId: matchId },
    });
}