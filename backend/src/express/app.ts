import express from 'express';
import cookieParser from 'cookie-parser';
import expressSession from 'express-session';
import cors from 'cors';
import passport from 'passport';
import OAuth2Strategy from 'passport-oauth2';

import * as Users from './interfaces/user.interface';
import config from '../config/config.json';

require('https').globalAgent.options.rejectUnauthorized = false;

const makeHandlerAwareOfAsyncErrors = (handler: express.RequestHandler) => {
	return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
		try {
			handler(req, res, next);
		} catch (error) {
			next(error);
		}
	};
}

passport.use(new OAuth2Strategy({
      authorizationURL: 'https://accounts.spotify.com/authorize',
      tokenURL: 'ttps://accounts.spotify.com/api/token',
      clientID: config.CLIENT_ID,
      clientSecret: config.CLIENT_SECRET,
      callbackURL: "http://localhost:8001/auth/spotify/callback"
      },
      async function(accessToken: string, refreshToken: string, profile: any, cb: Function) {
            console.log(accessToken);
            const user = await Users.getBySpotifyId(profile.id);

            if (user) {
                  return cb(null, user);
            }

            const registered = await Users.create({
                  spotifyId: profile.id,
                  username: profile.displayName,
                  customname: profile.displayName,
                  country: profile.country,
                  token: refreshToken,
                  attempts: 0,
                  email: profile.emails?.[0].value,
                  avatar: "",
                  description: "No description provided.",
            });

            return cb(null, registered);
      }
  ));

const app = express();

app.set('trust proxy', 1);

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(expressSession({secret: 'cunny', resave: false, saveUninitialized: true}));

app.get('/auth/spotify',
  passport.authenticate('oauth2'));

app.get('/auth/spotify/callback',
  passport.authenticate('oauth2', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

export default app;
