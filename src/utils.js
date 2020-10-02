import {adjectives, nouns} from './words';
import sgMail from '@sendgrid/mail';
import jwt from 'jsonwebtoken';

export const generateSecret = () => {
  const randomNumber = Math.floor(Math.random() * adjectives.length);
  return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
};

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendSecretMail = (address, secret) => {
  const msg = {
    from: 'op-share@gmail.com',
    to: address,
    subject: '🔒Login Secret for OP-SHARE',
    html: `Hello! Your login secret is <strong>${secret}</strong>.<br/>Copy paste on the app/website to log in`,
  };
  return sgMail.send(msg);
};

export const generateToken = (id) => jwt.sign({id}, process.env.JWT_SECRET);
