import { Request, Response } from 'express';

import * as Users from '../interfaces/user.interface'


export const logout = async (req: Request, res: Response) => {
      req.session.destroy(function (err) {
            req.logout();
            res.redirect('/'); 
      });
}

export const remove = async (req: Request, res: Response) => {
      if (!req.user) {
            return res.sendStatus(403);
      }

      const result = await Users.remove(req.user.userId);

      if (result == 1) {
            return res.sendStatus(200);
      }

      return res.sendStatus(503);
}
