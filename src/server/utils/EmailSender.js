import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';

export default function EmailSender(globals) {
  var transporter = nodemailer.createTransport(smtpTransport(globals.config.smtpEmail));
  return function sendEmail(mailOptions, callback) {
    transporter.sendMail(mailOptions, (error, response) => {
      if(error){
        return callback(error);
      }
      callback(null, response);
    });
  }
};
