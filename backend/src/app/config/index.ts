import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

export default {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT,
  client_url: process.env.CLIENT_URL as string,
  database_uri: process.env.DATABASE_URI as string,
  salt_round: process.env.BCRYPT_SALT_ROUNDS,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
  jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
  cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY as string,
  cloudinary_api_secret_key: process.env.CLOUDINARY_API_SECRET_KEY as string,
  resend_api_key: process.env.RESEND_API_KEY as string,
  email_from: process.env.EMAIL_FROM as string,
  email_from_name: process.env.EMAIL_FROM_NAME as string,
};
