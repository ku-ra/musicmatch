import { Request, Response } from 'express';

import * as Users from '../interfaces/user.interface'

import * as Utils from '../../utils/utils'
import * as Crypto from '../../crypto/crypto';

import { getStaticPath, removeFromPath } from '../../utils/file.utils';

import { getNewToken, getUserData, getUserId } from '../spotify-api/userinfo';

export const logout = async (req: Request, res: Response) => {
      req.session.destroy(function (err) {
            req.logout();
            res.redirect('/'); 
      });
}

export const register = async (req: Request, res: Response) => {
      //Validate Request Parameters
      if (!Utils.containsKeys(req.body, ['username', 'password', 'email', 'description'])) {
            return res.sendStatus(400);
      }

      Users.register({ username: req.body.username, 
                        password: Crypto.hash(req.body.password), 
                        email: req.body.email, 
                        description: req.body.description })
      .then((user) => {
            res.sendStatus(201);
      })
      .catch((error) => {
            res.sendStatus(500);
      })
}
