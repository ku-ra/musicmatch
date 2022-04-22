import { Sequelize, DataTypes, Optional, Model } from 'sequelize';

interface UsersAttributes {
      //Userdata
      userId: number,
      username: string,
      email: string,
      avatar: string,
      description: string,
      customname: string,
      country: string,

      //Spotify Integration
      spotifyId: string,
      spotifyAccessToken: string,
      spotifyRefreshToken: string,
      spotifyUrl: string,

      //Login Attempts
      attempts: number,
      lastAttempt: Date,
}

interface UsersCreationAttributes extends Optional<UsersAttributes, 'userId'> {}

interface UsersInstance extends Model<UsersAttributes, UsersCreationAttributes>, UsersAttributes {
      createdAt?: Date;
      updatedAt?: Date;
}

const Users = (sequelize: Sequelize) => { sequelize.define<UsersInstance>('Users', {
      userId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
      },
      username: {
            type: DataTypes.STRING(128),
            allowNull: false,
      },
      customname: {
            type: DataTypes.STRING(128),
      },
      email: {
            type: DataTypes.STRING(64),
            unique: true,
            allowNull: false,
      },
      avatar: {
            type: DataTypes.STRING(256),
            allowNull: false,
            defaultValue: 'http:\\\\localhost:8001\\static\\avatars\\img_blank.jpg',
      },
      description: {
            type: DataTypes.STRING(256),
            defaultValue: '',
      },
      country: {
            type: DataTypes.STRING(8),
            allowNull: true,
            defaultValue: ''
      },
      spotifyId: {
            type: DataTypes.STRING(256),
            unique: true,
      },
      spotifyAccessToken: {
            type: DataTypes.STRING(256),
            unique: true,
      },
      spotifyRefreshToken: {
            type: DataTypes.STRING(256),
            unique: true,
      },
      spotifyUrl: {
            type: DataTypes.STRING(256),
            unique: true,
      },
      attempts: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
      },
      lastAttempt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
      }
}, {
  // Other model options go here
});
};

export { Users, UsersInstance };