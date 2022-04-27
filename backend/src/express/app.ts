import express, { Request, Response } from 'express'
import passport from 'passport'
import expressSession from 'express-session'
import config from '../config/config.json';

import * as Spotify from './integrations/spotify';
import * as Discord from './routes/discord.route';
import * as Analyse from './routes/analyse.route';
import * as Discords from './interfaces/discord.interface';

import cors from 'cors';
import cookieParser from 'cookie-parser';

const SpotifyStrategy = require('passport-spotify').Strategy;

passport.serializeUser(Spotify.serializeUser);
passport.deserializeUser(Spotify.deserializeUser);

passport.use(new SpotifyStrategy({
      clientID: config.SPOTIFY.CLIENT_ID,
      clientSecret: config.SPOTIFY.CLIENT_SECRET,
      callbackURL: config.SPOTIFY.CALLBACK_URL,
      showDialog: true,
}, Spotify.authenticateUser));


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(expressSession({ secret: 'cunny', resave: false, saveUninitialized: true }));

app.use(cors({
    origin: config.HOME, // allow to server to accept request from different origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true // allow session cookie from browser to pass through
   })
);

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
	res.send(`
		
      `);
});

app.get(
      '/auth/spotify', 
      passport.authenticate('spotify', { 
        scope: ['user-read-email', 
                'user-read-private', 
                'user-read-recently-played', 
                'user-top-read',
                'user-follow-read', 
                'playlist-read-collaborative', 
                'playlist-read-private'],
        showDialog: true
      } as any)
);

app.get(
  '/auth/spotify/callback',
  passport.authenticate('spotify', { successRedirect: config.HOME, failureRedirect: config.HOME })
);

app.get(
  '/auth',
  async (req: Request, res: Response) => {
    if (req.user) {
      const hasDiscord = (await Discords.getAccessTokenByUserId(req.user.userId)) != null;
      return res.status(200).json({ message: 'success', id: req.user.userId, hasDiscord: hasDiscord});
    }

    return res.status(400).json({ message: 'failed', id: null });
  }
)

app.get(
  '/auth/discord',
  Spotify.isAuthenticated,
  Discord.connect,
)

app.get(
  '/auth/discord/callback',
  Discord.callback
)

app.get(
  '/analyse/collect', 
  Spotify.isAuthenticated,
  Analyse.analyseUser,
);

app.get(
  '/analyse/match', 
  Spotify.isAuthenticated,
  Analyse.matchUser,
);

app.post(
  '/analyse/get', 
  Spotify.isAuthenticated,
  Analyse.showMatches,
);

app.post(
  '/analyse/seen', 
  Spotify.isAuthenticated,
  Analyse.seenMatch,
);

export default app;
