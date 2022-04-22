import path from 'path'
import Multer from 'multer'
import express from 'express'
import passport from 'passport'
import flash from 'connect-flash'
import cookieParser from 'cookie-parser'
import expressSession from 'express-session'
import SpotifyStrategy from './spotify-api/override'
import cors from 'cors';
import config from '../config/config.json';

import * as Auth from './auth';

import * as AuthRoutes from './routes/auth.route'
import * as UserRoutes from './routes/user.route'
import * as Users from './interfaces/user.interface'

const makeHandlerAwareOfAsyncErrors = (handler: express.RequestHandler) => {
	return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
		try {
			handler(req, res, next);
		} catch (error) {
			next(error);
		}
	};
}

passport.serializeUser(Auth.serializeUser);
passport.deserializeUser(Auth.deserializeUser);

passport.use(new SpotifyStrategy.Strategy({
      clientID: config.CLIENT_ID,
      clientSecret: config.CLIENT_SECRET,
      callbackURL: config.CALLBACK_URL,
      //userProfileURL: "https://api.spotify.com/v1/me",
      scope: ['user-read-email', 'user-read-private', 'user-read-recently-played', 'user-follow-read', 'playlist-read-collaborative', 'playlist-read-private'],
      showDialog: true,
}, Auth.authenticateUser));


const app = express();

app.set('trust proxy', 1);

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(expressSession({secret: 'cunny', resave: true, saveUninitialized: true}));

app.use('/static', express.static(path.join(__dirname, '../../static')));

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
	res.send(`
		
      `);
});

app.get(
      '/auth/spotify', 
      passport.authenticate('spotify', { 
            scope: ['user-read-email', 'user-read-private', 'user-read-recently-played', 'user-follow-read', 'playlist-read-collaborative', 'playlist-read-private', 'user-read-email', 'user-read-private', 'user-read-recently-played', 'user-follow-read', 'playlist-read-collaborative', 'playlist-read-private'],
      })
);

app.get(
  '/auth/spotify/callback',
  passport.authenticate('spotify', { failureRedirect: 'http://localhost:3000/' }),
  function(req, res) {
    res.status(301).redirect('http://localhost:3000/');
  }
);

export default app;
