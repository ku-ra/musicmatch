import path from 'path'
import Multer from 'multer'
import express from 'express'
import passport from 'passport'
import flash from 'connect-flash'
import cookieParser from 'cookie-parser'
import expressSession from 'express-session'
import SpotifyStrategy from 'passport-spotify';
import cors from 'cors';
import config from '../config/config.json';

import * as Auth from './auth';
import * as FileUtils from '../utils/file.utils'

import * as AuthRoutes from './routes/auth.route'
import * as UserRoutes from './routes/user.route'


const app = express();

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

app.use(flash());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(expressSession({secret: 'cunny', resave: false, saveUninitialized: false}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/static', express.static(path.join(__dirname, '../../static')));

console.log(config.CLIENT_ID);
console.log(config.CLIENT_SECRET);

passport.use(new SpotifyStrategy.Strategy({
      clientID: config.CLIENT_ID,
      clientSecret: config.CLIENT_SECRET,
      callbackURL: config.CALLBACK_URL,
      //userProfileURL: "https://api.spotify.com/v1/me",
      scope: ['user-read-email', 'user-read-private', 'user-read-recently-played', 'user-follow-read', 'playlist-read-collaborative', 'playlist-read-private'],
      showDialog: true,
}, Auth.authenticate));

passport.serializeUser(Auth.serialize);
passport.deserializeUser(Auth.deserialize);

app.get('/', (req, res) => {
	res.send(`
		
      `);
});


const makeHandlerAwareOfAsyncErrors = (handler: express.RequestHandler) => {
	return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
		try {
			handler(req, res, next);
		} catch (error) {
			next(error);
		}
	};
}

//app.use(makeHandlerAwareOfAsyncErrors);

const storage = Multer.diskStorage({destination: FileUtils.destinationHandler, filename: FileUtils.fileHandler});

const upload = Multer({ storage: storage, fileFilter: FileUtils.fileFilter, limits: { fileSize: (1 * 1024 * 1024 * 1024) }});

//app.get('api/v1/login', passport.Strategy

app.get('/auth/spotify', passport.authenticate('spotify', { 
            scope: ['user-read-email', 'user-read-private', 'user-read-recently-played', 'user-follow-read', 'playlist-read-collaborative', 'playlist-read-private', 'user-read-email', 'user-read-private', 'user-read-recently-played', 'user-follow-read', 'playlist-read-collaborative', 'playlist-read-private'],
      })
);

app.get(
  '/auth/spotify/callback',
  passport.authenticate('spotify', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  }
);


app.post(
      '/api/v1/accounts/logout',
      Auth.authenticated,
      makeHandlerAwareOfAsyncErrors(AuthRoutes.logout)
);

app.get(
      `/api/v1/users/user/:username`,
      makeHandlerAwareOfAsyncErrors(UserRoutes.getByUsername)
);

app.post(
      `/api/v1/users/profile/:username`,
      makeHandlerAwareOfAsyncErrors(UserRoutes.getProfileData)
);


app.post(
      `/api/v1/users/exists/:username`,
      makeHandlerAwareOfAsyncErrors(UserRoutes.isExists)
);

app.post(
      `/api/v1/users/edit`,
      Auth.authenticated,
      makeHandlerAwareOfAsyncErrors(UserRoutes.update) 
);


export default app;
