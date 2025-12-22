import { Resend } from 'resend';
import config from '../config';

export const resendClient = new Resend(config.resend_api_key);

export const sender = {
  email: config.email_from,
  name: config.email_from_name,
};
