import { Sequelize, DataTypes, Optional, Model } from 'sequelize';

interface SpotifyDataAttributes {
      id: number,
      userId: number,
      artists: string[],
      genres: string[],
      tracks: string[],
}

interface SpotifyDataCreationAttributes extends Optional<SpotifyDataAttributes, 'userId'> {}

interface SpotifyDataInstance extends Model<SpotifyDataAttributes, SpotifyDataCreationAttributes>, SpotifyDataAttributes {
      createdAt?: Date;
      updatedAt?: Date;
}

const SpotifyData = (sequelize: Sequelize) => { sequelize.define<SpotifyDataInstance>('SpotifyData', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        references: { model: 'Users', key: 'userId' },
        onDelete: 'cascade',
    },
    artists: {
        type: DataTypes.JSON
    },
    genres: {
        type: DataTypes.JSON
    },
    tracks: {
        type: DataTypes.JSON
    }
}, {
  // Other model options go here
});
};

export { SpotifyData, SpotifyDataInstance };