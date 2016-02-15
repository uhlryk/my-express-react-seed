import validator from 'validator';
import bcrypt from 'bcrypt';
import Promise from 'bluebird';
import ValidationError from '../../errors/ValidationError';

export default function (globals) {
  return function createUser(params, callback) {
    var email = validator.trim(params.email);
    var password = params.password;

    if(email && validator.isEmail(email) && validator.isLength(email, {min:3, max:60})) {
      if(password && validator.isLength(password, {min:6, max:60})) {
        var normalizedEmail = email.toLowerCase();

        var genSalt = Promise.promisify(bcrypt.genSalt);
        var createHash = Promise.promisify(bcrypt.hash);

        genSalt(10).then((salt) => {
          return createHash(password, salt);
        }).then((hash) => {
          return globals.models.user.create({
            email: normalizedEmail,
            password: hash,
            status: params.status
          });
        }).then((item) => {
          callback(null, item);
        }).catch((err) => {
          globals.logger.error('DB error users', err);
          callback(err);
        });
      } else {
        callback(new ValidationError('password'));
      }
    } else {
      callback(new ValidationError('email'));
    }
  }
}
