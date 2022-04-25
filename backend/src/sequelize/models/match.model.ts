import { number } from 'mathjs';
import { Sequelize, DataTypes, Optional, Model } from 'sequelize';

interface MatchAttributes {
    matchId: number,

    firstUserId: number,
    secondUserId: number,

    tracks: string[],
    genres: string[],
    artists: string[],

    scoreGenre: number,
    scoreTrack: number,
    scoreArtist: number,
    scoreAverage: number,

    seen: boolean,
}

interface MatchCreationAttributes extends Optional<MatchAttributes, 'matchId'> {}

interface MatchInstance extends Model<MatchAttributes, MatchCreationAttributes>, MatchAttributes {
      createdAt?: Date;
      updatedAt?: Date;
}

const Matches = (sequelize: Sequelize) => { sequelize.define<MatchInstance>('Matches', {
    matchId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    firstUserId: {
        type: DataTypes.INTEGER,
        references: { model: 'Users', key: 'userId' },
        onDelete: 'cascade',
        allowNull: false,
    },
    secondUserId: {
        type: DataTypes.INTEGER,
        references: { model: 'Users', key: 'userId' },
        onDelete: 'cascade',
        allowNull: false,
    },
    tracks: {
        type: DataTypes.JSON,
        allowNull: false,
    },
    artists: {
        type: DataTypes.JSON,
        allowNull: false,
    },
    genres: {
        type: DataTypes.JSON,
        allowNull: false,
    },
    scoreGenre: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    scoreTrack: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    scoreArtist: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    scoreAverage: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    seen: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
}, {
    indexes: [
        {
            unique: true,
            fields: ['firstUserId', 'secondUserId']
        }
    ]
});
};

export { Matches, MatchInstance };