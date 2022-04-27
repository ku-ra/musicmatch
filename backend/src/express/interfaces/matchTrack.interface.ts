import sequelize from '../../sequelize'

import { Order, Sequelize } from 'sequelize'
import { MatchTrackInstance } from '../../sequelize/models/matchTrack.model';

const MatchTracks = sequelize.models.MatchTracks;


export const getByMatchId = async (matchId: number) => {
    return await MatchTracks.findAll({ 
        attributes: ['trackId'], 
        where: { matchId: matchId },
        include: [
            { 
                model: sequelize.models.Tracks, attributes: ['name', 'artists', 'image', 'url'], 
            }
        ],
    });
}

export const create = async (trackId: string, matchId: number) => {
    return await MatchTracks.findOrCreate({ 
        where: { trackId: trackId, matchId: matchId },
    });
}