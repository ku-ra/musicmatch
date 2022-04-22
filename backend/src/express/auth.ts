import moment from 'moment';

import * as Utils from '../utils/utils'
import * as Crypto from '../crypto/crypto';
import * as Users from './interfaces/user.interface'

import { UsersInstance } from "../sequelize/models/user.model";
import { Request, Response } from 'express';
import { getUserData, getUserId } from './spotify-api/userinfo';

import SpotifyStrategy from 'passport-spotify';


export const authenticate = async (accessToken: string, refreshToken: string, expires_in: number, profile: SpotifyStrategy.Profile, callback: Function) => {
      const user = await Users.getBySpotifyId(profile.id);

      if (!user) {
            const userData = await getUserData(accessToken);

            if (!userData) {
                  return callback(null, false, { message: 'No user data found.'});
            }

            const avatar = userData.avatar && userData.avatar.length > 1 ? userData.avatar[0].url : "";

            const newUser = await Users.create({
                  spotifyId: profile.id,
                  username: profile.displayName,
                  customname: profile.displayName,
                  country: profile.country,
                  token: refreshToken,
                  attempts: 0,
                  email: profile.emails?.[0].value,
                  avatar: avatar,
                  description: "No description provided.",
            });

            if (newUser) {
                  return callback(null, newUser);
            }

            return callback(null, false, { message: 'Could not create user' });
      }

      if (canResetAttempts(1, user.lastAttempt)) {
            resetAttempts(user);
      } 

      if (tooManyAttempts(user.attempts, 3)) {
            return callback(null, false, { message: 'Too many attempts.'});
      }
      
      return callback(null, user);
}

export const serialize = (req: Request, user: Express.User, callback: Function) => {
      callback(null, user.userId);
}

export const deserialize = (userId: number, callback: Function) => {
      Users.getById(userId)
      .then((user) => callback(null, user));
}

export const authenticated = (req: Request, res: Response, next: Function) => {
      if (req.isAuthenticated()) {
            next();
      } else {
            res.redirect(403, '/');
      }
}

const resetAttempts = (user: UsersInstance) => {
      user.set('attempts', 0), user.save();
}

const increaseAttempts = (user: UsersInstance) => {
      user.increment('attempts');
}

const tooManyAttempts = (count: number, limit: number) => {
      return count > limit;
}

const canResetAttempts = (interval: number, lastAttempt: Date) => {
      return Utils.convertDate(lastAttempt).add(interval, 'hours') > moment();
}