const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const env = require('dotenv').config();
const crypto = require('crypto');
const token = jwt.sign({
        data: `${process.env.JWT_MSG} ${crypto.randomBytes(32)}`
    }, process.env.JWT_SECRET, { expiresIn: '1h' }  
);    

async function sendMail(sender, username) {
    const transporter = await nodemailer.createTransport({
        host: process.env.SMTP_PROVIDER,
        port: process.env.SMTP_PORT,
        auth: {
          user: process.env.MAIL_USERNAME,
          pass: process.env.MAIL_PASSWORD, 
        },
    });

    let info = await transporter.sendMail({
        from: '"no-reply" <no-reply@haikei.xyz>',
        to: `${sender}`, 
        subject: `Hello ${username}!`,
        text: `Hi There!, You recently signed up for HaiKei.xyz. Please verify your email by clicking the link below. (This link will expire in 1 hour!)
        ${process.env.WEBSITE_URL}/verify/${token} 
        Thanks!
        wearr - HaiKei.xyz


        Not you? You can safely ignore this email!
        `
      }, (error) => {
        if (error) throw Error(error);
      });
}



if (!process.env.SMTP_PROVIDER) {
    console.log('SMTP Provider not set!');
} else {
  module.exports = sendMail;
}

