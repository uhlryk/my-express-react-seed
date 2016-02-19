import bcrypt from 'bcrypt';
import Promise from 'bluebird';

export default function (globals) {
  return function createUser(params, callback) {
    var email = params.email;
    var password = params.password;

    globals.models.user.create({
      email: email,
      password: password,
      status: params.status
    }).then((item) => {
      callback(null, item);
    }).catch((err) => {
      globals.logger.error('DB error users', err);
      callback(err);
    });
  }
}
