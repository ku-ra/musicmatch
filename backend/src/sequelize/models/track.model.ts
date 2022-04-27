import { Sequelize, DataTypes, Optional, Model } from 'sequelize';

interface TrackAttributes {
    trackId: string,
    name: string,
    image: string,
    artists: string[],
    url: string,
}

interface TrackInstance extends Model<TrackAttributes>, TrackAttributes {
      createdAt?: Date;
      updatedAt?: Date;
}

const Tracks = (sequelize: Sequelize) => { sequelize.define<TrackInstance>('Tracks', {
    trackId: {
        type: DataTypes.STRING(128),
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING(256),
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING(256),
        allowNull: false,
    },
    artists: {
        type: DataTypes.JSON,
        allowNull: false,
    }, 
    url: {
        type: DataTypes.STRING(256),
        allowNull: false,
    }
}, {

});
};

export { Tracks, TrackInstance };