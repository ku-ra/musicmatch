import { number } from 'mathjs';
import { Sequelize, DataTypes, Optional, Model } from 'sequelize';

interface DiscordAttributes {
    discordId: number,
    userId: number,
    accessToken: string,
    refreshToken: string,
    scope: string,
    expiresIn: number,
    username: string,
    discriminator: number
}

interface DiscordCreationAttributes extends Optional<DiscordAttributes, 'discordId'> {}

interface DiscordInstance extends Model<DiscordAttributes, DiscordCreationAttributes>, DiscordAttributes {
      createdAt?: Date;
      updatedAt?: Date;
}

const Discords = (sequelize: Sequelize) => { sequelize.define<DiscordInstance>('Discords', {
    discordId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        references: { model: 'Users', key: 'userId' },
        onDelete: 'cascade',
        allowNull: false,
        unique: true,
    },
    accessToken: {
        type: DataTypes.STRING(256),
        allowNull: false,
    },
    refreshToken: {
        type: DataTypes.STRING(256),
        allowNull: false,
    },
    scope: {
        type: DataTypes.JSON,
        allowNull: false,
    },
    expiresIn: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING(64),
        allowNull: false
    },
    discriminator: {
        type: DataTypes.STRING(4),
        allowNull: false,
    }
}, {

});
};

export { Discords, DiscordInstance };