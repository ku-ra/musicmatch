import express from 'express'
import passport from 'passport'
import expressSession from 'express-session'
import config from '../config/config.json';

import * as Spotify from './integrations/spotify';
import * as Analyse from './routes/analyse.route'

const SpotifyStrategy = require('passport-spotify').Strategy;

passport.serializeUser(SpotifyAuth.serializeUser);
passport.deserializeUser(SpotifyAuth.deserializeUser);

passport.use(new SpotifyStrategy({
      clientID: config.CLIENT_ID,
      clientSecret: config.CLIENT_SECRET,
      callbackURL: config.CALLBACK_URL,
      showDialog: true,
}, Spotify.authenticateUser));


const app = express();

app.use(expressSession({secret: 'cunny', resave: false, saveUninitialized: true}));

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
  passport.authenticate('spotify', { failureRedirect: 'http://localhost:3000/' }),
  function (req, res) {
    res.redirect('/analyse/collect');
  }
);

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

app.get(
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
