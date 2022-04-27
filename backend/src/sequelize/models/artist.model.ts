import { Sequelize, DataTypes, Optional, Model } from 'sequelize';

interface ArtistAttributes {
    artistId: string,
    name: string,
    image: string,
    url: string,
}

interface ArtistInstance extends Model<ArtistAttributes>, ArtistAttributes {
      createdAt?: Date;
      updatedAt?: Date;
}

const Artists = (sequelize: Sequelize) => { sequelize.define<ArtistInstance>('Artists', {
    artistId: {
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
    url: {
        type: DataTypes.STRING(256),
        allowNull: false,
    }
}, {

});
};

export { Artists, ArtistInstance };