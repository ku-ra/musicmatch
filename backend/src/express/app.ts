import express from 'express'
import passport from 'passport'
import expressSession from 'express-session'
import config from '../config/config.json';

import * as Auth from './auth';
import * as Analyse from './routes/analyse.route'

const SpotifyStrategy = require('passport-spotify').Strategy;

passport.serializeUser(Auth.serializeUser);
passport.deserializeUser(Auth.deserializeUser);

passport.use(new SpotifyStrategy({
      clientID: config.CLIENT_ID,
      clientSecret: config.CLIENT_SECRET,
      callbackURL: config.CALLBACK_URL,
      showDialog: true,
}, Auth.authenticateUser));


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
    res.redirect('/analyze');
  }
);

app.get(
  '/analyze', 
  Auth.isAuthenticated,
  Analyse.analyseUser,
);

export default app;
