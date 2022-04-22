import path from 'path'
import config from '../config/config.json'

import { Mime } from '../mimes/mime.dict'
import { Request } from 'express'

import * as Crypto from '../crypto/crypto'
import * as Utils from './utils';
import { verifyVideo } from './media/video.utils'
import { verifyImage } from './media/image.utils'

export enum File {
      Video,
      Image,
      Audio,
      Forbidden,
}

export const avatarPath = `${__dirname}../../../static/avatars`
export const imagePath = `${__dirname}../../../static/posts/images`
export const videoPath = `${__dirname}../../../static/posts/videos`
export const audioPath = `${__dirname}../../../static/posts/audios`

export const verifyPostFile = (filePath: string, fileType: File): boolean => {
      if (fileType == File.Video) {
            if (!verifyVideo(filePath, { aspectRatio: "9:16", dimensions: { width: 1080, height: 1920 }, length: 60 })) {
                  return false;
            }
      }

      if (fileType == File.Image) {
            if (!verifyImage(filePath, { aspectRatio: { width: 9, height: 16 }, dimensions: { width: 1080, height: 1920 } })) {
                  return false;
            }
      }

      return true;
}

export const getFileTypeEnum = (file: Express.Multer.File): File => {
      if (Utils.validateMimeType(file, [Mime.png, Mime.jpg, Mime.jpeg, Mime.bmp, Mime.webp, Mime.mpeg])) {
            return File.Image;
      }

      if (Utils.validateMimeType(file, [Mime.mp4, Mime.webp, Mime.avi, Mime.mov])) {
            return File.Video;
      }

      if (Utils.validateMimeType(file, [Mime.mp3, Mime.wav, Mime.AAC]))
      {
            return File.Audio;
      }

      return File.Forbidden;
}

export const getFileType = (file: Express.Multer.File): string => {
      if (Utils.validateMimeType(file, [Mime.png, Mime.jpg, Mime.jpeg, Mime.bmp, Mime.webp, Mime.mpeg])) {
            return "image";
      }

      if (Utils.validateMimeType(file, [Mime.mp4, Mime.webp, Mime.avi, Mime.mov])) {
            return "video";
      }

      if (Utils.validateMimeType(file, [Mime.mp3, Mime.wav, Mime.AAC]))
      {
            return "audio";
      }

      return "forbidden";
}

export const destinationHandler = (req: Request, file: Express.Multer.File, callback: Function) => {
      const type = getFileTypeEnum(file);

      if (file.fieldname == 'avatar' && type == File.Image) {
            return callback(null, avatarPath);
      }

      else if (type == File.Image) {
            return callback(null, imagePath);
      }
      
      else if (type == File.Video) {
            return callback(null, videoPath);
      }

      else {
            return callback(null, audioPath);
      }
}

export const fileHandler = (req: Request, file: Express.Multer.File, callback: Function, size = 32) => {
      const type = getFileTypeEnum(file);

      if (type == File.Image) {
            return callback(null, `img_${Crypto.randomHex(size)}${path.extname(file.originalname)}`);
      }

      else if (type == File.Video) {
            return callback(null, `vid_${Crypto.randomHex(size)}${path.extname(file.originalname)}`);
      }

      return callback(null, `aud_${Crypto.randomHex(size)}${path.extname(file.originalname)}`);
}

export const fileFilter = (req: Request, file: Express.Multer.File, callback: Function) => {
      const type = getFileTypeEnum(file);

      if (type == File.Image || type == File.Video || type == File.Audio) {
            return callback(null, true);
      }

      if ((req.baseUrl + req.path) == '/api/v1/files/upload/post') {
            if (!verifyPostFile(file.path, type)) {
                  return false;
            }
      }

      return callback(new Error("Forbidden file format"));
}

export const removeFromPath = (filePath: string, toRemove: string): string => {
      return filePath.replace(toRemove, "");
}

export const getStaticPath = (filePath: string): string => {
      const index = Utils.getFirstDifference(__dirname, filePath);

      if (!index) {
            return filePath;
      }

      return filePath.substring(0, index);
}