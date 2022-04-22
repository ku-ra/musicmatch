import express from 'express'
import cookieParser from 'cookie-parser'
import expressSession from 'express-session'
import cors from 'cors';
import config from '../config/config.json';
import grant from 'grant';

const makeHandlerAwareOfAsyncErrors = (handler: express.RequestHandler) => {
	return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
		try {
			handler(req, res, next);
		} catch (error) {
			next(error);
		}
	};
}

const app = express();

app.set('trust proxy', 1);

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(expressSession({secret: 'cunny', resave: false, saveUninitialized: true}));

app.get('/', (req, res) => {
	res.send(`
		
      `);
});

app.use(grant.express({
      "defaults": {
            "origin": "http://localhost:8001",
            "transport": "session",
            "state": true
      },
      "spotify": {
            "client_id": config.CLIENT_ID, 
            "client_secret": config.CLIENT_SECRET,
            "callback": "/connect/spotify/callback",
            "scope": ['user-read-email', 'user-read-private', 'user-read-recently-played', 'user-follow-read', 'playlist-read-collaborative', 'playlist-read-private', 'user-read-email', 'user-read-private', 'user-read-recently-played', 'user-follow-read', 'playlist-read-collaborative', 'playlist-read-private'],  
      }
}))

app.get('/connect/spotify/callback', (req, res) => {
      console.log(req.session),
      res.end(JSON.stringify(req.session, null, 2)),
      res.status(301).redirect("http://localhost:3000/")
});

export default app;
