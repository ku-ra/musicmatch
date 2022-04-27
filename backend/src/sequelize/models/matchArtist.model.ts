import { Sequelize, DataTypes, Optional, Model } from 'sequelize';

interface MatchArtistAttributes {
    matchArtistId: number,
    artistId: string,
    matchId: number
}

interface MatchArtistCreationAttributes extends Optional<MatchArtistAttributes, 'matchArtistId'> {}

interface MatchArtistInstance extends Model<MatchArtistAttributes>, MatchArtistAttributes {
      createdAt?: Date;
      updatedAt?: Date;
}

const MatchArtists = (sequelize: Sequelize) => { sequelize.define<MatchArtistInstance>('MatchArtists', {
    matchArtistId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    artistId: {
        type: DataTypes.STRING(128),
        references: { model: 'Artists', key: 'artistId' },
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

export { MatchArtists, MatchArtistInstance };