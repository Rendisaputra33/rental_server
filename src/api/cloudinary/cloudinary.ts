import { v2 } from 'cloudinary';

export const CLOUD = 'Cloudinary';

export const CloudinaryProvider = {
  provide: CLOUD,
  useFactory: () => {
    return v2.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  },
};
