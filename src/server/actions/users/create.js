import validator from 'validator';
import bcrypt from 'bcrypt';
import Promise from 'bluebird';

export default function (globals) {
  return function createUser(params, callback) {
    var email = validator.trim(params.email);
    var password = params.password;

    if(email && password && validator.isEmail(email) &&
      validator.isLength(email, {min:3, max:60}) &&
      validator.isLength(password, {min:6, max:60})
    ) {

      var normalizedEmail = email.toLowerCase();

      var genSalt = Promise.promisify(bcrypt.genSalt);
      var createHash = Promise.promisify(bcrypt.hash);

      genSalt(10).then((salt) => {
        return createHash(password, salt);
      }).then((hash) => {
        return globals.models.user.create({
          email: normalizedEmail,
          password: hash
        });
      }).then((item) => {
        callback(null, item);
      }).catch((err) => {
        globals.logger.error('DB error users', err);
        callback(err);
      });
    } else {
      callback({ type: 'VALIDATION'});
    }
  }
}
