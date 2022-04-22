import path from 'path'
import ffmpeg from 'fluent-ffmpeg'

export const createThumbnail = async (options: {filePath: string, timemarks: number[] | string[], saveFileName: string, saveLocation: string}) => {
      ffmpeg(options.filePath)
      .thumbnail({
            count: 1,
            timemarks: options.timemarks,
            filename: options.saveFileName,
            folder: options.saveLocation,
      });
}

export const createThumbnailFilename = (videoFilePath: string): string => {
      return `${path.basename(videoFilePath, path.extname(videoFilePath))}_thumb.png`;
}

export const verifyVideo = async (filePath: string, options: {aspectRatio?: string, dimensions?: {width: number, height: number}, length?: number }) => {
      let success = true;
      const metadata = await getVideoMetadata(filePath);

      if (!metadata) {
            return true;
      }

      if (options.aspectRatio) {
            success = verifyAspectRatio(metadata, options.aspectRatio);
      }

      if (options.dimensions) {
            success = verifyDimensions(metadata, options.dimensions);
      }

      if (options.length) {
            success = verifyLength(metadata, options.length);
      }

      return success;
}

const getVideoMetadata = (filePath: string) => {
      return new Promise<ffmpeg.FfprobeStream>((resolve, reject) => { 
                  ffmpeg.ffprobe(filePath, (err, data) => {
                  if (err || !data) {
                        reject(err);
                  }

                  for (var stream of data.streams) {
                        if (stream.codec_type == 'video') {
                              resolve(stream)
                        }
                  }
            });
      });
}

const verifyAspectRatio = (metadata: ffmpeg.FfprobeStream, aspectRatio: string): boolean => {
      return metadata.display_aspect_ratio === aspectRatio;
}

const verifyDimensions = (metadata: ffmpeg.FfprobeStream, dimensions: {width: number, height: number}): boolean => {
      return metadata.width as number <= dimensions.width && metadata.height as number <= dimensions.height;
}

const verifyLength = (metadata: ffmpeg.FfprobeStream, lengthSeconds: number): boolean => {
      return +(metadata.duration as string) <= lengthSeconds;
}