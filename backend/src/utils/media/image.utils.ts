import sharp from 'sharp'
import {  Metadata } from 'sharp'
import { calcAspectRatio } from '../math.utils';

export const verifyImage = async (filePath: string, options: { aspectRatio?: { width: number, height: number }, dimensions?: {width: number, height: number }}) => {
      var success = true;
      const metadata = await getImageMetadata(filePath);

      if (!metadata) {
            return false;
      }

      if (options.aspectRatio) {
            success = verifyAspectRatio(metadata, options.aspectRatio)
      }

      if (options.dimensions) {
            success = verifyDimensions(metadata, options.dimensions)
      }

      return success;
}

export const getCroppedThumbnail = async (options: {filePath: string, saveFileName: string}) => {
      const data = await getImageMetadata(options.filePath);
      
      if(!data.height) {
            return false;
      }

      if(!data.width) {
            return false;
      }
      
      const w = Math.round(data.height / 16 * 9);

      console.log(options.filePath)
      console.log(options.saveFileName)

      if (w <= data.width) {
            sharp(options.filePath)
                  .extract({top: 0, left: Math.round(data.width / 2 - w / 2), height: data.height, width: w})
                  .toFile(options.saveFileName);
      } else {
            sharp(options.filePath)
                  .extract({top: 0, left: 0, height: Math.round(data.width / 9 * 16), width: data.width})
                  .toFile(options.saveFileName);
      }

      return true;
}


export const resizeImageOverwrite = async (filePath: string, newWidth: number, newHeight: number) => {
      sharp(filePath)
            .resize(newWidth, newHeight, { fit: sharp.fit.fill })
            .toFile(filePath);
}

export const cropImageOverwrite = async (filePath: string, startX: number, startY: number, cropWidth: number, cropHeight: number) => {
      sharp(filePath)
            .extract({ top: startY, left: startX, width: cropWidth, height: cropHeight })
            .toFile(filePath);
      }

export const resizeImageBuffer = async (file: Express.Multer.File, newWidth: number, newHeight: number) => {
      sharp(file.buffer)
            .resize(512, 512)
            .toFormat("png")
            .png({ quality: 100 })
            .toFile(file.path)
}

const getImageMetadata = async (filePath: string): Promise<Metadata> => {
      return await sharp(filePath).metadata();
}

const verifyDimensions = (metadata: Metadata, dimensions: {width: number, height: number}) => {
      return metadata.width as number <= dimensions.width && metadata.height as number <= dimensions.height;
}

const verifyAspectRatio = (metadata: Metadata, aspectRatio: {width: number, height: number}) => {
      const { width, height } = calcAspectRatio(metadata.width as number, metadata.height as number);
      return aspectRatio.width == width && aspectRatio.height == height;
}

