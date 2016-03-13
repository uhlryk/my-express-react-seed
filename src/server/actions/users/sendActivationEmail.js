import bcrypt from 'bcrypt';
import Promise from 'bluebird';

export default function (globals) {
  return function sendActivationLink(params, callback) {
    var token = params.token;
    var targetEmail = params.targetEmail;
    globals.emailSender('activationLink',globals.config.fromEmail, targetEmail, 'activation user', {
      link: globals.config.clientUrl + '/activate-user/' + token
    }, (error, response) => {
      callback(error, response);
    });
  }
}
