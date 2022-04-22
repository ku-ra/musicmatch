import sequelize from '../../sequelize'

import { Order, Sequelize } from 'sequelize'
import { UsersInstance } from '../../sequelize/models/user.model';

const Users = sequelize.models.Users;

export const getAll = async () => {
      return await Users.findAll({ attributes: ['userId', 'username', 'description', 'avatar'] }) as UsersInstance[];
}

// Do not expose this
export const getByUsernameLogin = async (username: string) => {
      return await Users.findOne({ attributes: ['userId', 'username', 'password', 'description', 'avatar'], where: { username: username }}) as UsersInstance;
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

export const getProfileData = async (userId: number) => {
      return await Users.findOne({
            attributes: ['username', 'customname', 'description', 'avatar', 
                        [Sequelize.literal(`(SELECT COUNT(*) FROM "Relations" WHERE "Relations"."targetId" = ${userId} AND "Relations"."type" = \'follow\')`), 'followerCount'], 
                        [Sequelize.literal(`(SELECT COUNT(*) FROM "Relations" WHERE "Relations"."initiatorId" = ${userId} AND "Relations"."type" = \'follow\')`), 'followingCount']
                  ],
            where: { userId: userId },
            include: [
                  { 
                        model: sequelize.models.Posts, 
                        attributes: ['postId', 'type', 'description', 'createdAt'],
                        include: [
                              { 
                                    model: sequelize.models.Files,
                                    attributes: ['fileType', 'filePath', 'thumbnailPath', 'createdAt']
                              }
                        ]
                  },
                  {
                        model: sequelize.models.ActiveBadges,
                        include: [
                              {
                                    model: sequelize.models.Badges,
                                    attributes: ['badgePath', 'badgeTitle', 'badgeDescription']
                              }
                        ]
                  }
            ]
      })
}

export const getById = async (userId: number) => {
      return await Users.findByPk(userId) as UsersInstance;
}

export const setAvatarById = async (userId: number, filePath: string) => {
      return await Users.update({avatar: filePath}, { where: { userId: userId }});
}

export const create = async (values: any) => {
      return await Users.create(values) as UsersInstance;
}

export const updateDescriptionById = async (description: string, userId: number) => {
      return (await Users.update({description: description}, { where: { userId: userId }}))[0]
}

export const updateCustomNameById = async (customname: string, userId: number) => {
      return (await Users.update({customname: customname}, { where: { userId: userId }}))[0]
}

export const updateEmailById = async (customname: string, userId: number) => {
      return (await Users.update({customname: customname}, { where: { userId: userId }}))[0]
}

export const remove = async (userId: number) => {
      return await Users.destroy({ where: { userId: userId }});
}

export const login = async (username: string) => {
      return await Users.findOne({ attributes: ['userId', 'username', 'password', 'salt', 'attempts', 'lastAttempt'], where: { username: username }}) as UsersInstance;
}

export const register = async (attributes: { username: string, password: string, email: string, description: string }) => {
      return await Users.create(attributes) as UsersInstance;
}