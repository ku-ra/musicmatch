import { Request, Response } from 'express';
import * as Utils from '../../utils/utils';
import * as Users from '../interfaces/user.interface'

export const getAll = async (req: Request, res: Response) => {
      const users = await Users.getAll();
      res.status(200).json(users);
}

export const getById = async (req: Request, res: Response) => {
      const id = Utils.parseId(req);

      if (!id) {
            res.sendStatus(404);
            return;
      }

      const user = await Users.getById(id);

      if (user) {
            res.status(200).json(user);
      } else {
            res.sendStatus(404);
      }
}

export const isExists = async (req: Request, res: Response) => {
      const exists = await Users.getByUsername(req.params.username);
      if (exists) {
            res.status(200).json({exists: true});
      } else {
            res.status(200).json({exists: false});
      }
}

export const getByUsername = async (req: Request, res: Response) => {
      const user = await Users.getByUsername(req.params.username);
      if (user) {
            res.status(200).json(user);
      } else {
            res.sendStatus(404);
      }
} 

export const getProfileData = async (req: Request, res: Response) => {
      const user = await Users.getByUsernameId(req.params.username);

      if (user) {
            const profile = await Users.getProfileData(user.userId);

            if (profile) {
                  res.status(200).json(profile);
            } else {
                  res.sendStatus(404);
            }
      } else {
            res.sendStatus(404);
      }
}

export const remove = async (req: Request, res: Response) => {
      const id = Utils.parseId(req);

      if (!id) {
            return res.sendStatus(404);
      }

      const amount = await Users.remove(id);

      if (amount > 0) {
            res.sendStatus(200);
      } else {
            res.sendStatus(400);
      }
}

export const update = async (req: Request, res: Response) => {
      if (!req.user) {
            return res.sendStatus(404);
      }

      const id = req.user.userId;
      if (req.body.description) {
            if (await Users.updateDescriptionById(req.body.description, id) == 0) {
                  return res.sendStatus(400);
            }
      }

      if (req.body.customname) {
            if (await Users.updateCustomNameById(req.body.description, id) == 0) {
                  return res.sendStatus(400);
            }
      }

      if (req.body.email) {
            if (await Users.updateEmailById(req.body.description, id) == 0) {
                  return res.sendStatus(400);
            }
      }

      return res.sendStatus(200);
}