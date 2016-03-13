import bcrypt from 'bcrypt';
import Promise from 'bluebird';

export default function (globals) {
  return function sendActivationLink(params, callback) {
    var token = params.token;
    var targetEmail = params.targetEmail;
    globals.emailSender('resetPassword',globals.config.fromEmail, targetEmail, 'reset password', {
      link: globals.config.clientUrl + '/resetPassword/' + token
    }, (error, response) => {
      callback(error, response);
    });
  }
}
