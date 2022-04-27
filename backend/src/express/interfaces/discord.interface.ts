import sequelize from '../../sequelize'

import { Order, Sequelize } from 'sequelize'
import { DiscordInstance } from '../../sequelize/models/discord.model';

const Discords = sequelize.models.Discords;

export const getAll = async () => {
    return await Discords.findAll() as DiscordInstance[];
}

export const getAccessTokenByUserId = async (userId: number) => {
    return await Discords.findOne({ attributes: ['accessToken'], where: { userId: userId }} ) as DiscordInstance;
}

export const getRefreshTokenByUserId = async (userId: number) => {
    return await Discords.findOne({ attributes: ['refreshToken'], where: { userId: userId }} ) as DiscordInstance;
}

export const getUserByUserId = async (userId: number) => {
    return await Discords.findOne({ attributes: ['username', 'discriminator'], where: { userId: userId }} ) as DiscordInstance;
}

export const updateUser = async (userId: number, username: string, discriminator: string) => {
    return (await Discords.update({ username: username, discriminator: discriminator }, { where: { userId: userId}}))[0];
}

export const update = async (userId: number, accessToken: string, expiresIn: number) => {
    return (await Discords.update({ accessToken: accessToken, expiresIn: expiresIn }, { where: { userId: userId}}))[0];
}

export const create = async (userId: number, accessToken: string, refreshToken: string, expiresIn: number, scope: string, username: string, discriminator: string) => {
    return await Discords.create({userId: userId, accessToken: accessToken, refreshToken: refreshToken, expiresIn: expiresIn, scope: scope, username: username, discriminator: discriminator }) as DiscordInstance;
}

export const remove = async (userId: number) => {
    return await Discords.destroy({ where: { userId: userId } })
}