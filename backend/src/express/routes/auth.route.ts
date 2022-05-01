import { Request, Response } from 'express';

import * as Users from '../interfaces/user.interface'

import * as Utils from '../../utils/utils'
import * as Crypto from '../../crypto/crypto';

import { getStaticPath, removeFromPath } from '../../utils/file.utils';


export const logout = async (req: Request, res: Response) => {
      req.session.destroy(function (err) {
            req.logout();
            res.redirect('/'); 
      });
}
