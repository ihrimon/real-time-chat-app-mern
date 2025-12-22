import { UploadApiResponse, v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import config from '../config';

cloudinary.config({
  cloud_name: config.cloudinary_cloud_name,
  api_key: config.cloudinary_api_key,
  api_secret: config.cloudinary_api_secret_key,
});

export const uploadImageToCloudinary = async (
  filePath: string
): Promise<string> => {
  try {
    const result: UploadApiResponse = await cloudinary.uploader.upload(
      filePath
    );
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error('File delete error:', err);
      } else {
        console.log('File deleted successfully:', filePath);
      }
    });
    return result.secure_url;
  } catch (error) {
    throw new Error('Failed to upload image to Cloudinary');
  }
};
