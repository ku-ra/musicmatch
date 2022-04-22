import * as Users from './interfaces/user.interface'

import SpotifyStrategy from 'passport-spotify';

import { Request, Response } from 'express';

export const serializeUser = (user: any, callback: Function) => {
      callback(null, user.userId);
}

export const deserializeUser = (id: number, callback: Function) => {
      Users.getById(id).then((user) => {
            callback(null, user);
      })
}

export const authenticateUser = async (accessToken: string, refreshToken: string, expires_in: number, profile: SpotifyStrategy.Profile, callback: Function) => {
      try {
            const user = await Users.getBySpotifyId(profile.id);

            if (user) {
                  callback(null, user);
            }
            
            else {

                  await Users.create({
                        username: profile.displayName,
                        customname: profile.displayName,
                        country: profile.country,
                        email: profile.emails?.[0].value,
                        avatar: (profile.photos as unknown as [{ value: string }])[0].value, //Type Fix
                        description: "No description provided.",

                        spotifyId: profile.id,
                        spotifyAccessToken: accessToken,
                        spotifyRefreshToken: refreshToken,
                        spotifyUrl: profile.profileUrl,

                        attempts: 0,
                  });

                  const newUser = await Users.getBySpotifyId(profile.id);

                  if (newUser) {
                        callback(null, newUser);
                  }

            }
      } catch (error: any) {
            callback(error);
      }
}

export const isAuthenticated = (req: Request, res: Response, next: Function) => {
      if (req.isAuthenticated()) {
            return next();
      } 
      res.redirect(403, '/');
}