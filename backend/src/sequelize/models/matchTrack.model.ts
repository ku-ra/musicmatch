import { Sequelize, DataTypes, Optional, Model } from 'sequelize';

interface MatchTrackAttributes {
    matchTrackId: number,
    trackId: string,
    matchId: number
}

interface MatchTrackCreationAttributes extends Optional<MatchTrackAttributes, 'matchTrackId'> {}

interface MatchTrackInstance extends Model<MatchTrackAttributes>, MatchTrackAttributes {
      createdAt?: Date;
      updatedAt?: Date;
}

const MatchTracks = (sequelize: Sequelize) => { sequelize.define<MatchTrackInstance>('MatchTracks', {
    matchTrackId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    trackId: {
        type: DataTypes.STRING(128),
        references: { model: 'Tracks', key: 'trackId' },
        onDelete: 'cascade',
    },
    matchId: {
        type: DataTypes.INTEGER,
        references: { model: 'Matches', key: 'matchId' },
        onDelete: 'cascade',
    },
}, {

});
};

export { MatchTracks, MatchTrackInstance };