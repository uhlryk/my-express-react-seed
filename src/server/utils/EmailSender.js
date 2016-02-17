import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';
import stubTransport from 'nodemailer-stub-transport';
import { EmailTemplate } from 'email-templates';
import path from 'path';

export default function EmailSender(globals) {
  var transporter;
  if(globals.config.enableEmailTest) {
    transporter = nodemailer.createTransport(stubTransport());
  } else {
    transporter = nodemailer.createTransport(smtpTransport(globals.config.smtpEmail));
  }
  return function sendEmail(templateName, fromEmail, toEmail, subject, locals, callback) {
    var templateDir = path.join(globals.templateDir, templateName);
    var template = new EmailTemplate(templateDir);
    template.render(locals, (err, results) => {
      if(err) {
        return callback(error);
      }
      transporter.sendMail({
        from: fromEmail,
        to: toEmail,
        subject: subject,
        text: results.text,
        html: results.html
      }, (error, response) => {
        if(error){
          return callback(error);
        }
        callback(null, response);
      });
    });
  }
};
