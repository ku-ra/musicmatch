import sequelize from '../../sequelize'

import { Order, Sequelize } from 'sequelize'
import { UsersInstance } from '../../sequelize/models/user.model';

const Users = sequelize.models.Users;

export const getAll = async () => {
      return await Users.findAll({ attributes: ['userId', 'username', 'description', 'avatar'] }) as UsersInstance[];
}

export const getByUsername = async (username: string) => {
      return await Users.findOne({ attributes: ['userId', 'username', 'description', 'avatar'], where: { username: username }}) as UsersInstance;
}

export const getByUsernameId = async (username: string) => {
      return await Users.findOne({ attributes: ['userId'], where: { username: username }}) as UsersInstance;
}

export const getBySpotifyId = async (spotifyId: string) => {
      return await Users.findOne({ attributes: ['userId'], where: { spotifyId: spotifyId }}) as UsersInstance;
}

export const getById = async (userId: number) => {
      return await Users.findByPk(userId) as UsersInstance;
}

export const create = async (values: any) => {
      return await Users.create(values) as UsersInstance;
}

export const updateDescriptionById = async (description: string, userId: number) => {
      return (await Users.update({description: description}, { where: { userId: userId }}))[0]
}

export const remove = async (userId: number) => {
      return await Users.destroy({ where: { userId: userId }});
}